var gateway = require(__dirname+'/../');

var logger = require('winston');

var Listener = require(__dirname+'/../lib/ripple/listener.js');

var listener = new Listener();

listener.onPayment = function(payment) {
  if (payment && payment.destination_account == gateway.config.get('COLD_WALLET')) {

    var opts = {
      destinationTag : payment.destination_tag,
      transaction_state : payment.result,
      hash : payment.hash
    };

    if (opts.destinationTag && (opts.transaction_state  == 'tesSUCCESS')){

      opts.amount = payment.destination_amount.value;
      opts.currency = payment.destination_amount.currency;
      opts.issuer = payment.destination_amount.issuer;
      opts.state = 'incoming';

      if (opts.issuer == gateway.config.get('COLD_WALLET')) {

        gateway.api.recordIncomingPayment(opts, function(err, record) {
          if (err) {
            logger.error(err); 
          } else {
            try {
              logger.info(record.toJSON()); 
            } catch(e) {
              logger.error(e);
            }
          }
        });
      }
    }
  };
};

listener.start(gateway.config.get('LAST_PAYMENT_HASH'));

logger.info('Listening for incoming ripple payments from Ripple REST.');

