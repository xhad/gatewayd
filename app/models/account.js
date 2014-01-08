var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize');
var User = require('../models/user');

var GatewayAccount = sequelize.define('bank_account', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true,
	},
  userId: { 
		type: Sequelize.STRING
	}
});

module.exports = GatewayAccount
