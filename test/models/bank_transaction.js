var BankTx = require("../models/bank_tx.js");
var uuid = require("node-uuid");

describe("BankTx", function (){
	function buildDeposit(cb) {
    BankTx.create({
			deposit: true
		}).success(cb);
  }

	it('#createDeposit should set deposit to true', function(){

	});

	it('#createDeposit should find or create a balance', function(){

	});
});

