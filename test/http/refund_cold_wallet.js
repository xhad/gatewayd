var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');

describe('refund cold wallet', function(){

  it('should return unauthorized without credentials', function(done){
    request(app)
      .post('/v1/wallets/cold/refund')
      .expect(401)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });

  it('should return successfully with credentials', function(done){
    this.timeout(4000)
    request(app)
      .post('/v1/wallets/cold/refund')
      .set('Accept', 'application/json')
      .send({ currency: 'SWG', amount: 1 })
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });

});

