const config = require(__dirname+'/../../config/environment.js');
const getHostedAddress = require(__dirname+'/get_hosted_address.js');
const Promise = require('bluebird');
const RippleTransactions = require(__dirname+'/../data/').models.rippleTransactions;
const RippleAddresses = require(__dirname+'/../data/').models.rippleAddresses;

/**
 * Record incoming payment
 * @requires config, getHostedAddress, Promise, RippleTransactions, RippleAddresses
 * @param {integer} destination_tag
 * @param {decimal} destination_amount.amount
 * @param {string} destination_amount.currency
 * @param {string} destination_amount.issuer
 * @param {string} source_account
 * @param {integer} source_tag
 * @param {decimal} source_amount.amount
 * @param {string} source_amount.currency
 * @param {string} source_amount.issuer
 * @param {string} transaction_state
 * @param {string} state
 * @param {string} hash
 * @param {string} invoice_id
 * @param {array} memos
 * @returns {Promise}
 */

function recordIncomingPayment(opts) {
  return new Promise(function(resolve, reject) {
    getHostedAddress(opts.destination_tag)
      .then(function(hostedAddress) {
        RippleAddresses.findOrCreate({
          address: opts.source_account,
          tag: opts.source_tag,
          managed: false,
          type: opts.source_tag ? 'hosted' : 'independent'
        }).success(function(rippleAddress, created) {
          RippleTransactions.create({
            to_address_id: hostedAddress.id,
            to_amount: opts.destination_amount.value,
            to_currency: opts.destination_amount.currency,
            to_issuer: config.get('COLD_WALLET'),
            from_address_id: rippleAddress.id,
            from_amount: opts.source_amount.value,
            from_currency: opts.source_amount.currency,
            from_issuer: opts.source_amount.issuer || '',
            transaction_state: opts.transaction_state,
            state: opts.state,
            transaction_hash: opts.hash,
            invoice_id: opts.invoice_id,
            memos: opts.memos
          }).success(function(rippleTransaction, created) {
            resolve(rippleTransaction);
          }).error(reject)
        }).error(reject)
      }).error(reject)
  });
}

module.exports = recordIncomingPayment;

