var data = require("ripple-gateway-data-sequelize");

function retryFailedPayment(rippleTransactionId, fn){
  data.models.rippleTransactions.update({ id: rippleTransactionId, state: 'failed' }, { state: 'outgoing' }).complete(fn);
}

module.exports = retryFailedPayment;

