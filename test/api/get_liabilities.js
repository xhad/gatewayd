var chai = require('chai');
var assert = chai.assert;
var config = require(__dirname+'/../../config/environment');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
var Client = require('ripple-rest-client');
var getLiabilities = require(__dirname+'/../../lib/api/get_liabilities');
var getAccountBalanceFixture = require(__dirname+'/../fixtures/liabilities');

describe('get_liabilities', function() {
  chai.use(chaiAsPromised);

  it('should aggregate liabilities by currency', function(done){
    var stub = sinon.stub(Client.prototype, 'getAccountBalance')
                  .yields(null, getAccountBalanceFixture.valid);

    getLiabilities(function(err, resp) {
      if (err) {
        done(err);
      } else {

        // fixture has multiple entries of USD.
        // test if we are correctly aggregating the data
        // the data was set up so USD total === 20
        assert.equal(resp.balances[1].value, 20);
        assert.equal(resp.balances[1].currency, 'USD');
        stub.restore();
        done();
      }
    });
  });

  it('should not aggregate liabilities by currency if value or currency not set', function(done){
    var stub = sinon.stub(Client.prototype, 'getAccountBalance')
                  .yields(null, getAccountBalanceFixture.invalid);

    getLiabilities(function(err, resp) {
      if (err) {
        done(err);
      } else {

        // purposely using broken data.
        // object should be returned as it was input
        assert.deepEqual(getAccountBalanceFixture.invalid, resp);
        stub.restore();
        done();
      }
    });
  });
});
