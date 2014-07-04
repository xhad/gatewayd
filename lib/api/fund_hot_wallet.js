var ripple = require(__dirname+'/../ripple/');
var config = require(__dirname+'/../../config/config.js');
var logger = require('winston');

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

function fundHotWallet(amount, currency, secret, fn) {

  issueCurrency(amount, currency, secret, function(err, resp){
    if (err || (resp.engine_result !== 'tesSUCCESS')) {
      logger.error('Error:fundHotWallet::', err.engine_result);
    }

    var opts = {
      fromAccount: config.get('HOT_WALLET').address,
      toAccount: config.get('COLD_WALLET')
    };

    ripple.getTrustLines(opts, function(err, lines) {
      if(err){
        fn(err, null);
      } else {
        fn(null, lines);
      }
    });

  });
}

module.exports = fundHotWallet;
