var gateway = require(__dirname+'/../');
var PrettyPrintTable = require(__dirname+'/../lib/pretty_print_tables.js');

/**
* List Incoming Payments
*
* @returns [{RipplePayment}]
*/

function listIncomingPayments() {
  gateway.payments.listIncoming(function(err, payments){
    PrettyPrintTable.payments(payments || []);
  });
}

module.exports = listIncomingPayments;
