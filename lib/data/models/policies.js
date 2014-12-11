var database = require(__dirname+'/../sequelize.js');
var Sequelize = require('sequelize');

var Policy = database.define('policies', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  external_account_id: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  ripple_address_id: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  name: {
    type: Sequelize.STRING
  },
  fee: {
    type: Sequelize.DECIMAL
  }
}, {
  getterMethods: {
    fee: function () {
      try {
        return parseFloat(this.getDataValue('fee'));
      } catch(e) {
        return this.getDataValue('fee');
      }
    }
  }
});

module.exports = Policy;

