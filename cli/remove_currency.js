var gateway = require(__dirname+'/../lib/gateway.js');
var PrettyPrintTable = require(__dirname+'/../lib/pretty_print_tables.js');

/**
* List Users
*
* @returns [{User}]
*/


function listUsers() {
  gateway.users.list(function(err, users){
    if (err) {
      console.log('error:', err);
      return;
    }
    PrettyPrintTable.users(users);
  });
}

module.exports = listUsers;
