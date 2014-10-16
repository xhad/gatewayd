

describe('Determining which policy to apply', function() {
  var incomingPayment;

  describe('a payment with a gateway transaction', function() {

    it('the invoice policy should apply', function() {

      PolicyEngine.determineWhichToApplyTo(incomingPayment).then(function(policy) {
        assert.strictEqual(policy.name, 'invoice_policy');

        policy.doesApply(incomingPayment).then(function() {
          assert(true);
        })
        .error(function() {
          assert(faslse);
        });
      });
    });

    before(function(done) {
      // set up external account, external transaction, gateway transaction, ripple address, ripple transaction
    })

    after(function(done) {
      // tear down the external account, external transaction, gateway transaction, ripple address, ripple transaction
    });
  });

  describe('a payment with a bridge associated with the account', function() {
    PolicyEngine.determineWhichToApplyTo(incomingPayment).then(function(policy) {
      assert.strictEqual(policy.name, 'bridge_policy');
    });
    before(function(done) {
      // set up external account, external transaction, bridge, ripple address
    })

    after(function(done) {
      // tear down the external account, external transaction, bridge, ripple address
    });
  });

  describe('a payment with a user associated with the account', function() {
    PolicyEngine.determineWhichToApplyTo(incomingPayment).then(function(policy) {
      assert.strictEqual(policy.name, 'user_policy');
    });
    before(function(done) {
      // set up external account, external transaction, user, ripple address
    })

    after(function(done) {
      // tear down the external account, external transaction, user, ripple address
    });
  });
  });

  it('should determine a policy given an incoming payment', function() {
    PolicyEngine.determineWhichToApplyTo(incomingPayment).then(function(policy) {
      assert.strictEqual(policy.name, 'no_policy');
    });
    before(function(done) {
      // set up external account, external transaction
    })

    after(function(done) {
      // tear down the external account, external transaction
    });
  });
  });

});

