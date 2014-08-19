var db = require('../sequelize.js');
var Sequelize = require('sequelize');

var GatewayTransaction = db.define('gateway_transactions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  state: { 
    type: Sequelize.STRING
  },
  external_transaction_id: { 
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  ripple_transaction_id: { 
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  policy_id: { 
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  }
});

module.exports = GatewayTransaction;
