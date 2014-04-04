
var registerUser = require('./register_user');
var listUsers = require('./list_users');
var fundHotWallet = require('./fund_hot_wallet');
var listIncomingPayments = require('./list_incoming_payments');
var listWithdrawals = require('./list_withdrawals');

module.exports = {
  registerUser: registerUser,
  listUsers: listUsers,
  fundHotWallet: fundHotWallet,
  listIncomingPayments: listIncomingPayments,
  listWithdrawals: listWithdrawals
}

