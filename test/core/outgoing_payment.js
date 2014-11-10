process.env.NODE_ENV = 'test_in_memory';
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const gateway = require(__dirname+'/../../');
const OutgoingPayment = require(__dirname+'/../../lib/core/outgoing_payment.js');
var fixtures = require(__dirname+'/../fixtures/ripple_rest_integration.js');
var RippleTransactions = gateway.data.models.rippleTransactions;
var outgoingTransactionRecord;


describe('Outgoing Payment', function() {
  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    RippleTransactions.initModel(true).then(function() {
      done();
    });
  });

  describe('Ripple REST error handler', function(){

    it('should handle insufficient fund error and mark record failed', function(done) {
      RippleTransactions
        .create(fixtures.outgoing_record)
        .then(function (rippleTransaction) {
          var outgoingPayment = new OutgoingPayment(rippleTransaction);
          outgoingPayment._rippleRestResponseHandler(fixtures.errors.insufficient_funds)
            .then(function(handledError){
              chai.assert.strictEqual(handledError.record.state, 'failed');
              chai.assert.strictEqual(handledError.record.transaction_state, 'terINSUF_FEE_B');
              done();
            })
            .error(function(error){
              throw new Error(error);
            });
        })
        .error(function(error){
          throw new Error(error);
        });
    });

    it('should handle transaction not found -- retry', function(done) {
      RippleTransactions
        .create(fixtures.outgoing_record)
        .then(function (rippleTransaction) {
          var outgoingPayment = new OutgoingPayment(rippleTransaction);
          outgoingPayment._rippleRestResponseHandler(fixtures.errors.invalid_requests.transaction_not_found)
            .then(function(handledError){

              chai.assert.strictEqual(handledError.record.state, 'outgoing');
              chai.assert.strictEqual(handledError.handled, 'retry');
              done();
            })
            .error(function(error){
              throw new Error(error);
            });
        })
        .error(function(error){
          throw new Error(error);
        });
    });



    it('should handle no path found -- failed', function(done) {

      RippleTransactions
        .create(fixtures.outgoing_record)
        .then(function (rippleTransaction) {

          var outgoingPayment = new OutgoingPayment(rippleTransaction);

          outgoingPayment._rippleRestResponseHandler(fixtures.errors.invalid_requests.no_paths_found)
            .then(function(handledError){
              chai.assert.strictEqual(handledError.record.transaction_state, 'tecPATH_DRY');
              chai.assert.strictEqual(handledError.record.state, 'failed');
              done();
            });
        });
    });

  });

  it('should handle no rippled connection error -- retry', function(done) {

    RippleTransactions
      .create(fixtures.outgoing_record)
      .then(function (rippleTransaction) {
        var outgoingPayment = new OutgoingPayment(rippleTransaction);
        outgoingPayment._rippleRestResponseHandler(fixtures.errors.connection.no_rippled_connection)
          .then(function(handledError){
            chai.assert.strictEqual(handledError.handled, 'retry');
            done();
          })
          .error(function(error){
            throw new Error(error);
          });
      })
      .error(function(error){
        throw new Error(error);
      });
  });

  it('should handle rippled busy error -- retry', function(done) {

    RippleTransactions
      .create(fixtures.outgoing_record)
      .then(function (rippleTransaction) {
        var outgoingPayment = new OutgoingPayment(rippleTransaction);
        outgoingPayment._rippleRestResponseHandler(fixtures.errors.connection.rippled_busy)
          .then(function(handledError){
            chai.assert.strictEqual(handledError.handled, 'retry');
            done();
          })
          .error(function(error){
            throw new Error(error);
          });
      })
      .error(function(error){
        throw new Error(error);
      });
  });

  it('should handle socket hang up connection error -- retry', function(done) {
    var error = new Error('socket hang up');
    error.code = 'ECONNRESET';
    
    RippleTransactions
      .create(fixtures.outgoing_record)
      .then(function (rippleTransaction) {
        var outgoingPayment = new OutgoingPayment(rippleTransaction);
        outgoingPayment._rippleRestResponseHandler(error)
          .then(function(error){
            chai.assert.strictEqual(error.handled, 'retry');
            done();
          }).error(function(error){
            throw new Error(error);
          });
      })
      .error(function(error){
        throw new Error(error);
      });
  });

});


describe('Sending a queued payment to ripple', function() {

  it('should record the rejection of a payment from the Ripple Ledger', function(done) {

    RippleTransactions
      .create(fixtures.outgoing_record)
      .then(function (rippleTransaction) {
        var outgoingPayment = new OutgoingPayment(rippleTransaction);
        var confirmationResponse = new Object(fixtures.successful_responses.validated_payment);
        confirmationResponse.result = 'temPATH_DRY';

        outgoingPayment._recordAcceptanceOrRejectionStatus(confirmationResponse)
          .then(function(status) {
            chai.assert.strictEqual(outgoingPayment.record.state, 'failed');
            done();
          }).error(function(error){
            throw new Error(error);
          });
      })
      .error(function(error){
        throw new Error(error);
      });
  });

  it('should send a ripple payment, response must have a status url', function(done){
    this.timeout(10000);
    RippleTransactions
      .create(fixtures.outgoing_record)
      .then(function (rippleTransaction) {
        var outgoingPayment = new OutgoingPayment(rippleTransaction);
        outgoingPayment._sendPayment(fixtures.requests.payment)
          .then(function(payment){
            chai.assert(payment.success);
            chai.assert(payment.status_url);
            done();
          }).error(function(error){
            throw new Error(error);
          });
      })
      .error(function(error){
        throw new Error(error);
      });
  });

  it('should mark record pending while a payment is being confirmed', function(done){
    this.timeout(10000);
    RippleTransactions
      .create(fixtures.outgoing_record)
      .then(function (rippleTransaction) {
        var outgoingPayment = new OutgoingPayment(rippleTransaction);
        outgoingPayment._confrimPayment(fixtures.requests.pending_payment)
          .error(function(payment){
            chai.assert(outgoingPayment.record.state, 'pending');
            done();
          });
      })
      .error(function(error){
        throw new Error(error);
      });
  });

});