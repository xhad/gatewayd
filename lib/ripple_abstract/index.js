var remote = require('../remote');

var sendCurrency = require('./lib/send_currency.js');
var getTrustLines = require('./lib/lines.js');

var api = {
  remote: remote,
  sendCurrency: sendCurrency,
  getTrustLines: getTrustLines
}

module.exports = api;

