var BankAccount = require('../models/bank_account');
var util = require('util');

module.exports = (function(){
	function userIndex(req, res) {
		BankAccount.findAll({ where: { userId: req.params.userId }})
    .success(function(bankAccounts){
			res.send(bankAccounts);
		})
		.error(function(err){
			res.send({ error: err });
		});
  }
  
  function create(req, res) {
		req.checkBody('userId', 'Invalid userId')
			.notEmpty().isInt();
		
		var errors = req.validationErrors();
		if (errors) {
			res.send({ error: util.inspect(errors) }, 400)
			return;
		}

		BankAccount.create({
			userId: parseInt(req.body.userId),	
		})
		.success(function(bankAccount){
			res.send(bankAccount);
		})
		.error(function(err){
			res.send({ error: err });
		});
	}

  function index(req, res) {
    BankAccount.findAll()
		.success(function(bankAccounts){
			res.send(bankAccounts);
		})
		.error(function(err){
			res.send({ error: err });
		})
	}

	return {
		userIndex: userIndex,
		create: create,
		index: index
	}
})();
