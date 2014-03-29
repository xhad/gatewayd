var Listener = require('../lib/listener.js');
var config = require('../config/nconf.js');
var abstract = require('../lib/abstract.js');


var listener = new Listener();

listener.onPayment = function(payment) {

  if (payment.destination_account == config.get('gateway_cold_wallet')) {
    var dt = payment.destination_tag;
    var state = payment.result;
    var hash = payment.hash;

    if (dt && (state == 'tesSUCCESS')){

      var amount = payment.destination_amount.value;
      var currency = payment.destination_amount.currency;
      var issuer = payment.destination_amount.issuer;

      if (issuer == config.get('gateway_cold_wallet')) {

        abstract.recordIncomingPayment(dt, currency, amount, 'incoming', hash, function(err, record) {
          if (err) {
            console.log('error:', err); 

          } else {
            try {
              console.log(record.toJSON()); 

            } catch(e) {
              console.log('error', e);

            }
          }
        });
      }
    }
  };
};

listener.start(config.get('last_payment_hash'));

console.log('Listening for incoming ripple payments from Ripple REST.');

