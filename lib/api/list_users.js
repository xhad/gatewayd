var data = require(__dirname+'/../data/');
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

