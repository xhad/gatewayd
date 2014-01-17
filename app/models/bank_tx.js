var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize.js');
var GatewayAccount = require('../models/gateway_account');

var BankTx = sequelize.define('bank_transaction', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  deposit: { type: Sequelize.BOOLEAN, allowNull: false },
  currency: { type: Sequelize.STRING, allowNull: false },
  accountId: { type: Sequelize.INTEGER, allowNull: false },
  cashAmount: { type: Sequelize.DECIMAL, allowNull: false },
  rippleTxId: Sequelize.INTEGER
});

module.exports = BankTx;
