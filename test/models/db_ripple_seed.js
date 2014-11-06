process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var RippleTransactions = require(__dirname+'/../../').data.models.rippleTransactions;
var Chance = require('chance');
var chance = new Chance();

describe('RippleTransactions ', function() {

  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    RippleTransactions.initModel(true).then(function() {
      done();
    });
  });

  it('should successfully persist a ripple_transaction record with chance generated data', function() {
    var chanceToAddressId = chance.integer({min: 1, max: 99999}),
        chanceFromAddressId = chance.integer({min: 1, max: 99999}),
        chanceToAmount = chance.floating({fixed: 2}),
        chanceToCurrency = chance.currency().code,
        chanceToIssuer = 'r' + chance.character({length: 34, alpha: true}),
        chanceFromAmount = chance.floating({fixed: 2}),
        chanceFromCurrency = chance.currency().code,
        chanceFromIssuer = 'r' + chance.character({length: 34, alpha: true}),
        chanceInvoiceId = chance.hash({length: 32, casing: 'upper'});


    return RippleTransactions.create({
      to_address_id: chanceToAddressId,
      from_address_id: chanceFromAddressId,
      to_amount: chanceToAmount,
      to_currency: chanceToCurrency,
      to_issuer: chanceToIssuer,
      from_amount: chanceFromAmount,
      from_currency: chanceFromCurrency,
      from_issuer: chanceFromIssuer,
      invoice_id: chanceInvoiceId
    }).then(function(transaction) {
        chai.assert.strictEqual(transaction.to_address_id, chanceToAddressId);
        chai.assert.strictEqual(transaction.from_address_id, chanceFromAddressId);
        chai.assert.strictEqual(transaction.to_amount, chanceToAmount);
        chai.assert.strictEqual(transaction.to_currency, chanceToCurrency);
        chai.assert.strictEqual(transaction.to_issuer, chanceToIssuer);
        chai.assert.strictEqual(transaction.from_amount, chanceFromAmount);
        chai.assert.strictEqual(transaction.from_currency, chanceFromCurrency);
        chai.assert.strictEqual(transaction.from_issuer, chanceFromIssuer);
        chai.assert.strictEqual(transaction.invoice_id, chanceInvoiceId);
    }).error(function(error) {
        throw new Error(JSON.stringify(error));
    });
  });
});
