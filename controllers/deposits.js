var BankTx = require("../models/bank_tx.js");
var util = require('util');

var DepositsCtrl = (function(){ 
	try {
	function index(req, res){
		BankTx.findAll({ where: { deposit: true }})
		.success(function(bank_txs){
			res.send(bank_txs);
		})
		.error(function(err){
			res.send({ error: err });
		});
	}

	function create(req, res, err){
		req.checkBody('bankAccountId', 'Invalid bankAccountId')
			.notEmpty().isInt();
		req.checkBody('currency', 'Invalid currency')
			.notEmpty().isAlpha();
		req.checkBody('cashAmount', 'Invalid cashAmount')
			.notEmpty().isFloat();
		
		var errors = req.validationErrors();
		if (errors) {
			res.send({ error: util.inspect(errors) }, 400)
			return;
		}

		BankTx.create({
			deposit: true,
			currency: req.body.currency,
			cashAmount: req.body.cashAmount,
			bankAccountId: req.body.bankAccountId
		})
		.success(function(transaction){
			// here create corresponding ripple transaction
			res.send({
				status: 'success',
				deposit: transaction,
			});
		})
		.error(function(err){
			res.send({ error: err });
		})
	}
  } catch(e) {
		res.send({ error: e });
	}

  return {
		index: index,
		create: create
  }
})();

module.exports = DepositsCtrl;

