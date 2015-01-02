var gatewayd = require(__dirname+'/../../');

if (gatewayd.features.isEnabled('gateway-transactions')) {
  describe('api.constructGatewayTransaction', function() {

      it('should take direction, ripple, and external as input', function(done) {

        gatewayd.api.constructGatewayTransaction({
          direction: 'to-ripple',
          ripple: {
            destination_address  : 'rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe',
            destination_amount   : 100,
            destination_currency : 'XAG',
            source_currency      : 'BTC'
          },
          external: {
            source_address       : 'acct:me@stevenzeiler.com',
            destination_address  : 'acct:gateway@zenterp.co',
            destination_currency : 'BTC',
            destination_amount   : 15
          }
        })
        .then(function(gatewayTransaction) {
          assert.strictEqual(gatewayTransaction.rippleTransaction.state,       'invoice');
          assert.strictEqual(gatewayTransaction.rippleTransaction.direction,   'outgoing');

          assert.strictEqual(gatewayTransaction.externalTransaction.direction, 'incoming');
          assert.strictEqual(gatewayTransaction.externalTransaction.state,     'invoice');

          assert.strictEqual(gatewayTransaction.externalTransaction.toAddress.type,         'acct');
          assert.strictEqual(gatewayTransaction.externalTransaction.toAddress.identifier,   'gateway@zenterp.co');
          assert.strictEqual(gatewayTransaction.externalTransaction.fromAddress.type,       'acct');
          assert.strictEqual(gatewayTransaction.externalTransaction.fromAddress.identifier, 'me@stevenzeiler.com');
      
          assert.strictEqual(gatewayTransaction.direction, 'to-ripple');
          done();
        })
        .error(function(error) {
          console.log('ERROR', error);
        });
      });
  });
}

