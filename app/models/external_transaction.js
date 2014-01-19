var sequelize = require('../../config/initializers/sequelize.js');

var ExternalTransaction = sequelize.define('external_transaction', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  deposit: { type: Sequelize.BOOLEAN, allowNull: false },
  currency: { type: Sequelize.STRING, allowNull: false },
  accountId: { type: Sequelize.INTEGER, allowNull: false },
  cashAmount: { type: Sequelize.DECIMAL, allowNull: false },
  rippleTxId: Sequelize.INTEGER
});

module.exports = ExternalTransaction;
