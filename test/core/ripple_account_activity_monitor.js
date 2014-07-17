var assert = require('assert');
var RippleAccountActivityMonitor = require(__dirname+'/../../lib/core/ripple_account_activity_monitor.js');
var RippleRestClient = require('ripple-rest-client');

var RIPPLE_TRANSACTION_HASH = 'B5A55258763E55418CD75907F3D2CD887EB603BE7C19A5099871312C813072DD';
var RIPPLE_ACCOUNT = 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk';

describe('Ripple Account Activity Monitor', function() {

  describe('a valid ripple account activity monitor', function() {
  });

  describe('an invalid ripple account activity monitor', function() {
  });

  it('should accept a ripple address to monitor', function() {
    var accountMonitor = new RippleAccountActivityMonitor({
      rippleAccount: RIPPLE_ACCOUNT
    });
    assert(accountMonitor instanceof RippleAccountActivityMonitor);
  });

  it('should validate the ripple address', function() {
    var rippleAccountError;
    try {
      var accountMonitor = new RippleAccountActivityMonitor({
        rippleAccount: 'rinvalidhwBWxryisfGzM'
      });
    } catch(error) {
      rippleAccountError = error;
    }
    assert(rippleAccountError instanceof  Error);
    assert.strictEqual(rippleAccountError.toString(), 'Error: valid rippleAccount required');
  });

  it('should accept a transaction hash after which to begin monitoring', function() {
    var accountMonitor = new RippleAccountActivityMonitor({
      rippleAccount: RIPPLE_ACCOUNT,
      previousTransactionHash: RIPPLE_TRANSACTION_HASH
    });
    assert.strictEqual(accountMonitor.previousTransactionHash, RIPPLE_TRANSACTION_HASH);
  });

  it('should include a Ripple REST client configured for the account', function(done) {
    var accountMonitor = new RippleAccountActivityMonitor({
      rippleAccount: RIPPLE_ACCOUNT,
      previousTransactionHash: RIPPLE_TRANSACTION_HASH
    });
    assert(accountMonitor.rippleRestClient instanceof RippleRestClient);
    assert.strictEqual(accountMonitor.rippleRestClient.account, RIPPLE_ACCOUNT);
    done();
  });

  it('should get the most recent transaction hash if not provided', function(done) {
    var accountMonitor = new RippleAccountActivityMonitor({
      rippleAccount: RIPPLE_ACCOUNT,
      previousTransactionHash: RIPPLE_TRANSACTION_HASH
    });
    accountMonitor._getMostRecentTransactionHash(function(error, transactionHash) {
      assert(!error);
      assert.strictEqual(transactionHash, RIPPLE_TRANSACTION_HASH);
      assert(transactionHash);
      done();
    });
  });

});

