var GatewayTransaction = require(__dirname+'/../../').data.models.gatewayTransactions;
var assert = require('assert');

var gatewayTransaction;

describe('Gateway Transaction database table', function() {

  it('should relate external transactions to ripple transactions', function(done) {
    GatewayTransaction.create({
      ripple_transaction_id: 123,
      external_transaction_id: 456,
      policy_id: 789
    })
    .then(function(transaction) {
      gatewayTransaction = transaction;
      assert(transaction.id > 0);
      assert.strictEqual(transaction.ripple_transaction_id, 123);
      assert.strictEqual(transaction.external_transaction_id, 456);
      assert.strictEqual(transaction.policy_id, 789);
      done();
    })
    .error(console.log);
  });

  it('should accept a state', function(done) {
    gatewayTransaction.updateAttributes({
      state: 'invoice'
    })
    .then(function() {
      assert.strictEqual(gatewayTransaction.state, 'invoice');
      done();
    });
  });

  it('should fail to save without a ripple transaction id', function(done) {
    GatewayTransaction.create({
      external_transaction_id: 456,
      policy_id: 789
    })
    .error(function(error) {
      assert.strictEqual(error.ripple_transaction_id[0], 'Validation notNull failed: ripple_transaction_id');
      done();
    });
  });

  it('should fail to save without a external transaction id', function(done) {
    GatewayTransaction.create({
      ripple_transaction_id: 456,
      policy_id: 789
    })
    .error(function(error) {
      assert.strictEqual(error.external_transaction_id[0], 'Validation notNull failed: external_transaction_id');
      done();
    });
  });
  it('should fail to save without a ripple transaction id', function(done) {
    GatewayTransaction.create({
      ripple_transaction_id: 123,
      external_transaction_id: 456
    })
    .error(function(error) {
      assert.strictEqual(error.policy_id[0], 'Validation notNull failed: policy_id');
      done();
    });
  });
  
  after(function(done) {
    gatewayTransaction.destroy().then(done);
  })

})
