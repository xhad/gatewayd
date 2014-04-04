var gateway = require("../lib/gateway.js");
var PrettyPrintTable = require('../lib/pretty_print_tables.js');

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
