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
    req.validate('to_address', 'isAlphanumeric');
    req.validate('to_amount', 'isAlphanumeric');
    req.validate('to_currency', 'isAlphanumeric');
    req.validate('to_isser', 'isAlphanumeric');
    req.validate('from_address', 'isAlphanumeric');
    req.validate('from_amount', 'isAlphanumeric');
    req.validate('from_currency', 'isAlphanumeric');
    req.validate('from_issuer', 'isAlphanumeric');
    req.validate('ripple_address_id', 'isAlphanumeric');

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
