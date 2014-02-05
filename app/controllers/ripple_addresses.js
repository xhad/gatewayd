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
    RippleAddress.findAll({ where: { user_id: req.params.id }}).complete(function(err, addresses) {
      res.send({ success: true, ripple_addresses: addresses });
    })
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
			user_id: req.body.userId,
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
