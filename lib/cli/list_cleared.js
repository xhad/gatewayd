var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');
var logger = require('winston');

module.exports = function() {

  gateway.api.listCleared(function(err, deposits){
    if (err) {
      logger.error(err);
      return;
    }
    PrettyPrintTable.clearedTransactions(deposits || []);
  });
};
