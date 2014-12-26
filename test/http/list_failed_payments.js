var supertest = require('supertest');
var assert    = require('assert');
var gatewayd  = require(__dirname+'/../../');
var http      = supertest(gatewayd.server);

describe('list failed payments', function(){

  it('should return successfully with credentials', function(done){
    http
      .get('/v1/payments/failed')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

});

