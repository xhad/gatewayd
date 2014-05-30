var db = require('../sequelize.js');
var ExternalTransaction = require('./external_transactions');
var Sequelize = require('sequelize');

var ExternalAccount = db.define('external_accounts', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { 
    type: Sequelize.STRING, 
    validate: { notNull: true }
  },
  user_id: { 
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

module.exports = ExternalAccount;
