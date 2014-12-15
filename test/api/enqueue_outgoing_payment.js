process.env.NODE_ENV = 'test_in_memory';
const gatewayd = require(__dirname+'/../../');
const fixtures = require(__dirname+'/../fixtures/outgoing_payments.js');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var enqueueOutgoingPayment = require(__dirname+'/../../lib/api/enqueue_outgoing_payment.js');
var Promise = require('bluebird');

describe('enqueue_outgoing_payment', function() {

  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should successfully persist a record in the ripple_transaction table in the \'outgoing\' state', function() {
    return enqueueOutgoingPayment(fixtures.requests.valid)
      .then(function(rippleTransaction) {
        chai.assert.strictEqual(rippleTransaction.to_amount, 0.01);
        chai.assert.strictEqual(rippleTransaction.to_currency, 'ZMK');
        chai.assert.strictEqual(rippleTransaction.to_issuer, gatewayd.config.get('COLD_WALLET'));
        chai.assert.strictEqual(rippleTransaction.from_amount, 0.01);
        chai.assert.strictEqual(rippleTransaction.from_currency, 'ZMK');
        chai.assert.strictEqual(rippleTransaction.from_issuer, gatewayd.config.get('COLD_WALLET'));
        chai.assert.strictEqual(rippleTransaction.state, 'outgoing');
    }).error(function(error) {
      throw new Error(JSON.stringify(error));
    })
  });

  it('should fail to validate because amount is not a float', function() {
    return chai.assert.isRejected(enqueueOutgoingPayment(fixtures.requests.invalid_amount));
  });

  it('should fail to validate because currency is not valid', function() {
    return chai.assert.isRejected(enqueueOutgoingPayment(fixtures.requests.invalid_currency));

  });

  it('should fail to validate because address is not a valid ripple address', function() {
    return chai.assert.isRejected(enqueueOutgoingPayment(fixtures.requests.invalid_address));

  });

  it('should fail to validate because destinationTag is not valid', function() {
    return chai.assert.isRejected(enqueueOutgoingPayment(fixtures.requests.invalid_destination_tag));
  });

  it('should fail to validate because issuer is not a valid ripple address', function() {
    return chai.assert.isRejected(enqueueOutgoingPayment(fixtures.requests.invalid_issuer_address));

  });
});

