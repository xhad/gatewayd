process.env.NODE_ENV = 'test_in_memory';
const gatewayd = require(__dirname+'/../../');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var fixtures = require(__dirname+'/../fixtures/transactions');
var ExternalTransactions = gatewayd.models.externalTransactions;

var fixtureExternalTransaction = fixtures.externalTransaction;
var fixtureMinimalTransaction = fixtures.minimalExternalTransaction;

describe('external_transactions model', function() {
  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should successfully persist a external_transaction record', function() {
    return ExternalTransactions.create(fixtureExternalTransaction).then(function(transaction) {
      return ExternalTransactions.find(transaction.id);
    }).then(function(transaction) {
      chai.assert.strictEqual(transaction.external_account_id, fixtureExternalTransaction.external_account_id);
      chai.assert.strictEqual(transaction.source_amount, fixtureExternalTransaction.source_amount);
      chai.assert.strictEqual(transaction.source_currency, fixtureExternalTransaction.source_currency);
      chai.assert.strictEqual(transaction.source_account_id, fixtureExternalTransaction.source_account_id);
      chai.assert.strictEqual(transaction.destination_amount, fixtureExternalTransaction.destination_amount);
      chai.assert.strictEqual(transaction.destination_currency, fixtureExternalTransaction.destination_currency);
      chai.assert.strictEqual(transaction.destination_account_id, fixtureExternalTransaction.destination_account_id);
      chai.assert.strictEqual(transaction.amount, fixtureExternalTransaction.amount);
      chai.assert.strictEqual(transaction.currency, fixtureExternalTransaction.currency);
      chai.assert.strictEqual(transaction.invoice_id, fixtureExternalTransaction.invoice_id);
      chai.assert.strictEqual(transaction.memos, fixtureExternalTransaction.memos);
    }).error(function(error) {
      throw new Error(JSON.stringify(error));
    });
  });

  it('should successfully persist if amount and currency are missing', function() {
    return ExternalTransactions.create(fixtureMinimalTransaction).then(function(transaction) {
      return ExternalTransactions.find(transaction.id);
    }).then(function(transaction) {
      chai.assert.strictEqual(transaction.external_account_id, fixtureMinimalTransaction.external_account_id);
    }).error(function(error) {
      throw new Error(JSON.stringify(error));
    });
  });

});

