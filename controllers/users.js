var User = require('../models/user'),
		BankAccount = require('../models/bank_account'),
    utils = require('../utils');

module.exports = (function() {
	function index(req, res) {
		User.all().success(function(users) {
			res.send(users);
		});
	}

  function create(req, res) {
		if (req.body.name && req.body.password) {
			var salt = utils.generateSalt();
			var passwordHash = utils.saltPassword(req.body.password, salt);

			var user = User.build({
				name: req.body.name,
				salt: salt,
				passwordHash: passwordHash,
				federationTag: 'federationTag',
				federationName: 'federationName'
			});

			user.save()
			.success(function() {
				// create a bank account for that user
				BankAccount.create({ 
					userId: user.id	
				})
				.success(function(bankAccount){
					user.bankAccount = bankAccount;
					res.send({ status: 'user created', user: user })
				})
				.error(function(err){
					user.destroy().success(function(){
						res.send({ status: 'user not created', error: err });
					});
				});
			})
			.error(function(err) {
				res.send({ status: 'user not created', error: err });
			});
		} else {
			res.send({ error: 'required params: name, password' });
		}
	}
	
	return {
		index: index,
		create: create
	}
})();
