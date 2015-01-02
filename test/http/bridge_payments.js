var gatewayd = require(__dirname+'/../../');
var http     = require('supertest')(gatewayd.server);
var assert   = require('assert');

if (gatewayd.features.isEnabled('gateway-transactions')) {

  describe('Accepting Bridge Quotes', function() {

    it('should return a Gateway Transaction to ripple', function(done) {

      http
        .post('/v1/bridge_payments')
        .auth(undefined, gatewayd.config.get('KEY'))
        .send({
          direction: 'to-ripple',
          state    : 'invoice',
          ripple: {
            destination_address  : 'rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe',
            destination_amount   : 100,
            destination_currency : 'XAG',
            source_currency      : 'BTC',
            source_amount        : 14
          },
          external: {
            source_address       : 'acct:me@stevenzeiler.com',
            destination_address  : 'acct:gateway@zenterp.co',
            destination_currency : 'BTC',
            destination_amount   : 15
          }
        })
        .end(function(error, response) {
          assert(response.body.success);
          assert(response.body.gateway_transaction.id);
          assert(response.body.gateway_transaction.uid);
          assert.strictEqual(response.body.gateway_transaction.ripplePayment.to_amount, 100);
          assert.strictEqual(response.body.gateway_transaction.ripplePayment.to_currency, 'XAG');
          assert.strictEqual(response.body.gateway_transaction.externalPayment.destination_currency, 'BTC');
          assert.strictEqual(response.body.gateway_transaction.externalPayment.destination_amount, 15);
          done();
        });
    });

    it('should return a Gateway Transaction from ripple', function(done) {

      http
        .post('/v1/bridge_payments')
        .auth(undefined, gatewayd.config.get('KEY'))
        .send({
          direction: 'from-ripple',
          state    : 'invoice',
          ripple: {
            source_address       : 'rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe',
            source_currency      : 'BTC',
            source_amount        : 14,
            destination_amount   : 100,
            destination_currency : 'XAG',
            destination_address  : 'rG6FZ31hDHN1K5Dkbma3PSB5uVCuVVRzfn',
            destination_tag      : 992993933
          },
          external: {
            destination_address  : 'acct:me@stevenzeiler.com',
            destination_amount   : 15,
            destination_currency : 'BTC',
            source_address       : 'acct:gateway',
            source_currency      : 'BTC',
            source_amount        : 15.002
          }
        })
        .end(function(error, response) {
          assert(response.body.success);
          assert(response.body.gateway_transaction.id);
          assert(response.body.gateway_transaction.uid);
          assert.strictEqual(response.body.gateway_transaction.ripplePayment.to_amount, 100);
          assert.strictEqual(response.body.gateway_transaction.ripplePayment.to_currency, 'XAG');
          assert.strictEqual(response.body.gateway_transaction.externalPayment.destination_currency, 'BTC');
          assert.strictEqual(response.body.gateway_transaction.externalPayment.destination_amount, 15);
          done();
        });
    });

  });

}

