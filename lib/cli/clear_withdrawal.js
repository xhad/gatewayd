var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* Clear Withdrawal
* @param {integer} id
* @returns [{ExternalTransaction}]
*/

function clearWithdrawal(id){
  gateway.clearWithdrawal(id, function(err, withdrawal) {
    if (err) { console.log('failed'); return }
    PrettyPrintTable.externalTransactions([withdrawal]);
  });
};

module.exports = clearWithdrawal;
