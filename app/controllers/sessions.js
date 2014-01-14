var User = require('../models/user.js'),
    utils   = require('../../lib/utils.js');

module.exports = (function(){
	function destroy(req, res) {
    req.session = null
		res.send({
      success: true,
			session: req.session
		})
	}

	function create(req, res) {
		req.session.session = null
		var user, valid
		if (req.body.name && req.body.password) {
			User.findAll({ where: { name: req.body.name }})
			.error(function(err){
				res.send({ error: 'user not found' })
			})
			.success(function(results){
				user = results[0]
				if (user) {
					valid = utils.verifyPassword(req.body.password, user.salt, user.passwordHash)
					if (valid) {
						req.session.username = user.name
            req.session.username = user.name
            res.send({ success: true, session: { username: user.name } })
					}
				} else {
					res.send({ error: 'user not found' })
				}
			})
		} else {
			res.send({ error: 'required params: name, password' })
		}
	}

  function show(req, res) {
    res.send({
      success: true,
      session: { username: req.session.username }
    })
  }
	
	return {
		create: create,
		destroy: destroy,
    show: show
	}
})()
