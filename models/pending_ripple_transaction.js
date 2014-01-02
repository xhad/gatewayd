var Sequelize = require('sequelize');
var db = require('../config/sequelize.js');
var utils = require("../utils");

var PendingRippleTransaction = sequelize.define('pending_ripple_transaction', {
  id: { 
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		notNull: true,
		unique: true,
	},
	rippleTransactionId: { type: Sequelize.INTEGER, unique: true, notNull: true },
	initialStatus: { type: Sequelize.STRING, notNull: true }
});

module.exports = PendingRippleTransaction;
