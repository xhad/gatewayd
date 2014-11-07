const gatewayd = require(__dirname+'/../../');

var validator = require(__dirname+'/../validator.js');
var EnqueueOutgoingPaymentError = require(__dirname+'/../errors/enqueue_outgoing_payment_error.js');
var Promise = require('bluebird');
var RippleTransaction = gatewayd.models.rippleTransactions;
var RippleAddress = gatewayd.models.rippleAddresses;

function enqueueOutgoingPayment(options) {
  return new Promise(function (resolve, reject) {
    _validateRequest(options)
      .then(function () {
        _findOrCreateSenderAddress(options)
          .then(function (senderAddress) {
            _findOrCreateDestinationAddress(options)
              .then(function (destinationAddress) {
                resolve(_recordTransaction(options, destinationAddress, senderAddress));
              }).error(reject)
          }).error(reject)
      }).error(reject);
  });
}

function _validateRequest(options) {
  return new Promise(function(resolve, reject) {
    if (!validator.isFloat(options.amount)) {
      return reject(new EnqueueOutgoingPaymentError({
        field: 'amount',
        message: 'must be numeric'
      }));
    }
    if (!validator.isAlphanumeric(options.currency)) {
      return reject(new EnqueueOutgoingPaymentError({
        field: 'currency',
        message: 'must be a currency code'
      }));
    }
    if (!validator.isRippleAddress(options.address)) {
      return reject(new EnqueueOutgoingPaymentError({
        field: 'address',
        message: 'invalid ripple address'
      }));
    }
    if (options.destinationTag && !validator.isInt(options.destinationTag)) {
      return reject(new EnqueueOutgoingPaymentError({
        field: 'destinationTag',
        message: 'must be an unsigned integer'
      }));
    }
    if (options.issuer && !validator.isRippleAddress(options.issuer)) {
      return reject(new EnqueueOutgoingPaymentError({
        field: 'issuer',
        message: 'invalid ripple address'
      }));
    }
    resolve();
  });
}

function _findOrCreateSenderAddress() {
  return RippleAddress.findOrCreate({
    address: gatewayd.config.get('HOT_WALLET').address,
    managed: true,
    tag: gatewayd.config.get('HOT_WALLET').id,
    type: 'hosted'
  });
}

function _findOrCreateDestinationAddress(options) {
  return RippleAddress.findOrCreate({
    address: options.address,
    managed: false,
    tag: options.destinationTag,
    type: options.destinationTag ? 'hosted' : 'independent'
  });
}

function _recordTransaction(options, toAddress, fromAddress) {
  return RippleTransaction.create({
    to_amount: options.amount,
    to_currency: options.currency,
    from_amount: options.amount,
    from_currency: options.currency,
    to_address_id: toAddress.id,
    from_address_id: fromAddress.id,
    to_issuer: options.issuer || gatewayd.config.get('COLD_WALLET'),
    from_issuer: options.issuer || gatewayd.config.get('COLD_WALLET'),
    state: 'outgoing',
    direction: 'to-ripple'
  });
}

module.exports = enqueueOutgoingPayment;

