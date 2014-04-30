var gateway = require(__dirname+'/../');

var Listener = require(__dirname+'/../lib/ripple/listener.js');

var listener = new Listener();

listener.onPayment = function(payment) {

  if (payment.destination_account == gateway.config.get('COLD_WALLET')) {
    var dt = payment.destination_tag;
    var state = payment.result;
    var hash = payment.hash;

    if (dt && (state == 'tesSUCCESS')){

      var amount = payment.destination_amount.value;
      var currency = payment.destination_amount.currency;
      var issuer = payment.destination_amount.issuer;

      if (issuer == gateway.config.get('COLD_WALLET')) {

        gateway.payments.recordIncoming(dt, currency, amount, 'incoming', hash, function(err, record) {
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

listener.start(gateway.config.get('LAST_PAYMENT_HASH'));

console.log('Listening for incoming ripple payments from Ripple REST.');

