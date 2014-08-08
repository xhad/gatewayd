var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');

describe('start gatewayd', function(){

  it('should return unauthorized without credentials', function(done){
    request(app)
      .post('/v1/start')
      .expect(401)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

  it('should return successfully with credentials', function(done){
    this.timeout(5000);
    request(app)
      .post('/v1/start')
      .send({ processes: ['deposits', 'incoming', 'withdrawals', 'outgoing', 'server'] })
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

});

