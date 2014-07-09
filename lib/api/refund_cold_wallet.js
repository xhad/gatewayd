var ripple = require(__dirname+'/../ripple/');
var config = require(__dirname+'/../../config/config.js');

/**
 * @requires ripple, config
 *
 * @function refundColdWallet
 *
 * @descriptions Refunds cold wallet
 *
 * @param {String} currency
 * @param {Number} amount
 * @param {callback} fn
 */

function refundColdWallet(currency, amount, fn){
  var opts = {
    to_account: config.get('COLD_WALLET'),
    from_account: config.get('HOT_WALLET').address,
    amount: amount,
    currency: currency,
    issuer: config.get('COLD_WALLET'),
    secret: config.get('HOT_WALLET').secret
  };

  ripple.sendCurrency(opts, fn);
}

module.exports = refundColdWallet;

