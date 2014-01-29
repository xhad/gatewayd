var User = require('../models/user'),
    utils = require('../../lib/utils'),
		util = require('util');

module.exports = (function() {
	function index(req, res) {
		User.all().success(function(users) {
			res.send(users);
		});
	}

  function login(req, res) {
    if (req.user) {
      res.json({ success: true, user: req.user })
    } else {
      res.json({ success: false })
    }
  }

  function createAdmin(req, res) {
    User.createAdmin(req.body.email, function(err, admin) {
      console.log(admin)
      if (err) { res.send({ success: false, error: err }); return }
      res.send({ success: true, admin: admin })
    })
  }

  function show(req, res) {
    if (err) { res.send({ success: false }); return false };
    res.send({ success: true, user: user });
  }

  function create(req, res) {
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
      if(err){ res.send({ success: false, error: err }) }   
      ExternalAccount.create({ user_id: user.id, name: "Default" }).complete(function() {
        res.send({ success: true, user: user })
      });
    })
	}
	
	return {
		index: index,
		create: create,
    createAdmin: createAdmin,
    login: login,
    show: show
	}
})();
