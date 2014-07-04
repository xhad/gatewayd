var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');
var logger = require('winston');

/**
* List User External Accounts
*
* @param userId
* @returns [{ExternalAccount}]
*/


function listUserExternalAccounts(userId) {
  gateway.api.listUserExternalAccounts(userId, function(err, accounts){
    if (err) {
      logger.error(err);
      return;
    }
    PrettyPrintTable.externalAccounts(accounts);
  });
}

module.exports = listUserExternalAccounts;
