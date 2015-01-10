const Promise            = require('bluebird');
const config             = require(__dirname+'/../../config/environment.js');
const logger             = require(__dirname + '/../data/logs.js');
const getHostedAddress   = require(__dirname+'/get_hosted_address.js');
const RippleTransactions = require(__dirname+'/../data/').models.rippleTransactions;
const RippleAddresses    = require(__dirname+'/../data/').models.rippleAddresses;

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
function recordIncomingPayment(options) {
  return getHostedAddress(options.destination_tag)
    .then(function(hostedAddress) {
      return RippleAddresses.findOrCreate({
        address: options.source_account,
        tag: options.source_tag,
        managed: false,
        type: options.source_tag ? 'hosted' : 'independent'
      }).then(function(rippleAddress) {
        return _updateOrCreateRippleTransaction({
          to_address_id: hostedAddress.id,
          to_amount: options.destination_amount.value,
          to_currency: options.destination_amount.currency,
          to_issuer: config.get('COLD_WALLET'),
          from_address_id: rippleAddress.id,
          from_amount: options.source_amount.value,
          from_currency: options.source_amount.currency,
          from_issuer: options.source_amount.issuer || '',
          transaction_state: options.transaction_state,
          state: options.state,
          transaction_hash: options.hash,
          invoice_id: options.invoice_id,
          memos: options.memos,
          direction: 'from-ripple'
        });
      })
    })
}

function _updateOrCreateRippleTransaction(incomingPayment) {
  return new Promise(function(resolve, reject) {
    RippleTransactions.find({
      where: {
        state: 'invoice',
        invoice_id: incomingPayment.invoice_id,
        direction: 'from-ripple'
      }
    }).then(function(rippleTransaction) {
      if (rippleTransaction) {
        RippleTransactions.update(incomingPayment)
          .then(resolve)
          .error(function(error) {
            logger.error('[record_incoming_payment.js:_updateOrCreateRippleTransaction] Failed to update ripple_transaction [%j] with options [%j], ERROR: ', rippleTransaction, incomingPayment, error);
            return reject(new Error('Failed to update ripple_transaction record'));
        });
      } else {
        RippleTransactions.create(incomingPayment)
          .then(resolve)
          .error(function(error) {
            logger.error('[record_incoming_payment.js:_updateOrCreateRippleTransaction] Failed to create ripple_transaction with fields [%j], ERROR: ', incomingPayment, error);
            return reject(new Error('Failed to create ripple_transaction record'));
          });
      }
    }).error(function(error) {
      logger.error('[record_incoming_payment.js:_updateOrCreateRippleTransaction] Failed to query ripple_transactions table, ERROR: ', error);
      return reject(new Error('Failed to query ripple_transactions table'));
    });
  });
}

module.exports = recordIncomingPayment;

