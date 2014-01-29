var db = require('../../config/initializers/sequelize.js');
var Sequelize = require("sequelize");

var ExternalTransaction = db.define('external_transactions', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  deposit: { type: Sequelize.BOOLEAN, allowNull: false },
  currency: { type: Sequelize.STRING, allowNull: false },
  external_account_id: { type: Sequelize.INTEGER, allowNull: false },
  cash_amount: { type: Sequelize.DECIMAL, allowNull: false },
  ripple_transaction_id: Sequelize.INTEGER
});

module.exports = ExternalTransaction;
