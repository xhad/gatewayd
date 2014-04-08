var gateway = require("../");
var PrettyPrintTable = require('../lib/pretty_print_tables.js');

/**
* List Withdrawals
*
* @returns [{ExternalTransaction}]
*/

function listWithdrawals(account, secret){
  gateway.data.externalTransactions.readAllPending(function(err, withdrawals) {
    if (err) { console.log('failed'); return }
    PrettyPrintTable.externalTransactions(withdrawals);
  });
};

module.exports = listWithdrawals;
