var assert = require('assert');
var gateway = require(__dirname+'/../../');

var firstPayment, secondPayment;

describe('Enqueue Outgoing Payment', function() {
  it('should accept an address, amount, and currency', function(done) {
    gateway.api.enqueueOutgoingPayment({
      amount: '0.01',
      currency: 'ZMK',
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    }, function(error, outgoingPayment) {
      assert(!error);
      assert(outgoingPayment.id > 0);
      assert.strictEqual(outgoingPayment.to_amount, '0.01');
      assert.strictEqual(outgoingPayment.to_currency, 'ZMK');
      firstPayment = outgoingPayment;
      done();
    });
  });

  it('should set the from_currency, from_amount', function(done) {
    gateway.api.enqueueOutgoingPayment({
      amount: '0.01',
      currency: 'USD',
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    }, function(error, outgoingPayment) {
      assert(!error);
      assert(outgoingPayment.id > 0);
      assert(outgoingPayment.id != firstPayment.id);
      assert(outgoingPayment.to_amount);
      assert(outgoingPayment.to_currency);
      assert(outgoingPayment.from_amount);
      assert(outgoingPayment.from_currency);
      done();
    });
  });

  it('should return an error from an invalid address', function(done) { 
    gateway.api.enqueueOutgoingPayment({
      amount: '0.01',
      currency: 'ZMK',
      address: '234343'
    }, function(error, outgoingPayment) {
      assert(error instanceof Error);
      assert(error instanceof gateway.errors.enqueueOutgoingPaymentError);
      assert.strictEqual(error.name, 'EnqueueOutgoingPaymentError');
      assert.strictEqual(error.field, 'address');
      assert.strictEqual(error.message, 'invalid ripple address');
      assert(!outgoingPayment);
      done();
    });
  });

  it('should optionally accept a destinationTag', function(done) {
    gateway.api.enqueueOutgoingPayment({
      amount: '0.01',
      currency: 'USD',
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      destinationTag: 55431
    }, function(error, outgoingPayment) {
      gateway.data.models.rippleAddresses.find({ where: {
        id: outgoingPayment.to_address_id
      }}) 
      .complete(function(error, address) {
        assert.strictEqual(address.address, 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk');
        assert.strictEqual(address.tag, 55431);
        done();
      });
    });
  });

  it('should default the issuer to the cold wallet', function(done) {
    gateway.api.enqueueOutgoingPayment({
      amount: '0.01',
      currency: 'USD',
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    }, function(error, outgoingPayment) {
      assert.strictEqual(outgoingPayment.to_issuer, gateway.config.get('COLD_WALLET'));
      assert.strictEqual(outgoingPayment.from_issuer, gateway.config.get('COLD_WALLET'));
      done();
    });
  });

  it('should optionally accept an issuer', function(done) {
    gateway.api.enqueueOutgoingPayment({
      amount: '0.01',
      currency: 'USD',
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      issuer: 'rP5ShE8dGBH6hHtNvRESdMceen36XFBQmh'
    }, function(error, outgoingPayment) {
      assert.strictEqual(outgoingPayment.to_issuer, 'rP5ShE8dGBH6hHtNvRESdMceen36XFBQmh');
      assert.strictEqual(outgoingPayment.from_issuer, 'rP5ShE8dGBH6hHtNvRESdMceen36XFBQmh');
      done();
    });
  });
});

