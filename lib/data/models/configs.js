var database = require(__dirname+'/../sequelize.js');
var Sequelize = require('sequelize');

var Config = database.define('configs', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: Sequelize.STRING,
    validate: {
      notNull: true
    },
    unique: true
  },
  value: {
    type: Sequelize.TEXT,
    validate: {
      notNull: true
    },
    unique: false
  },
  json: {
    type: Sequelize.BOOLEAN,
    validate: {
      notNull: true
    },
    defaultValue: false
  }
}, {
  classMethods: {
    get: function(key) {
      return this.find({ where: { key: key }});
    },
    set: function(key, value) {
      return this.findOrCreate({ key: key, value: value })
        .then(function(config) {
          return config.updateAttributes({ value: value });
        });
    }
  }
});

module.exports = Config;

