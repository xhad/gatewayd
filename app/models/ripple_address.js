var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize');

var RippleAddress = sequelize.define('ripple_address', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true,
	},
  userId: { type: Sequelize.INTEGER, notNull: true },
  managed: { type: Sequelize.BOOLEAN, notNull: true, default: false },
  address: { type: Sequelize.STRING, notNull: true, unique: true },
  type: { type: Sequelize.STRING }
});

module.exports = RippleAddress;
