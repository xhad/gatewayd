var gateway = require(__dirname+'/../');

var Listener = require(__dirname+'/../lib/ripple/listener.js');

var listener = new Listener();

listener.onPayment = function(payment) {
  logger.info('payment:notification:received', payment);
  if (payment && payment.destination_account === gateway.config.get('COLD_WALLET')) {
    var opts = {
      destinationTag : payment.destination_tag,
      transaction_state : payment.result,
      hash : payment.hash
    };
    if (opts.destinationTag && (opts.transaction_state === 'tesSUCCESS')){
      if (payment.destination_balance_changes) {
        var balanceChange = payment.destination_balance_changes[0];
        if (balanceChange) {
          opts.amount = balanceChange.value;
          opts.currency = balanceChange.currency;
          opts.issuer = balanceChange.issuer;
          opts.state = 'incoming';
          gateway.api.recordIncomingPayment(opts, function(error, record) {
            if (error) {
              logger.error('payment:incoming:error', error);
            } else {
              try {
                logger.info('payment:incoming:recorded', record.toJSON());
              } catch(exception) {
                logger.error('payment:incoming:error', exception);
              }
            }
          });
        }
      }
    }
  }
};

var lastHash = gateway.config.get('LAST_PAYMENT_HASH');

if (lastHash) {
  listener.start(lastHash);
  logger.info('Listening for incoming ripple payments from Ripple REST, starting at', lastHash);
} else {
  console.log('LAST_PAYMENT_HASH not set... gatewayd is now fetching it from Ripple.');
  gateway.api.fetchLastPaymentHash().then(function(hash) {
    gateway.config.set('LAST_PAYMENT_HASH', hash)
    gateway.config.save(function() {
      listener.start(hash);
      logger.info('Listening for incoming ripple payments from Ripple REST, starting at', hash);
    });
  });
}

