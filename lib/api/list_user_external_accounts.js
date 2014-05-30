var data = require(__dirname+'/../data/');

/**
 * @requires data
 * @function listUserExternalAccounts
 *
 * @description Queries the externalAccounts table for external accounts by user id.
 * @param {Number} userId
 * @param {callback} fn
 */

function listUserExternalAccounts(userId, fn){
  data.externalAccounts.readAll({ user_id: userId }, fn);
};

module.exports = listUserExternalAccounts;

