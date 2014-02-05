ExternalAccount = require("../models/external_account.js");

module.exports = (function(){
  
	function index(req, res){
    var userId = req.user.admin ? req.body.user_id : req.user.id;
    ExternalAccount.findAll({ where: { user_id: userId }}).complete(function(err, accounts) {
      res.send({ external_accounts: accounts || [] });
    }); 
	}

  function create(req, res) { 
    var userId = req.user.admin ? req.body.user_id : req.user.id;
    ExternalAccount.create({
      name: req.body.name,
      user_id: userId
    }).complete(function(err, account) {
      res.send({ error: err, account: account });
    });
  }

  return {
		index: index,
    create: create
	}
})();
