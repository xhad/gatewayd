var db = require('../../config/initializers/sequelize');
var Sequelize = require("sequelize");

module.exports = db.define('ripple_transactions', {
  id:               { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  to_address_id:    { type: Sequelize.INTEGER, notNull: true },
  from_address_id:  { type: Sequelize.INTEGER, notNUll: true },
  transaction_state:{ type: Sequelize.STRING },
  transaction_hash: { type: Sequelize.STRING },
  to_amount:        { type: Sequelize.DECIMAL, notNull: true },
  to_currency:      { type: Sequelize.STRING, notNull: true },
  to_issuer:        { type: Sequelize.STRING, notNull: true },
  from_amount:      { type: Sequelize.DECIMAL, notNull: true },
  from_currency:    { type: Sequelize.STRING, notNull: true },
  from_issuer:      { type: Sequelize.STRING, notNull: true }
})

