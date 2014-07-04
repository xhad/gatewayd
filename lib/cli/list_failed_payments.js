var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List Failed Payments
*
* @returns [{RippleTransaction}]
*/

function listFailedPayments() {
  gateway.api.listFailedPayments(function(err, transactions){
    if (err) {
      console.log('error:', err);
    } else {
      PrettyPrintTable.payments(transactions);
    }
  });
}

module.exports = listFailedPayments;
