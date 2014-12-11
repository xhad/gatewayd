var database = require(__dirname+'/../sequelize.js');
var Sequelize = require('sequelize');

var Bridge = database.define('bridges', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  source_address_id: {
    type: Sequelize.STRING,
    validate: {
      notNull: true
    }
  },
  destination_address_id: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  policy_id: {
    type: Sequelize.INTEGER
  },
  direction: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['to-ripple', 'from-ripple']]
    }
  }
});

module.exports = Bridge;

