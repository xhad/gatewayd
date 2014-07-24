var config = require(__dirname + '/config/config.js');
var data   = require(__dirname +'/lib/data/');
var ripple = require(__dirname +'/lib/ripple/');
var validator = require(__dirname+'/lib/validator.js');
var requireAll = require('require-all-to-camel');

/** @module Api */
var api = requireAll(__dirname+'/lib/api/');
var errors = requireAll(__dirname+'/lib/errors/');

module.exports = {
  config: config,
  data: data,
  api: api,
  errors: errors,
  validator: validator,
  ripple: ripple
}; 

