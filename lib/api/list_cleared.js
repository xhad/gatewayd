var data = require('ripple-gateway-data-sequelize');


/**
* @requires data
* List cleared payments
*
* @param {function(err, deposit)} callback
* @returns [Payment]
*/

function listClearedPayments(fn) {
  data.models.externalTransactions.findAll({ 
    where: { status: 'cleared' }
  }).complete(fn);
}

module.exports = listClearedPayments;
