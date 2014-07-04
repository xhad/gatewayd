var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');

describe('set key', function(){

  it.skip('should return unauthorized without credentials', function(done){
    request(app)
      .post('/v1/config/key')
      .expect(401)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

  it.skip('should return successfully with credentials', function(done){
    request(app)
      .post('/v1/config/key')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

});

