var depositCallbackJob = require(__dirname+'/../jobs/deposit_completion_callback.js');
var OutgoingPayment = require(__dirname+'/outgoing_payment.js');

function OutgoingPaymentProcessor(payment) {
  this.outgoingPayment = new OutgoingPayment(payment);
  logger.info('payment:outgoing:recorded', payment);
}

OutgoingPaymentProcessor.prototype = {
  processOutgoingPayment: function(callback) {
    var self = this;
    self.outgoingPayment.processOutgoingPayment(function(error, record) {
      if (error) {
        logger.error('payment:outgoing:error', error);
        depositCallbackJob.perform([record.id], logger.error);
        setTimeout(callback, 2000);
      } else {
        depositCallbackJob.perform([record.id], logger.error);
        callback();
      }
    });
  }
};

module.exports = OutgoingPaymentProcessor;

