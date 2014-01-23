var User = require('../models/user');
var RippleAddress = require('../models/ripple_address');

module.exports = (function() {
  function index(req, res) {
    User.find({ where: { admin: true }}).complete(function(err, user) {
      if (err) { res.send({ success: false }); return }
      RippleAddress.find({ where: { type: 'hot' }}).complete(function(err, address) {
        if (!user) { 
          res.send({ success: true, settings: { adminExists: false }}) 
        } else {
          res.send({ success: true, settings: { adminExists: user.admin, hotWallet: address.address } })
        }  
      });    
    });
  }

	return {
		index: index
	}
})();
