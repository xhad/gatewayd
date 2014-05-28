var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');

describe('set last payment hash', function(){

  it('should return unauthorized without credentials', function(done){
    request(app)
      .post('/v1/config/last_payment_hash')
      .expect(401)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });

  it('should return successfully with credentials', function(done){
    request(app)
      .post('/v1/config/last_payment_hash')
      .send({ payment_hash :'4394DB1CDB591CFE697C50EAB974E7BDD6826F18B8660DACC50A88EEC98E0CD8' })
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });

});

