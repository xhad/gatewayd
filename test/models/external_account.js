var User = require('../../app/models/user.js');
var testUtils = require('../utils.js');
var assert = require('assert');

describe('ExternalAccount', function(){
  before(function(done){
    User.createWithSalt({ name: testUtils.rand(), password: testUtils.rand() }, function(err, createdUser){
      if (err) {
        throw new Error(err);
      } else {
        user = createdUser;
      }
      done();
    });
  });

  it('should create an external account for a user', function(done){
    user.createExternalAccount('Coinbase', function(err, account){
      if (err) { throw new Error(err) }
      assert(account.user_id == user.id);
      assert(account.name == 'Coinbase');
      done()
    });
  }); 

  it.skip('should should enforce name uniqeness scoped to a user', function(done){
    user.createExternalAccount('Coinbase', function(err, account){
      assert(err);
      assert(!account);
      done()
    });
  });
});
