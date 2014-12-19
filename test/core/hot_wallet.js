var assert              = require('assert');
var gatewayd            = require('./../../');
var NoRippleHotWallet   = gatewayd.errors.noRippleHotWallet;
var InvalidRippleSecret = gatewayd.errors.invalidRippleSecret;
var Promise             = require('bluebird');
var supertest           = require('supertest');
var http                = supertest(gatewayd.server);

describe('Hot Wallet', function() {

  before(function(done) {
    gatewayd.data.models.sync(function(){
      done();
    });
  });

  it('should auto-generate a hot wallet on startup', function(done) {
    gatewayd.api.getHotWallet()
      .then(function(hotWallet) {
        assert(gatewayd.validator.isRippleAddress(hotWallet.address));
        assert.strictEqual(hotWallet.type, 'hot');
        done();
      });
  });

  it('should set the hot wallet', function() {
    gatewayd.api.setHotWallet({
      address: 'r96rNRnCKCGD6wbDHFmndHV9fUkdHaZ485',
      secret: 'spzWTm9u4kN1GKVxC9V9FzJMyRTet'
    })
    .then(function(rippleAddress) {
      assert.strictEqual(rippleAddress.type, 'hot'); 
      assert.strictEqual(rippleAddress.address,'r96rNRnCKCGD6wbDHFmndHV9fUkdHaZ485');
    });
  });

  it('should validate hot wallet secret', function(done) {
    gatewayd.api.setHotWallet({
      address: 'r96rNRnCKCGD6wbDHFmndHV9fUkdHaZ485',
      secret: 'xxxxxxxxxxxxxxxxx'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'invalid ripple secret');
      done();
    });
  }); 

  it('should get the hot wallet via http', function(done) {
    http
      .get('/v1/ripple/hot_wallet')
      .end(function(error, response) {
        assert(gatewayd.validator.isRippleAddress(response.body.hot_wallet.address));
        assert.strictEqual(response.body.hot_wallet.secret, 'SECRET');
        done();
      });
  });

  it('should set the hot wallet via http', function(done) {
    http
      .post('/v1/ripple/hot_wallet')
      .send({
        address: 'rJJfCVE78LfvDNeavrCm1ecSko5ZzvgjiY',
        secret: 'sawekoWVx1XZLdpbDcurchFj18a2w'
      })
      .end(function(error, response) {
        assert.strictEqual(response.body.hot_wallet.address, 'rJJfCVE78LfvDNeavrCm1ecSko5ZzvgjiY');
        assert.strictEqual(response.body.hot_wallet.secret, 'SECRET');
        done();
      });
  });

  it('should fail to set the hot wallet via http with invalid secret', function(done) {
    http
      .post('/v1/ripple/hot_wallet')
      .send({
        address: 'rJJfCVE78LfvDNeavrCm1ecSko5ZzvgjiY',
        secret: 'xxxxxxxxxx'
      })
      .end(function(error, response) {
        assert.strictEqual(response.body.error, 'invalid ripple secret');
        done();
      });
  });
});

