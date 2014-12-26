var data = require(__dirname+'/../data/');

/**
* @requires data
* List incoming payments
*
* @param {function(err, deposit)} callback
* @returns [Payment]
*/

function listIncomingPayments(fn) {
  data.models.rippleTransactions.findAll({
    state: 'incoming'
  }).complete(fn);
}

module.exports = listIncomingPayments;

