var data = require("ripple-gateway-data-sequelize");

function retryFailedPayment(rippleTransactionId, fn){
  data.rippleTransactions.update({ id: rippleTransactionId, transaction_state: 'outgoing' }, fn);
}

module.exports = retryFailedPayment;

