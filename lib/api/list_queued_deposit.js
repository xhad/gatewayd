var data = require('ripple-gateway-data-sequelize');

/**
* List unprocessed deposits
*
* @param {function(err, deposit)} callback
* @returns [Deposit]
*/

function listQueuedDeposits(fn) {

  data.externalTransactions.readAll({
    deposit: true,
    status: 'queued'
  }, fn);

}

module.exports = listQueuedDeposits;

