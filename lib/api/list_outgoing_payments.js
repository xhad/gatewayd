var data = require('ripple-gateway-data-sequelize');

/**
* List outgoing payments
*
* @param {function(err, deposit)} callback
* @returns [Payment]
*/

function listOutgoingPayments(fn) {
  data.rippleTransactions.readAll({ state: 'outgoing' }, fn);
}

module.exports = listOutgoingPayments;

