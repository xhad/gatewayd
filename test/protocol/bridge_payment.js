var gatewayd      = require(__dirname+'/../../');

if (gatewayd.features.isEnabled('bridge-payments')) {

  var BridgePayment = require(__dirname+'/../../lib/protocol/bridge_payment');

  describe('Bridge Payment', function() {

    before(function() {
      gatewayd.protocol.external.outbound.extend({
        quote: function(options, resolve, reject) {
          resolve(options);
        }
      });
    });

    it('should commit to an outbound bridge payment', function(done) {

      BridgePayment.commit({
        direction: 'from-ripple',
        external: {
          address: 'me@stevenzeiler.com',
          amount: 0.1,
          currency: 'BTC'
        }
      })
      .then(function(payment) {
        console.log(payment);
        done();
      })
      .error(function(error) {
        console.log('ERROR', error);
      });
    });
  });
}

