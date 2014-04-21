var remote = require(__dirname+'/remote');

var sendCurrency = require(__dirname+'/send_currency.js');
var getTrustLines = require(__dirname+'/lines.js');

var api = {
  remote: remote,
  sendCurrency: sendCurrency,
  getTrustLines: getTrustLines
}

module.exports = api;

