var gateway = require("../");
var PrettyPrintTable = require('../lib/pretty_print_tables.js');

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
