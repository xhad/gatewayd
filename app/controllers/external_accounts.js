ExternalTransaction = require("../models/external_transaction.js");
handleError = require("../../lib/action_controller").handleError

module.exports = (function(){
	function userIndex(req, res){
    ExternalAccount.create({
      name: req.body.name,
      user_id: req.user.id,
    }).complete(function(err, externalAccount) {
      console.log('error', err);
      res.send({ success: true, externalAccount: externalAccount });
    });
	}

	function index(req, res) {
    if (req.user.admin) {
      ExternalTransaction.findAll()
      .complete(function(err, transactions){
        if (err) { return handleError(err, res) }
        res.send({ success: true, gatewayTransactions: transactions })
      })
    } else { res.status(401); }
	}

  return {
		userIndex: userIndex,
		index: index
	}
})();
