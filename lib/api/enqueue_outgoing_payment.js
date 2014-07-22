var validator = require(__dirname+'/../validator.js');
var EnqueueOutgoingPaymentError = require(__dirname+'/../errors/enqueue_outgoing_payment_error.js');
var Data = require(__dirname+'/../data');
var config = require(__dirname+'/../../config/config.js');
var RippleTransaction = Data.models.rippleTransactions;
var RippleAddress = Data.models.rippleAddresses;
var async = require('async');

function enqueueOutgoingPayment(options, callback) {
  if (options && validator.isRippleAddress(options.address)) {
    async.waterfall([
      function(done) {
        _findOrCreateSenderAddress(done);
      },
      function(senderAddress, done){
        _findOrCreateDestinationAddress(options, function(error, destinationAddress) {
          done(error, destinationAddress, senderAddress);
        });
      },
      function(toAddress, fromAddress, done){
        _recordTransaction(options, toAddress, fromAddress, done);
      }
    ], callback);
  } else {
    callback(new EnqueueOutgoingPaymentError({
      field: 'address',
      message: 'invalid ripple address'
    }), null);
  }
}

function _findOrCreateDestinationAddress(options, callback) {
  var query = {};
  query.address = options.address;
  query.managed = false;
  if (options.destinationTag) {
    query.tag = options.destinationTag
    query.type = 'hosted';
  } else {
    query.type = 'independent';
  }
  RippleAddress.findOrCreate(query).complete(callback);
}

function _findOrCreateSenderAddress(callback) {
  var hotWalletAddressId = config.get('HOT_WALLET').id;
  if (hotWalletAddressId) {
    callback(null, { id: hotWalletAddressId });  
  } else {
    RippleAddress.findOrCreate({
      address: config.get('HOT_WALLET'.address),
      tag: null
    }).complete(callback);
  }
}

function _recordTransaction(options, toAddress, fromAddress, callback) {
  var issuer;
  if (options.issuer) {
    if (!validator.isRippleAddress(options.issuer)) {
      return callback(new EnqueueOutgoingPaymentError({
        field: 'issuer',
        message: 'invalid ripple address'
      }), null);
    } else {
      issuer = options.issuer;
    }
  } else {
    issuer = config.get('COLD_WALLET');
  }
  RippleTransaction.create({
    to_amount: options.amount,
    to_currency: options.currency,
    from_amount: options.amount,
    from_currency: options.currency,
    to_address_id: toAddress.id,
    from_address_id: fromAddress.id,
    to_issuer: issuer,
    from_issuer: issuer
  }).complete(callback);
}

module.exports = enqueueOutgoingPayment;

