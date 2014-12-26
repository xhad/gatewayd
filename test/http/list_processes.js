var supertest = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gatewayd = require(__dirname+'/../../');

describe('list processes', function(){

  it('should return successfully with credentials', function(done){
    http
      .get('/v1/processes')
      .auth('admin@'+gatewayd.config.get('DOMAIN'), gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
});

