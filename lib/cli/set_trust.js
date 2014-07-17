var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text');

function setTrustLine(currency, amount){

  gateway.api.setTrustLine(currency, amount, function () {
    gateway.api.getTrustLines(function(err, lines){
      PrettyPrintTable.trustLines(lines);
    });
  });

}

module.exports = setTrustLine;
