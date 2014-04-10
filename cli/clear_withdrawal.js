var gateway = require(__dirname+'/../');
var PrettyPrintTable = require(__dirname+'/../lib/pretty_print_tables.js');

/**
* Clear Withdrawal
* @param {integer} id
* @returns [{ExternalTransaction}]
*/

function clearWithdrawal(id){
  gateway.withdrawals.clear(id, function(err, withdrawal) {
    if (err) { console.log('failed'); return }
    PrettyPrintTable.externalTransactions([withdrawal]);
  });
};

module.exports = clearWithdrawal;
