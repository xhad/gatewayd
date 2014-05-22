var data = require('ripple-gateway-data-sequelize');

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

