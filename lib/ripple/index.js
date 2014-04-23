var remote = require(__dirname+'/remote');
var rippleLib = require('ripple-lib');
var sendCurrency = require(__dirname+'/send_currency.js');
var getTrustLines = require(__dirname+'/lines.js');

var api = {
  remote: remote,
  sendCurrency: sendCurrency,
  getTrustLines: getTrustLines,
  lib: rippleLib
}

module.exports = api;

