var User = require('../models/user');
var RippleAddress = require('../models/ripple_address');

module.exports = (function() {
  function index(req, res) {
    User.find({ where: { admin: true }}).complete(function(err, user) {
      if (err || !user) { res.send({ success: false }); return }
      RippleAddress.getHot(function(err, hotWallet) {
        RippleAddress.getCold(function(err, coldWallet) {
          if (!user.admin) {
            hotWallet = hotWallet.address; 
            coldWallet = coldWallet.address;
          }
          res.send({ 
            success: true, 
            settings: { 
              admin: user.admin, 
              hotWallet: hotWallet,
              coldWallet: coldWallet
            } 
          });
        });
      });    
    });
  }

	return {
		index: index
	}
})();
