var DepositsCtrl = require('../controllers/deposits.js');
var BankTx = require('../models/bank_tx.js');
var BankAccount = require("../models/bank_account.js");
var User = require("../models/user.js");
var uuid = require('node-uuid');

var assert = require("assert")
var sinon = require('sinon');

function createTestUser(cb) {
	var name = uuid.v4();
	var address = uuid.v4();
	User.createWithAddress(
		name,
		'andtheirpassword',
		address,
		function(err, user)	 {
			cb(user);
		}
	)
}

describe('BankTx', function(){
	describe('depositing', function(){
  	it('should fail to create deposit without valid bank account id', function(done){

			bankAccountId = 4;
			
			var count;
			BankTx.findAll()
			.success(function(bankTransactions){
		    count = bankTransactions.count;
				console.log(bankTransactions);
				var tx = BankTx.build({
				  currency: 'XAG',
					bankAccountId: 4,
					cashAmount: 11,
					deposit: true	
				}).save()
				.success(function(bankTx){
					assert(false);
					done();
				})	
				.error(function(err){
					assert(true);
					done();
				});
			});
		});


		it('should success do create deposit with valid account id', function(done){
			createTestUser(function(user){
				BankAccount.create({ userId: user.id}).on('success',function(bankAccount){
					var tx = BankTx.create({
						currency: 'XAG',
						bankAccountId: bankAccount.id,
						cashAmount: 11,
						deposit: true	
					}).on('success', function(bankTx) {
						console.log(bankTx);
						assert(true);
						done();
					}).on('error',function(err){ 
						console.log(err);
						assert(false); 
						done(); 
					});
				}).on('error',function(err){ 
					assert(false); 
					done(); 
				});
			});
		});

		it("should create a ripple transaction with corresponding invoice id", function(done) {
			done();
		});
	})
});
