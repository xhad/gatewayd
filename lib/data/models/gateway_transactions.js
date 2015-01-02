var db = require('../sequelize.js');
var Sequelize = require('sequelize');
var uuid      = require('node-uuid');

var GatewayTransaction = db.define('gateway_transactions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  state: { 
    type: Sequelize.STRING,
    validate: {
      notNull: true
    }
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
  },
  direction: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
      isIn: [['to-ripple', 'from-ripple']]
    }
  },
  uid: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
      isUUID: 4
    }
  }
}, {
  hooks: {
    beforeValidate: function(attributes, fn) {
      if (!attributes.uid) {
        attributes.uid = uuid.v4();
      }
      fn();
    }
  }
});

db.sync();

module.exports = GatewayTransaction;
