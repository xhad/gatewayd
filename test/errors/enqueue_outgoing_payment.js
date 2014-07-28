var assert = require('assert');
var gateway = require(__dirname+'/../../');
var EnqueueOutgoingPaymentError = gateway.errors.enqueueOutgoingPaymentError;

describe('Enqueue Outgoing Payment Error', function(){
  it('should inherit from Error', function() {
    var error = new EnqueueOutgoingPaymentError();
    assert(error instanceof Error);
  });

  it('should accept a message and field', function() {
    var error = new EnqueueOutgoingPaymentError({
      message: 'invalid ripple address',
      field: 'address'
    });
    assert.strictEqual(error.message, 'invalid ripple address');
    assert.strictEqual(error.field, 'address');
  });

  it('should have a name of EnqueueOutgoingPaymentError', function() {
    var error = new EnqueueOutgoingPaymentError();
    assert.strictEqual(error.name,'EnqueueOutgoingPaymentError');
  });
});

