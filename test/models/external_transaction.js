var User = require('../../app/models/user.js');
var ExternalTransaction = require('../../app/models/external_transaction.js');
var testUtils = require('../utils.js');
var assert = require('assert');

describe('ExternalTransaction', function(){
  before(function(done){
    User.createWithSalt({ name: testUtils.rand(), password: testUtils.rand() }, function(err, createdUser){
      if (err) {
        throw new Error(err);
      } else {
        user = createdUser;
        user.createExternalAccount('Wells Fargo', function(err, account){
          if (err) { throw new Error(err) }
          externalAccount = account;
          done()
        });
      }
    });
  });

  describe('deposits', function() {
    it('should deposit to an external account', function(done){
      externalAccount.deposit({ 
        currency: 'USD',
        amount: '1',
        issuer: 'rha5n8VLhXEWkRCJSRy9ZD58MC45PMjbFH'
      }, function(err, deposit) {
        if (err) { throw new Error(err) };
        assert(deposit.id > 0);
        assert(deposit.external_account_id == externalAccount.id);
        done();
      });
    });
  })

  describe('withdrawals', function() {
    it('should withdraw from an external account', function(done){
      externalAccount.withdraw({ 
        currency: 'USD',
        amount: '1',
        issuer: 'rha5n8VLhXEWkRCJSRy9ZD58MC45PMjbFH'
      }, function(err, withdrawal){
        if (err) { throw new Error(err) };
        assert(withdrawal.id > 0);
        assert(withdrawal.external_account_id == externalAccount.id);
        done();
      });
    });
  })
});

