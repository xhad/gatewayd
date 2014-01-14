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
		req.checkBody('name', 'Invalid name')
			.notEmpty().isAlphanumeric();
		req.checkBody('password', 'Invalid password')
			.notEmpty().isAlphanumeric();
		//req.checkBody('rippleAddress', 'Invalid rippleAddress')
  	//	.notEmpty().isAlphanumeric();
		
		var errors = req.validationErrors();
		if (errors) {
			res.send({ error: util.inspect(errors) }, 400)
			return;
		}
		
		User.createEncrypted(req.body.name, req.body.password, function(err, user) {
      console.log('user', user)
      if (err) { utils.errorResponse(res)(err); return }
      GatewayAccount.create({ userId: user.id }).complete(function(err, bankAccount){
        if(err){ res.send({ success: false, error: err }) }
        user.bankAccount = bankAccount;
        res.send({ success: true, user: user })
      })
    })
	}
	
	return {
		index: index,
		create: create
	}
})();
