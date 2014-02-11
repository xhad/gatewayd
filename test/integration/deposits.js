var RippleGateway = require('../../lib/http_client.js').Gateway;
var crypto = require('crypto');
var assert = require('assert');
function rand() { return crypto.randomBytes(32).toString('hex'); }

describe('Deposits', function(){
  
  describe('user', function(){

    it.skip('should create a deposit to a hosted wallet on behalf of a user', function(){
      // POST /deposits  
      done();
    });

    it.skip('should list deposits made to a hosted wallet on behalf of a user', function(){
      // GET /deposits
      done();
    });

  });

  describe('admin', function(){

    it.skip('should create deposit for a hosted wallet given a user', function(){
      // POST /deposits 
      done();
    });

    it.skip('should list deposits made to a hosted wallet given a user', function(){
      // GET /deposits
      done();
    });

    it.skip('should list all deposits made to all hosted wallets', function(){
      // GET /deposits
      done();
    });

  }); 

});
