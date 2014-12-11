const gatewayd = require(__dirname+'/../../');
const RippleAddress = gatewayd.models.rippleAddresses;
const assert = require('assert');

describe('ripple_addresses model', function() {
  var rippleAddress;
  const HASH = 'alj2o3ij3n21ljn2';
  before(function(done) {
    RippleAddress.findOrCreate({
      type: 'independent',
      managed: false,
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    })
    .then(function(address) {
      rippleAddress = address;
      done();
    });
  });

  it('should set the last payment hash', function(done) {
    rippleAddress.setLastPaymentHash(HASH)
    .then(function() {
      assert.strictEqual(rippleAddress.data.lastPaymentHash, HASH);
      done();
    });
  });

  it('should get the last payment hash', function() {
    assert.strictEqual(rippleAddress.getLastPaymentHash(), HASH);
  });

  it('should reject an invalid address', function() {
    RippleAddress.findOrCreate({
      type: 'independent',
      managed: false,
      address: 'r4EwBWxrx5HxYRy11111isfGzMto3AT8FZiYdWk'
    })
    .error(function(error) {
      assert.strictEqual(error.address[0], 'Only valid Ripple public addresses allowed');
    });
  });

  after(function(done) {
    rippleAddress.destroy().then(done);
  });
});


