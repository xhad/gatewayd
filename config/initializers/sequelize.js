Sequelize = require('sequelize')
pg = require('pg').native;

var nconf = require('./../nconf.js');
var db;

var databaseUrl = nconf.get('DATABASE_URL');
console.log('sequelize', databaseUrl);
if (databaseUrl) {
  var match = databaseUrl.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  var db = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: true,
    native: true
  });
} else {
  throw new Error('DATABASE_URL env variable is required');
}

module.exports = db;
