var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../');
var http      = supertest(gatewayd.server);


describe('get ripple-rest url', function(){

  it('should return successfully with credentials', function(done){
    http
      .get('/v1/config/ripple/rest')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
});

