var RippleTransaction = require('../models/ripple_transaction.js');
var Balance = require('../models/balance.js');
var errorResponse = require("../utils.js").errorResponse;
var util = require('util');

module.exports = (function(){

  function userIndex(req, res) {
		RippleAddress.findAll({ where: { userId: req.params.userId }})
		.success(function(rippleAddresses){
			rippleAddressIds = [];
			rippleAddresses.forEach(function(address){ 
				rippleAddressIds.push(address.id)
			});
			RippleTransaction.findAll({ where: { id: rippleAddressIds }})
			.success(function(rippleTransactions){
			  res.send(rippleTransactions);	
			})
			.error(function(err){
				res.send({ error: err });	
			});
		})
		.error(function(){
			res.send({ error: err });
		});
	}
  
  function index(req, res){
    RippleTransaction.findAll()
		.success(function(transactions){
			res.send(transactions);
		})
		.error(function(err){
			res.send({ error: err });
		});
  }

	// Create a new record of a successful ripple transaction to the gateway
	function createInbound(req, res) {
		// assert(toAddress == theGatewaysAddress);
		console.log(req.body);
		req.body.issuance = false;	

    req.checkBody('destinationTag', 'Invalid destinationTag')
      .notEmpty().isAlphanumeric();
    req.checkBody('toCurrency', 'Invalid toCurrency')
      .notEmpty().isAlphanumeric();
    req.checkBody('fromCurrency', 'Invalid fromCurrency')
      .notEmpty().isAlphanumeric();
    req.checkBody('toAmount', 'Invalid toAmount')
      .notEmpty().isDecimal();
    req.checkBody('fromAmount', 'Invalid fromAmount')
      .notEmpty().isDecimal();
    req.checkBody('txState', 'Invalid transactionState')
      .notEmpty().is('tesSUCCESS');
    req.checkBody('txHash', 'Invalid transactionHash')
      .notEmpty().isAlphanumeric();
    req.checkBody('toAddress', 'Invalid toAddress')
      .notEmpty().isAlphanumeric();
    req.checkBody('fromAddress', 'Invalid fromAddress')
      .notEmpty().isAlphanumeric();
        
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
    userIndex: userIndex,
		createInbound: createInbound,
		index: index
	}
})();
