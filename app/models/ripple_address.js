var db = require('../../config/initializers/sequelize');
var Sequelize = require("sequelize");

var RippleAddress = db.define('ripple_address', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true,
	},
  user_id: { type: Sequelize.INTEGER, notNull: true },
  managed: { type: Sequelize.BOOLEAN, notNull: true, default: false },
  address: { type: Sequelize.STRING, notNull: true },
  secret: { type: Sequelize.STRING },
  tag: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  previous_transaction_hash: { type: Sequelize.STRING }
}, {
  classMethods: {
    createHosted: function(user, fn){
      console.log('create hosted called');
      RippleAddress.find({ where: { type: 'hot' }}).complete(function(err, address) {
        console.log('hot wallet', address);
        if (address) {
          var hotWallet = address; 
          RippleAddress.create({
            type: 'hosted',
            managed: true,
            user_id: user.id,
            tag: user.id,
            address: hotWallet.address
          }).complete(function(err, address){
            console.log(err);
            console.log('new ripple address', address);
            fn(err, address);
          });
        } else { fn(err, null) }
      });
    }
  }
});

module.exports = RippleAddress;
