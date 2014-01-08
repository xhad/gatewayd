var Balance = require('../models/balance.js');

module.exports = (function(){
  function gatewayAccountBalances(req, res) {
		req.checkParams('accountId', 'Invalid name')
			.notEmpty().isNumeric();
		
		var errors = req.validationErrors();
		if (errors) {
			res.send({ error: util.inspect(errors) }, 400)
			return;
    }
    
    Balance.findAll({ where: { bankAccountId: req.params.accountId }})
		.success(function(balances) {
		  res.send({ success: true, balances: balances });
		})
		.error(function(err){
			res.send({ error: err });
		});
	} 

  function index(req, res){
		Balance.findAll()    
		.success(function(balances) {
			res.send(balances);
		})
		.error(function(err) {
			res.send({ error: err });
		});
	}

	return {
		gatewayAccountBalances: gatewayAccountBalances,
		index: index
	}
})();
