var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List Deposits
*
* @returns [{Deposits}]
*/

function listDeposits() {
  gateway.api.listDeposits(function(err, deposits) {
    PrettyPrintTable.externalTransactions(deposits || []);
  });
}

module.exports = listDeposits;
