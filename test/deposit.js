var gateway = require('../lib/gateway.js');
var assert = require('assert');

describe("depositing an asset", function() {

  it("should first record a deposit", function(fn) {

    var opts = {
      external_account_id: 1,
      amount: 2.1,
      currency: 'XAG'
    }
    
    gateway.deposits.record(opts, function(err, deposit) { 

      assert(!err);
      assert(deposit.id > 0);
      assert(deposit.external_account_id == 1);
      assert(deposit.amount == 2.1);
      assert(deposit.currency == 'XAG');
      assert(deposit.status == 'queued');
      fn();

    });

  });  

  it('should list recorded deposits', function(fn) {
    
    gateway.deposits.listQueued(function(err, deposits) {

      assert(!err);
      assert(Array.isArray(deposits));
      assert(deposits.length > -1);
      
      if (deposits[0]) {

        assert(deposits[0].status == 'queued');

      }
      
      fn();
      
    });

  });

  it('should finalize a deposit', function(fn) {

    var opts = {
      external_account_id: 1,
      amount: 2.1,
      currency: 'XAG'
    }
    
    gateway.deposits.record(opts, function(err, deposit) { 

      var opts = {
        id: deposit.id,
        ripple_transaction_id: 1 
      };
  
      gateway.deposits.finalize(opts, function(err, deposit) {

          assert(!err);
          assert(deposit.ripple_transaction_id == 1); 
          assert(deposit.status == 'processed');
          fn();

      });

    });

  });

});

