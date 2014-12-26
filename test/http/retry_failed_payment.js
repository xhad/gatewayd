var supertest = require('supertest');
var gatewayd  = require(__dirname+'/../../');
var assert    = require('assert');

describe('retry failed payment', function(){

  before(function() {
    http = supertest(gatewayd.server)
  });

  before(function(done) {
    gatewayd.data.models.rippleTransactions.create({
      to_currency: 'XAG',
      from_currency: 'XAG',
      to_amount: 10,
      from_amount: 10,
      to_issuer: '',
      from_issuer: '',
      to_address_id: 1,
      from_address_id: 2,
      state: 'failed',
      direction: 'to-ripple'
    }).complete(function(error, transaction){
      rippleTransaction = transaction;
      done();
    });
  })

  after(function(done) {
    rippleTransaction.destroy().complete(done);
  });

  it('should return successfully with credentials', function(done){
    http
      .post('/v1/payments/failed/'+rippleTransaction.id+'/retry')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        if (error) throw error;
        assert.strictEqual(response.body.payment.state, 'outgoing');
        done();
      });
  });

  it('should return an error if the payment is not failed', function(done) {
    http
      .post('/v1/payments/failed/'+rippleTransaction.id+'/retry')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(400)
      .end(function(error, response){
        assert(response.body.error);
        assert(response.body.error.message, 'is not failed');
        assert.strictEqual(response.body.error.field, 'state');
        done();
      });
  });

  it('should return an error if the payment does not exist', function(done) {
    http
      .post('/v1/payments/failed/999998/retry')
      .auth(undefined, gatewayd.config.get('KEY'))
      .expect(404)
      .end(function(error, response){
        assert(response.body.error);
        assert.strictEqual(response.body.error.message, 'does not exist');
        assert.strictEqual(response.body.error.field, 'id');
        done();
      });
  });
});

