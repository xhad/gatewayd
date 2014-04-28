var gateway = require(__dirname+'/../../')
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* Activate User
*
* @param userId Integer
* @returns {User}
*/

function activateUser(userId) {
  gateway.api.activateUser(userId, function(err, user){
    if (err) {
      console.log('error:', err);
    } else {
      console.log(user.toJSON());
    }
  });
}

module.exports = activateUser;
