var request = require('supertest');
var app = require(__dirname+'/../../../lib/app.js');
var gateway = require(__dirname+'/../../../');
var assert = require('assert');
var crypto = require("crypto");

var random = function(){ return crypto.randomBytes(16).toString('hex') }

var createdExternalAccountId;

describe('CRUD External Accounts', function(){

  it('should list external accounts', function(done){
    request(app)
      .get('/v1/external_accounts')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        if (error) {
          throw new Error(error);
          done();
        } else {
          assert(response.body.external_accounts);
          done();
        }
      });
  });

  it('should create an external account', function(done){
    var name = random();
    request(app)
      .post('/v1/external_accounts')
      .send({ user_id: 1, name: name })
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        if (error) {
          throw new Error(error);
          done();
        } else {
          assert(response.body.success); 
          assert.strictEqual(response.body.external_account.name, name);
          assert.strictEqual(response.body.external_account.user_id, 1);
          createdExternalAccountId = response.body.external_account.id;
          done();
        }
      });
  });

  it('should show a single external account', function(done){
    request(app)
      .get('/v1/external_accounts/'+createdExternalAccountId)
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        if (error) {
          throw new Error(error);
          done();
        } else {
          assert(response.body.success); 
          assert.strictEqual(response.body.external_account.id, createdExternalAccountId); 
          done();
        }
      });
  });

  it('should update an external account', function(done){
    var name = random();    
    request(app)
      .put('/v1/external_accounts/'+createdExternalAccountId)
      .send({ name: name })
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        if (error) {
          throw new Error(error);
          done();
        } else {
          assert(response.body.success); 
          assert.strictEqual(response.body.external_account.id, createdExternalAccountId); 
          assert.strictEqual(response.body.external_account.name, name); 
          done();
        }
      });
  });

  it('should delete an external account', function(done){
    request(app)
      .delete('/v1/external_accounts/'+createdExternalAccountId)
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        assert(response.body.success); 
        request(app)
          .get('/v1/external_accounts/'+createdExternalAccountId)
          .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
          .expect(204, done);
      });
  });

});

