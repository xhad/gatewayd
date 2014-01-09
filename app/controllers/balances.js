var Balance = require('../models/balance.js');

module.exports = (function(){

  function gatewayAccountBalances(req, res) {
		req.checkParams('accountId', 'Invalid name')
			.notEmpty()
      .isNumeric();
		
		var errors = req.validationErrors();
		if (errors) {
			res.send({ success: false, error: util.inspect(errors) }, 400)
			return;
    }
    
    Balance.findAll({ where: { bankAccountId: req.params.accountId }})
    .complete(function(err, balances){
      if (err) { 
        res.send({ success: false, error: err })
      }
		  res.send({ success: true, balances: balances })
    })
	} 

  function index(req, res){
		Balance.findAll().complete(function(err, balances){
      if (err) { res.send({ success: false, error: err }) }
			res.send({ success: true, balances: balances });
    })
	}

	return {
		gatewayAccountBalances: gatewayAccountBalances,
		index: index
	}
})();
