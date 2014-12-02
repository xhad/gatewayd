var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text');

function setTrustLine(currency, amount){

  gateway.api.setTrustLine({currency: currency, amount: amount}, function () {
    gateway.api.getTrustLines(null, function(err, lines){
      PrettyPrintTable.trustLines(lines);
    });
  });

}

module.exports = setTrustLine;
