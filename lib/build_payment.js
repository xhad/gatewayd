var Client = require('ripple-rest-client');
var config = require("../config/nconf.js");

var client = new Client({
  api: 'http://localhost:5990/',
  account: config.get('gateway_hot_wallet').address,
  secret: config.get('gateway_hot_wallet').secret,
});


function buildPayment(recipient, amount, currency, fn) {
  var newPayment = {
    currency: currency.toUpperCase(),
    amount: amount,
    issuer: config.get('gateway_cold_wallet'),
    recipient: recipient
  };
  client.buildPayment(newPayment, function(err, resp) {
    if (err) { fn(err, null); return };
    if (resp.success) {
      fn(null, resp.payments[0]);  
    } else {
      fn(resp.error, null);
    }
  })
}

module.exports = buildPayment;



