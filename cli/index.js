
var registerUser = require('./register_user');
var listUsers = require('./list_users');
var fundHotWallet = require('./fund_hot_wallet');
var listIncomingPayments = require('./list_incoming_payments');
var listWithdrawals = require('./list_withdrawals');
var clearWithdrawal = require('./clear_withdrawal');
var recordDeposit = require('./record_deposit');
var listDeposits = require('./list_deposits');
var listOutgoingPayments = require('./list_outgoing_payments');
var startGateway = require('./start_gateway');

module.exports = {
  registerUser: registerUser,
  listUsers: listUsers,
  fundHotWallet: fundHotWallet,
  listIncomingPayments: listIncomingPayments,
  listWithdrawals: listWithdrawals,
  clearWithdrawal: clearWithdrawal,
  recordDeposit: recordDeposit,
  listDeposits: listDeposits,
  listOutgoingPayments: listOutgoingPayments,
  startGateway: startGateway
};

