var data = require(__dirname+'/../data/');

/**
* @requires data
* List outgoing payments
*
* @param {function(err, deposit)} callback
* @returns [Payment]
*/

function listOutgoingPayments(fn) {
  data.rippleTransactions.readAll({ state: 'outgoing' }, fn);
}

module.exports = listOutgoingPayments;

