var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');
var data = require(__dirname+'/../../lib/data/');

describe('register user', function(){

  it('should return unauthorized without credentials', function(done){
    request(app)
      .post('/v1/registrations')
      .expect(401)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

  it('should return successfully with credentials', function(done){
    var testUser = { name: 'testUser@ripple.com', password: 'passw0rd', ripple_address: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr' };

    request(app)
      .post('/v1/registrations')
      .set('Accept', 'application/json')
      .send(testUser)
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        //remove test username to avoid test fail due to duplicate username
        data.models.users.destroy({ name: testUser.name }).complete(function(err, resp){
          if(err){
            logger.error('username destroy error:: ', err);
          } else {
            logger.info('username destroyed:: ', resp);
          }
          done();
        });
      });
  });

});

