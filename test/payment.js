var gateway = require('../lib/gateway.js');
var assert = require('assert');
var config = require('../config/nconf');
var random = require('./utils').rand;

describe('payments', function() {
 
  it('should enqueue a payment', function(fn) {
    
    var opts = {
      to_address_id: 1,
      amount: 2.5,
      currency: 'XAG'
    }

    gateway.payments.enqueueOutgoing(opts, function(err, payment) {

      console.log(err, payment);
      assert(!err);
      assert(payment.to_address_id == 1);
      assert(payment.to_amount == 2.5);
      assert(payment.to_currency = 'XAG');
      assert(payment.transaction_state == 'outgoing');
      fn();

    });

  });

  it('should list queued outgoing payments', function(fn) {

    gateway.payments.listOutgoing(function(err, payments) {

      assert(!err);
      assert(Array.isArray(payments));
      if (payments[0]) {
        assert(payments[0].transaction_state == 'outgoing');
      }
      fn();

    });

  });

  it('should record a new incoming payment', function(fn) {

    var opts = {
      to_address_id: 1,
      to_amount: 2.5,
      to_currency: 'XAG',
      to_issuer: config.get('gateway_cold_wallet'),
      from_address_id: 2,
      from_amount: 2.5,
      from_currency: 'XAG',
      from_issuer: config.get('gateway_cold_wallet'),
      transaction_state: 'tesSUCCESS',
      transaction_hash: random()
    };

    gateway.payments.recordIncomingNotification(opts, function(err, payment) {
    
      assert(payment.transaction_state == 'incoming');
      assert(payment.to_amount == '2.5');
      assert(payment.to_currency == 'XAG');
      assert(payment.to_issuer == config.get('gateway_cold_wallet'));
      assert(payment.to_address_id == 1);
      fn(); 

    });


  });

  it('should update a notified outgoing payment', function(fn) {
    var opts = {
      to_address_id: 1,
      amount: 2.5,
      currency: 'XAG'
    };

    gateway.payments.enqueueOutgoing(opts, function(err, payment) {

      var opts = {
        id: payment.id,
        transaction_state: 'tesSUCCESS',
        transaction_hash: random()
      };

      gateway.payments.recordOutgoingNotification(opts, function(err, payment) {

        assert(payment.transaction_state == 'tesSUCCESS');
        assert(payment.transaction_hash == opts.transaction_hash);
        fn(); 

      });

    });

  });

  it('should list incoming payments', function(fn) {

    gateway.payments.listIncoming(function(err, payments) {
      assert(!err);
      assert(Array.isArray(payments));
      if (payments[0]) {
        assert(payments[0].transaction_state == 'incoming');
      }
      fn();

    });

  });

});

