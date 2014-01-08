var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize');
var User = require('../models/user');

var GatewayAccount = sequelize.define('gateway_account', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true,
	},
  userId: { 
		type: Sequelize.STRING,
    notNull: true,
    unique: true
	}
});

module.exports = GatewayAccount
