var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List Withdrawals
*
* @returns [{ExternalTransaction}]
*/

function listQueuedWithdrawals(){
  gateway.api.listQueuedWithdrawals(function(err, withdrawals) {
    if (err) {
      logger.error('listQueuedWithdrawals:failed');
      return;
    }

    PrettyPrintTable.externalTransactions(withdrawals);
  });
}

module.exports = listQueuedWithdrawals;
