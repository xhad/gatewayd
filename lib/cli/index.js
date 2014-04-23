
function loadAndBind(name, file) {
  module.exports[name] = require(__dirname+'/'+file);
};

loadAndBind('registerUser', 'register_user.js');
loadAndBind('listUsers', 'list_users.js');
loadAndBind('fundHotWallet', 'fund_hot_wallet.js');
loadAndBind('setHotWallet', 'set_hot_wallet.js');
loadAndBind('listIncomingPayments', 'list_incoming_payments.js');
loadAndBind('clearWithdrawal', 'clear_withdrawal.js');
loadAndBind('recordDeposit', 'record_deposit.js');
loadAndBind('listDeposits', 'list_deposits.js');
loadAndBind('listOutgoingPayments', 'list_outgoing_payments.js');
loadAndBind('startGateway', 'start_gateway.js');
loadAndBind('setColdWallet', 'set_cold_wallet.js');
loadAndBind('addCurrency', 'add_currency.js');
loadAndBind('setLastPaymentHash', 'set_last_payment_hash.js');
loadAndBind('setKey', 'set_key.js');
loadAndBind('getKey', 'get_key.js');

