var gatewayd = require(__dirname+'/../../');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Retrying a Failed Payment', function() {

  var failedPayment, successfulPayment;

  beforeEach(function (done) {
    gatewayd.database.sync({force: true}).then(function () {
      done();
    });
  });

  it('should move a failed payment back into the outgoing payment queue', function() {
    return gatewayd.models.rippleTransactions.create({
      state: 'failed',
      to_currency: 'XAG',
      to_amount: 10000,
      to_address_id: 999,
      from_address_id: 1,
      from_currency: 'XAG',
      from_amount: 10000,
      to_issuer: 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6',
      from_issuer: 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6',
      direction: 'from-ripple'
    }).then(function(rippleTransaction){
        gatewayd.api.retryFailedPayment(rippleTransaction.id, function(error, payment) {
          chai.assert(!error);
          chai.assert.strictEqual(payment.state, 'outgoing');
      });
    });
  });



  it('should not modify a payment not marked as failed', function() {
    return gatewayd.models.rippleTransactions.create({
      state: 'success',
      to_currency: 'XAG',
      to_amount: 10000,
      to_address_id: 999,
      from_address_id: 1,
      from_currency: 'XAG',
      from_amount: 10000,
      to_issuer: 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6',
      from_issuer: 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6',
      direction: 'from-ripple'
    }).then(function(rippleTransaction){
      return gatewayd.api.retryFailedPayment(rippleTransaction.id, function(error) {
        chai.assert.strictEqual(error.state, 'must be "failed"');
        return gatewayd.models.rippleTransactions.find({ where: { id: rippleTransaction.id }})
          .then(function(transaction) {
            chai.assert.strictEqual(transaction.state, 'success');
          });
      });
    }).error(function(error) {
      throw new Error(JSON.stringify(error));
    });
  });
});

