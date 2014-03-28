var nconf = require('../config/nconf.js');
process.env.DATABASE_URL = nconf.get('DATABASE_URL');
var api = require("ripple-gateway-data-sequelize-adapter");
var coldWallet = nconf.get("gateway_cold_wallet");
var sequelize = require("../node_modules/ripple-gateway-data-sequelize-adapter/lib/sequelize.js");
var request = require("request");

function recordIncomingPayment(destinationTag, currency, amount, state, hash, fn) {
  getHostedAddress(destinationTag, function(err, address) {
    if (err && fn) { fn(err, null); return; };
    api.rippleTransactions.create({ 
        to_amount: amount,
        to_currency: currency,
        to_issuer: 'coldWallet',
        to_amount: amount,
        to_currency: currency,
        to_issuer: 'coldWallet',
        from_address_id: address.id,
        to_address_id: '0',
        transaction_state: state,
        transaction_hash: hash
      }, function(err, rippleTransaction) {
        if (fn) {
          if (err) { fn(err, null); return; };
          fn(null, rippleTransaction);
        }
      })
    });   
  };

function readAllUserExternalTransactions(userId, fn) {
  var select = "select external_transactions.id, currency, amount, deposit, ripple_transaction_id, external_account_id as external_account_id, status"
  var query = select + " from (select id from external_accounts where user_id = "+userId+") accounts join external_transactions on accounts.id = external_transactions.external_account_id;"
  sequelize.query(query).then(function(resp){
    fn(null, resp); 
  }, function(err) {
    fn(err, null);
  });
}

var registerUser = function(opts, fn) {
  var userOpts = {
    name: opts.name,
    password: opts.password
  };
  api.users.create(userOpts, function(err, user) {
    if (err) { fn(err, null); return; }
    var addressOpts = {
      user_id: user.id,
      address: opts.ripple_address,
      managed: false,
      type: "independent"
    };
    api.rippleAddresses.create(addressOpts, function(err, ripple_address) {
      if (err) { fn(err, null); return; };
      api.externalAccounts.create({ name: "default", user_id: user.id }, function(err, account){
        if (err) { fn(err, null); return; }
        var addressOpts = {
          user_id: user.id,
          address: coldWallet,
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

function getUserByName(name, fn) {
  api.users.read({ name: name }, fn)
}

function getUserExternalAccount(name,fn) {
  getUserByName(name, function(err, user){
    if (err) { fn(err, null); return; };
    api.externalAccounts.read({ user_id: user.id },fn);
  });
}

function getUserRippleAddress(name, fn) {
  getUserByName(name, function(err, user){
    if (err) { fn(err, null); return; };
    api.rippleAddresses.read({ user_id: user.id },fn);
  });
}

function createPendingWithdrawal(rippleTransactionId, amount, currency, fn) {
  api.externalTransactions.create({
    external_account_id: externalAccountId,
    amount: amount,
    currency: currency,
    ripple_transaction_id: rippleTransactionId,
    status: 'pending'
  }, fn);
}

function getHostedAddress(tag, fn) {
  var params = { address: coldWallet, tag: tag };
  api.rippleAddresses.read(params, function(err, address) {
    if (err) { fn(err, null); return; }; 
    if (address) {
      fn(null, address);
    } else {
      api.rippleAddresses.create(params, fn); 
    }
  });
}

function createIncomingPayment(amount, currency, senderAddressId, recipientAddressId, hash) {
  api.rippleTransactions.create({
    to_address_id: recipientAddressId,
    from_address_id: senderAddressId,
    to_amount: amount,
    to_currency: currency,
    to_issuer: coldWallet,
    from_amount: amount,
    from_currency: currency,
    from_issuer: coldWallet,
    transaction_state: 'tesSUCCESS',
    transaction_hash: hash
  });
};

function getUserAccounts(fn) {
  var query = "select u.id, u.name, address as independent_address, ea.id as external_account_id from users u inner join (select * from ripple_addresses where type='independent') ra on ra.user_id = u.id inner join (select * from external_accounts where name='default') ea on ea.user_id = u.id;"

  sequelize.query(query).then(function(resp){
    var users = [];
    for (var i=0; i<resp.length; i++) {
      var user = resp[i];
      user.withdraw_address = coldWallet + "?dt=" + user.external_account_id
      users.push(user);
    }
    fn(null, users);
  }, function(err) {
    fn(err, null); 
  });

}

function getPendingWithdrawalsFull(fn) {
  var query= "select * from (select * from external_transactions where status='pending') pending inner join (select ea.user_id, ea.id, users.name from external_accounts ea inner join users on ea.user_id = users.id) accounts on pending.external_account_id = accounts.id;";

  sequelize.query(query).then(function(resp){
    fn(null, resp);  
  }, function(err ){
    fn(err, null)
  });
}

function deposit(username, amount, currency, fn) {
  var hotwallet = nconf.get('gateway_hot_wallet');
  var coldWallet = nconf.get('gateway_cold_wallet');
  getUserExternalAccount(username, function(err, account) {
    getUserRippleAddress(username, function(err, address) {
      api.rippleTransactions.create({ 
        to_address_id: address.id, 
        from_address_id: 0,
        to_amount: amount,
        to_currency: currency,
        to_issuer: coldWallet,
        from_amount: amount,
        from_currency: currency,
        from_issuer: coldWallet,
        transaction_state: 'queued'
      }, function(err, transaction) {
        if (err) { fn(err, null); return; };
        fn(null, transaction);
      }); 
    });
  });
}

function clearWithdrawal(id, fn) {
  var opts = {
    id: id,
    status: "cleared"
  };
  api.externalTransactions.update(opts, fn);
}

module.exports = {
  getUser: getUserByName,
  getUserRippleAddress: getUserRippleAddress,
  getUserExternalAccount: getUserExternalAccount,
  getHostedAddress: getHostedAddress,
  api: api,
  registerUser: registerUser,
  getUserAccounts: getUserAccounts,
  deposit: deposit,
  recordIncomingPayment: recordIncomingPayment,
  getPendingWithdrawalsFull: getPendingWithdrawalsFull,
  readAllUserExternalTransactions: readAllUserExternalTransactions,
  clearWithdrawal: clearWithdrawal,
};

