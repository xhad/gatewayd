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
      address.sendPayment({
        to_amount: 1,
        to_issuer: address.address,
        to_currency: 'USD',
        to_address_id: 1
      }, function(err, payment) {
        if (err) { throw new Error(err) };
        assert(payment.id > 0);
        assert(payment.from_address_id == address.id);
        done();
      });
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
