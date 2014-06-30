var gateway = require(__dirname+'/../../')
var PrettyPrintTable = require(__dirname+'/../views/text/');
var logger = require('winston');

/**
* List Users
*
* @returns [{User}]
*/


function listUsers() {
  gateway.api.listUsers(function(err, users){
    if (err) {
      logger.error(err);
      return;
    }
    PrettyPrintTable.users(users);
  });
}

module.exports = listUsers;
