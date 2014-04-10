var gateway = require(__dirname+'/../');
var PrettyPrintTable = require(__dirname+'/../lib/pretty_print_tables.js');

/**
* List Deposits
*
* @returns [{Deposits}]
*/

function listDeposits() {
  gateway.deposits.listQueued(function(err, deposits) {
    PrettyPrintTable.externalTransactions(deposits);
  });
}

module.exports = listDeposits;
