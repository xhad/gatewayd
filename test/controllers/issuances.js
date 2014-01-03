var PendingRippleTransaction = require("../../models/pending_ripple_transaction");
var IssuancesCtrl = require("../../controllers/issuances.js");

var assert = require("assert")
var sinon = require('sinon');

describe('Creating Issuances', function(){
  it('should handle requesets for issuances', function(done){
		var res = sinon.spy();
		var req = sinon.spy();
	  IssuancesCtrl.create(req, res);
		assert(res.called);
		done();
	});
  it('should try to create a ripple transaction', function(done){
		var res = sinon.spy();
		var req = sinon.spy();
		PendingRippleTransaction.create = sinon.spy();
	  IssuancesCtrl.create(req, res);
		assert(PendingRippleTransaction.create.called);
		assert(res.called);
		done();
	});
});
