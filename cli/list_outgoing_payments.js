var gateway = require('../');
var PrettyPrintTable = require('../lib/pretty_print_tables.js');

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
