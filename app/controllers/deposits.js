ExternalTransaction = require("../models/external_transaction.js");
User = require('../models/user.js');

module.exports = (function(){
  function index(req, res) {
    if (req.user.admin) {
      ExternalTransaction.findAll({ where: { deposit: true }})
        .complete(function(err, transactions) {
          res.send({ deposits: transactions });
      });
    } else {
      ExternalTransaction.findAll({ where: { deposit: true, user_id: req.user.id }})
        .complete(function(err, deposits){
          res.send({ depsoits: deposits });
      });
    }
  }

  function create(req, res) {
    console.log("in the deposits controller");
    req.checkBody('cash_amount', 'invalid cash_amount').notEmpty();
    req.checkBody('currency', 'invalid currency').notEmpty();
    req.checkBody('external_account_id', 'invalid external_account_id').notEmpty();
    req.checkBody('deposit', 'invalid deposit boolean').notEmpty();
    req.checkBody('user_id', 'invalid user_id').notEmpty();
    if (errors = req.validationErrors()) {
      res.send({ error: errors }); return;
    }

    ExternalTransaction.create({
      deposit: true,
      currency: req.body.currency,
      cash_amount: req.body.cash_amount,
      external_account_id: req.body.external_account_id,
    }).complete(function(err, transaction) {
      res.send({ error: err, external_transaction: transaction });
    });
  };

  return {
		index: index,
    create: create
	}
})();
