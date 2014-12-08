var Promise = require('bluebird');
var gatewayd = require(__dirname+'/../');

Error.stackTraceLimit = Infinity;

process.on('uncaughtException', function(error) {
  gatewayd.logger.error('Caught exception: ' + error.stack);
});

Promise.onPossiblyUnhandledRejection(function(error) {
  gatewayd.logger.error('Caught exception: ' + error.stack);
});

var Listener = require(__dirname+'/../lib/ripple_listener.js');
var listener = new Listener();
var IncomingPayment = require(__dirname+'/../lib/core/incoming_payment.js');

listener.onPayment = function(payment) {

  var incomingPayment = new IncomingPayment(payment);
  incomingPayment.processPayment()
    .then(function(processedPayment){
      gatewayd.logger.info('payment:incoming:recorded', JSON.stringify(processedPayment));
    })
    .error(function(error){
      gatewayd.logger.error('payment:incoming:error', error);
    });
};

gatewayd.api.getColdWallet(function(error, address) {
  if (error) {
    throw new Error(error);
  }
  if (!address) {
    throw new Error('Ripple COLD_WALLET not set');
  }
  if (address.getLastPaymentHash()) {
    const hash = address.getLastPaymentHash();
    listener.start(hash);
    logger.info('Listening for incoming ripple payments from Ripple REST, starting at', hash);
  } else {
    logger.info('LAST_PAYMENT_HASH not set... gatewayd is now fetching it from Ripple.');
    address.fetchLastPaymentHash().then(function(hash) {
      address.setLastPaymentHash(hash).then(function() {
        listener.start(hash);
        logger.info('Listening for incoming ripple payments from Ripple REST, starting at', hash);
      });
    });
  }
});

