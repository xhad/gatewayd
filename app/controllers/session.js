var User = require('../models/user.js'),
    utils   = require('../../lib/utils.js');

module.exports = (function(){
	function index(req, res) {
		res.send({
			session: req.session.session
		});
	}

	function create(req, res) {
		req.session.session = null;
		var user, valid;
		if (req.body.username && req.body.password) {
      console.log(req.body)
			User.findAll({ where: { name: req.body.username }})
			.error(function(err){
				res.send({ success: false, error: 'user not found' });
			})
			.success(function(results){
				user = results[0];
				if (user) {
					valid = utils.verifyPassword(req.body.password, user.salt, user.passwordHash);
					if (valid) {
						req.session.session = user.id;
					}
					res.send({ success: true, session: { username: user.name }});
				} else {
					res.send({ success: false, error: 'user not found' });
				}
			});
		} else {
			res.send({ success: false, error: 'required params: name, password' });
		}
	}
	
	return {
		create: create,
		index: index
	}
})();
