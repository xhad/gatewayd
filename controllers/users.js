var User = require('../models/user'),
		BankAccount = require('../models/bank_account'),
    utils = require('../utils'),
		util = require('util');

module.exports = (function() {
	function index(req, res) {
		User.all().success(function(users) {
			res.send(users);
		});
	}

  function create(req, res) {
		req.checkBody('name', 'Invalid name')
			.notEmpty().isAlphanumeric();
		req.checkBody('password', 'Invalid password')
			.notEmpty().isAlphanumeric();
		req.checkBody('rippleAddress', 'Invalid rippleAddress')
			.notEmpty().isAlphanumeric();
		
		var errors = req.validationErrors();
		if (errors) {
			res.send({ error: util.inspect(errors) }, 400)
			return;
		}
		
		User.createWithAddress(
			req.body.name, 
			req.body.password, 
			req.body.rippleAddress,
			function(err, user) {
			  if (err) { utils.errorResponse(res)(err); return }
				BankAccount.create({ userId: user.id })
				.success(function(bankAccount){
					user.bankAccount = bankAccount;
					res.send(user)
				})
				.error(utils.errorResponse(res));
			}
		)
	}
	
	return {
		index: index,
		create: create
	}
})();
