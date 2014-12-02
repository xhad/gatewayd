var gateway = require(__dirname+'/../../');
var assert = require('assert');
var sinon = require('sinon');
const walletsFixture = require(__dirname+'/../fixtures/wallets.js');
var RippleRestClient = require('ripple-rest-client');

describe('Fund hot wallet', function() {

  it('should successfully fund account should return trust lines', function(done){
    var options = {
      amount: 1,
      currency: 'XRP'
    };
    sinon.stub(RippleRestClient.prototype, 'sendAndConfirmPayment')
      .yields(null, {destination_account: walletsFixture.COLD_WALLET, source_account: walletsFixture.HOT_WALLET.address, result: 'tesSUCCESS'});
    gateway.api.fundHotWallet(options, function(error, response){
      assert.strictEqual(response.destination_account, walletsFixture.COLD_WALLET);
      assert.strictEqual(response.source_account, walletsFixture.HOT_WALLET.address);
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
    sinon.stub(RippleRestClient.prototype, 'sendAndConfirmPayment')
      .yields({error: 'Invalid secret', error_type: 'transaction', success: false}, null);
    gateway.api.fundHotWallet(options, function(error, response){
      assert(error);
      assert(!response);
      assert.strictEqual(error.success, false);
      assert.strictEqual(error.error, 'Invalid secret');
      assert.strictEqual(error.error_type, 'transaction');
      done();
    });

  });

  afterEach(function() {
    RippleRestClient.prototype.sendAndConfirmPayment.restore();
  });
});
