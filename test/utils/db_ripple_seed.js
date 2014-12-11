process.env.NODE_ENV = 'test_in_memory';
const gatewayd = require(__dirname+'/../../');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var RippleTransactions = gatewayd.models.rippleTransactions;
var Chance = require('chance');
var UInt256 = require('ripple-lib').UInt256;

describe('db_ripple_seed', function() {

  chai.use(chaiAsPromised);
  var chance = new Chance();

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should successfully persist a ripple_transaction record with chance generated data', function() {
    var chanceToAddressId = chance.integer({min: 1, max: 99999}),
        chanceFromAddressId = chance.integer({min: 1, max: 99999}),
        chanceToAmount = chance.floating({fixed: 2}),
        chanceToCurrency = chance.currency().code,
        chanceFromAmount = chance.floating({fixed: 2}),
        chanceFromCurrency = chance.currency().code,
        chanceInvoiceId = UInt256.from_number(chance.integer({min: 1, max: 99999})).value;

    var chanceToIssuer;
    gatewayd.api.generateWallet(function(error, result) {
      if (error) {
        throw new Error('Unable to generate address');
      }
      chanceToIssuer = result.address;
    });

    var chanceFromIssuer;
    gatewayd.api.generateWallet(function(error, result) {
      if (error) {
        throw new Error('Unable to generate address');
      }
      chanceFromIssuer = result.address;
    });

    return RippleTransactions.create({
      to_address_id: chanceToAddressId,
      from_address_id: chanceFromAddressId,
      to_amount: chanceToAmount,
      to_currency: chanceToCurrency,
      to_issuer: chanceToIssuer,
      from_amount: chanceFromAmount,
      from_currency: chanceFromCurrency,
      from_issuer: chanceFromIssuer,
      invoice_id: chanceInvoiceId,
      direction: 'to-ripple'
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
