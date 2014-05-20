var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List Deposits
*
* @returns [{Deposits}]
*/

function listQueuedDeposits() {
  gateway.api.listQueuedDeposits(function(err, deposits) {
    PrettyPrintTable.externalTransactions(deposits || []);
  });
}

module.exports = listQueuedDeposits;
