var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../../');
var assert    = require('assert');
var crypto    = require('crypto');

var random = function(){ return crypto.randomBytes(16).toString('hex'); };

var externalAccountCreatedId;

describe('CRUD ExternalAccounts', function(){

  before(function() {
    http = supertest(gatewayd.server);
  });

  it('should list externalAccounts', function(done){
    http
      .get('/v1/external_accounts')
      .expect(200)
      .end(function(error, response){
        assert(response.body.success);
        assert(response.body.external_accounts);
        done();
      });
  });

  it('should create a externalAccount', function(done){
    http
      .post('/v1/external_accounts')
      .send({
        address: random()+'@stevenzeiler.com',
        type: 'coinbase'
      })
      .expect(200)
      .end(function(error, response){
        assert(response.body.success); 
        assert(response.body.external_account.id);
        externalAccountCreatedId = response.body.external_account.id;
        done();
      });
  });

  it.skip('should update a externalAccount', function(done) {
    http
      .put('/v1/external_accounts/'+externalAccountCreated.id)
      .send()
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should show a single externalAccount', function(done) {
    http
      .get('/v1/external_accounts/'+externalAccountCreated.id)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should delete a externalAccount', function(done) {
    http
      .delete('/v1/external_accounts/'+externalAccountCreated.id)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

});

