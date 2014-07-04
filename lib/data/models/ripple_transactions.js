var db = require('../sequelize');
var Sequelize = require('sequelize');

module.exports = db.define('ripple_transactions', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  to_address_id: { 
    type: Sequelize.INTEGER, 
    validate: { notNull: true }
  },
  from_address_id: { 
    type: Sequelize.INTEGER, 
    validate: { notNull: true }
  },
  to_amount: { 
    type: Sequelize.DECIMAL, 
    validate: { notNull: true }
  },
  to_currency: { 
    type: Sequelize.STRING, 
    validate: { notNull: true }
  },
  to_issuer: { 
    type: Sequelize.STRING, 
    validate: { notNull: true }
  },
  from_amount: { 
    type: Sequelize.DECIMAL, 
    validate: { notNull: true }
  },
  from_currency: { 
    type: Sequelize.STRING, 
    validate: { notNull: true }
  },
  from_issuer: { 
    type: Sequelize.STRING, 
    validate: { notNull: true }
  },
  transaction_state:{ 
    type: Sequelize.STRING 
  },
  transaction_hash: { 
    type: Sequelize.STRING 
  },
  uid: {
    type: Sequelize.STRING,
    unique: true
  },
  data: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  external_transaction_id: {
    type: Sequelize.INTEGER
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
