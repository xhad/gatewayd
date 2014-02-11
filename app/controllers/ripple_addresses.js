var RippleAddress = require('../models/ripple_address');

module.exports = (function(){
  function create(req, res) {
    req.validate('ripple_address', 'isAlpha');
		req.validate('cash_amount', 'isFloat');
    var user;

    if (!req.user.admin) {
      req.validate('user_id', 'isInt');
      userId = req.body.user_id;
    } else {
      userId = req.user.id;
    }

    RippleAddress.create({
      user_id: userId,
      address: req.body.ripple_address
    }).complete(function(err, address){
      if (err) {
        res.send(500, { error: err });
      } else {
        res.send({ ripple_address: address });
      }
    });
	}

  function index(req,res) {
    if (req.user.admin) {
      RippleAddress.findAll().complete(function(err, addresses) {
        if (err) {
          res.send(500, { error: err });
        } else {
          res.send({ ripple_addresses: addresses });
        }
      });
    } else {
      RippleAddress.findAll({ where: { user_id: req.user.id }})
        .complete(function(err, addresses) {
          if (err) {
            res.send(500, { error: err });
          } else {
            res.send({ ripple_addresses: addresses });
          }
      });
    }
  }

  return {
		create: create,
		index: index
  }
})();
