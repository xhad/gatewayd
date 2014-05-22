var data = require("ripple-gateway-data-sequelize");

/**
* @requires Data
* @description Once a user has completed all registration
* steps with the Gateway, such as Know Your Customer validation
* and email verification, call activateUser to enable that user
* to receive funds from the Gateway.
*
* @param {string} userId database record ID of user to active
* @param {function} callback called with error and user record
* @returns {User} Returns error and the user record activated
*
*/

function activateUser(userId, fn){
  data.users.update({ id: userId }, { active: true }, fn);
}

module.exports = activateUser;

