var config = require(__dirname + '/config/config.js');
var data = require("ripple-gateway-data-sequelize");
var ripple = require(__dirname +'/lib/ripple/');

var api = require('require-all-to-camel')(__dirname+'/lib/api/');

module.exports = {
  config: config,
  ripple: ripple,
  data: data,
  api: api
}; 

