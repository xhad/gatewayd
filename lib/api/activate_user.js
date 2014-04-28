var data = require("ripple-gateway-data-sequelize");

function activateUser(userId, fn){
  data.users.update({ id: userId }, { active: true }, fn);
}

module.exports = activateUser;

