var gateway = require(__dirname+'/../');

var Listener = require(__dirname+'/../lib/ripple/listener.js');

var listener = new Listener({
  address: gateway.config.get('HOT_WALLET').address,
  startHash: gateway.config.get('HOT_WALLET').lastHash
});

listener.vent.on("payment", function(payment) {
  switch(payment.direction){
  case "outgoing":
    console.log('OUTGOING PAYMENT', payment);
    break;
  case "passthrough":
    console.log('PASSTHROUGH PAYMENT', payment);
    break;
  case "incoming":
    console.log('INCOMING PAYMENT', payment);
    break;
  }
});

listener.start();

console.log('Listening for incoming ripple payments from Ripple REST.');

