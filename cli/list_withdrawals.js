var gateway = require("../lib/gateway.js");
var api = require('ripple-gateway-data-sequelize-adapter');
var PrettyPrintTable = require('../lib/pretty_print_tables.js');

/**
* List Withdrawals
*
* @returns [{ExternalTransaction}]
*/

function listWithdrawals(account, secret){
  api.externalTransactions.readAllPending(function(err, withdrawals) {
    if (err) { console.log('failed'); return }
    PrettyPrintTable.externalTransactions(withdrawals);
  });
};

module.exports = listWithdrawals;
