var Policy = require(__dirname+'/../../lib/policies/base.js');
var Promise = require('bluebird');
var assert = require('assert');

describe('Policy Base class', function() {

  it('should load the invoice policy from file', function() {
    var policy = Policy.load(__dirname+'/../../config/policies/invoice_policy.js');
    assert(policy instanceof Policy);
    assert.strictEqual(policy.getName(), 'invoice_policy');
  });

  it('should build a new policy, not applying by default', function(done) {
    var policy = new Policy({
      name: 'hosted_deposit_policy'
    })
    assert.strictEqual(policy.getName(), 'hosted_deposit_policy');

    policy.doesApply().then(function(doesApply) {
      assert(!doesApply);
      done();
    });
  });

  it('should create a new policy that always applies', function(done) {
    var policy = new Policy({
      name: 'bridge_policy',
      doesApply: function(payment) {
        return new Promise(function(resolve, reject) {
          resolve(true);
        })
      }
    })

    policy.doesApply().then(function(doesApply) {
      assert(doesApply);
      done();
    });
  })
});

