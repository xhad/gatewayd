var ripple = require(__dirname+'/../ripple/');
var PrettyPrintTable = require(__dirname+'/../views/text/');
var gateway = require(__dirname+'/../../');
var logger = require('winston');

function get_and_print_trust_lines() {
  var hotWallet = gateway.config.get('HOT_WALLET').address;
  var coldWallet = gateway.config.get('COLD_WALLET');
  var opts = {
    fromAccount: hotWallet,
    toAccount: coldWallet
  };
  ripple.getTrustLines(opts, function(err, lines) {
    PrettyPrintTable.trustLines(lines);
  });
}

function issueCurrency(amount, currency, secret, fn) {
  var opts = {
    to_account: gateway.config.get('HOT_WALLET').address,
    from_account: gateway.config.get('COLD_WALLET'),
    amount: amount,
    currency: currency,
    issuer: gateway.config.get('COLD_WALLET'),
    secret: secret
  }

  ripple.sendCurrency(opts, fn);
}

function fundHotWallet(amount, currency, secret) {

  issueCurrency(amount, currency, secret, function(err, resp){
    if (err || (resp.engine_result != 'tesSUCCESS')) { 
      logger.error(err.engine_result);
    } 
    get_and_print_trust_lines();
  });

}

module.exports = fundHotWallet;
