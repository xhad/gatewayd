var assert = require('assert');
var gateway = require(__dirname+'/../../');
var OutgoingPayment = require(__dirname+'/../../lib/core/outgoing_payment.js');
var fixtures = require(__dirname+'/../fixtures/ripple_rest_integration.js');
var outgoingTransactionRecord;


describe('Outgoing Payment', function() {
  describe('Ripple REST error handler', function(){

    describe('transactional errors - fund error', function(){
      before(setUp);
      after(tearDown);

      it('should handle insufficient fund error and mark record failed', function(done) {
        var outgoingPayment = new OutgoingPayment(outgoingTransactionRecord);
        outgoingPayment._rippleRestResponseHandler(fixtures.errors.insufficient_funds)
          .then(function(error){
            assert.strictEqual(error.record.state, 'failed');
            assert.strictEqual(error.record.transaction_state, 'terINSUF_FEE_B');
            done();
          });
      });

      it('should handle transaction not found -- retry', function(done) {
        var outgoingPayment = new OutgoingPayment(outgoingTransactionRecord);
        outgoingPayment._rippleRestResponseHandler(fixtures.errors.invalid_requests.transaction_not_found)
          .then(function(error){
            assert.deepEqual(error.record, outgoingTransactionRecord.dataValues);
            assert.strictEqual(error.handled, 'retry');
            done();
          });

      });
    });

    describe('transactional errors -- no path found', function() {

      setTimeout(function(){
        before(setUp);
        after(tearDown);
        it('should handle no path found -- failed', function(done) {
          this.timeout(5000);
          var outgoingPayment = new OutgoingPayment(outgoingTransactionRecord);
          outgoingPayment._rippleRestResponseHandler(fixtures.errors.invalid_requests.no_paths_found)
            .then(function(error){
              assert.strictEqual(error.record.transaction_state, 'tecPATH_DRY');
              assert.strictEqual(error.handled, 'failed');
              done();
            });
        });
      }, 5000);
    });

    describe('connection errors', function(){
      it('should handle no rippled connection error -- retry', function(done) {
        var outgoingPayment = new OutgoingPayment(outgoingTransactionRecord);
        outgoingPayment._rippleRestResponseHandler(fixtures.errors.connection.no_rippled_connection)
          .then(function(error){
            assert.deepEqual(error.record, outgoingTransactionRecord.dataValues);
            assert.strictEqual(error.handled, 'retry');
            done();
          });
      });

      it('should handle rippled busy error -- retry', function(done) {
        var outgoingPayment = new OutgoingPayment(outgoingTransactionRecord);
        outgoingPayment._rippleRestResponseHandler(fixtures.errors.connection.rippled_busy)
          .then(function(error){
            assert.deepEqual(error.record, outgoingTransactionRecord.dataValues);
            assert.strictEqual(error.handled, 'retry');
            done();
          });
      });

      it('should handle socket hang up connection error -- retry', function(done) {
        var error = new Error('socket hang up');
        error.code = 'ECONNRESET';

        var outgoingPayment = new OutgoingPayment(outgoingTransactionRecord);
        outgoingPayment._rippleRestResponseHandler(error)
          .then(function(error){
            assert.deepEqual(error.record, outgoingTransactionRecord.dataValues);
            assert.strictEqual(error.handled, 'retry');
            done();
          });

      });

    });

  });

});


describe('Sending a queued payment to ripple', function() {

  before(setUp);
  after(tearDown);

  it('should record the rejection of a payment from the Ripple Ledger', function(done) {
    var outgoingPayment = new OutgoingPayment(outgoingTransactionRecord);
    var confirmationResponse = new Object(fixtures.successful_responses.validated_payment);
    confirmationResponse.result = 'temPATH_DRY';

    outgoingPayment._recordAcceptanceOrRejectionStatus(confirmationResponse)
      .then(function(status) {
        assert.strictEqual(outgoingPayment.record.state, 'failed');
        done();
      });
  });

  it('should record sent and confirmed a ripple payment with a hash', function(done){
    this.timeout(10000);
    var outgoingPayment = new OutgoingPayment(outgoingTransactionRecord);
    outgoingPayment._sendAndConfirmPayment(fixtures.requests.payment)
      .then(function(payment){
        assert(payment.hash);
        assert.strictEqual(payment.result, 'tesSUCCESS');
        done();
      });
  });

});

function setUp(done) {
  gateway.data.models.rippleTransactions.create({
    to_address_id: 820,
    from_address_id: 623,
    to_amount: '0.0019399999999999999',
    to_currency: 'XRP',
    to_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    from_amount: '0.002',
    from_currency: 'XRP',
    from_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    state: 'outgoing',
    external_transaction_id: 169
  }).complete(function (error, rippleTransaction) {
    outgoingTransactionRecord = rippleTransaction;
    done();
  });
}

function tearDown(done) {
  outgoingTransactionRecord.destroy().complete(done);
}