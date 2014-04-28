var data = require("ripple-gateway-data-sequelize");

function listFailedPayments(fn){
  data.rippleTransactions.readAll({ transaction_state: 'failed' }, fn);
}

module.exports = listFailedPayments;

