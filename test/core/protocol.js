var gatewayd = require(__dirname+'/../../');
var assert   = require('assert');

describe('Gateway Services Protocol', function() {

  it('should throw an error if not implemented', function(done) {
    gatewayd.protocol.external.outbound.quote({
      destination: 'me@stevenzeiler.com',
      amount: 0.5,
      currency: 'BTC'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'must be implemented');
      done();
    });
  });

  it('should override the default external outbound quote', function(done) {

    gatewayd.protocol.external.outbound.extend({
      quote: function(options, resolve, reject) {
        if (gatewayd.validator.isEmail(options.destination)) {
          if (options.currency === 'BTC') {
            if (options.amount <= 0.1) {
              resolve({
                destination: options.destination,
                amount: options.amount * 1.01,
                currency: options.currency
              });
            } else {
              reject(new Error('amount must be less than 0.1'));
            }
          } else {
            reject(new Error('currency must be BTC'));
          }
        } else {
          reject(new Error('destination must be an email address'));
        }
      }
    });

    gatewayd.protocol.external.outbound.quote({
      destination: 'me@stevenzeiler.com',
      amount: 0.05,
      currency: 'BTC'
    }).then(function(quote) {
      assert.strictEqual(quote.amount, 0.0505);
      assert.strictEqual(quote.currency, 'BTC');
      done();
    });

  });

  it('should reject according to the protocol extension', function(done) {

    gatewayd.protocol.external.outbound.quote({
      destination: 'me@stevenzeiler.com',
      amount: 0.5,
      currency: 'BTC'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'amount must be less than 0.1');

      gatewayd.protocol.external.outbound.quote({
        destination: 'ripple:stevenzeiler',
        amount: 0.1,
        currency: 'BTC'
      })
      .error(function(error) {
        assert.strictEqual(error.message, 'destination must be an email address');
        done();
      });
    });
  });

});

