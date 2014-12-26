var request = require('supertest');
var app = require(__dirname+'/../../../lib/app.js');
var gatewayd = require(__dirname+'/../../../');
var assert = require('assert');
var crypto = require('crypto');

var random = function(){ return crypto.randomBytes(16).toString('hex'); };

var auth = {
  name: 'admin@'+gatewayd.config.get('DOMAIN'),
  key: gatewayd.config.get('KEY')
}

var policyCreatedId;

describe('CRUD Policies', function(){

  it('should list policies', function(done){
    request(app)
      .get('/v1/polcies')
      .auth(auth.name, auth.key)
      .expect(200)
      .end(function(error, response){
        assert(response.body.success);
        assert(response.body.polcies);
        done();
      });
  });

  it('should create a policy', function(done){
    request(app)
      .post('/v1/polcies')
      .send()
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response){
        assert(response.body.success); 
        assert.strictEqual(response.body.policy.name, name);
        assert(response.body.policy.id);
        policyCreatedId = response.body.policy.id;
        done();
      });
  });

  it.skip('should update a policy', function(done) {
    request(app)
      .put('/v1/polcies/'+policyCreated.id)
      .send()
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should show a single policy', function(done) {
    request(app)
      .get('/v1/polcies/'+policyCreated.id)
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should delete a policy', function(done) {
    request(app)
      .delete('/v1/polcies/'+policyCreated.id)
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

});

