var gateway = require(__dirname+'/../');
var PrettyPrintTable = require(__dirname+'/../lib/pretty_print_tables.js');

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
