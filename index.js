var config = require(__dirname + '/config/config.js');
var data   = require(__dirname +'/lib/data/');
var ripple = require(__dirname +'/lib/ripple/');
var validator = require(__dirname+'/lib/validator.js');

/** @module Api */
var api = require('require-all-to-camel')(__dirname+'/lib/api/');

module.exports = {
  config: config,
  data: data,
  api: api,
  validator: validator,
  ripple: ripple
}; 

