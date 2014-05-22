var data = require('ripple-gateway-data-sequelize');

/**
* List Queued Withdrawals
*
* @param {function(err, deposit)} callback
* @callback {function} [{ExternalTransaction}]
*/

module.exports = function(fn) {
  data.models.externalTransactions.findAll({
    where: "deposit = false and status = 'notified' OR status = 'queued'"
  }).complete(fn);
};

