var Sequelize = require('sequelize')
var dbConfig = require('../config/database.json')['dev']

console.log('database config')
console.log(dbConfig)

sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  dialect: "postgres",
  host: dbConfig.host,
  port: 5432,
  omitNull: true
});

module.exports = sequelize;
