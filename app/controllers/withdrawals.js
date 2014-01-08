var BankTransaction = require("../models/bank_tx.js");
var Balance = require('../models/balance')
var BigNumber = require("bignumber.js")
var BankTx = require("../models/bank_tx")
var errorResponse = require("../../lib/utils").errorResponse; 
var util = require('util')

module.exports = (function(){
	function index(req, res) {
    BankTransaction.findAll({ where: { deposit: false }})
		.success(function(bankTransactions){
			res.send(bankTransactions);
		})
		.error(function(err){
			res.send({error: err});
		})
	}

  function create(req, res) {
		req.checkParams('accountId', 'Invalid accountId')
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

		Balance.findOrCreateByCurrencyAndBankAccountId(
			req.params.accountId, 
			req.body.currency, 
		function(err, balance) {
			if (err) { errorResponse(res)(err) }
      diff = new BigNumber(req.body.cashAmount)
      amount = new BigNumber(balance.amount)
      if (amount.minus(diff) < 0) { errResponse(res)({ error: 'insuffiencient funds' })}
			BankTx.create({
				deposit: false,
				currency: req.body.currency,
				cashAmount: req.body.cashAmount,
				accountId: req.params.accountId,
				balanceId: balance.id
			})
			.success(function(transaction){
        prev = new BigNumber(balance.amount)
        diff = new BigNumber(req.body.cashAmount)
        console.log('new', prev.minus(diff).toString())
				balance.updateAttributes({
					amount: prev.minus(diff).toString()
				})
				.success(function(){
          res.send({
            success: true,
            withdrawal: transaction
          });
				}).error(errorResponse(res));
			}).error(errorResponse(res));
    })
	} 

  return {
		create: create,
		index: index
  }
})();
