
var registerUser = require(__dirname+'/register_user');
var listUsers = require(__dirname+'/list_users');
var fundHotWallet = require(__dirname+'/fund_hot_wallet');
var listIncomingPayments = require(__dirname+'/list_incoming_payments');
var listWithdrawals = require(__dirname+'/list_withdrawals');
var clearWithdrawal = require(__dirname+'/clear_withdrawal');
var recordDeposit = require(__dirname+'/record_deposit');
var listDeposits = require(__dirname+'/list_deposits');
var listOutgoingPayments = require(__dirname+'/list_outgoing_payments');
var startGateway = require(__dirname+'/start_gateway');

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

