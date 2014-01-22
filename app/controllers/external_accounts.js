ExternalAccount = require("../models/external_account.js");

module.exports = (function(){
  
	function index(req, res){
    ExternalAccount.find({ where: { user_id: req.params.id }}).complete(function(err, accounts) {
      res.send({ external_accounts: accounts || [] });
    }); 
	}

  function create(req, res) { 
    ExternalAccount.create({
      name: req.body.name,
      user_id: req.params.id
    }).complete(function(err, account) {
      res.send({ error: err, account: account });
    });
  }

  return {
		index: index
	}
})();
