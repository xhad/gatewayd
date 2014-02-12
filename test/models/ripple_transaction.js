var User = require('../../app/models/user.js');
var RippleTransaction = require('../../app/models/ripple_transaction.js');
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
    RippleTransaction.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 1,
      from_amount: 1,
      to_currency: "MXN",
      from_currency: 1,
      to_issuer: 'rBHHZLNAJGNCP3CV7Kcbg4tYUDXrz3VsfL',
      from_issuer: 'rBHHZLNAJGNCP3CV7Kcbg4tYUDXrz3VsfL'
    }).complete(function(err, payment) {
      if (err) { throw new Error(err) };
      assert(payment.id > 0);
      done();
    });
  }); 

});
