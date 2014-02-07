var RippleAddress = require('../models/ripple_address');

module.exports = (function(){
  function create(req, res) {
    req.validate('user_id', 'isInt');
    req.validate('ripple_address', 'isAlpha');
		req.validate('cash_amount', 'isFloat');

    if (req.user.admin || (req.user.id == req.body.user_id)) {
      RippleAddress.create({
        user_id: req.body.userId,
        address: req.body.rippleAddress
      }).complete(function(err, address){
        res.send({ ripple_address: address });
      });
    } else {
      res.status(401);
      res.send('Unauthorized');
    }
	}

  function index(req,res) {
    if (req.user.admin) {
      RippleAddress.findAll().complete(function(err, addresses) {
        res.send({ ripple_addresses: addresses });
      });
    } else {
      RippleAddress.findAll({ where: { user_id: req.user.id }})
        .complete(function(err, addresses) {
          res.send({ ripple_addresses: addresses });
      });
    }
  }

  return {
		create: create,
		index: index
  }
})();
