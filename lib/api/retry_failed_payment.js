var async = require('async');
var data = require(__dirname+'/../data/');

function retryFailedPayment(rippleTransactionId, callback){

  async.waterfall([
    findFailedPayment,
    setPaymentStateToOutgoing
  ], function(error, rippleTransaction) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rippleTransaction.toJSON());
    }
  });
  function findFailedPayment(callback) {
    data.models.rippleTransactions.find({
      where: { id: rippleTransactionId }
    }).complete(function(error, rippleTransaction) {
      if (error) {
        callback(error);
      } else if (rippleTransaction) {
        callback(null, rippleTransaction);
      } else {
        callback({
          field: 'id',
          message: 'does not exist'
        });
      }
    });
  }
  function setPaymentStateToOutgoing(rippleTransaction, callback) {
    if (rippleTransaction.state === 'failed') {
      rippleTransaction.updateAttributes({
        state: 'outgoing'
      }).complete(function(error, transaction) {
        callback(error, transaction);
      });
    } else {
      callback({ state: 'must be "failed"' });
    }
  }
}

module.exports = retryFailedPayment;

