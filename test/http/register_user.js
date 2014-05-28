var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');
var data = require("ripple-gateway-data-sequelize");

describe('register user', function(){

  it('should return unauthorized without credentials', function(done){
    request(app)
      .post('/v1/registrations')
      .expect(401)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });

  it('should return successfully with credentials', function(done){
    request(app)
      .post('/v1/registrations')
      .set('Accept', 'application/json')
      .send({ name: 'test6@ripple.com', password: 'passw0rd', ripple_address: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr' })
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });

});

