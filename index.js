var nconf = require(__dirname + '/config/config.js');
var api = require("ripple-gateway-data-sequelize");

var coldWalletAddress = nconf.get('gateway_cold_wallet');
var hot_wallet = nconf.get('gateway_hot_wallet');
var sql = require(__dirname +'/node_modules/ripple-gateway-data-sequelize/lib/sequelize.js');

var startGateway = require(__dirname +'/lib/cli/start_gateway.js');

/**
* List Users
*
* @returns [{User}]
*/

function listUsers(fn) { 
  api.users.readAll(fn);
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
  api.externalTransactions.update(opts, fn);
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
  var userOpts = { 
    name: opts.name,
    password: opts.password
  };  
  api.users.create(userOpts, function(err, user) {
    if (err) { fn(err, null); return; }
    var addressOpts = { 
      user_id: user.id,
      address: opts.rippleAddress,
      managed: false,
      type: "independent"
    };  
    api.rippleAddresses.create(addressOpts, function(err, ripple_address) {
      if (err) { fn(err, null); return; };
      api.externalAccounts.create({ name: "default", user_id: user.id }, function(err, account){
        if (err) { fn(err, null); return; }
        var addressOpts = { 
          user_id: user.id,
          address: coldWalletAddress,
          managed: true,
          type: "hosted",
          tag: account.id
        };  
        api.rippleAddresses.create(addressOpts, function(err, hosted_address) {
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
* Record the deposit of an asset
*
* @param {string} currency
* @param {decimal} amount 
* @param {intenger} external_account_id 
* @param {function(err, deposit)} callback
* @returns {Deposit}
*/

function recordDeposit(opts, fn) {

  api.externalTransactions.create({
    external_account_id: opts.external_account_id,
    currency: opts.currency,
    amount: opts.amount,
    deposit: true,
    status: 'queued'
  }, fn); 

}

/**
* Finalize a deposit after processing
*
* @param {integer} id
* @param {integer} ripple_transaction_id 
* @param {function(err, deposit)} callback
* @returns {Deposit}
*/

function finalizeDeposit(opts, fn) {

  api.externalTransactions.update({ 
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

  api.externalTransactions.readAll({
    deposit: true,
    status: 'queued'
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
 
  api.rippleTransactions.create({
    to_amount: opts.amount,
    to_currency: opts.currency,
    to_issuer: coldWalletAddress,
    from_amount: opts.amount,
    from_currency: opts.currency,
    from_issuer: coldWalletAddress,
    to_address_id: opts.to_address_id,
    from_address_id: nconf.get('gateway_hot_wallet').id,
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

  api.rippleTransactions.readAll({ transaction_state: 'outgoing' }, fn);

}

/**
* List incoming payments
*
* @param {function(err, deposit)} callback
* @returns [Payment]
*/

function listIncomingPayments(fn) {

  api.rippleTransactions.readAll({ transaction_state: 'incoming' }, fn);

}

function recordIncomingNotification(opts, fn) {

  if (opts.transaction_state == 'tesSUCCESS') {
    opts.transaction_state = 'incoming';
    api.rippleTransactions.create(opts, fn);
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
    api.rippleTransactions.create({
        to_amount: amount,
        to_currency: currency,
        to_issuer: coldWalletAddress,
        to_amount: amount,
        to_currency: currency,
        to_issuer: coldWalletAddress,
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

  api.rippleTransactions.update({ 
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
  api.externalTransactions.readAllPending(fn);
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
    to_account: nconf.get('gateway_hot_wallet').address,
    from_account: nconf.get('gateway_cold_wallet'),
    amount: amount,
    currency: currency,
    issuer: nconf.get('gateway_cold_wallet'),
    secret: secret
  }

  sendCurrency(opts, fn);
}

/**
* Get the public address of the Gateway's cold wallet
* @returns [RippleAddress]
*/

function getColdWalletAddress() {
  return nconf.get('gateway_cold_wallet');
}

function getUserAccounts(fn) {
  var query = "select u.id, u.name, address as independent_address, ea.id as external_account_id from users u inner join (select * from ripple_addresses where type='independent') ra on ra.user_id = u.id inner join (select * from external_accounts where name='default') ea on ea.user_id = u.id;"

  sql.query(query).then(function(resp){
    var users = [];
    for (var i=0; i<resp.length; i++) {
      var user = resp[i];
      user.withdraw_address = coldWalletAddress + "?dt=" + user.external_account_id
      users.push(user);
    }
    fn(null, users);
  }, function(err) {
    fn(err, null);
  });

}

function getHostedAddress(tag, fn) {
  var params = { address: coldWalletAddress, tag: tag };
  api.rippleAddresses.read(params, function(err, address) {
    if (err) { fn(err, null); return; };
    if (address) {
      fn(null, address);
    } else {
      api.rippleAddresses.create(params, fn);
    }
  });
}

module.exports = {
  data: api,
  config: nconf,
  start: startGateway,
  users: {
    register: registerUser,
    list: listUsers,
    listAccounts: getUserAccounts
  },
  deposits: {
    record: recordDeposit,
    listQueued: listQueuedDeposits,
    finalize: finalizeDeposit 
  },
  rippleAddresses: {
    getHosted: getHostedAddress
  },
  withdrawals: {
    listPending: listPendingWithdrawals,
    clear: clearWithdrawal
  },
  coldWallet: {
    issueCurrency: issueCurrency,
    getAddress: getColdWalletAddress
  },
  payments: {
    enqueueOutgoing: enqueueOutgoingPayment,
    listOutgoing: listOutgoingPayments,
    listIncoming: listIncomingPayments,
    recordIncoming: recordIncomingPayment,
    recordIncomingNotification: recordIncomingNotification,
    recordOutgoingNotification: recordOutgoingNotification
  }
} 

