ExternalAccount = require("../models/external_account.js");
handleError = require("../../lib/action_controller").handleError

module.exports = (function(){
  
	function userIndex(req, res){
    ExternalAccount.find({ where: { user_id: req.params.id }}).complete(function(err, accounts) {
      res.send({ external_accounts: accounts || [] });
    }); 
	}

  return {
		userIndex: userIndex
	}
})();
