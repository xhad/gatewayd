var nconf = require('../config/nconf.js');
process.env.DATABASE_URL = nconf.get('DATABASE_URL');
var api = require("ripple-gateway-data-sequelize-adapter");
var coldWallet = nconf.get("gateway_cold_wallet");
var sequelize = require("../node_modules/ripple-gateway-data-sequelize-adapter/lib/sequelize.js");

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
      if (err) { fn(err, null); return; }
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

function getExternalAccountFromUser(name,fn) {
  getUserByName(name, function(err, user){
    if (err) { fn(err, null); return; };
    api.externalAccounts.read({ user_id: user.id },fn);
  });
}

function getRippleAddressFromUser(name, fn) {
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

function findOrCreateHostedAddress(tag, fn) {
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

module.exports = {
  getUser: getUserByName,
  getUserRippleAddress: getRippleAddressFromUser,
  getUserExternalAccount: getExternalAccountFromUser,
  getHostedAddress: findOrCreateHostedAddress,
  api: api,
  registerUser: registerUser,
  getUserAccounts: getUserAccounts
};

/*

function processIncomingPayment(fromAddress, tag, amount, currency, hash) {
 getSenderAddress(fromAddress) -> (senderAddress)
   getHostedAddress(tag) -> (recipientAddress)
     createIncomingPayment(amount, currency, senderAddress.id, recipientAddress.id, hash) 

}

*/
