var supertest = require('supertest');
var assert    = require('assert')
var gatewayd  = require(__dirname+'/../../');
var http      = supertest(gatewayd.server);

describe('get key', function(){

  it('should return successfully with credentials', function(done){
    http
      .get('/v1/config/key')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

});

