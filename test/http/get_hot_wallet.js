var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../');
var assert    = require('assert');

describe('get hot wallet address', function(){

  before(function() {
    http = supertest(gatewayd.server);
  });

  it('should return successfully with credentials', function(done){
    http
      .get('/v1/config/wallets/hot')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        if (error) throw error;
        done();
      });
  });

});

