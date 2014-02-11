var RippleGateway = require('../../lib/http_client.js').Gateway;
var crypto = require('crypto');
var assert = require('assert');

function rand() {
  return crypto.randomBytes(32).toString('hex');
}

describe('External Accounts', function(){
  before(function(done){
    user = {};
    client = new RippleGateway.Client({
      api: 'http://localhost:4000'
    });
    client.name = rand();
    client.secret = rand();
    client.createUser({}, function(err, resp){
      user = resp;
      done();
    });
  });
  
  describe('user', function(){

    it('should create an external account on behalf of a user', function(done){
      // POST /external_accounts  
      client.createExternalAccount({ name: rand() }, function(err, externalAccount){
        done();
      })
    });

    it.skip('should not create an external account with same name for same user', function(done){
      // POST /external_accounts  
      var name = rand();
      client.createExternalAccount({ name: name }, function(err, externalAccount){
        var id = externalAccount.id;
        client.createExternalAccount({ name: name }, function(err, externalAccount){
          done();
        });
        done();
      });
      done();
    });

    it.skip('should list external accounts of a user for that user', function(done){
      // GET /external_accounts  
      client.getExternalAccounts({}, function(err, accounts){
        assert(accounts); 
        done();
      });
    });

  });

  describe('admin', function(){

    it.skip('should create an external account given a user', function(){
      // POST /external_accounts 
      done();
    });

    it.skip('should list external accounts of a user given a user', function(){
      // POST /external_accounts 
      done();
    });

    it.skip('should list all external accounts of all users', function(){
      // POST /external_accounts 
      done();
    });

  }); 

});
