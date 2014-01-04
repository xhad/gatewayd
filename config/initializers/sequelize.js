Sequelize = require('sequelize')
dbConfig = require('../database.json')['staging']
pg = require('pg').native;

sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  dialect: "postgres",
  host: dbConfig.host,
  port: 5432,
  omitNull: true,
  native: true,
  protocol: 'postgres'
});

module.exports = sequelize;
