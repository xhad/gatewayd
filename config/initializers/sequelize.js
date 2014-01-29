Sequelize = require('sequelize')
dbConfig = require('../database.json')['staging']
pg = require('pg').native;

var db;

if (process.env.DATABASE_URL) {
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  var db = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: true,
    native: true
  });
} else {
  var db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    dialect: "postgres",
    host: dbConfig.host,
    port: 5432,
    omitNull: true,
    native: true,
    protocol: 'postgres'
  });
}

module.exports = db;
