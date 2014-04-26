var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List Incoming Payments
*
* @returns [{RipplePayment}]
*/

function listIncomingPayments() {
  gateway.listIncomingPayments(function(err, payments){
    PrettyPrintTable.payments(payments || []);
  });
}

module.exports = listIncomingPayments;
