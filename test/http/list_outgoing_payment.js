var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../');
var assert    = require('assert');
var http      = supertest(gatewayd.server);

describe('list outgoing payments', function(){

  it('should return successfully with credentials', function(done){
    http
      .get('/v1/payments/outgoing')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
});

