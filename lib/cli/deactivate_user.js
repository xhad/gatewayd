var gateway = require(__dirname+'/../../');

/**
* Deactivate User
*
* @param userId Integer
* @returns {User}
*/

function deactivateUser(userId) {
  gateway.api.deactivateUser(userId, function(err, user){
    if (err) {
      logger.error(err);
    } else {
      logger.info(user.toJSON());
    }
  });
}

module.exports = deactivateUser;
