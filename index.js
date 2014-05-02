var config = require(__dirname + '/config/config.js');
var data = require("ripple-gateway-data-sequelize");
var ripple = require(__dirname +'/lib/ripple/');

// Add each of the files in /lib/api as a method on "api" using
// the camel-cased version of the file name.
// Example: lib/api/record_deposit.js becomes api.recordDeposit
var api = require('require-all-to-camel')(__dirname+'/lib/api/');

module.exports = {
  config: config,
  ripple: ripple,
  data: data,
  api: api
} 

