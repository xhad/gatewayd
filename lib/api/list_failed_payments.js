var data = require(__dirname+'/../data/');

/**
 * @requires data
 * @function listFailedPayments
 *
 * @description Lists failed payments from the rippleTransaction table.
 * @param {callback} fn - handles query results.
 */

function listFailedPayments(fn){
  data.rippleTransactions.readAll({ transaction_state: 'failed' }, fn);
}

module.exports = listFailedPayments;

