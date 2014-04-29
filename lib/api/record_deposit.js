var data = require('ripple-gateway-data-sequelize');

/**
* Record the deposit of an asset
*
* @param {string} currency
* @param {decimal} amount 
* @param {integer} external_account_id 
* @param {json} data 
* @param {function(err, {Deposit})} callback
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
