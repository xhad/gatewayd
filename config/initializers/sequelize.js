var Sequelize = require('sequelize')
var dbConfig = require('../database.json')['dev']

sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  dialect: "postgres",
  host: dbConfig.host,
  port: 5432,
  omitNull: true
});

module.exports = sequelize;
