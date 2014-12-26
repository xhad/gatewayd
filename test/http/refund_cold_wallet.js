var supertest = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gatewayd = require(__dirname+'/../../');

describe('refund cold wallet', function(){

  it.skip('should return successfully with credentials', function(done){
    this.timeout(4000);
    http
      .post('/v1/wallets/cold/refund')
      .send({ currency: 'SWG', amount: 1 })
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
});

