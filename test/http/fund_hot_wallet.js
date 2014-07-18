var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');
var assert = require('assert');
var SECRET = process.env.RIPPLE_ACCOUNT_SECRET;

describe('fund hot wallet', function(){

  it('should return unauthorized without credentials', function(done){
    request(app)
      .post('/v1/wallets/hot/fund')
      .expect(401)
      .end(function(err){
        if (err) throw err;
        done();
      });
  });
  if (SECRET) {
    it('should return successfully with credentials', function(done){
      this.timeout(10000);

      var payment = {
        amount: 1,
        currency: 'XRP',
        secret: SECRET
      };

      request(app)
        .post('/v1/wallets/hot/fund')
        .send(payment)
        .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
        .expect(200)
        .end(function(error, resp){
          var paymentResponse = resp.body;
          assert.strictEqual(paymentResponse.hot_wallet.source_account, gateway.config.get('COLD_WALLET'));
          assert.strictEqual(paymentResponse.hot_wallet.destination_account, gateway.config.get('HOT_WALLET').address);
          assert.strictEqual(paymentResponse.hot_wallet.destination_amount.currency, payment.currency);
          done();
        });
    });
  }

});

