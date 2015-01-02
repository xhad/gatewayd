var gatewayd = require(__dirname+'/../../');
var assert   = require('assert');

describe('api.createRipplePayment', function() {

  describe('outgoing ripple payment', function() {

    it('should create an associated ripple address', function(done) {

      var options = {
        state                : 'invoice',
        direction            : 'to-ripple',
        destination_address  : 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
        destination_tag      : 788833,
        destination_amount   : 10,
        destination_currency : 'BTC',
        source_amount        : 15,
        source_currency      : 'XAU',
        source_tag           : 9993222
      };

      gatewayd.api.createRipplePayment(options)
        .then(function(ripplePayment) {

          assert.strictEqual(ripplePayment.to_amount, options.destination_amount);
          assert.strictEqual(ripplePayment.to_currency, options.destination_currency);
          assert.strictEqual(ripplePayment.from_amount, options.source_amount);
          assert.strictEqual(ripplePayment.from_currency, options.source_currency);
          assert.strictEqual(ripplePayment.direction, 'to-ripple');
          assert.strictEqual(ripplePayment.state, 'invoice');

          ripplePayment.getToAddress().then(function(address) {
            assert.strictEqual(address.tag, options.destination_tag);
            assert.strictEqual(address.address, options.destination_address);

            ripplePayment.getFromAddress().then(function(address) {
              assert.strictEqual(address.tag, options.source_tag);
              assert.strictEqual(address.address, gatewayd.config.get('HOT_WALLET').address);
              done();
            });
          });
        })
        .error(function(error) {
          console.log('ERROR', error);
        });
    });
  });

  describe('incoming ripple payment', function() {

    it('should create a record and associated ripple addresses', function(done) {

      var options = {
        state                : 'invoice',
        direction            : 'from-ripple',
        source_address       : 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
        source_tag           : 9993222,
        destination_tag      : 788833,
        destination_amount   : 10,
        destination_currency : 'BTC',
        source_amount        : 15,
        source_currency      : 'XAU'
      };

      gatewayd.api.createRipplePayment(options)
        .then(function(ripplePayment) {

          assert.strictEqual(ripplePayment.to_amount, options.destination_amount);
          assert.strictEqual(ripplePayment.to_currency, options.destination_currency);
          assert.strictEqual(ripplePayment.from_amount, options.source_amount);
          assert.strictEqual(ripplePayment.from_currency, options.source_currency);
          assert.strictEqual(ripplePayment.direction, 'from-ripple');
          assert.strictEqual(ripplePayment.state, 'invoice');

          ripplePayment.getToAddress().then(function(address) {
            assert.strictEqual(address.tag, options.destination_tag);
            assert.strictEqual(address.address, gatewayd.config.get('COLD_WALLET'));

            ripplePayment.getFromAddress().then(function(address) {
              assert.strictEqual(address.tag, options.source_tag);
              assert.strictEqual(address.address, options.source_address);
              done();
            });
          });
        })
        .error(function(error) {
          console.log('ERROR', error);
        });
    });
  });
});

