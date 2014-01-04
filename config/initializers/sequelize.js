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

//sequelize = new Sequelize("postgres://lldoroqhxcgiug:rU5SofCieoz8dv4BRHcYbQlAIg@ec2-54-197-237-231.compute-1.amazonaws.com:5432/d5pl4c2hkefd1f")

module.exports = sequelize;
