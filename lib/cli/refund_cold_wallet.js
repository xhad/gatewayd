var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

function refundColdWallet(amount, currency){
  gateway.api.refundColdWallet(amount, currency, function(err, resp){
    gateway.api.getTrustLines(function(err, lines){
      PrettyPrintTable.trustLines(lines);
    });
  });
}

module.exports = refundColdWallet;
