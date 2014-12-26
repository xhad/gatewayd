var assert    = require('assert');
var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../');

describe('generate wallet', function(){

  before(function() {
    http = supertest(gatewayd.server);
  });

  it('should return a newly generated wallet', function(done){
    http
      .post('/v1/wallets/generate')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        assert(gatewayd.validator.isRippleAddress(response.body.wallet.address));
        done();
      });
  });
});

