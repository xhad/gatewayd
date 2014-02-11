var RippleGateway = require('../../lib/http_client.js').Gateway;
var crypto = require('crypto');
var assert = require('assert');
function rand() { return crypto.randomBytes(32).toString('hex'); }

describe('RippleTransactions', function(){
  
  describe('on behalf of a user', function(){

    it.skip('should create a payment to a ripple account', function(){
      // POST /payments  
      done();
    });

    it.skip('should not be able to send a payment to the gateway', function(){
      // POST /payments  
      done();
    });

    it.skip('should list all payments made to or from a user', function(){
      // GET /payments
      done();
    });

  });

  describe('on behalf of an admin', function(){

    it.skip('should create payment to a ripple account', function(){
      // POST /payments 
      done();
    });

    it.skip('should list payments sent to or from a hosted wallet', function(){
      // GET /payments
      done();
    });

    it.skip('should list all payments made to or from all hosted wallets', function(){
      // GET /payments
      done();
    });

  }); 

});

