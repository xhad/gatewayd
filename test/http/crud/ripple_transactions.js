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

var rippleTransactionCreatedId;

describe('CRUD RippleTransactions', function(){

  it('should list rippleTransactions', function(done){
    request(app)
      .get('/v1/ripple_transactions')
      .auth(auth.name, auth.key)
      .expect(200)
      .end(function(error, response){
        assert(response.body.success);
        assert(response.body.ripple_transactions);
        console.log(response.body.ripple_transactions);
        done();
      });
  });

  it('should create a rippleTransaction', function(done){
    request(app)
      .post('/v1/ripple_transactions')
      .send()
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response){
        assert(response.body.success); 
        assert(response.body.ripple_transaction.id);
        rippleTransactionCreatedId = response.body.ripple_transaction.id;
        done();
      });
  });

  it.skip('should update a rippleTransaction', function(done) {
    request(app)
      .put('/v1/ripple_transactions/'+rippleTransactionCreated.id)
      .send()
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should show a single rippleTransaction', function(done) {
    request(app)
      .get('/v1/ripple_transactions/'+rippleTransactionCreated.id)
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should delete a rippleTransaction', function(done) {
    request(app)
      .delete('/v1/ripple_transactions/'+rippleTransactionCreated.id)
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

});

