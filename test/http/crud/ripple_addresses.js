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

var rippleAddressCreatedId;

describe('CRUD RippleAddresses', function(){

  it('should list rippleAddresses', function(done){
    request(app)
      .get('/v1/ripple_addresses')
      .auth(auth.name, auth.key)
      .expect(200)
      .end(function(error, response){
        assert(response.body.success);
        assert(response.body.ripple_addresses);
        console.log(response.body.ripple_addresses);
        done();
      });
  });

  it('should create a rippleAddress', function(done){
    request(app)
      .post('/v1/ripple_addresses')
      .send()
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response){
        assert(response.body.success); 
        assert(response.body.ripple_address.id);
        rippleAddressCreatedId = response.body.ripple_address.id;
        done();
      });
  });

  it.skip('should update a rippleAddress', function(done) {
    request(app)
      .put('/v1/ripple_addresses/'+rippleAddressCreated.id)
      .send()
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should show a single rippleAddress', function(done) {
    request(app)
      .get('/v1/ripple_addresses/'+rippleAddressCreated.id)
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should delete a rippleAddress', function(done) {
    request(app)
      .delete('/v1/ripple_addresses/'+rippleAddressCreated.id)
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

});

