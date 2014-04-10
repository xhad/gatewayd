var gateway = require(__dirname+'/../');
var PrettyPrintTable = require(__dirname+'/../lib/pretty_print_tables.js');

/**
* List Outgoing Payments
*
* @returns [{Deposits}]
*/

function listOutgoingPayments() {
  gateway.payments.listOutgoing(function(err, payments) {
    PrettyPrintTable.payments(payments);
  });
}

module.exports = listOutgoingPayments;
