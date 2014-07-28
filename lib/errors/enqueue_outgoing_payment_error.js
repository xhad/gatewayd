function EnqueueOutgoingPaymentError(options) {
  options = options || {};
  this.message = options.message;
  this.field = options.field;
  this.name = 'EnqueueOutgoingPaymentError';
  Error.captureStackTrace(this, EnqueueOutgoingPaymentError);
}

EnqueueOutgoingPaymentError.prototype = Object.create(Error.prototype);
EnqueueOutgoingPaymentError.prototype.constructor = EnqueueOutgoingPaymentError;

module.exports = EnqueueOutgoingPaymentError;

