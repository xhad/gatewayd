var assert = require('assert');
var testUtils = require("../utils.js");
var User = require('../../app/models/user.js');
var async = require('async');

describe('User', function(){
  it('should be created with password hash and salt', function(done){
    var name = testUtils.rand();
    User.createWithSalt({ name: name, password: testUtils.rand() }, function(err, user){
      if (err) { throw new Error(err) };
      assert(user.id > 0);
      assert(user.name == name);
      assert(!user.admin);
      assert(user.salt);
      assert(user.password_hash);
      done();
    });
  });

  it('should create a hosted wallet by default for a user', function(done){
    User.createWithSalt({ name: testUtils.rand(), password: testUtils.rand() }, function(err, user){
      if (err) { throw new Error(err) };
      user.hostedAddress(function(err, address){
        if (err) { throw new Error(err) };
        assert(address.id > 0);
        assert(address.user_id == user.id);
        assert(address.type == 'hosted');
        done();
      });
    });
  });
});
