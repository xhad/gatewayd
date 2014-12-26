var assert    = require('assert');
var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../');

describe('get hot wallet balance', function(){

  before(function() {
    http = supertest(gatewayd.server);
  });

  it('should return successfully with credentials', function(done){
    http
      .get('/v1/balances')
      .expect(200)
      .end(function(error, response){
        console.log(response.body);
        done();
      });
  });
});

