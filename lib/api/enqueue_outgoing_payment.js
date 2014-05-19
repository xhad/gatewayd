var data = require('ripple-gateway-data-sequelize');

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

module.exports = enqueueOutgoingPayment;

