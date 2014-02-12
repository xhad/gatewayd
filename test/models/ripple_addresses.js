var User = require('../../app/models/user.js');
var testUtils = require('../utils.js');
var assert = require('assert');

describe('RippleAddress', function(){
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

  it('should have a method to send payments', function(done){
    user.hostedAddress(function(err, address) {
      if (err) { throw new Error(err) };
      assert(typeof address.sendPayment == 'function');
      done();
    });
  }); 

  it('should have a method to record received payments', function(done){
    user.hostedAddress(function(err, address) {
      if (err) { throw new Error(err) };
      assert(typeof address.recordReceivedPayment == 'function');
      done();
    });
  });

  it('should have a method to update received payments', function(done){
    user.hostedAddress(function(err, address) {
      if (err) { throw new Error(err) };
      assert(typeof address.updateSentPayment == 'function');
      done();
    });
  });
});
