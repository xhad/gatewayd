var Account = require('../models/account')
var util = require('util')

module.exports = (function(){
	function userIndex(req, res) {
		Account.findAll({ where: { userId: req.params.userId }})
    .complete(function(err, accounts) {
      if (err) {res.send({ error: err }); return }
			res.send(accounts);
    })
  }
  
  function create(req, res) {
		req.checkBody('userId', 'Invalid userId')
			.notEmpty().isInt()
		
		var errors = req.validationErrors()
		if (errors) {
			res.send({ error: util.inspect(errors) }, 400)
			return
		}

		Account.create({
			userId: parseInt(req.body.userId),	
		}).complete(function(err, account){
      if (err) {res.send({ error: err }); return }
			res.send(account)
    })
	}

  function index(req, res) {
    Account.findAll()
    .complete(function(err, accounts) {
      if (err) {res.send({ error: err }); return }
			res.send(accounts)
    })
	}

	return {
		userIndex: userIndex,
		create: create,
		index: index
	}
})();
