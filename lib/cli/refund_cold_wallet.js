var gateway = reqwuire(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

function refundColdWallet(amount, currency){
  gateawy.api.refundColdWallet(amount, currency, function(err, resp){
    gateway.api.getLines(function(err, lines){
      PrettyPrintTable.trustLines(lines);
    });
  });
}

module.exports = refundColdWallet;
