var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List Withdrawals
*
* @returns [{ExternalTransaction}]
*/

function listWithdrawals(account, secret){
  gateway.api.listWithdrawals(function(err, withdrawals) {
    if (err) { console.log('failed'); return }
    PrettyPrintTable.externalTransactions(withdrawals);
  });
};

module.exports = listWithdrawals;
