var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

module.exports = function() {

  gateway.api.listCleared(function(err, deposits){

    if (err) { console.log('error', err); return; }

    PrettyPrintTable.clearedTransactions(deposits || []);

  });
};