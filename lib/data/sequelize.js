var Sequelize = require('sequelize');
var config = require(__dirname+'/../../config/environment.js');

// Get configuration
var database = config.get('DATABASE_NAME'),
    username = config.get('DATABASE_USER'),
    password = config.get('DATABASE_PASSWORD'),
    dbConfig = {
      dialect: 'postgres',
      protocol: 'postgres',
      port: config.get('DATABASE_PORT'),
      host: config.get('DATABASE_HOST'),
      logging: false,
      native: true
    };

// Old style configuration via URL
var databaseUrl = config.get('DATABASE_URL');
if (databaseUrl) {
  var match = databaseUrl.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  dbConfig.host = match[3];
  dbConfig.port = match[4];
  username = match[1];
  password = match[2];
  database = match[5];
}

if (!database || !username || !password) {
  throw new Error('Either DATABASE_NAME, DATABASE_USER and DATABASE_PASSWORD ' +
                  'or DATABASE_URL config options are required');
}
var db = new Sequelize(database, username, password, dbConfig);

module.exports = db;
