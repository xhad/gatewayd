var gateway = require(__dirname+'/../../');
var assert = require('assert');

var SECRET = process.env.RIPPLE_ACCOUNT_SECRET;

describe('Issue Currency', function(){

  if (SECRET){
    it('should successfully issue currency', function(done){
      this.timeout(5000);
      gateway.api.issueCurrency(1, 'SWD', SECRET, function(error, response){
        assert.strictEqual(response.source_account, gateway.config.get('COLD_WALLET'));
        assert.strictEqual(response.destination_account, gateway.config.get('HOT_WALLET').address);
        assert.strictEqual(response.destination_amount.currency, 'SWD');
        done();
      });
    });

    it('should fail to issue currency due to insufficient funds of issued currency', function(done){
      this.timeout(5000);
      gateway.api.issueCurrency(1, 'PGP', SECRET, function(error, response){
        assert.strictEqual(error, 'Path could not send partial amount. Please ensure that the source_address has sufficient funds (in the source_amount currency, if specified) to execute this transaction.');
        assert.strictEqual(typeof response, 'undefined');
        done();
      });
    });
  } else {
    it.skip('skip test');
  }

});