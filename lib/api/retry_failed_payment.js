var async = require('async');
var data = require(__dirname+'/../data/');

function retryFailedPayment(rippleTransactionId, callback){

  async.waterfall([
    _findFailedPayment,
    _setPaymentStateToOutgoing
  ], function(error, rippleTransaction) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rippleTransaction.toJSON());
    }
  });

  function _findFailedPayment(callback) {
    data.models.rippleTransactions.find({
      where: { id: rippleTransactionId }
    }).complete(function(error, rippleTransaction) {
      if (error) {
        callback(error, null);
      } else if (rippleTransaction) {
        callback(null, rippleTransaction);
      } else {
        callback({
          field: 'id',
          message: 'does not exist'
        }, null);
      }
    });
  }

  function _setPaymentStateToOutgoing(rippleTransaction, callback) {
    if (rippleTransaction.state === 'failed') {
      rippleTransaction.updateAttributes({
        state: 'outgoing'
      }).complete(function(error, transaction) {
        callback(error, transaction);
      });
    } else {
      callback({ state: 'must be "failed"' }, null);
    }
  }
}

module.exports = retryFailedPayment;

