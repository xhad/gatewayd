var RippleTransaction = require('../models/ripple_transaction.js');
var User = require('../models/user.js');
var errorResponse = require("../../lib/utils.js").errorResponse;
var util = require('util');

module.exports = (function(){
  function index(req, res) {
    if (req.user.admin) {
      RippleTransaction.all().complete(function(err, payments){
        if (err) {
          res.send(500, { error: err });
        } else {
          res.send({ payments: (payments || []) });
        }
      });
    } else {
      req.user.rippleTransactions(function(err, payments) {
        if (err) {
          res.send(500, { error: err });
        } else {
          res.send({ payments: (payments || []) });
        }
      });
    }
  } 
  
  function update(req, res){
    req.checkBody('txHash', 'Invalid txHash').notEmpty()
    req.checkBody('txState', 'Invalid txStatus').notEmpty()
    if (errors = req.validationErrors()) {
      res.send(500, { error: errors });
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
    req.checkBody('to_address_id', 'Invalid to_address').notNull();
    req.checkBody('to_amount', 'Invalid to_amount').isDecimal();
    req.checkBody('to_currency', 'Invalid to_currency').notNull();
    req.checkBody('to_issuer', 'Invalid to_issuer').notNull();
    req.checkBody('from_address_id', 'Invalid from_address').notNull();
    req.checkBody('from_amount', 'Invalid from_amount').isDecimal();
    req.checkBody('from_currency', 'Invalid from_currency').notNull();
    req.checkBody('from_issuer', 'Invalid from_issuer').notNull();

    var errors = req.validationErrors();
    if (errors) { res.send(500, { error: errors }); return }

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
