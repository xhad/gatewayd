var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');
var assert = require('assert');

describe('clear withdrawals', function(){

  before(function(done){
    gateway.data.models.externalTransactions.create({
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
    externalTransaction.destroy().complete(done);
  });

  it('should return unauthorized without credentials', function(done){
    request(app)
      .post('/v1/withdrawals/110/clear')
      .expect(401)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

  it('should return successfully with credentials', function(done){
    request(app)
      .post('/v1/withdrawals/'+externalTransaction.id+'/clear')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });

  it('should return 404 for a nonexistant withdrawal', function(done) {
    request(app)
      .post('/v1/withdrawals/'+999998+'/clear')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(404)
      .end(function(error, response){
        assert.strictEqual(response.body.error.field, 'id');
        assert.strictEqual(response.body.error.message, 'not found');
        done();
      });
  });

  it('should return an error if the withdrawal is already cleared', function(done) {
    request(app)
      .post('/v1/withdrawals/'+externalTransaction.id+'/clear')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(304)
      .end(function(error, response){
        assert.strictEqual(response.body.error.field, 'status');
        assert.strictEqual(response.body.error.message, 'already cleared');
        done();
      });
  });

});

