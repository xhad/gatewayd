var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize');

module.exports = sequelize.define('ripple_transaction', {
  id:             { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  toCurrency:     { type: Sequelize.STRING, notNull: true },
  toAddress:      { type: Sequelize.STRING, notNull: true },
  toCurrency:     { type: Sequelize.STRING, notNull: true },
  toAmount:       { type: Sequelize.DECIMAL, notNull: true },
  fromCurrency:   { type: Sequelize.STRING, notNull: true },
  fromAmount:     { type: Sequelize.DECIMAL, notNull: true },
  fromAddress:    { type: Sequelize.STRING, notNull: true },
  balanceId:      { type: Sequelize.INTEGER, notNull: true },
  issuance:       { type: Sequelize.BOOLEAN, notNull: true },
  destinationTag: { type: Sequelize.STRING },
  sourceTag:      { type: Sequelize.INTEGER },
  txHash:         { type: Sequelize.STRING },
  txState:        { type: Sequelize.STRING }
})

