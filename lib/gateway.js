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
    deposit: true
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
    status: 'queued',
    deposit: true
  }, {
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

  api.externalTransactions.findAll({
    deposit: true,
    status: 'queued'
  }, fn);

}

module.exports = {
  deposits: {
    record: recordWithdrawal,
    listQueued: listQueuedDeposits,
    finalize: finalizeDeposit 
  },
  withdrawals: {

  },
  payments: {

  }
} 

