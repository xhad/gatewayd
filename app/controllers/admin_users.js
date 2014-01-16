var User = require('../models/user'),
    GatewayAccount = require("../models/gateway_account"),
    utils = require('../../lib/utils'),
		util = require('util');

module.exports = (function() {
  function create(req, res) {
		req.checkBody('email', 'Invalid email').notEmpty()
		
		var errors = req.validationErrors()
		if (errors) {
			res.send({ error: util.inspect(errors) }, 400)
			return
		}
		
		User.createAdmin(req.body.email, function(err, admin) {
      if (err) { res.send({ success: false, error : err }); return false }
      res.send({ success: true, user: admin })
    })
	}
	
	return {
		create: create
	}
})();
