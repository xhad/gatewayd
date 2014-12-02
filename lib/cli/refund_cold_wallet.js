var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

function refundColdWallet(amount, currency){

  var options = {
    amount: amount,
    currency: currency
  };

  gateway.api.refundColdWallet(options, function () {
    gateway.api.getTrustLines(null, function(error, lines){
      if (error){
        return console.log('getTrustLines', error);
      }
      PrettyPrintTable.trustLines(lines);
    });
  });
}

module.exports = refundColdWallet;
