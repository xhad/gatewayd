var nconf = require('../config/nconf.js');
process.env.DATABASE_URL = nconf.get('DATABASE_URL');
var api = require("ripple-gateway-data-sequelize-adapter");
var coldWallet = nconf.get("gateway_cold_wallet");

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
  api.rippleAddresses.find(params, function(err, address) {
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

module.exports = {
  getUser: getUserByName,
  getUserRippleAddress: getRippleAddressFromUser,
  getUserExternalAccount: getExternalAccountFromUser,
  getHostedAddress: findOrCreateHostedAddress,
  api: api
};

/*

function processIncomingPayment(fromAddress, tag, amount, currency, hash) {
 getSenderAddress(fromAddress) -> (senderAddress)
   getHostedAddress(tag) -> (recipientAddress)
     createIncomingPayment(amount, currency, senderAddress.id, recipientAddress.id, hash) 

}

*/
