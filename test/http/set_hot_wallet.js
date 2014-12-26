var assert    = require('assert');
var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../');

describe('set hot wallet', function(){

  before(function() {
    http = supertest(gatewayd.server);
  });

  it('should set the hot wallet in config and databse', function(done){
    http
      .post('/v1/config/wallets/hot')
      .auth(undefined, gatewayd.config.get('KEY'))
      .send({
        address: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr',
        secret: 'ssuBBapjuJ2hE5wto254aNWERa8VV'
      })
      .expect(200)
      .end(function(error, response){
        assert.strictEqual(response.body.HOT_WALLET.address, 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr');
        done();
      });
  });

});

