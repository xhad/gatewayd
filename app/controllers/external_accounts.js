ExternalTransaction = require("../models/external_transaction.js");
handleError = require("../../lib/action_controller").handleError

module.exports = (function(){
  function forAccount(req, res){
    ExternalTransaction.findAll({ where: { accountId: req.params.accountId }})
    .complete(function(err, transactions){
      if (err) { return handleError(err, res) }
			res.send({ success: true, gatewayTransactions: transactions })
    })
  }

	function userIndex(req, res){
    ExternalTransaction.findAll({ where: { accountId: req.body.userId }})
    .complete(function(err, transactions){
      if (err) { return handleError(err, res) }
			res.send({ success: true, gatewayTransactions: transactions })
    })
	}

	function index(req, res) {
    ExternalTransaction.findAll()
    .complete(function(err, transactions){
      if (err) { return handleError(err, res) }
			res.send({ success: true, gatewayTransactions: transactions })
    })
	}

  return {
		userIndex: userIndex,
		index: index,
    forAccount: forAccount
	}
})();
