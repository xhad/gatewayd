var RippleTransaction = require('../models/ripple_transaction.js');
var Balance = require('../models/balance.js');
var errorResponse = require("../../lib/utils.js").errorResponse;
var util = require('util');

module.exports = (function(){
  function withdraw(req, res) {

  }
  function index(req, res){

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
		// assert(toAddress == theGatewaysAddress);
		req.body.issuance = false;	

    req.checkBody('sourceTag', 'Invalid sourceTag')
      .notEmpty().isAlphanumeric()
    req.checkBody('toCurrency', 'Invalid toCurrency')
      .notEmpty().isAlphanumeric()
    req.checkBody('fromCurrency', 'Invalid fromCurrency')
      .notEmpty().isAlphanumeric()
    req.checkBody('toAmount', 'Invalid toAmount')
      .notEmpty().isDecimal()
    req.checkBody('fromAmount', 'Invalid fromAmount')
      .notEmpty().isDecimal()
    req.checkBody('txState', 'Invalid transactionState')
      .notEmpty().is('tesSUCCESS')
    req.checkBody('txHash', 'Invalid transactionHash')
      .notEmpty().isAlphanumeric()
    req.checkBody('toAddress', 'Invalid toAddress')
      .notEmpty().isAlphanumeric()
    req.checkBody('fromAddress', 'Invalid fromAddress')
      .notEmpty().isAlphanumeric()
    req.checkBody('deposit', 'Must have deposit Boolean')
      .isBoolean()
        
    var errors = req.validationErrors();
    if (errors) {
			errorResponse(res)(util.inspect(errors));
    }

		Balance.findOrCreateByCurrencyAndBankAccountId(
			req.body.destinationTag, req.body.toCurrency, function(err, balance) {
			if (err) {
				errorResponse(res)(err);
			} else {
				RippleTransaction.createIncomingWithBalance(balance, req.body, function(err, tx){
					if (err) { errorResponse(res)(err) }
					res.send(tx);
				});
			}
		})
  }

  return {
    update: update,
		index: index,
    show: show
	}
})();
