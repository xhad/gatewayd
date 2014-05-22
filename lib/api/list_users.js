var data = require('ripple-gateway-data-sequelize');
/**
 * @requires data
 * @function listUsers
 *
 * @description Queries all uesers from the users table.
 * @param {callback} fn
 */

function listUsers(fn){
  data.users.readAll(fn);
}

module.exports = listUsers;

