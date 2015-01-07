const config = require(__dirname+'/../../config/environment.js');

var validator = require(__dirname+'/../validator.js');
var Promise = require('bluebird');
const RippleTransactions = require(__dirname+'/../data/').models.rippleTransactions;
const RippleAddresses = require(__dirname+'/../data/').models.rippleAddresses;

function createRipplePayment(options) {
  var sourceAddress, destinationAddress;
  return _validateRequest(options)
    .then(function () {
      return _findOrCreateSenderAddress(options);
    })
    .then(function (address) {
      sourceAddress = address;
      return _findOrCreateDestinationAddress(options);
    })
    .then(function (address) {
      destinationAddress = address;
      return _recordTransaction(options, destinationAddress, sourceAddress);
    });
}

function _validateRequest(options) {
  return new Promise(function(resolve, reject) {
    _validateDestination(options)
      .then(function() {
        if (options.direction === 'from-ripple' && !validator.isRippleAddress(options.source_address)) {
          return reject(new Error('invalid ripple source address'));
        } else if (options.destinationTag && !validator.isInt(options.destinationTag)) {
          return reject(new Error('destinationTag must be an unsigned integer'));
        } else if (options.issuer && !validator.isRippleAddress(options.issuer)) {
          return reject(new Error('invalid ripple address'));
        } else {
          return resolve();
        }
      }).error(reject);
  });
}

function _validateDestination(options) {
  return new Promise(function(resolve, reject) {
    if (options.direction === 'to-ripple' && !validator.isRippleAddress(options.destination_address)) {
      return reject(new Error('invalid ripple destination address'));
    } else if (!validator.isFloat(options.destination_amount)) {
      return reject(new Error('amount must be numeric'));
    } else if (!validator.isAlphanumeric(options.destination_currency)) {
      return reject(new Error('invalid currency'));
    } else {
      return resolve();
    }
  });
}

function _findOrCreateSenderAddress(options) {
  var addressOptions;
  if (options.direction === 'to-ripple') {
    addressOptions = {
      address: config.get('HOT_WALLET').address,
      managed: true,
      tag: options.source_tag,
      type: options.source_tag ? 'hosted' : 'hot'
    };
  }
  if (options.direction === 'from-ripple') {
    addressOptions = {
      address: options.source_address,
      managed: false,
      tag: options.source_tag,
      type: options.source_tag ? 'hosted' : 'independent'
    };
  }
  return RippleAddresses.findOrCreate(addressOptions);
}

function _findOrCreateDestinationAddress(options) {
  var addressOptions;
  if (options.direction === 'to-ripple') {
    addressOptions = {
      address: options.destination_address,
      managed: false,
      tag: options.destination_tag,
      type: options.destination_tag ? 'hosted' : 'independent'
    };
  }
  if (options.direction === 'from-ripple') {
    addressOptions = {
      address: config.get('COLD_WALLET'),
      managed: true,
      tag: options.destination_tag,
      type: options.destination_tag ? 'hosted' : 'cold'
    };
  }
  return RippleAddresses.findOrCreate(addressOptions);
}

function _recordTransaction(options, toAddress, fromAddress) {
  return RippleTransactions.create({
    to_amount: options.destination_amount,
    to_currency: options.destination_currency,
    from_amount: options.source_amount,
    from_currency: options.source_currency,
    to_address_id: toAddress.id,
    from_address_id: fromAddress.id,
    to_issuer: options.destination_issuer,
    from_issuer: options.source_issuer,
    state: options.state,
    direction: options.direction,
    memos: options.memos,
    invoice_id: options.invoice_id
  });
}

module.exports = createRipplePayment;

