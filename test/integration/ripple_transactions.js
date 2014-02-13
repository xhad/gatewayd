var RippleGateway = require('../../lib/http_client.js').Gateway;
var crypto = require('crypto');
var assert = require('assert');
function rand() { return crypto.randomBytes(32).toString('hex'); }

describe('RippleTransactions', function(){
  
  describe('on behalf of a user', function(){

    before(function(done){
      client = new RippleGateway.Client({
        api: 'https://localhost:4000'
      });
      client.user = rand();
      client.secret = rand();
      client.createUser({}, function(err, resp){
        if (err) { throw new Error(err); }
        user = resp;
        done();
      });
    });

    it('should create a payment to a ripple account', function(done){
      var paymentOptions = {
        to_address_id: 2,
        from_address_id: 3,
        to_currency: 'USD',
        to_amount: '1',
        to_issuer: 'rNeSkJhcxDaqzZCAvSfQrxwPJ2Kjddrj4a',
        from_currency: 'USD',
        from_amount: '1',
        from_issuer: 'rNeSkJhcxDaqzZCAvSfQrxwPJ2Kjddrj4a',
      };
      client.sendPayment(paymentOptions, function(err, payment){
        if (err) { throw new Error(err) }
        assert(payment.id > 0);
        done();
      });
    });

    it.skip('should not be able to send a payment to the gateway', function(done){
      done();
    });

    it('should list all payments made to or from a user', function(done){
      client.getPayments(function(err, payments){
        if (err) { throw new Error(err) };
        assert(payments.length >= 0);
        done();
      });
    });

  });

  describe('on behalf of an admin', function(){

    it.skip('should create payment to a ripple account', function(done){
      // POST /payments 
      done();
    });

    it.skip('should list payments sent to or from a hosted wallet', function(done){
      // GET /payments
      done();
    });

    it.skip('should list all payments made to or from all hosted wallets', function(done){
      // GET /payments
      done();
    });

  }); 

});

