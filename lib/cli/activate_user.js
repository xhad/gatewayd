var gateway = require(__dirname+'/../../')
var PrettyPrintTable = require(__dirname+'/../views/text/');
var logger = require('winston');

/**
* Activate User
*
* @param userId Integer
* @returns {User}
*/

function activateUser(userId) {
  gateway.api.activateUser(userId, function(err, user){
    if (err) {
      logger.error(err);
    } else {
      logger.info(user.toJSON());
    }
  });
}

module.exports = activateUser;
