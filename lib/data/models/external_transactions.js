var db = require('../sequelize.js');
var Sequelize = require('sequelize');
var validator = require(__dirname+'/../../validator');

var ExternalTransaction = db.define('external_transactions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  source_amount: {
    type: Sequelize.DECIMAL
  },
  source_currency: {
    type: Sequelize.STRING
  },
  destination_amount: {
    type: Sequelize.DECIMAL
  },
  destination_currency: {
    type: Sequelize.STRING
  },
  //Deprecated!! Will be removed in V4.0
  //Use source and destination amount instead
  amount: {
    type: Sequelize.DECIMAL
  },
  //Deprecated!! Will be removed in V4.0
  //Use source and destination currency instead
  currency: {
    type: Sequelize.STRING
  },
  //Deprecated!! Will be removed in V4.0
  deposit: {
    type: Sequelize.BOOLEAN,
    validate: { notNull: true }
  },
  //Deprecated!! Will be removed in V4.0
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
  },
  invoice_id: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isValidHash: function(value) {
        if (!validator.isValidHash(value)) {
          throw new Error('Must be a valid SHA-256 hash');
        }
      }
    }
  },
  destination_account_id: {
    type: Sequelize.INTEGER
  },
  source_account_id: {
    type: Sequelize.INTEGER
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
    source_amount: function () {
      try {
        return parseFloat(this.getDataValue('source_amount'));
      } catch(e) {
        return this.getDataValue('source_amount');
      }
    },
    destination_amount: function () {
      try {
        return parseFloat(this.getDataValue('destination_amount'));
      } catch(e) {
        return this.getDataValue('destination_amount');
      }
    },
    amount: function () {
      try {
        return parseFloat(this.getDataValue('amount'));
      } catch(e) {
        return this.getDataValue('amount');
      }
    }
  },
  setterMethods: {
    data: function (value) {
      this.setDataValue('data', JSON.stringify(value));
    }
  }
});

ExternalTransaction.initModel = function(forced) {
  return db.sync({force: forced});
};

db.sync();

module.exports = ExternalTransaction;
