var gatewayd = require(__dirname+'/../../');
var assert = require('assert');
var RippleRestClient = require('ripple-rest-client');
var sinon = require('sinon');
const walletsFixture = require(__dirname+'/../fixtures/wallets.js');

describe('Set trust lines', function(){

  it('should set a line of trust from the gateway hot wallet to the gateway cold wallet', function(done){
    var amount = 100;
    var currency = 'TIT';
    sinon.stub(RippleRestClient.prototype, 'setTrustLines')
      .yields(null, {account: walletsFixture.HOT_WALLET.address, counterparty: walletsFixture.COLD_WALLET, limit: amount, currency: currency});
    gatewayd.api.setTrustLine({currency: currency, amount: amount}, function(error, response){
      if (error) {
        done(error);
      }
      assert.strictEqual(error, null);
      assert.strictEqual(response.account, walletsFixture.HOT_WALLET.address);
      assert.strictEqual(response.counterparty, walletsFixture.COLD_WALLET);
      assert.strictEqual(response.limit, amount);
      assert.strictEqual(response.currency, currency);
      done();
    });
  });

  it('should fail due to missing amount', function(done){
    var amount = 100;
    var currency = '';
    sinon.stub(RippleRestClient.prototype, 'setTrustLines')
      .yields({success: false, error: 'Parameter missing: trustline.currency', error_type: 'invalid_request'}, null);
    gatewayd.api.setTrustLine({currency: currency, amount: amount}, function(error, response) {
      assert(error);
      assert(!response);
      assert.strictEqual(error.success, false);
      assert.strictEqual(error.error, 'Parameter missing: trustline.currency');
      assert.strictEqual(error.error_type, 'invalid_request');
      done();
    });
  });

  afterEach(function() {
    RippleRestClient.prototype.setTrustLines.restore();
  })
});
