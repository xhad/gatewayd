var config = require(__dirname + '/config/config.js');
var data = require("ripple-gateway-data-sequelize");
var sql = require(__dirname +'/node_modules/ripple-gateway-data-sequelize/lib/sequelize.js');
var ripple = require(__dirname +'/lib/ripple/');
var WalletGenerator = require('ripple-wallet').Generator;
var GatewayProcessManager = require(__dirname+'/lib/processes/');
var crypto = require('crypto');
var trust = require(__dirname+'/lib/ripple/trust.js');
var exec = require('child_process').exec;

var validator = require('validator');
validator.extend('isRippleAddress', function(string){
  return ripple.lib.UInt160.is_valid(string);
});

validator.extend('isPassword', function(string){
  return string.length >= 6;
});

/**
* List Users
*
* @returns [{User}]
*/

function listUsers(fn) { 
  data.users.readAll(fn);
}

/**
* Clear Withdrawal
*
* @param {integer} id
* @returns [{User}]
*/

function clearWithdrawal(id, fn) {
  var opts = { 
    id: id, 
    status: "cleared"
  };  
  data.externalTransactions.update(opts, fn);
}

/**
* Register a User
* - creates external account named "default"
* - creates ripple address as provided
*
* @param {string} name
* @param {string} rippleAddress 
* @param {string} password
* @returns {User}, {ExternalAccount}, {RippleAddress}
*/

function registerUser(opts, fn) {
  if (!validator.isRippleAddress(opts.ripple_address)) {
    fn('invalid ripple_address', null);
    return;
  };
  if (!validator.isAlphanumeric(opts.name)) {
    fn('name must be alphanumeric', null);
    return;
  };
  if (!validator.isPassword(opts.password)) {
    fn('password must be at least six characters', null);
    return;
  };

  var userOpts = { 
    name: opts.name,
    password: opts.password,
    address: opts.ripple_address
  };  

  data.users.create(userOpts, function(err, user) {
    if (err) { fn(err, null); return; }
    var addressOpts = { 
      user_id: user.id,
      address: opts.ripple_address,
      managed: false,
      type: "independent"
    };  
    data.rippleAddresses.create(addressOpts, function(err, ripple_address) {
      if (err) { fn(err, null); return; };
      data.externalAccounts.create({ name: "default", user_id: user.id }, function(err, account){
        if (err) { fn(err, null); return; }
        var addressOpts = { 
          user_id: user.id,
          address: config.get('COLD_WALLET'),
          managed: true,
          type: "hosted",
          tag: account.id
        };  
        data.rippleAddresses.create(addressOpts, function(err, hosted_address) {
          var response = user.toJSON();
          response.ripple_address = ripple_address;
          response.external_account = account;
          response.hosted_address = hosted_address
          fn(err, response);
        }); 
      }); 
    }); 
  }); 
};

/**
* Finalize a deposit after processing
*
* @param {integer} id
* @param {integer} ripple_transaction_id 
* @param {function(err, deposit)} callback
* @returns {Deposit}
*/

function finalizeDeposit(opts, fn) {

  data.externalTransactions.update({ 
    id: opts.id,
    ripple_transaction_id: opts.ripple_transaction_id,
    status: "processed"
  }, fn);

}

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

function listClearedDeposits(fn) {

  data.externalTransactions.readAll({
    status: 'cleared'
  }, fn);

}

/**
* Add a payment to the outgoing queue
*
* @param {string} currency
* @param {decimal} amount
* @param {integer} ripple_address_id
* @param {function(err, deposit)} callback
* @returns [Payment]
*/

function enqueueOutgoingPayment(opts, fn) {
 
  data.rippleTransactions.create({
    to_amount: opts.amount,
    to_currency: opts.currency,
    to_issuer: config.get('COLD_WALLET'),
    from_amount: opts.amount,
    from_currency: opts.currency,
    from_issuer: config.get('COLD_WALLET'),
    to_address_id: opts.to_address_id,
    from_address_id: config.get('HOT_WALLET').id,
    transaction_state: 'outgoing'
  }, fn);
    
}

/**
* List outgoing payments
*
* @param {function(err, deposit)} callback
* @returns [Payment]
*/

function listOutgoingPayments(fn) {

  data.rippleTransactions.readAll({ transaction_state: 'outgoing' }, fn);

}

/**
* List incoming payments
*
* @param {function(err, deposit)} callback
* @returns [Payment]
*/

function listIncomingPayments(fn) {

  data.rippleTransactions.readAll({ transaction_state: 'incoming' }, fn);

}

function recordIncomingNotification(opts, fn) {

  if (opts.transaction_state == 'tesSUCCESS') {
    opts.transaction_state = 'incoming';
    data.rippleTransactions.create(opts, fn);
  } else {
    fn('state not tesSUCCESS', null);
  }

}

/**
* Record incoming payment
*
* @param {integer} destinationTag
* @param {string} currency
* @param {decimal} amount 
* @param {string} state 
* @param {string} hash 
* @param {function(err, deposit)} callback
* @returns {Payment}
*/

function recordIncomingPayment(destinationTag, currency, amount, state, hash, fn) {
  getHostedAddress(destinationTag, function(err, address) {
    if (err && fn) { fn(err, null); return; };
    data.rippleTransactions.create({
        to_amount: amount,
        to_currency: currency,
        to_issuer: config.get('COLD_WALLET'),
        to_amount: amount,
        to_currency: currency,
        to_issuer: config.get('COLD_WALLET'),
        from_address_id: address.id,
        to_address_id: '0',
        transaction_state: state,
        transaction_hash: hash
      }, function(err, rippleTransaction) {
        if (fn) {
          if (err) { fn(err, null); return; };
          fn(null, rippleTransaction);
        }
    });
  });
};

function recordOutgoingNotification(opts, fn) {

  data.rippleTransactions.update({ 
    id: opts.id,
    transaction_state: opts.transaction_state,
    transaction_hash: opts.transaction_hash
  }, fn);

}
/**
* List Pending Withdrawals
*
* @param {function(err, deposit)} callback
* @returns [Withdrawals]
*/

function listPendingWithdrawals(fn) {
  data.externalTransactions.readAll({ deposit: false, status: 'queued' }, fn);
  //data.externalTransactions.readAllPending(fn);
}

/**
* Issue Currency from Cold Wallet to Hot Wallet
* - the cold wallet's secret must be provided
*
* @param {string} currency 
* @param {decimal} amount 
* @param {string} secret
* @param {function(err, deposit)} callback
* @returns [Withdrawals]
*/

function issueCurrency(amount, currency, secret, fn) {
  var opts = {
    to_account: config.get('HOT_WALLET').address,
    from_account: config.get('COLD_WALLET'),
    amount: amount,
    currency: currency,
    issuer: config.get('COLD_WALLET'),
    secret: secret
  }

  ripple.sendCurrency(opts, fn);
}

/**
* Get the public address of the Gateway's cold wallet
* @returns [RippleAddress]
*/

function getColdWalletAddress(){
  return config.get('COLD_WALLET');
}

function setColdWallet(address, fn){
  var key = 'COLD_WALLET';
  var cold_wallet = config.get(key);
  if (cold_wallet) {
    fn('cold wallet address already set: '+ cold_wallet, null);
  } else {
    config.set(key, address);
    config.save(function(){
      cold_wallet = config.get(key);
      fn(null, 'set the cold wallet:', cold_wallet);
    });
  }
}

function getUserAccounts(fn) {
  var query = "select u.id, u.name, address as independent_address, ea.id as external_account_id from users u inner join (select * from ripple_addresses where type='independent') ra on ra.user_id = u.id inner join (select * from external_accounts where name='default') ea on ea.user_id = u.id;"

  sql.query(query).then(function(resp){
    var users = [];
    for (var i=0; i<resp.length; i++) {
      var user = resp[i];
      user.withdraw_address = config.get('COLD_WALLET') + "?dt=" + user.external_account_id
      users.push(user);
    }
    fn(null, users);
  }, function(err) {
    fn(err, null);
  });

}

function getHostedAddress(tag, fn) {
  var params = {
    address: config.get('COLD_WALLET'),
    tag: tag,
    type: 'hosted',
    managed: true
  };
  data.rippleAddresses.read(params, function(err, address) {
    if (address && !err) {
      fn(null, address);
    } else {
      data.rippleAddresses.create(params, fn);
    }
  });
}

function setHotWallet(address, secret, fn) {  
  var rippleAddress = address;

  function saveHotWallet(address) {
    var key = 'HOT_WALLET';
    config.set(key, {
      address: address.address,
      secret: secret,
      id: address.id
    });
    config.save(function(){
      hot_wallet = config.get(key);
      fn(null, hot_wallet);
    });
  }
  data.rippleAddresses.read({ address: rippleAddress }, function(err, address) {
    if (err) {
      data.rippleAddresses.create({
        type: 'hot',
        managed: true,
        address: rippleAddress
      }, function(err, address) {
        saveHotWallet(address); 
      });
    } else {
      saveHotWallet(address); 
    }
  });
}

function getHotWallet() {
  var key = 'HOT_WALLET'; 
  return config.get(key);
}

function generateWallet() {
  walletGenerator = new WalletGenerator();
  return walletGenerator.generate();
}

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

function setKey(fn){
  try {
    var password = crypto.randomBytes(32).toString('hex');
    config.set('KEY', password);
    config.save(function(err){
      fn(null, config.get('KEY'));
    });
  } catch(error) {
    fn(error, null);
  }
};

function getKey(fn){
  key = config.get('KEY'); 
  if (key) {
    fn(null, key);
  } else {
    setKey(fn);
  }
};

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

function listUserExternalAccounts(userId, fn){
  data.externalAccounts.readAll({ user_id: userId }, fn);
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
    listCleared: listClearedDeposits,
    getHotWallet: getHotWallet,
    setHotWallet: setHotWallet,
    generateWallet: generateWallet,
    listWithdrawals: listPendingWithdrawals,
    clearWithdrawal: clearWithdrawal,
    getColdWallet: getColdWalletAddress,
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
    recordIncoming: recordIncomingPayment,
    recordIncomingNotification: recordIncomingNotification,
    recordOutgoingNotification: recordOutgoingNotification
  }
} 

