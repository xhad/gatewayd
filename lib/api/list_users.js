var data = require('ripple-gateway-data-sequelize');

function listUsers(fn){
  data.users.readAll(fn);
}

module.exports = listUsers;

