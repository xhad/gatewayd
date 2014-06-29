var depositCallbackJob = require(__dirname+'/../jobs/deposit_completion_callback.js');
var OutgoingPayment = require(__dirname+'/outgoing_payment.js');
var gateway = require(__dirname+'/../../');
var RippleRestClient = require('ripple-rest-client');

function OutgoingPaymentProcessor(payment) {
  console.log('popped a payment');
  this.outgoingPayment = new OutgoingPayment(payment);
}


OutgoingPaymentProcessor.prototype = {
  processOutgoingPayment: function(callback) {
    var self = this;
    console.log('process outgoing payment');
    self.outgoingPayment.sendToRippleRest(function(error, response) {
      console.log(error, response);
    });
  }
};

var rippleRestClient = new RippleRestClient({
  account: gateway.config.get('HOT_WALLET').address,
  secret: ''
})

module.exports = OutgoingPaymentProcessor;

