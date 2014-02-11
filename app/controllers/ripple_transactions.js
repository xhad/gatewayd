var RippleTransaction = require('../models/ripple_transaction.js');
var User = require('../models/user.js');
var errorResponse = require("../../lib/utils.js").errorResponse;
var util = require('util');

module.exports = (function(){
  function index(req, res) {
    req.user.rippleTransactions(function(err, payments) {
      if (err) {
        res.send(500, { error: err });
      } else {
        res.send({ payments: (payments || []) });
      }
    });
  } 
  
  function update(req, res){
    req.checkBody('txHash', 'Invalid txHash').notEmpty()
    req.checkBody('txState', 'Invalid txStatus').notEmpty()
    if (errors = req.validationErrors()) {
			errorResponse(res)(util.inspect(errors));
    }
    
    RippleTransaction.find(req.params.id).complete(function(err, payment){
      if (err) { 
        res.send(500, { error: err}); 
      } else {
        payment.tx_hash = req.body.txHash  
        payment.tx_state = req.body.txState
        payment.save().complete(function(err, tx){
          if (err) { 
            res.send(500, { error: err});
          } else {
            res.send({ payment: payment });
          }
        })
      }
    })
  }

  function show(req, res) {
    RippleTransaction.find(req.params.id).complete(function(err, tx){
      if (err) { 
        res.send(500, { error: err });
      } else { 
        res.send({ payment: payment })
      }
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

    RippleTransaction.create(req.body).complete(function(err, payment){
      if (err) {
        res.send(500, { error: err });
      } else {
        res.send({ payment: payment })
      }
    })
  }

  return {
    update: update,
    create: create,
		index: index,
    show: show
	}
})();
