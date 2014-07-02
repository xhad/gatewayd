var gateway = require(__dirname+'/../../');

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
