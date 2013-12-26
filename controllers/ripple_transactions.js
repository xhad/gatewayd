var RippleTransactions = require('../models/ripple_transaction.js');
var errorResponse = require("../utils.js").errorResponse;

module.exports = (function(){

  function userIndex(req, res) {
		RippleAddress.findAll({ where: { userId: req.params.userId }})
		.success(function(rippleAddresses){
			rippleAddressIds = [];
			rippleAddresses.forEach(function(address){ 
				rippleAddressIds.push(address.id)
			});
			RippleTransactions.findAll({ where: { id: rippleAddressIds }})
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
    RippleTransactions.findAll()
		.success(function(transactions){
			res.send(transactions);
		})
		.error(function(err){
			res.send({ error: err });
		});
  }

	// Create a new record of a successful ripple transaction to the gateway
	function createInbound() {
		// assert(toAddress == theGatewaysAddress);
		
		var req.body.issuance = false;	
    req.checkBody('destinationTag', 'Invalid destinationTag')
      .notEmpty().isAlphaNumeric();
    req.checkBody('toCurency', 'Invalid toCurrency')
      .notEmpty().isAlphaNumeric();
    req.checkBody('fromCurrency', 'Invalid fromCurrency')
      .notEmpty().isAlphaNumeric();
    req.checkBody('toAmount', 'Invalid toAmount')
      .notEmpty().isDecimal();
    req.checkBody('fromAmount', 'Invalid fromAmount')
      .notEmpty().isDecimal();
    req.checkBody('transactionState', 'Invalid transactionState')
      .notEmpty().is('tesSUCCESS');
    req.checkBody('fromAmount', 'Invalid transactionHash')
      .notEmpty().isAlphaNumeric();
        
    var errors = req.validationErrors();
    if (errors) {
			errorResponse(res)(util.inspect(errors));
    }

		Balance.findOrCreate({ 
			where: {
				bankAccountId: req.body.destination_tag,
				currency: req.body.currency		
			}
		})
		.success(function(balance){
			req.body.balanceId = balance.id;	
			RippleTransaction.create(req.body) 
			.success(rippleTransaction) {
			// Update the balance with the amount of the ripple transaction
				var newBalanceAmount = balance.amount + req.body.toAmount;
				balance.updateAttributes({
					amount: newbalanceAmount
				})
				.success(function(){
					res.send({
						balance: balance,
						rippleTransaction: rippleTransaction 
					});
				})
				.error(errorResponse(res));
			}
			.error(errorResponse(res));
		})
		.error(errorResponse(res));
  }

  return {
    userIndex: userIndex,
		createInbound: createInbound,
		index: index
	}
})();
