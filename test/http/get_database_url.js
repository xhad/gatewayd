var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');

describe('get database url', function(){

  it('should return unauthorized without credentials', function(done){
    request(app)
      .get('/v1/config/database')
      .expect(401)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

  it('should return successfully with credentials', function(done){
    request(app)
      .get('/v1/config/database')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

});

