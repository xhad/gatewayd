var DepositsCtrl = require('../controllers/deposits.js');
var BankTx = require('../models/bank_tx.js');

var assert = require("assert")
var sinon = require('sinon');

describe('BankTx', function(){
	describe('depositing', function(){
  	it('should require a valid bank account', function(done){
			var count;
			BankTx.findAll()
			.success(function(bankTransactions){
		    count = bankTransactions.count;
				var tx = BankTx.build({
				  currency: 'XAG',
					bankAccountId: 4,
					cashAmount: 11,
					deposit: true	
				}).save()
				.success(function(bankTx){
					assert(true);
					done();
				})	
				.error(function(err){
					assert(false);
					done();
				});
			});
		
		});
	})
});
