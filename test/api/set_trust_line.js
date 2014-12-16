var gatewayd          = require(__dirname+'/../../');
var assert            = require('assert');
var RippleRestClient  = require('ripple-rest-client');
var sinon             = require('sinon');
const walletsFixture  = require(__dirname+'/../fixtures/wallets.js');

describe('Set trust lines', function(){

  before(function(){
    var configStub = sinon.stub(gatewayd.config, 'get');
    configStub.withArgs('HOT_WALLET').returns(walletsFixture.HOT_WALLET);
  });

  it('should set a line of trust from the gateway hot wallet to the gateway cold wallet', function(done){
    var amount    = 100;
    var currency  = 'POP';

    var rippleRestStub = sinon.stub(RippleRestClient.prototype, 'setTrustLines');
    rippleRestStub.yields(null, {account: walletsFixture.HOT_WALLET.address, counterparty: walletsFixture.COLD_WALLET, limit: amount, currency: currency});
    gatewayd.api.setTrustLine({currency: currency, amount: amount}, function(error, response){
      if (error) {
        done(error);
      }
      assert.strictEqual(error, null);
      assert.strictEqual(response.account, walletsFixture.HOT_WALLET.address);
      assert.strictEqual(response.counterparty, walletsFixture.COLD_WALLET);
      assert.strictEqual(response.limit, amount);
      assert.strictEqual(response.currency, currency);
      rippleRestStub.restore();
      done();
    });
  });

  it('should fail due to missing amount', function(done){
    var amount    = 100;
    var currency  = '';

    var rippleRestStub = sinon.stub(RippleRestClient.prototype, 'setTrustLines');
    rippleRestStub.yields({success: false, error: 'Parameter missing: trustline.currency', error_type: 'invalid_request'}, null);

    gatewayd.api.setTrustLine({currency: currency, amount: amount}, function(error, response) {
      assert(error);
      assert(!response);
      assert.strictEqual(error.success, false);
      assert.strictEqual(error.error, 'Parameter missing: trustline.currency');
      assert.strictEqual(error.error_type, 'invalid_request');
      rippleRestStub.restore();
      done();
    });
  });

  after(function(){
    gatewayd.config.get.restore();
  });

});
