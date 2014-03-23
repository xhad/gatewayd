var Listener = require('../lib/listener.js');
var nconf = require('../config/nconf.js');
var abstract = require('../lib/abstract.js');

var listener = new Listener();

listener.onPayment = function(payment) {
  if (payment.destination_account == nconf.get('gateway_cold_wallet')) {
    var dt = payment.destination_tag;
    if (dt){
      var amount = payment.destination_amount.value;
      var currency = payment.destination_amount.currency;
      var issuer = payment.destination_amount.issuer;
      if (issuer == nconf.get('gateway_cold_wallet')) {

        abstract.recordIncomingPayment(dt, currency, amount, function(err, record) {
          console.log(err, record.toJSON()); 
        });

      }
    }
  };

};

listener.start(nconf.get('last_payment_hash'));

