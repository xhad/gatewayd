var Sequelize = require('sequelize');
var db = require('../config/sequelize');
var User = require('../models/user');

var BankAccount = sequelize.define('bank_account', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true,
	},
  userId: { 
		type: Sequelize.INTEGER, 
		references: 'User',
		referencesKey: 'id'
	}
});

BankAccount.belongsTo(User, { foreignKeyConstraint: true });
module.exports = BankAccount;
