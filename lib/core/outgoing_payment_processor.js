var OutgoingPayment = require(__dirname+'/outgoing_payment.js');

function OutgoingPaymentProcessor(payment) {
  this.outgoingPayment = new OutgoingPayment(payment);
  logger.info('payment:outgoing:recorded', payment.toJSON());
}

OutgoingPaymentProcessor.prototype = {
  processOutgoingPayment: function(callback) {
    var self = this;
    self.outgoingPayment.processOutgoingPayment(function(error, record) {
      if (error) {
        logger.error('payment:outgoing:error', error);
        setTimeout(callback, 2000);
      } else {
        callback();
      }
    });
  }
};

module.exports = OutgoingPaymentProcessor;

