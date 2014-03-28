var gateway = require('../lib/gateway.js');
var assert = require('assert');

describe('payments', function() {
 
  it('should enqueue a payment', function(fn) {
    
    var opts = {
      to_address_id: 1,
      to_amount: 2.5,
      to_currency: 'XAG'
    }

    gateway.payments.enqueueOutgoing(opts, function(err, payment) {

      assert(!err);
      assert(payment.to_address_id == 1);
      assert(payment.to_amount == 2.5);
      assert(payment.to_currency = 'XAG');
      assert(payment.transaction_state == 'outgoing');
      fn();

    });

  });

  it.skip('should list queued payments', function(fn) {

  });

  it.skip('should send a payment to ripple', function(fn) {

  });

  it.skip('should get a payment from ripple', function(fn) {

  });

  it.skip('should record a new incoming payment', function(fn) {

  });

  it.skip('should update a notified outgoing payment', function(fn) {

  });

});

