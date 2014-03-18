var nconf = require('../config/nconf.js');
process.env.DATABASE_URL = nconf.get('DATABASE_URL');
var api = require("ripple-gateway-data-sequelize-adapter");

function getUserByName(name, fn) {
  api.users.read({ name: name }, fn)
}

function getExternalAccountFromUser(name,fn) {
  getUserByName(name, function(err, user){
    if (err) { fn(err, null); return; };
    api.externalAccounts.read({ user_id: user.id },fn);
  });
}

function getRippleAddressFromUser(name, fn) {
  getUserByName(name, function(err, user){
    if (err) { fn(err, null); return; };
    api.rippleAddresses.read({ user_id: user.id },fn);
  });
}

module.exports = {
  getUser: getUserByName,
  getUserRippleAddress: getRippleAddressFromUser,
  getUserExternalAccount: getExternalAccountFromUser,
  api: api
};
