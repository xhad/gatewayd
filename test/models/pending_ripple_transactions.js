var PendingRippleTransaction = require("../models/pending_ripple_transaction");
var RippleTransaction = require('../models/ripple_transaction.js');

var assert = require("assert")
var sinon = require('sinon');

describe('Pending Transaction', function(){
	describe('creating a valid record', function(){
		beforeEach(function(done){
			PendingRippleTransaction.destroy().success(done);
		});
		it('should save with a ripple transaction id', function(done){
			PendingRippleTransaction.create({ 
				rippleTransactionId: 1,
				initialStatus: 'submitted' 
			})
			.success(function(){
				assert(true);	
				done();
			})
			.error(function(err){
				assert(false);
				done();
			});
		});

  	it('should not save without a ripple transaction id', function(done) {
			PendingRippleTransaction.create({
				initialStatus: 'submitted'
			})
			.success(function(){
				assert(false);	
				done();
			})
			.error(function(err){
				assert(true);
				done();
			});
		});

		it('should not save without an initial status', function(done) {
			PendingRippleTransaction.create({
				rippleTransactionId: 1
			})
			.success(function(){
				assert(false);	
				done();
			})
			.error(function(err){
				assert(true);
				done();
			});
		});
	
		it('should not be able to create two pending with the same ripple tx', function(done){
			PendingRippleTransaction.create({
				rippleTransactionId: 1,
				initialStatus: 'submitted'
			})
			.success(function(){ 
				PendingRippleTransaction.create({
					rippleTransactionId: 1,
					initialStatus: 'submitted'
				})
				.success(function(){ assert(false); done();})
				.error(function(){ assert(true); done(); });
		  })	
			.error(function(){
				assert(false); done();
			});
		});
	});
});
