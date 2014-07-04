var config = require(__dirname+'/../../config/config.js');
var ripple = require(__dirname+'/../ripple');

/**
* @requires ripple
* Issue Currency from Cold Wallet to Hot Wallet
* - the cold wallet's secret must be provided
*
* @param {string} currency 
* @param {decimal} amount 
* @param {string} secret
* @param {function(err, deposit)} callback
* @returns [Withdrawals]
*/

function issueCurrency(amount, currency, secret, fn) {
  var opts = {
    to_account: config.get('HOT_WALLET').address,
    from_account: config.get('COLD_WALLET'),
    amount: amount,
    currency: currency,
    issuer: config.get('COLD_WALLET'),
    secret: secret
  };

  ripple.sendCurrency(opts, fn);
}

module.exports = issueCurrency;

