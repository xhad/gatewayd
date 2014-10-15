const invoicePolicy = require(__dirname+'/../../config/policies/invoice_policy.js');

describe('Invoice Policy', function() {

  describe('an incoming external payment', function() {

    var externalPayment;

    describe('with a corresponding gateway transaction and ripple payment', function() {

      it('should apply', function(done) {

        invoicePolicy.doesApply(externalPayment)
          .then(function() { assert(true) })
          .error(function() { assert(false) });
      });

      it('should apply and set the ripple payment to outgoing', function(done) {

      });

      it('should apply and set the gateway transaction to outgoing', function(done) {

      });

    });

    describe('without a corresponding gateway transaction', function() {

      it('should not apply', function(done) {

      });

    });

    before(function(done) {
      ExternalTransaction.create({
        status: 'incoming,
        depoit: true,
        amount: 100,
        currency: 'BTC',
        external_account_id: 1
      }).then(function(payment) {
        externalPayment = payment;      
        done();
      });
      // Create a ripple transaction and a gateway transaction
    });

    after(function(done) {
      externalPayment.destroy().complete(done);
    });
  });

  describe('an incoming ripple payment', function() {

    describe('with a corresponding gateway transaction and ripple payment', function() {

      it('should apply', function(done) {

      });

      it('should apply and set the external payment to outgoing', function(done) {

      });

      it('should apply and set the gateway transaction to complete', function(done) {

      });

    });

    describe('without a corresponding gateway transaction', function() {

      it('should not apply', function(done) {

      });

    });

  });

});

