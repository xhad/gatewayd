var gatewayd  = require(__dirname+'/../../');
var supertest = require('supertest');
var assert    = require('assert');

describe('clear withdrawals', function(){

  before(function() { 
    http = supertest(gatewayd.server);
  });

  before(function(done){
    gatewayd.data.models.externalTransactions.create({
      external_account_id: 1,
      amount: 10,
      currency: 'XAG',
      deposit: false 
    }).complete(function(error, transaction) {
      externalTransaction = transaction;
      done();
    });
  });

  after(function(done) {
    if (externalTransaction) {
      externalTransaction.destroy().complete(done);
    } else { done() }
  });

  it.skip('should return successfully with credentials', function(done){
    http
      .post('/v1/withdrawals/'+externalTransaction.id+'/clear')
      .auth(gatewayd.config.get('KEY'), '')
      .expect(200)
      .end(function(error, response){
        assert(!error);
        done();
      });
  });

  it.skip('should return 404 for a nonexistant withdrawal', function(done) {
    http
      .post('/v1/withdrawals/999998/clear')
      .auth(gatewayd.config.get('KEY'), '')
      .end(function(error, response){
        assert.strictEqual(response.statusCode, 404);
        done();
      });
  });

  it.skip('should return an error if the withdrawal is already cleared', function(done) {
    http
      .post('/v1/withdrawals/'+externalTransaction.id+'/clear')
      .auth(gatewayd.config.get('KEY'), '')
      .expect(304)
      .end(function(error, response){
        assert.strictEqual(response.body.error.field, 'status');
        assert.strictEqual(response.body.error.message, 'already cleared');
        done();
      });
  });

});

