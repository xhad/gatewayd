var Listener = require('../lib/listener.js');
var nconf = require('../config/nconf.js');

var listener = new Listener();

listener.onPayment = function(payment) {
  
  // do what you want with the payment here
  console.log(payment);

};

listener.start(nconf.get('last_payment_hash'));

