var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../');
var assert    = require('assert');

describe('list queued deposits', function(){

  before(function() {
    http = supertest(gatewayd.server);
  });

  it('should return successfully with credentials', function(done){
    http
      .get('/v1/deposits')
      .auth('admin@'+gatewayd.config.get('DOMAIN'), gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(err){
      
        if (err) throw err;
        done();
      });
  });
});

