var gateway = require(__dirname+'/../../');
var sql = require(__dirname+'/../data/sequelize.js');
var async = require('async');

function WithdrawalProcessor(incomingPayment) {
  this.incomingPayment = incomingPayment;
}

WithdrawalProcessor.prototype = {
  
  processIncomingPayment: function(callback) {
    var self = this;
    async.waterfall([
      function(callback) {
        self._getTransactionRippleAddress(callback);
      },
      function(address, callback) {
        self._createWithdrawal(address, callback);
      },
      function(rippleTransaction, callback) {
        self._finalizeRippleTransaction(rippleTransaction, callback);
      }
    ], callback);
  },

  _getTransactionRippleAddress: function(callback) {
    var self = this;
    var rippleTransaction = self.incomingPayment;
    gateway.data.models.rippleAddresses.find({
      where: { id: rippleTransaction.to_address_id }
    }).complete(function(error, address) {
      if (error){
        callback(error, null);
      } else if (address){
        callback(null, address);
      } else {
        callback('no address found', null);
      }
    });
  },
  
  _createWithdrawal: function(address, callback){
    var self = this;
    var rippleTransaction = self.incomingPayment;
    var amountMinusFees = rippleTransaction.to_amount * (1 - gateway.config.get('WITHDRAWAL_FEE'));
    gateway.data.models.externalTransactions.create({
      deposit: false,
      amount: amountMinusFees,
      currency: rippleTransaction.to_currency,
      status: 'queued',
      ripple_transaction_id: rippleTransaction.id,
      external_account_id: address.tag
    }).complete(function(error, withdrawal) {
      if (error) {
        logger.error('withdrawal:failed', error);
        callback(error);
      } else if (withdrawal) {
        self.externalTransactionWithdrawal = withdrawal;
        logger.info('withdrawal:recorded', withdrawal);
        callback();
      } else {
        logger.error('withdrawal:failed', 'withdrawal not found');
        callback('withdrawal not found');
      }
    });
  },

  _finalizeRippleTransaction: function(callback){
    var self = this;
    var query = 'update ripple_transactions set state = \'succeeded\'';
    query += ' where id = ' + self.incomingPayment.id + ' and state = \'incoming\'';
    sql.query(query).complete(callback);
    logger.info('withdrawal:succeeded', '- incoming payment id:', self.incomingPayment.id);
  }

};

module.exports = WithdrawalProcessor;

