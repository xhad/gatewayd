var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize');

var RippleAddress = sequelize.define('ripple_address', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true,
	},
  user_id: { type: Sequelize.INTEGER, notNull: true },
  managed: { type: Sequelize.BOOLEAN, notNull: true, default: false },
  address: { type: Sequelize.STRING, notNull: true, unique: true },
  secret: { type: Sequelize.STRING },
  tag: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  previous_transaction_hash: { type: Sequelize.STRING }
});

module.exports = RippleAddress;
