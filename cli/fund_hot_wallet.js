var ripple = require(__dirname+'/../lib/ripple_abstract/index.js');
var PrettyPrintTable = require(__dirname+'/../lib/pretty_print_tables.js');
var gateway = require(__dirname'/../');

function get_and_print_trust_lines() {
  var hotWallet = gateway.config.get('gateway_hot_wallet').address;
  var coldWallet = gateway.config.get('gateway_cold_wallet');
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
    to_account: gateway.config.get('gateway_hot_wallet').address,
    from_account: gateway.config.get('gateway_cold_wallet'),
    amount: amount,
    currency: currency,
    issuer: gateway.config.get('gateway_cold_wallet'),
    secret: secret
  }

  ripple.sendCurrency(opts, fn);
}

function fundHotWallet(amount, currency, secret) {

  issueCurrency(amount, currency, secret, function(err, resp){
    if (err || (resp.engine_result != 'tesSUCCESS')) { 
      console.log('error', err.engine_result);
    } 
    get_and_print_trust_lines();
  });

}

module.exports = fundHotWallet;
