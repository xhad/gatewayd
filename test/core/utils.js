var path   = require('path'); var utils  = require(path.join(__dirname, '/../../lib/core/utils'));
var assert = require('assert');

describe('Parse source balance changes', function() {

  before(function() {

    source_balance_changes = [
      { value: '-1.012', currency: 'XRP', issuer: '' },
      { value: '-1',      currency: 'BTC', issuer: 'rJMtFJ7hKzvcGyzKp9rN9PrqNPReSsdFv5' },
      { value: '-0.45',   currency: 'BTC', issuer: 'rwjYEBN9DSMnxLzGVEfbqmabDd2sr2kzcz' }
    ];

  });

  it('should discard the xrp fee for non-xrp payments', function() {
    
    var parsedChanges = utils.parseSourceBalanceChanges(source_balance_changes);
    
    assert.strictEqual(parsedChanges.value, -1.45);
    assert.strictEqual(parsedChanges.currency, 'BTC');
  });

  it('should return the xrp amount for xrp payments', function() {
    var changes = [
      { value: 2500, currency: 'XRP', issuer: '' }
    ];
    var parsedChanges = utils.parseSourceBalanceChanges(changes);

    assert.strictEqual(parsedChanges.value, 2500);
    assert.strictEqual(parsedChanges.currency, 'XRP');
  });
});

describe('Parse destination balance changes', function() {

  before(function() {

    destination_balance_changes = [
      { value: 0.5, currency: 'XAU', issuer: 'rJMtFJ7hKzvcGyzKp9rN9PrqNPReSsdFv5' },
      { value: 0.2, currency: 'XAU', issuer: 'rwjYEBN9DSMnxLzGVEfbqmabDd2sr2kzcz' }
    ];
  });

  it('should aggregate the destination balance amounts', function() {
    var parsedChanges = utils.parseDestinationBalanceChanges(destination_balance_changes);
    assert.strictEqual(parsedChanges.value, 0.7);
    assert.strictEqual(parsedChanges.currency, 'XAU');
  });

  it('should return the xrp amount for xrp payments', function() {

    var changes = [
      { value: 2500, currency: 'XRP', issuer: '' }
    ];

    var parsedChanges = utils.parseDestinationBalanceChanges(changes);
    
    assert.strictEqual(parsedChanges.value, 2500);
    assert.strictEqual(parsedChanges.currency, 'XRP');
  });

});

