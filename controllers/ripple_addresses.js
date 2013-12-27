var RippleAddress = require('../models/ripple_address');

function respondToValidationErrors(req, res) {
	var errors = req.validationErrors();
	if (errors) {
		res.end({ error: util.inspect(errors) }, 400)
		return;
	}
}

module.exports = (function(){
  function userIndex(req, res) {
	}
  
  function create(req, res) {
		req.checkBody('userId', 'Invalid bankAccountId')
			.notEmpty().isInt();
		req.checkBody('rippleAddress', 'Invalid currency')
			.notEmpty().isAlpha();
		req.checkBody('cashAmount', 'Invalid cashAmount')
			.notEmpty().isFloat();

		respondToValidationErrors(req, res);
		
		RippleAddress.create({
			userId: req.body.userId,
			address: req.body.rippleAddress
		})
		.success(function(address){
			res.send(address);
		})
		.error(function(err){
			res.send({ error: err });
		});
	}
 
  function index(req,res) {
		RippleAddress.findAll()
		.success(function(addresses){
			res.send(addresses);
		})
		.error(function(err){
			res.send({ error: err });
		});
  }

  return {
		userIndex: userIndex,
		create: create,
		index: index
  }
})();
