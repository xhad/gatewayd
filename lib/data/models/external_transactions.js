var db = require('../sequelize.js');
var Sequelize = require('sequelize');

var ExternalTransaction = db.define('external_transactions', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  amount: { 
    type: Sequelize.DECIMAL, 
    validate: { notNull: true }
  },
  currency: { 
    type: Sequelize.STRING, 
    validate: { notNull: true }
  },
  deposit: { 
    type: Sequelize.BOOLEAN, 
    validate: { notNull: true }
  },
  external_account_id: { 
    type: Sequelize.INTEGER, 
    validate: { notNull: true }
  },
  status: {
    type: Sequelize.STRING
  },
  ripple_transaction_id: {
    type: Sequelize.INTEGER
  },
  uid: {
    type: Sequelize.STRING,
    unique: true
  },
  data: {
    type: Sequelize.STRING
  }
}, {
  getterMethods: {
    data: function () {
      try {
        return JSON.parse(this.getDataValue('data'));
      } catch(e) {
        return this.getDataValue('data');
      }
    }
  },
  setterMethods: {
    data: function (value) {
      this.setDataValue('data', JSON.stringify(value));
    }
  }
});

db.sync();

module.exports = ExternalTransaction;
