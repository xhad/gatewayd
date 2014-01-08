var GatewayAccount = require('../models/gateway_account')
var util = require('util')

module.exports = (function(){
	function userIndex(req, res) {
		GatewayAccount.findAll({ where: { userId: req.params.userId }})
    .complete(function(err, accounts) {
      if (err) {res.send({ error: err }); return }
			res.send(accounts);
    })
  }
  
  function create(req, res) {
		GatewayAccount.create({
			userId: req.params.userId,	
		}).complete(function(err, account){
      if (err) {res.send({ error: err }); return }
			res.send(account)
    })
	}

  function index(req, res) {
    GatewayAccount.findAll()
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
