var data = require('ripple-gateway-data-sequelize');

/**
* List Pending Withdrawals
*
* @param {function(err, deposit)} callback
* @returns [Withdrawals]
*/

function listPendingWithdrawals(fn) {
  data.externalTransactions.readAll({ deposit: false, status: 'queued' }, fn);
}

module.exports = listPendingWithdrawals;

