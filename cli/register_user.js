var gateway = require("../lib/gateway.js");
var PrettyPrintTable = require('../lib/pretty_print_tables.js');

/**
* Register a User
* - creates external account named "default"
* - creates ripple address as provided
*
* @param {string} name
* @param {string} rippleAddress 
* @param {string} password
* @returns {User}, {ExternalAccount}, {RippleAddress}
*/

function registerUser(username, password, rippleAddress){

  var opts = {
    name: username,
    password: password,
    rippleAddress: rippleAddress
  };

  gateway.users.register(opts, function(err, user) {
    console.log(err, user);
    console.log("### CREATED USER ###");
    PrettyPrintTable.users([user]);
    console.log("### CREATED RIPPLE ADDRESSES ###");
    PrettyPrintTable.rippleAddresses([user.hosted_address, user.ripple_address]);
    console.log("### CREATED EXTERNAL ACCOUNT ###");
    PrettyPrintTable.externalAccounts([user.external_account]);
    console.log();
  });

};

module.exports = registerUser;

