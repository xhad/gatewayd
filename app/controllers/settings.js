var User = require('../models/user');
var RippleAddress = require('../models/ripple_address');

module.exports = (function() {
  function index(req, res) {
    User.find({ where: { admin: true }}).complete(function(err, user) {
      if (err || !user) { 
        res.send(500, { error: err });
      } else {
        RippleAddress.getHot(function(err, hotWallet) {
          if (err) { res.send(500, { error: err }); return; }
          
          RippleAddress.getCold(function(err, coldWallet) {
          if (err) { res.send(500, { error: err }); return; }

            if (!user.admin) {
              hotWallet = hotWallet.address; 
              coldWallet = coldWallet.address;
            }
            res.send({ 
              settings: { 
                admin: user.admin, 
                hotWallet: hotWallet,
                coldWallet: coldWallet
              } 
            });
          });
        });    
      }
    });
  }

	return {
		index: index
	}
})();
