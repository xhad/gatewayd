var api = require('ripple-gateway-data-sequelize-adapter');
var gateway = require('./gateway');

function externalAccounts(userId, fn) {

  api.externalAccounts.readAll({ user_id: userId }, fn);

}

function rippleAddresses(userId, fn) {

  api.rippleAddresses.readAll({ user_id: userId }, fn);

}

function pendingWithdrawals(userId, fn) {

  api.externalTransactions.readAll({ 
    user_id: userId,
    deposit: false,
    status: 'pending'
  }, fn);

}

function pendingDeposits(userId, fn) {

  api.externalTransactions.readAll({ 
    user_id: userId,
    deposit: false,
    status: 'queued'
  }, fn);

}

function completedDeposits(userId, fn) {

  api.externalTransactions.readAll({ 
    user_id: userId,
    deposit: true,
    status: 'processed'
  }, fn);

}

function completedWithdrawals(userId, fn) {

  api.externalTransactions.readAll({ 
    user_id: userId,
    deposit: false,
    status: 'cleared'
  }, fn);

}

function completedPayments(opts, fn) {


}

function pendingPayments(opts, fn) {

}

function find(userId, fn) {

  api.users.read(userId, fn);

}

var userApi = {
  find: find,
  externalAccounts: externalAccounts,
  rippleAddresses: rippleAddresses,
  pendingWithdrawals: pendingWithdrawals,
  pendingDeposits: pendingDeposits,
  completedDeposits: completedDeposits,
  completedWithdrawals: completedWithdrawals,
  completedPayments: completedPayments,
  pendingPayments: pendingPayments
}

module.exports = userApi;

