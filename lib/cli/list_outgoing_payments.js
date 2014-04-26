var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List Outgoing Payments
*
* @returns [{Deposits}]
*/

function listOutgoingPayments() {
  gateway.listOutgoingPayments(function(err, payments) {
    PrettyPrintTable.payments(payments);
  });
}

module.exports = listOutgoingPayments;
