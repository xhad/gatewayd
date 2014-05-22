var data = require('ripple-gateway-data-sequelize');

/**
* @requires data
* List incoming payments
*
* @param {function(err, deposit)} callback
* @returns [Payment]
*/

function listIncomingPayments(fn) {
  data.rippleTransactions.readAll({ state: 'incoming' }, fn);
}

module.exports = listIncomingPayments;

