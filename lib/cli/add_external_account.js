var gateway = require(__dirname+'/../../')
var PrettyPrintTable = require(__dirname+'/../views/text/');
var logger = require('winston');

/**
* Add External Account
*
* @param name
* @param userId
* @returns [{ExternalAccount}]
*/


function addExternalAccount(name, userId) {
  gateway.data.externalAccounts.create({ name: name, user_id: userId }, function(err, account){
    if (err) {
      logger.error(err);
    } else {
      PrettyPrintTable.externalAccounts([account]);
    }
  });
}

module.exports = addExternalAccount;
