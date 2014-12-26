var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../');
var assert    = require('assert');

describe('set key', function(){

  before(function() {
    http = supertest(gatewayd.server);
  });

  it.skip('should return successfully with credentials', function(done){
    http
      .post('/v1/config/key')
      .auth('admin@'+gatewayd.config.get('DOMAIN'), gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
});

