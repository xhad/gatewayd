var db = require('../sequelize');
var Sequelize = require('sequelize');

var RippleTransactions = db.define('ripple_transactions', {
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
  },
  invoice_id: {
    type: Sequelize.STRING
  },
  memos: {
    type: Sequelize.TEXT
  }
}, {
  getterMethods: {
    data: function () {
      try {
        return JSON.parse(this.getDataValue('data'));
      } catch(e) {
        return this.getDataValue('data');
      }
    },
    memos: function () {
      try {
        return JSON.parse(this.getDataValue('memos'));
      } catch(e) {
        return this.getDataValue('memos');
      }
    }
  },
  setterMethods: {
    data: function (value) {
      this.setDataValue('data', JSON.stringify(value));
    },
    memos: function (value) {
      this.setDataValue('memos', JSON.stringify(value));
    }
  }
});

RippleTransactions.initModel = function(forced, callback) {
  db.sync({force: forced})
    .success(callback)
    .error(function() {
      console.log('Unable to init model: RippleTransactions');
      callback();
    });
};

module.exports = RippleTransactions;
