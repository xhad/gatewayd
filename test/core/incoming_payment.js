process.env.NODE_ENV          = 'test_in_memory';
const chai                    = require('chai');
const sinon                   = require('sinon');
var gatewayd                  = require(__dirname+'/../../');
const IncomingPayment         = require(__dirname+'/../../lib/core/incoming_payment.js');
const RippleRestClient        = require('ripple-rest-client');
const incomingPaymentFixtures = require(__dirname+'/../fixtures/incoming_payments.js');
var RippleTransactions        = gatewayd.models.rippleTransactions;

describe('Incoming Payment', function() {

  var getPaymentSpy;
  before(function(){
    var configStub = sinon.stub(gatewayd.config, 'get');
    getPaymentSpy = sinon.spy();
    configStub.withArgs('COLD_WALLET').returns(incomingPaymentFixtures.incoming_payments.valid.destination_account);
  });

  beforeEach(function(done) {
    sinon.stub(RippleRestClient.prototype, 'getPayment')
      .yields(null, incomingPaymentFixtures.incoming_payments.valid);

    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should successfully processes incoming payment', function(done) {
    var incomingPayment = new IncomingPayment(incomingPaymentFixtures.incoming_payments.notification);
    incomingPayment.processPayment()
      .then(function(){
        RippleTransactions
          .find({
            where: {
              transaction_hash: incomingPayment.payment.hash
            }
          })
          .then(function(rippleTransaction){
            chai.assert(rippleTransaction);
            chai.assert.strictEqual(rippleTransaction.dataValues.transaction_hash, incomingPayment.payment.hash);
            chai.assert.strictEqual(rippleTransaction.dataValues.transaction_state, incomingPayment.payment.result);
            done();
          })
          .error(function(error) {
            done(error);
          });
      })
      .error(function(error) {
        done(error);
      });
  });

  it('should get payment from notification', function(done){
    var incomingPayment = new IncomingPayment(incomingPaymentFixtures.incoming_payments.notification);

    RippleRestClient.prototype.getPayment(incomingPaymentFixtures.incoming_payments.valid, getPaymentSpy);

    incomingPayment._getPayment()
      .then(function(payment){
        chai.assert(getPaymentSpy.called);
        chai.assert.deepEqual(payment, incomingPaymentFixtures.incoming_payments.valid);
        done();
      })
      .error(function(error) {
        done(new Error(error));
      });
  });

  it('should prepare Incoming Payment', function(done){
    var incomingPayment = new IncomingPayment(incomingPaymentFixtures.incoming_payments.notification);
    incomingPayment._prepareIncomingPayment(incomingPaymentFixtures.incoming_payments.valid)
      .then(function(preparedPayment){
        chai.assert(preparedPayment.state, 'incoming');
        chai.assert(preparedPayment.transaction_state, 'tesSUCCESS');
        done();
      })
      .error(function(error){
        done(new Error(error));
      });
  });

  it('should update last payment hash', function(done){
    var incomingPayment = new IncomingPayment(incomingPaymentFixtures.incoming_payments.notification);
    incomingPayment._updateLastPaymentHash(incomingPaymentFixtures.incoming_payments.recorded_payment)
      .then(function(recordedPayment){
        chai.assert(recordedPayment.dataValues.transaction_hash, incomingPaymentFixtures.incoming_payments.valid.hash);
        done();
      })
      .error(function(error){
        done(new Error(error));
      });
  });

  it('should validate incoming payments -- tecPATH_DRY', function(done){

    var incomingPayment = new IncomingPayment(incomingPaymentFixtures.incoming_payments.notification);

    var tecPacthDryPayment = incomingPaymentFixtures.incoming_payments.valid;
    tecPacthDryPayment.result = 'tecPATH_DRY';
    incomingPayment.payment = tecPacthDryPayment;

    incomingPayment._validatePayment(incomingPayment.payment)
      .error(function(error){
        chai.assert.strictEqual(error.message, 'NOTtesSUCCESS');
        done();
      });
  });

  it('should validate incoming payments -- account is not cold wallet', function(done) {

    var incomingPayment = new IncomingPayment(incomingPaymentFixtures.incoming_payments.notification);

    var invalidPayment = incomingPaymentFixtures.incoming_payments.valid;
    invalidPayment.destination_account = 'r123';
    incomingPayment.payment = invalidPayment;

    incomingPayment._validatePayment(incomingPayment.payment)
      .error(function(error){
        chai.assert.strictEqual(error.message, 'NotColdWallet');
        done();
      });
  });

  after(function(){
    gatewayd.config.get.restore();
  });

  afterEach(function() {
    RippleRestClient.prototype.getPayment.restore();
  });
});
