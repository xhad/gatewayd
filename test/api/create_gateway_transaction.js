var gatewayd = require(__dirname+'/../../');
var assert   = require('assert');

if (gatewayd.features.isEnabled('gateway-transactions')) {
  describe('api.createGatewayTransaction', function() {

      it('should record a gateway transaction to ripple in invoice state', function(done) {

        gatewayd.api.createGatewayTransaction({
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
        .then(function(gatewayTransaction) {
          assert.strictEqual(gatewayTransaction.direction, 'to-ripple');
          assert.strictEqual(gatewayTransaction.state, 'invoice');

          assert.strictEqual(gatewayTransaction.ripplePayment.state,       'invoice');
          assert.strictEqual(gatewayTransaction.ripplePayment.direction,   'to-ripple');

          assert.strictEqual(gatewayTransaction.externalPayment.deposit, true);
          assert.strictEqual(gatewayTransaction.externalPayment.status, 'invoice');

          gatewayTransaction.externalPayment.getToAccount().then(function(toAccount) {
            assert.strictEqual(toAccount.type, 'acct');
            assert.strictEqual(toAccount.address, 'gateway@zenterp.co');

            gatewayTransaction.externalPayment.getFromAccount().then(function(fromAccount) {
              assert.strictEqual(fromAccount.type, 'acct');
              assert.strictEqual(fromAccount.address, 'me@stevenzeiler.com');
              done();
            });
          });
        })
        .error(function(error) {
          console.log('ERROR', error);
        });
      });

      it('should record a gateway transaction from ripple in invoice state', function(done) {

        gatewayd.api.createGatewayTransaction({
          direction: 'from-ripple',
          state    : 'invoice',
          ripple: {
            source_address       : 'rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe',
            destination_amount   : 100,
            destination_currency : 'XAG',
            source_currency      : 'BTC',
            source_amount        : 14
          },
          external: {
            source_address       : 'acct:gateway',
            destination_address  : 'acct:me@stevenzeiler.com',
            destination_currency : 'BTC',
            destination_amount   : 15
          }
        })
        .then(function(gatewayTransaction) {
          assert.strictEqual(gatewayTransaction.direction, 'from-ripple');
          assert.strictEqual(gatewayTransaction.state, 'invoice');

          assert.strictEqual(gatewayTransaction.ripplePayment.state,       'invoice');
          assert.strictEqual(gatewayTransaction.ripplePayment.direction,   'from-ripple');

          assert.strictEqual(gatewayTransaction.externalPayment.deposit, false);
          assert.strictEqual(gatewayTransaction.externalPayment.status, 'invoice');

          gatewayTransaction.externalPayment.getToAccount().then(function(toAccount) {
            assert.strictEqual(toAccount.type, 'acct');
            assert.strictEqual(toAccount.address, 'me@stevenzeiler.com');

            gatewayTransaction.externalPayment.getFromAccount().then(function(fromAccount) {
              assert.strictEqual(fromAccount.type, 'acct');
              assert.strictEqual(fromAccount.address, 'gateway');
              done();
            });
          });
        })
        .error(function(error) {
          console.log('ERROR', error);
        });
     });
  });
}

