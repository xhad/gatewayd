var gateway = require(__dirname+'/../../');
var assert = require('assert');

describe('Set trust lines', function(){
  it('should set a line of trust from the gateway hot wallet to the gateway cold wallet', function(done){
    this.timeout(5000);
    var amount = 100;
    var currency = 'TIT';

    gateway.api.setTrustLine(currency, amount, function(error, response){
      assert.strictEqual(error, null);
      assert.strictEqual(response.account, gateway.config.get('HOT_WALLET').address);
      assert.strictEqual(response.counterparty, gateway.config.get('COLD_WALLET'));
      assert.strictEqual(response.limit, amount.toString());
      assert.strictEqual(response.currency, currency);
      done();
    });
  });

  it('should fail due to missing amount', function(done){
    var amount = 100;
    var currency = '';

    gateway.api.setTrustLine(currency, amount, function(error, response) {
      assert.strictEqual(response, undefined);
      done();
    });
  });
});
