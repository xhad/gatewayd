var BankTx = require("../models/bank_tx.js");
var Balance = require("../models/balance.js");
var util = require('util');
var errorResponse = require("../utils").errorResponse;


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

		// look up the account's balance for this curency
		Balance.findOrCreateByCurrencyAndBankAccountId(
			req.body.bankAccountId, 
			req.body.currency, 
		function(err, balance) {
			if (err) { errorResponse(res)(err) }
			BankTx.create({
				deposit: true,
				currency: req.body.currency,
				cashAmount: req.body.cashAmount,
				bankAccountId: req.body.bankAccountId,
				balanceId: balance.id
			})
			.success(function(transaction){
				balance.updateAttributes({
					amount: (parseFloat(balance.amount) + parseFloat(req.body.cashAmount))
				})
				.success(function(){
					// create corresponding ripple transaction
					res.send({
						status: 'success',
						deposit: transaction,
					});
				}).error(errorResponse(res));
			})
			.error(errorResponse(res));
		});
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

