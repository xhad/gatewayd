var DepositsCtrl = require('../controllers/deposits.js');

var assert = require("assert")
describe('DepositsCtrl', function(){
  describe('#create()', function () {
		var params = {};
		var validRequest = {
		  body: {
				currency: 'XAG',
				cashAmount: 1,
				bankAccountId: 1
			}	
		};

		it('should require currency in the body', function() {
			params= {};
    });

		it('should require cashAmount in the body', function() {
			params= {};
    });

		it('should require a bankAccountId param', function(){
			params= {};
		});

		it('should require a valid bank account relation', function(){

		});

		it('should throw invalid params error', function(){
		   	
    });

		it('should not throw invalid params with valid params', function(){

		});

		it('should create a new deposit with valid params', function(){
			
		});

		it('should create a ripple transaction upon deposit', function(){
			
    });
  });
});

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})
