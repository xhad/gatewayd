var data = require('ripple-gateway-data-sequelize');

/**
* @requires Data
*
* @description Record the deposit of an asset in the gateway
* for issuance on the Ripple network, in the External
* Transactions database table. A state of "queued" is
* given to the deposit record to be processed by the 
* deposit process, often taking a fee before enqueuing
* to be send to Ripple.
*
* @param {string} currency The currency code to be issued on Ripple
* @param {decimal} amount  The amount of the asset deposited
* @param {integer} external_account_id e.g. bank account record id, which is tied to a user record
* @param {json} data Miscellaneous json data stored serialized
* @param {function(err, {Deposit})} callback Function with error and External Transaction
* @returns {Deposit}
*/

function recordDeposit(opts, fn) {

  data.externalTransactions.create({
    external_account_id: opts.external_account_id,
    currency: opts.currency,
    amount: opts.amount,
    deposit: true,
    status: 'queued',
    data: opts.data
  }, fn); 

}

module.exports = recordDeposit;
