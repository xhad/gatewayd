const assert = require('assert');
const gatewayd = require(__dirname+'/../../');
const ExternalAccount = gatewayd.models.externalAccounts;
const ExternalTransaction = gatewayd.models.externalTransactions;
const RippleAddress = gatewayd.models.rippleAddresses;
const userPolicy = require(__dirname+'/../../config/policies/user_policy.js'); 

describe('The User policy', function() {

  var createdExternalAccount, createdExternalPayment, createdRippleAddress;

  describe('incoming external payment with no associated user record', function() {

    it('should not apply if there is no user record for the external transaction', function() {
      userPolicy.doesApply(createdExternalPayment)
      .then(function() {
        assert(false);
      })
      .error(function(error) {
        assert(true);
      })
    });
  });

  describe('incoming external payment with a user record and ripple address', function() {

    it('should apply', function() {
      var userPolicy = require(__dirname+'/../../config/policies/user_policy.js'); 
      userPolicy.doesApply(createdExternalPayment)
      .then(function() {
        assert(true);
      })
      .error(function(error) {
        assert(false);
      })
    });

    before(function(done) {
      const userId = 25;
      RippleAddress.create({
        address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
        tag: 349839483,
        user_id: userId,
        type: 'hosted',
        managed: false
      })
      .then(function(rippleAddress) {
        createdRippleAddress = rippleAddress;
        return createdExternalAccount.updateAttributes({  
          user_id: userId
        })
      })
      .then(function() { done() })
      .error(function(error) {
        console.log('ERROR', error);
        done();
      });
    });
  });

  before(function(done) {
    ExternalAccount.create({
      type: 'hosted',
      address: 'me@stevenzeiler.com'
    })
    .then(function(externalAccount) {
      createdExternalAccount = externalAccount;
      return ExternalTransaction.create({
        external_account_id: externalAccount.id,
        amount: 1.23456,
        currency: 'XAG',
        deposit: true,
        status: 'incoming'
      })
    })
    .then(function(externalPayment) {
      createdExternalPayment = externalPayment
      done();
    })
  });

  after(function(done) {
    createdExternalAccount.destroy()
    .then(function() {
      return createdExternalPayment.destroy()
    })
    .then(function() {
      if (createdRippleAddress) {
        return createdRippleAddress.destroy()
      }
    })
    .then(done);
  });
});

