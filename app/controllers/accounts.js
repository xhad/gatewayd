var GatewayAccount = require('../models/gateway_account')
var util = require('util')

module.exports = (function(){
	function userAccount(req, res) {
		GatewayAccount.find({ where: { userId: req.params.userId }})
    .complete(function(err, account) {
      if (err) {res.send({ success: false, error: err }); return }
			res.send({ success: true, account: account })
    })
  }
  
  function create(req, res) {
		GatewayAccount.create({
			userId: req.params.userId,	
		}).complete(function(err, account){
      if (err) {res.send({ success: false, error: err }); return }
			res.send({ success: true, gatewayAccount: account })
    })
	}

  function index(req, res) {
    GatewayAccount.findAll()
    .complete(function(err, accounts) {
      if (err) {res.send({ success: false, error: err }); return }
			res.send(accounts)
    })
	}

	return {
    userAccount: userAccount,
		create: create,
		index: index
	}
})();
