var gatewayd  = require(__dirname+'/../../');
var supertest = require('supertest');
var assert    = require('assert');

describe('get domain', function(){

  before(function() {
    http = supertest(gatewayd.server);
  });

  it('should return successfully with credentials', function(done){
    http
      .get('/v1/config/domain')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        assert(!error);
        done();
      });
  });
});

