var RippleRestClient = require('ripple-rest-client');
const walletsFixture = require(__dirname+'/../fixtures/wallets.js');
var gateway = require(__dirname+'/../../');
var assert = require('assert');
var sinon = require('sinon');

describe('Get trust lines', function() {

  it('should get trust lines between hot wallet and cold wallet', function(done){
    var options = {
      hotWallet: walletsFixture.HOT_WALLET.address,
      coldWallet: walletsFixture.COLD_WALLET
    };
    sinon.stub(RippleRestClient.prototype, 'getTrustLines')
      .yields(null, [{account: walletsFixture.HOT_WALLET.address, counterparty: walletsFixture.COLD_WALLET}]);
    gateway.api.getTrustLines(options, function(error, response){
      if (error) {
        done(error);
      }
      assert.strictEqual(response[0].account, walletsFixture.HOT_WALLET.address);
      assert.strictEqual(response[0].counterparty, walletsFixture.COLD_WALLET);
      done();
    });
  });

  it('should fail because of invalid hot wallet address', function(done){
    var options = {
      hotWallet: 'r1234...e',
      coldWallet: gateway.config.get('COLD_WALLET')
    };
    sinon.stub(RippleRestClient.prototype, 'getTrustLines')
      .yields({success: false, error: 'Parameter is not a valid Ripple address: account', error_type: 'invalid_request'}, null);
    gateway.api.getTrustLines(options, function(error, response){
      assert(error);
      assert(!response);
      assert.strictEqual(error.success, false);
      assert.strictEqual(error.error, 'Parameter is not a valid Ripple address: account');
      assert.strictEqual(error.error_type, 'invalid_request');
      done();
    });
  });

  afterEach(function(done) {
    RippleRestClient.prototype.getTrustLines.restore();
    done();
  })
});
