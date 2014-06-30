var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');
var logger = require('winston');

/**
* Clear Withdrawal
* @param {integer} id
* @returns [{ExternalTransaction}]
*/

function clearWithdrawal(id){
  gateway.api.clearWithdrawal(id, function(err, withdrawal) {
    if (err) {
      logger.error('failed');
      return;
    }
    PrettyPrintTable.externalTransactions([withdrawal]);
  });
};

module.exports = clearWithdrawal;
