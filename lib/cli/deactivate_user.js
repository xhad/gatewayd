var gateway = require(__dirname+'/../../')
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* Deactivate User
*
* @param userId Integer
* @returns {User}
*/

function deactivateUser(userId) {
  gateway.api.deactivateUser(userId, function(err, user){
    if (err) {
      console.log('error:', err);
    } else {
      console.log(user.toJSON());
    }
  });
}

module.exports = deactivateUser;
