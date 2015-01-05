var assert          = require('assert');
var sinon           = require('sinon');
var gatewayd        = require(__dirname+'/../../');
var walletsFixture  = require(__dirname+'/../fixtures/wallets.js');

describe('api.createRipplePayment', function() {

  before(function() {
    var configStub = sinon.stub(gatewayd.config, 'get');
    configStub.withArgs('HOT_WALLET').returns(walletsFixture.HOT_WALLET);
    configStub.withArgs('COLD_WALLET').returns(walletsFixture.COLD_WALLET);
  });

  after(function() {
    gatewayd.config.get.restore();
  });

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
          done(error);
        });
    });
  });

  describe('incoming ripple payment', function() {

    it('should create a record and associated ripple addresses', function(done) {

      var options = {
        state                : 'invoice',
        direction            : 'from-ripple',
        source_address       : walletsFixture.COLD_WALLET,
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
          done(error);
        });
    });
  });
});

