var data = require('ripple-gateway-data-sequelize');

function listUserExternalAccounts(userId, fn){
  data.externalAccounts.readAll({ user_id: userId }, fn);
};

module.exports = listUserExternalAccounts;

