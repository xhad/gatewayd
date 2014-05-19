var trust = require(__dirname+'/../ripple/trust.js');
var config = require(__dirname+'/../../config/config.js');

function setTrustLine(currency, amount, fn) {
  trust({
    currency: currency.toUpperCase(),
    amount: amount,
    issuer: config.get('COLD_WALLET'),
    account: config.get('HOT_WALLET').address,
    secret: config.get('HOT_WALLET').secret
  }, fn);
}

module.exports = setTrustLine;

