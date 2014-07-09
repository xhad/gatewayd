var gateway = require(__dirname+'/../../');
var assert = require('assert');

describe('Get trust lines', function() {
  it('should get trust lines between hot wallet and cold wallet', function(done){
    var options = {
      hotWallet: gateway.config.get('HOT_WALLET').address,
      coldWallet: gateway.config.get('COLD_WALLET')
    };

    gateway.api.getTrustLines(function(error, response){
      assert.strictEqual(response[0].account, options.hotWallet);
      assert.strictEqual(response[0].counterparty, options.coldWallet);
      done();
    });
  });

  //set hot wallet to an invalid ripple address

  it('should fail because of invalid hot wallet address', function(done){
    var options = {
      hotWallet: 'r1234...e',
      coldWallet: gateway.config.get('COLD_WALLET')
    };

    gateway.api.getTrustLines(function(error, response){
      assert.notStrictEqual(response[0].account, options.hotWallet);
      assert.strictEqual(response[0].counterparty, options.coldWallet);
      done();
    });
  });
});
