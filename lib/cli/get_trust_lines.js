var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

function getTrustLines(){
  gateway.api.getTrustLines(function(err, lines){
    PrettyPrintTable.trustLines(lines);
  });
}

module.exports = getTrustLines;
