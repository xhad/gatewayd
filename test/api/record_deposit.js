process.env.NODE_ENV = 'test_in_memory';
const gatewayd = require(__dirname+'/../../');

var chai = require('chai');
var recordDeposit = gatewayd.api.recordDeposit;

describe('record_deposit', function() {

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should fail because external_account_id does not reference an existing externalAccount', function(done) {
    recordDeposit({
      external_account_id: 5,
      currency: 'USD',
      amount: 5.00
    }, function(error, externalTransaction) {
      chai.assert(error);
      chai.assert(!externalTransaction);
      done();
    })
  });

  it('should successfully create a externalTransaction', function(done) {
    gatewayd.models.externalAccounts.create({
      name: 'test',
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      type: 'independent'
    }).success(function(externalAccount) {
      recordDeposit({
        external_account_id: externalAccount.id,
        currency: 'USD',
        amount: 5.00
      }, function(error, externalTransaction) {
        chai.assert(!error);
        chai.assert(externalTransaction);
        chai.assert.strictEqual(externalTransaction.currency, 'USD');
        chai.assert.strictEqual(externalTransaction.amount, 5.00);
        chai.assert.strictEqual(externalTransaction.status, 'queued');
        chai.assert(externalTransaction.deposit);
        done();
      })
    })
  });

});