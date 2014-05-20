var data = require('ripple-gateway-data-sequelize');

/**
* Clear Withdrawal
*
* @param {integer} id
* @returns [{User}]
*/

function clearWithdrawal(id, fn) {
  var opts = { 
    id: id, 
    status: "cleared"
  };  
  data.externalTransactions.update(opts, fn);
}

module.exports = clearWithdrawal;

