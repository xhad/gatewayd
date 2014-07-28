var gateway = require(__dirname+'/../../');
var assert = require('assert');

var SECRET = process.env.RIPPLE_ACCOUNT_SECRET;

describe('Fund hot wallet', function() {
  if(SECRET) {
    it('should successfully fund account should return trust lines', function(done){
      this.timeout(5000);
      var options = {
        amount: 1,
        currency: 'XRP',
        secret: SECRET
      };

      gateway.api.fundHotWallet(options, function(error, response){
        assert.strictEqual(gateway.config.get('HOT_WALLET').address, response.destination_account);
        assert.strictEqual(gateway.config.get('COLD_WALLET'), response.source_account);
        assert.strictEqual(response.result, 'tesSUCCESS');
        done();
      });
    });


    it('should fail due to invalid secret', function(done){
      this.timeout(5000);
      var options = {
        amount: 1,
        currency: 'XRP',
        secret: 'invalidSecret'
      };

      gateway.api.fundHotWallet(options, function(error, response){
        assert.strictEqual(error, 'Please ensure the address and secret correspond to a valid account that has a positive XRP balance.');
        done();
      });

    });
  } else {
    it.skip('should successfully fund account');
  }

});
