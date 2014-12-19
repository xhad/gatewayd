var OutgoingPayment = require(__dirname+'/outgoing_payment.js');
var getHotWallet    = require('./../api/get_hot_wallet');

function OutgoingPaymentProcessor(payment) {
  this.outgoingPayment = new OutgoingPayment(payment);
  logger.info('payment:outgoing:recorded', payment.toJSON());
}

OutgoingPaymentProcessor.prototype = {
  processOutgoingPayment: function(callback) {
    var self = this;
    getHotWallet().then(function(hotWallet) {
      self.outgoingPayment.rippleRestClient.account = hotWallet.address;
      self.outgoingPayment.rippleRestClient.secret = hotWallet.address;
      self.outgoingPayment.hotWallet = hotWallet;
      self.outgoingPayment.processOutgoingPayment(function(error) {
        if (error) {
          logger.error('payment:outgoing:error', error);
          setTimeout(callback, 2000);
        } else {
          callback();
        }
      });
    });
  }
};

module.exports = OutgoingPaymentProcessor;

