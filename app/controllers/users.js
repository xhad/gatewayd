var User = require('../models/user'),
    GatewayAccount = require("../models/gateway_account"),
    utils = require('../../lib/utils'),
		util = require('util');

module.exports = (function() {
	function index(req, res) {
		User.all().success(function(users) {
			res.send(users);
		});
	}

  function create(req, res) {
    console.log(req.body)
		req.checkBody('name', 'Invalid name')
			.notEmpty().isAlphanumeric();
		req.checkBody('password', 'Invalid password')
			.notEmpty().isAlphanumeric();

    var name = req.body.name;
    var password = req.body.password;
		
		var errors = req.validationErrors();
		if (errors) {
			res.send({ error: util.inspect(errors) }, 400)
			return;
		}
		
		User.createEncrypted({ name: name, password: password }, function(err, user) {
      console.log('user', user)
      if (err) { utils.errorResponse(res)(err); return }
      GatewayAccount.create({ userId: user.id.toString() }).complete(function(err, bankAccount){
        if(err){ res.send({ success: false, error: err }) }
        user.bankAccount = bankAccount;
        res.send({ success: true, user: user, gatewayAccount: bankAccount })
      })
    })
	}
	
	return {
		index: index,
		create: create
	}
})();
