var db = require('../../config/initializers/sequelize');
var Sequelize = require("sequelize");

module.exports = db.define('ripple_transaction', {

  id:               { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  ripple_address_id:{ type: Sequelize.INTEGER, notNull: true },
  transaction_hash: { type: Sequelize.STRING },
  transaction_state:{ type: Sequelize.STRING },
  issuance:         { type: Sequelize.BOOLEAN, notNull: true},

  to_address:       { type: Sequelize.STRING, notNull: true },
  to_amount:        { type: Sequelize.DECIMAL, notNull: true },
  to_currency:      { type: Sequelize.STRING, notNull: true },
  to_issuer:        { type: Sequelize.STRING, notNull: true },

  from_address:     { type: Sequelize.STRING, notNull: true },
  from_amount:      { type: Sequelize.DECIMAL, notNull: true },
  from_currency:    { type: Sequelize.STRING, notNull: true },
  from_issuer:      { type: Sequelize.STRING, notNull: true },

  destination_tag:  { type: Sequelize.STRING },
  source_tag:       { type: Sequelize.INTEGER }

})

