var data = require("ripple-gateway-data-sequelize");

function deactivateUser(userId, fn){
  data.users.update({ id: userId }, { active: false }, fn);
}

module.exports = deactivateUser;

