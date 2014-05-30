var data = require(__dirname+'/../data/');

function retryFailedPayment(rippleTransactionId, fn){
  data.models.rippleTransactions.update({ id: rippleTransactionId, state: 'failed' }, { state: 'outgoing' }).complete(fn);
}

module.exports = retryFailedPayment;

