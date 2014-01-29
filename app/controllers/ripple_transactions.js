var RippleTransaction = require('../models/ripple_transaction.js');
var User = require('../models/user.js');
var errorResponse = require("../../lib/utils.js").errorResponse;
var util = require('util');

module.exports = (function(){
  function index(req, res) {
    User.find(req.params.id).complete(function(err, user) {
      user.rippleTransactions(function(err, transactions) {
        res.send({ ripple_transactions: (transactions || []) });
      });
    });
  } 
  
  function update(req, res){
    req.checkBody('txHash', 'Invalid txHash').notEmpty()
    req.checkBody('txState', 'Invalid txStatus').notEmpty()
    if (errors = req.validationErrors()) {
			errorResponse(res)(util.inspect(errors));
    }
    
    RippleTransaction.find(req.params.id).complete(function(err, tx){
      if (err) { res.send({ success: false, error: err}); return false }
      tx.txHash = req.body.txHash  
      tx.txState = req.body.txState
      tx.save().complete(function(err, tx){
        if (err) { res.send({ success: false, error: err}); return false }
        res.send({ success: true, transaction: tx })
      })
    })
  }

  function show(req, res) {
    RippleTransaction.find(req.params.id).complete(function(err, tx){
      if (err) { res.send({ success: false, error: err}); return false }
      res.send({ success: true, transaction: tx })
    })
  }

	function create(req, res) {
    req.checkBody('to_currency', 'Invalid to_currency')
      .notEmpty().isAlphanumeric()
    req.checkBody('from_currency', 'Invalid from_currency')
      .notEmpty().isAlphanumeric()
    req.checkBody('to_amount', 'Invalid to_amount')
      .notEmpty().isDecimal()
    req.checkBody('from_amount', 'Invalid from_amount')
      .notEmpty().isDecimal()
    req.checkBody('to_address', 'Invalid to_address')
      .notEmpty().isAlphanumeric()
    req.checkBody('from_address', 'Invalid from_address')
      .notEmpty().isAlphanumeric()
    req.checkBody('to_issuer', 'Invalid to_isser')
      .notEmpty().isAlphanumeric()
    req.checkBody('from_issuer', 'Invalid from_isser')
      .notEmpty().isAlphanumeric()
    req.checkBody('ripple_address_id', 'Invalid ripple_address_id')
      .notEmpty().isAlphanumeric()
    req.sanitize('issuance').toBoolean()

    var errors = req.validationErrors();
    if (errors) { res.send(util.inspect(errors)); return }

    RippleTransaction.create(req.body).complete(function(err, tx){
      res.send({ ripple_transaction: tx, error: err })
    })
  }

  return {
    update: update,
    create: create,
		index: index,
    show: show
	}
})();
