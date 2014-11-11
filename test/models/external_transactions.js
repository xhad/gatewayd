process.env.NODE_ENV = 'test_in_memory';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var ExternalTransactions = require(__dirname+'/../../').data.models.externalTransactions;

describe('RippleTransactions ', function() {

  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    ExternalTransactions.initModel(true).then(function() {
      done();
    });
  });

  it('should successfully persist a external_transaction record', function() {
    return ExternalTransactions.create({
      external_account_id: 1,
      amount: 5,
      currency: 'USD',
      invoice_id: '12345',
      deposit: true
    }).then(function(transaction) {
        chai.assert.strictEqual(transaction.external_account_id, 1);
        chai.assert.strictEqual(transaction.amount, 5);
        chai.assert.strictEqual(transaction.currency, 'USD');
        chai.assert.strictEqual(transaction.invoice_id, '12345');
    }).error(function(error) {
        throw new Error(JSON.stringify(error));
    })
  });

  it('create should be rejected if amount is missing', function() {
    return chai.assert.isRejected(ExternalTransactions.create({
      external_account_id: 2,
      currency: 'USD',
      deposit: true
    }, {
      to_address_id: [ 'Validation notNull failed: amount' ]
    }))
  });

  it('create should be rejected if currency is missing', function() {
    return chai.assert.isRejected(ExternalTransactions.create({
      external_account_id: 2,
      amount: 5,
      deposit: true
    }, {
      to_address_id: [ 'Validation notNull failed: currency' ]
    }));
  });

});

