var User = require('../models/user'),
		Account = require('../models/account'),
    utils = require('../../lib/utils'),
		util = require('util');

module.exports = (function() {
	function account(req, res) {
    Account.find({where: {
      userId: req.params.userId
    }}).complete(function(err, account){
      if (err) {  account = [] }
      res.send(account)
    })
	}

  function create(req, res) {
		req.checkBody('name', 'Invalid name')
			.notEmpty().isAlphanumeric();
		req.checkBody('password', 'Invalid password')
			.notEmpty().isAlphanumeric();
		
		var errors = req.validationErrors();
		if (errors) {
			res.send({ error: util.inspect(errors) }, 400)
			return;
		}

    var salt = utils.generateSalt()
    var password = req.body.password
    var passwordHash = utils.saltPassword(password, salt)

    var user = User.createEncrypted(req.body.name, password, function(err, user){
      if (err) { res.send({ error: err }); return }
      res.send(user)
    })
	}
	
	return {
		account: account,
		create: create
	}
})();
