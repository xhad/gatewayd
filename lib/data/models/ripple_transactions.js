var db = require('../sequelize');
var Sequelize = require('sequelize');
var validator = require(__dirname+'/../../validator');

var RippleTransactions = db.define('ripple_transactions', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  to_address_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      isInt: true
    }
  },
  from_address_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      isInt: true
    }
  },
  to_amount: { 
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notNull: true,
      isDecimal: true
    }
  },
  to_currency: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      isAlphanumeric: true
    }
  },
  to_issuer: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      isAlphanumeric: true
    }
  },
  from_amount: { 
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notNull: true,
      isDecimal: true
    }
  },
  from_currency: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      isAlphanumeric: true
    }
  },
  from_issuer: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      isAlphanumeric: true
    }
  },
  transaction_state:{ 
    type: Sequelize.STRING,
    allowNull: true
  },
  transaction_hash: { 
    type: Sequelize.STRING,
    allowNull: true
  },
  uid: {
    type: Sequelize.STRING,
    unique: true
  },
  data: {
    type: Sequelize.STRING,
    allowNull: true
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true
  },
  external_transaction_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      isInt: true
    }
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
  memos: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  direction: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['to-ripple', 'from-ripple']]
    }
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
    },
    to_amount: function () {
      try {
        return parseFloat(this.getDataValue('to_amount'));
      } catch(e) {
        return this.getDataValue('to_amount');
      }
    },
    from_amount: function () {
      try {
        return parseFloat(this.getDataValue('from_amount'));
      } catch(e) {
        return this.getDataValue('from_amount');
      }
    }
  },
  setterMethods: {
    data: function (value) {
      this.setDataValue('data', JSON.stringify(value));
    },
    invoice_id: function (value) {
      if (value) {
        this.setDataValue('invoice_id', value.toUpperCase());
      }
    },
    memos: function (value) {
      this.setDataValue('memos', JSON.stringify(value));
    }
  }
});

RippleTransactions.initModel = function(forced) {
  return db.sync({force: forced});
};

module.exports = RippleTransactions;
