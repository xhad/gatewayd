var User = require('../models/user'),
		GatewayAccount = require('../models/gateway_account'),
    utils = require('../../lib/utils'),
		util = require('util');

module.exports = (function() {
	function account(req, res) {
    GatewayAccount.find({where: {
      userId: req.params.userId
    }}).complete(function(err, account){
      if (err) {  res.send({ success: false }) }
      res.send({ success: true, gatewayAccount: account[0] })
    })
	}

  function create(req, res) {
		req.checkBody('name', 'Invalid name').notEmpty().isAlphanumeric()
		req.checkBody('password', 'Invalid password').notEmpty().isAlphanumeric()
		
		var errors = req.validationErrors();
		if (errors) {
			res.send({ error: util.inspect(errors) }, 400)
			return;
		}

    var user = User.createEncrypted({ name: req.body.name, password: req.body.password }, function(err, user){
      if (err) { res.send({ error: err }); return }
      res.send({ success: true, user: user })
    })
	}
	
	return {
		account: account,
		create: create
	}
})();
