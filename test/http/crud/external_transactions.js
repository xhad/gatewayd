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

var externalTransactionCreatedId;

describe('CRUD ExternalTransactions', function(){

  it('should list externalTransactions', function(done){
    request(app)
      .get('/v1/external_transactions')
      .auth(auth.name, auth.key)
      .expect(200)
      .end(function(error, response){
        assert(response.body.success);
        assert(response.body.external_transactions);
        console.log(response.body.external_transactions);
        done();
      });
  });

  it('should create a externalTransaction', function(done){
    request(app)
      .post('/v1/external_transactions')
      .send()
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response){
        assert(response.body.success); 
        assert(response.body.external_transaction.id);
        externalTransactionCreatedId = response.body.external_transaction.id;
        done();
      });
  });

  it.skip('should update a externalTransaction', function(done) {
    request(app)
      .put('/v1/external_transactions/'+externalTransactionCreated.id)
      .send()
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should show a single externalTransaction', function(done) {
    request(app)
      .get('/v1/external_transactions/'+externalTransactionCreated.id)
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should delete a externalTransaction', function(done) {
    request(app)
      .delete('/v1/external_transactions/'+externalTransactionCreated.id)
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

});

