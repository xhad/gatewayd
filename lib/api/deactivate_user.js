var data = require("ripple-gateway-data-sequelize");

/** {@link module:Api} **/

/**
* @requires Data
* @member Api
* @function deactivateUser
* @description If for any reason an admin of the Gateway wishes 
* to prevent a particular user from depositing and withdrawing
* from the Gateway, call deactivateUser to affect such a prohibition
* and update the user's record in the database.
*
* @param {string} userId database record ID of user to deactivate
* @param {function} callback called with error and user record
* @returns {User} Returns error and the user record deactivated
*
*/

function deactivateUser(userId, fn){
  data.users.update({ id: userId }, { active: false }, fn);
}

module.exports = deactivateUser;

