var config = require(__dirname + '/config/config.js');
var data = require("ripple-gateway-data-sequelize");
var ripple = require(__dirname +'/lib/ripple/');
var GatewayProcessManager = require(__dirname+'/lib/processes/');
var crypto = require('crypto');
var trust = require(__dirname+'/lib/ripple/trust.js');
var exec = require('child_process').exec;

var requireAll = require('require-all-to-camel');

function startGateway(opts) {
  processManager = new GatewayProcessManager();
  processManager.start(opts);
}

function stopGateway(opts) {
  processManager = new GatewayProcessManager();
  processManager.stop(opts);
}

function restartGateway(opts) {
  processManager = new GatewayProcessManager();
  processManager.restart(opts);
}

function setLastPaymentHash(hash, fn){
  config.set('LAST_PAYMENT_HASH', hash);
  config.save(function(){
    fn(null, 'set the last payment hash to '+ hash);
  });
}

function addCurrency(currency, fn){
  var currencies = config.get('CURRENCIES') || {};
  if (!(currency in currencies)) {
    currencies[currency] = 0;
  }
  config.set('CURRENCIES', currencies);
  config.save(function(){
    fn(null, currencies);
  });
}

function removeCurrency(currency, fn){
  var currencies = config.get('CURRENCIES') || {};
  delete currencies[currency];
  config.set('CURRENCIES', currencies);
  config.save(function(){
    fn(null, currencies);
  });
}

function getTrustLines(fn){
  var hotWallet = config.get('HOT_WALLET').address;
  var coldWallet = config.get('COLD_WALLET');
  var opts = {
    fromAccount: hotWallet,
    toAccount: coldWallet 
  };
  ripple.getTrustLines(opts, fn);
}

function setTrustLine(currency, amount, fn) {
  trust({
    currency: currency.toUpperCase(),
    amount: amount,
    issuer: config.get('COLD_WALLET'),
    account: config.get('HOT_WALLET').address,
    secret: config.get('HOT_WALLET').secret
  }, fn);
}

function refundColdWallet(currency, amount, fn){
  var opts = {
    to_account: config.get('COLD_WALLET'),
    from_account: config.get('HOT_WALLET').address,
    amount: amount,
    currency: currency,
    issuer: config.get('COLD_WALLET'),
    secret: config.get('HOT_WALLET').secret
  }
  ripple.sendCurrency(opts, fn);
}

function listProcesses(opts, fn){
  var command;
  if (typeof opts == 'function'){
    fn = opts;
    opts = { json: true }
  }

  if (opts.json){
    command = 'prettylist';
  } else {
    command = 'list';
  }

  var output = "";
  var pm2 = exec('pm2 '+command);

  pm2.stdout.on('data', function (data) {
    output += data;
  });

  pm2.on('close', function (code) {
    if (opts.json){
      fn(null, output);
    } else {
      fn(null, output);
    }
  });
};

var api = {};

function bind(filename, method){
  api[method] = require(__dirname+'/lib/api/'+filename);
}

var activateUser = require(__dirname+'/lib/api/activate_user.js');
var deactivateUser = require(__dirname+'/lib/api/deactivate_user.js');
var listFailedPayments = require(__dirname+'/lib/api/list_failed_payments.js');
var retryFailedPayment = require(__dirname+'/lib/api/retry_failed_payment.js');
var recordDeposit = require(__dirname+'/lib/api/record_deposit.js');
var setKey = require(__dirname+'/lib/api/set_key.js');
var getKey = require(__dirname+'/lib/api/get_key.js');
var listUserExternalAccounts = require(__dirname+'/lib/api/list_user_external_accounts.js');
var listUsers = require(__dirname+'/lib/api/list_users.js');
var clearWithdrawal = require(__dirname+'/lib/api/clear_withdrawal.js');
var registerUser = require(__dirname+'/lib/api/register_user.js');
var finalizeDeposit = require(__dirname+'/lib/api/finalize_deposit.js');
var listQueuedDeposits = require(__dirname+'/lib/api/list_queued_deposits.js');
var enqueueOutgoingPayment = require(__dirname+'/lib/api/enqueue_outgoing_payment.js');
var listOutgoingPayments = require(__dirname+'/lib/api/list_outgoing_payments.js');
var listIncomingPayments = require(__dirname+'/lib/api/list_incoming_payments.js');
var getHostedAddress = require(__dirname+'/lib/api/get_hosted_address.js');
var listPendingWithdrawals = require(__dirname+'/lib/api/list_pending_withdrawals.js');
var issueCurrency = require(__dirname+'/lib/api/issue_currency.js');
var setColdWallet = require(__dirname+'/lib/api/set_cold_wallet.js');
var getUserAccounts = require(__dirname+'/lib/api/get_user_accounts.js');
var generateWallet = require(__dirname+'/lib/api/generate_wallet.js');
var setHotWallet = require(__dirname+'/lib/api/set_hot_wallet.js');

module.exports = {
  config: config,
  ripple: ripple,
  data: data,
  api: {
    setLastPaymentHash: setLastPaymentHash,
    addCurrency: addCurrency,
    removeCurrency: removeCurrency,
    setKey: setKey,
    getKey: getKey,
    setTrustLine: setTrustLine,
    getTrustLines: getTrustLines,
    refundColdWallet: refundColdWallet,
    registerUser: registerUser,
    listUsers: listUsers,
    recordDeposit: recordDeposit,
    listDeposits: listQueuedDeposits,
    setHotWallet: setHotWallet,
    generateWallet: generateWallet,
    listWithdrawals: listPendingWithdrawals,
    clearWithdrawal: clearWithdrawal,
    setColdWallet: setColdWallet,
    start: startGateway,
    stop: stopGateway,
    restart: restartGateway,
    listIncomingPayments: listIncomingPayments,
    listOutgoingPayments: listOutgoingPayments,
    listProcesses: listProcesses,
    listUserExternalAccounts: listUserExternalAccounts,
    activateUser: activateUser,
    deactivateUser: deactivateUser,
    listFailedPayments: listFailedPayments,
    retryFailedPayment: retryFailedPayment
  },
  users: {
    listAccounts: getUserAccounts
  },
  deposits: {
    finalize: finalizeDeposit 
  },
  rippleAddresses: {
    getHosted: getHostedAddress,
  },
  coldWallet: {
    issueCurrency: issueCurrency,
  },
  payments: {
    enqueueOutgoing: enqueueOutgoingPayment,
  }
} 

