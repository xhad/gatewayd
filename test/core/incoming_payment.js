process.env.NODE_ENV = 'test_in_memory';
const chai = require('chai');
const sinon = require('sinon');
const gatewayd = require(__dirname+'/../../');
const IncomingPayment = require(__dirname+'/../../lib/core/incoming_payment.js');
var RippleTransactions = gatewayd.models.rippleTransactions;
var fixtures = require(__dirname+'/../fixtures/incoming_payments.js');

describe('Incoming Payment', function() {

  before(function() {
    var configStub = sinon.stub(gatewayd.config, 'get');
    configStub.withArgs('COLD_WALLET').returns(fixtures.incoming_payments.valid.destination_account);
  });

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should successfully record incoming payment with out a destination tag', function(done) {
    var incomingPayment = new IncomingPayment(fixtures.incoming_payments.valid);
    incomingPayment.processPayment()
      .then(function(processedPayment){
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
            done(new Error(JSON.stringify(error)));
          });
      })
      .error(function(error) {
        done(new Error(JSON.stringify(error)));
      });
  });

  it('should successfully record incoming payment with a destination tag', function(done) {
    var paymentWithDestinationTag = fixtures.incoming_payments.valid;
    paymentWithDestinationTag.destination_tag = '123';

    var incomingPayment = new IncomingPayment(paymentWithDestinationTag);
    incomingPayment.processPayment()
      .then(function(processedPayment){
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
            done(new Error(JSON.stringify(error)));
          });
      })
      .error(function(error) {
        done(new Error(JSON.stringify(error)));
      });
  });

  it('should validate incoming payments -- tecPATH_DRY', function(done){
    var invalidPayment = fixtures.incoming_payments.valid;
    invalidPayment.result = 'tecPATH_DRY';

    var incomingPayment = new IncomingPayment(fixtures.incoming_payments.valid);
    incomingPayment._validatePayment()
      .then(function(){
        done();
      })
      .error(function(error){
        chai.assert.strictEqual(error.message, 'NOTtesSUCCESS');
        done();
      });

  });

  it('should prepare Incoming Payment', function(done){
    var incomingPayment = new IncomingPayment(fixtures.incoming_payments.valid);
    incomingPayment._prepareIncomingPayment()
      .then(function(preparedPayment){
        chai.assert(preparedPayment.state, 'incoming');
        chai.assert(preparedPayment.transaction_state, 'tesSUCCESS');
        done();
      })
      .error(function(error){
        done(new Error(JSON.stringify(error)));
      });
  });

  it('should record validated and prepared Incoming Payment', function(done){
    var incomingPayment = new IncomingPayment(fixtures.incoming_payments.valid);

    incomingPayment._recordIncomingPayment(fixtures.incoming_payments.to_record)
      .then(function(recodedPayment){
        chai.assert(recodedPayment.dataValues.transaction_hash, fixtures.incoming_payments.valid.hash);
        chai.assert(recodedPayment.dataValues.transaction_state, fixtures.incoming_payments.valid.result);
        done();
      })
      .error(function(error){
        done(new Error(JSON.stringify(error)));
      });
  });


  it('should not persist incoming payment with a result of tecPATH_DRY', function(done) {

    var paymentWithDestinationTag = fixtures.incoming_payments.valid;
    paymentWithDestinationTag.result = 'tecPATH_DRY';

    var incomingPayment = new IncomingPayment(paymentWithDestinationTag);
    incomingPayment.processPayment()
      .then(function(processedPayment){
        chai.assert(!processedPayment);
        done();
      })
      .error(function(error){
        chai.assert(error);
        chai.assert.strictEqual(error.message, 'NOTtesSUCCESS');
        done();
      });
  });


  it('should not persist incoming payment with a result where the destination account is not the cold wallet', function(done) {

    var paymentWithDestinationTag = fixtures.incoming_payments.valid;
    paymentWithDestinationTag.destination_account = 'r123';

    var incomingPayment = new IncomingPayment(paymentWithDestinationTag);
    incomingPayment.processPayment()
      .then(function(processedPayment){
        chai.assert(!processedPayment);
      })
      .error(function(error){
        chai.assert(error);
        chai.assert.strictEqual(error.message, 'NotColdWallet');
        done();
      });
  });

  after(function() {
    gatewayd.config.get.restore();
  });

});
