var gateway = require(__dirname+'/../../')
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* List User External Accounts
*
* @param userId
* @returns [{ExternalAccount}]
*/


function listUserExternalAccounts(userId) {
  gateway.api.listUserExternalAccounts(userId, function(err, accounts){
    if (err) {
      console.log('error:', err);
    } else {
      PrettyPrintTable.externalAccounts(accounts);
    }
  });
}

module.exports = listUserExternalAccounts;
