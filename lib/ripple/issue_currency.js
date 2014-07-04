var sendCurrency = require('./send_currency');

function issueCurrency(amount, currency, secret, fn) {
  var opts = {
    to_account: nconf.get('gateway_hot_wallet').address,
    from_account: nconf.get('gateway_cold_wallet'),
    amount: amount,
    currency: currency,
    issuer: nconf.get('gateway_cold_wallet'),
    secret: secret
  };

  sendCurrency(opts, fn);
}

module.exports = issueCurrency;
