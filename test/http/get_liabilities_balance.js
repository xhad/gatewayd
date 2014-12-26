var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../');
var assert    = require('assert');
var http      = supertest(gatewayd.server);

describe('get cold wallet balance', function(){

  it('should return successfully with credentials', function(done){
    http
      .get('/v1/liabilities')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        if (error) throw error;
        done();
      });
  });

});

