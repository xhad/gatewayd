ExternalTransaction = require("../models/external_transaction.js");
User = require('../models/user.js');
handleError = require("../../lib/action_controller").handleError

module.exports = (function(){
  function forAccount(req, res){
    ExternalTransaction.findAll({ where: { accountId: req.params.accountId }})
    .complete(function(err, transactions){
      if (err) { return handleError(err, res) }
			res.send({ success: true, gatewayTransactions: transactions })
    })
  }

  function createDeposit(req, res) {
    var accountId = req.body.accountId;
    var cashAmount = req.body.cashAmount;
    var currency = req.body.currency;
    var externalAccountId = req.body.externalAccountId;
   
    req.checkBody('accountId', 'invalid accountId').notEmpty();
    req.checkBody('cashAmount', 'invalid cashAmount').notEmpty();
    req.checkBody('currency', 'invalid currency').notEmpty();

    GatewayAccount.find(req.body.account).complete(function(err, account) {
      if (!err && (req.user.admin || (account.userId == req.user.id))) {
        ExternalTransaction.create({
          deposit: true,
          currency: currency, 
          cashAmount: cashAmount,
          accountId: accountId,
        }).complete(function(err, deposit) {
          if (err) { res.send({ success: false, error : err }); return } 
          res.send({ success: true, externalDeposit: deposit });
        })  
      } else {
        res.send({ success: false, error: 'authentication' });
      }
    })
  };

  function userIndex(req, res) {
    User.find(req.params.id).complete(function(err, user) {
      user.externalTransactions(function(err, transactions) {
        res.send({ external_transactions: (transactions || []) });
      });
    });
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
    forAccount: forAccount,
    createDeposit: createDeposit
	}
})();
