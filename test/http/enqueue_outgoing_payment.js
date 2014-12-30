var assert = require('assert');
var http = require('supertest');
var gateway = require(__dirname+'/../../');
var expressApp = require(__dirname+'/../../lib/app.js'); 

describe('Enqueue Outgoing Payment HTTP Endpoint', function() {

  before(function() {
    gateway.config.set('BASIC_AUTH', false);
  })

  it('POST /payments/outgoing should enque an outgoing payment', function(done) {
    http(expressApp)
      .post('/v1/payments/outgoing')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .send({
        address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
        currency: 'XAU',
        amount: 1.5,
        destinationTag: 5555,
        to_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
      })
      .expect(200)
      .end(function(error, response) {
        assert(response.body.payment.id > 0);
        assert(response.body.payment.to_address_id > 0);
        assert.strictEqual(response.body.payment.state, 'outgoing');
        assert.strictEqual(response.body.payment.to_issuer, 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk')
        assert.strictEqual(response.body.payment.from_issuer, null)
        assert.strictEqual(response.body.payment.to_amount, 1.5);
        assert.strictEqual(response.body.payment.from_amount, 1.5);
        assert.strictEqual(response.body.payment.to_currency, 'XAU');
        assert.strictEqual(response.body.payment.from_currency, 'XAU');
        assert.strictEqual(response.body.success, true);
        done();
      });
  });

  it('should report an invalid ripple address', function(done) {
    http(expressApp)
      .post('/v1/payments/outgoing')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .send({
        address: '1235343',
        currency: 'XAU',
        amount: 1.5
      })
      .expect(400)
      .end(function(error, response) {
        assert.strictEqual(response.body.success, false);
        assert.strictEqual(response.body.error.field, 'address');
        assert.strictEqual(response.body.error.message, 'invalid ripple address');
        done();
      });
  });

  it('should report an invalid issuer', function(done) {
    http(expressApp)
      .post('/v1/payments/outgoing')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .send({
        address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
        currency: 'XAU',
        amount: 1.5,
        issuer:  '456inv@lid'
      })
      .expect(400)
      .end(function(error, response) {
        assert.strictEqual(response.body.success, false);
        assert.strictEqual(response.body.error.field, 'issuer');
        assert.strictEqual(response.body.error.message, 'invalid ripple address');
        done();
      });
  });

  it('should report an invalid destination tag', function(done) {
    http(expressApp)
      .post('/v1/payments/outgoing')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .send({
        address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
        currency: 'XAU',
        amount: 1.5,
        destinationTag: 'steven'
      })
      .expect(400)
      .end(function(error, response) {
        assert.strictEqual(response.body.success, false);
        assert.strictEqual(response.body.error.field, 'destinationTag');
        assert.strictEqual(response.body.error.message, 'must be an unsigned integer');
        done();
      });
  });

  it('should report an invalid amount', function(done) {
    http(expressApp)
      .post('/v1/payments/outgoing')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .send({
        address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
        currency: 'XAU',
        amount: 'wrench'
      })
      .expect(400)
      .end(function(error, response) {
        assert.strictEqual(response.body.success, false);
        assert.strictEqual(response.body.error.field, 'amount');
        assert.strictEqual(response.body.error.message, 'must be numeric');
        done();
      });
  });

  it('should report an invalid currency', function(done) {
    http(expressApp)
      .post('/v1/payments/outgoing')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .send({
        address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
        currency: '',
        amount: 1.55
      })
      .expect(400)
      .end(function(error, response) {
        assert.strictEqual(response.body.success, false);
        assert.strictEqual(response.body.error.field, 'currency');
        assert.strictEqual(response.body.error.message, 'must be a currency code');
        done();
      });
  });

});

