var gatewayd = require(__dirname+'/../../');
var assert = require('assert');
var sinon = require('sinon');
const walletsFixture = require(__dirname+'/../fixtures/wallets.js');
var RippleRestClient = require('ripple-rest-client');

describe('Refund cold wallet', function(){

  it('should  issue currency', function(done){
    var options = {
      amount: 1,
      currency: 'SWD'
    };
    sinon.stub(RippleRestClient.prototype, 'sendAndConfirmPayment')
      .yields(null, {result: 'tesSUCCESS', destination_account: walletsFixture.COLD_WALLET, source_account: walletsFixture.HOT_WALLET.address, destination_amount: {currency: 'SWD', amount: 1}});
    gatewayd.api.refundColdWallet(options, function(error, response){
      assert.strictEqual(response.destination_account, walletsFixture.COLD_WALLET);
      assert.strictEqual(response.source_account, walletsFixture.HOT_WALLET.address);
      assert.strictEqual(response.destination_amount.amount, 1);
      assert.strictEqual(response.destination_amount.currency, 'SWD');
      done();
    });
  });

  it('should fail to refund cold wallet due to insufficient funds of issued currency', function(done){
    var options = {
      amount: 1,
      currency: 'PGP'
    };
    sinon.stub(RippleRestClient.prototype, 'sendAndConfirmPayment')
      .yields({success: false, error: 'tecPATH_DRY', error_type: 'transaction', message: 'Path could not send partial amount. Please ensure that the source_address has sufficient funds (in the source_amount currency, if specified) to execute this transaction.'}, null);
      gatewayd.api.refundColdWallet(options, function(error, response){
      assert.strictEqual(error.success, false);
      assert.strictEqual(error.error, 'tecPATH_DRY');
      assert.strictEqual(error.error_type, 'transaction');
      assert.strictEqual(error.message, 'Path could not send partial amount. Please ensure that the source_address has sufficient funds (in the source_amount currency, if specified) to execute this transaction.');
      done();
    });
  });

  afterEach(function() {
    RippleRestClient.prototype.sendAndConfirmPayment.restore();
  })
});
