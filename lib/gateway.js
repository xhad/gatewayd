var nconf = require('../config/nconf');
var cold_wallet_address = nconf.get('gateway_cold_wallet');
var hot_wallet = nconf.get('gateway_hot_wallet');

var api = require("ripple-gateway-data-sequelize-adapter");

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
    to_issuer: cold_wallet_address,
    from_amount: opts.amount,
    from_currency: opts.currency,
    from_issuer: cold_wallet_address,
    to_address_id: opts.to_address_id,
    from_address_id: 2,
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

/**
* Record incoming payment
*
* @param {integer} to_address_id
* @param {intgeger} from_address_id
* @param {decimal} to_amount
* @param {string} to_currency
* @param {string} to_issuer
* @param {decimal} from_amount
* @param {string} from_currency
* @param {string} from_issuer 
* @param {function(err, deposit)} callback
* @returns {Payment}
*/

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
* @param {integer} id
* @param {string} transaction_state
* @param {string} transaction_hash 
* @param {function(err, deposit)} callback
* @returns {Payment}
*/

function recordOutgoingNotification(opts, fn) {

  api.rippleTransactions.update({ 
    id: opts.id,
    transaction_state: opts.transaction_state,
    transaction_hash: opts.transaction_hash
  }, fn);

}

module.exports = {
  deposits: {
    record: recordDeposit,
    listQueued: listQueuedDeposits,
    finalize: finalizeDeposit 
  },
  withdrawals: {

  },
  payments: {
    enqueueOutgoing: enqueueOutgoingPayment,
    listOutgoing: listOutgoingPayments,
    listIncoming: listIncomingPayments,
    recordIncomingNotification: recordIncomingNotification,
    recordOutgoingNotification: recordOutgoingNotification
  }
} 

