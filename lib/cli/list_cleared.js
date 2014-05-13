var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

module.exports = function(req, res) {

  gateway.api.listCleared(function(err, deposits){
    if(!err)
      PrettyPrintTable.clearedTransactions(deposits || []);
  });

};