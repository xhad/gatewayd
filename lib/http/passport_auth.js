var BasicStrategy = require('passport-http').BasicStrategy;
var gatewayd = require(__dirname + '/../../');

function verifyAdmin(username, password){
  if (username === gatewayd.config.get('KEY') ||
      password === gatewayd.config.get('KEY')) {
    return true;
  } else {
    return false;
  }
}

module.exports.adminBasic = (function(name){
  var auth = new BasicStrategy(
    function(username, password, done) {
      if (verifyAdmin(username, password)) {
        return done(null, { admin: true });
      } else {
        return done(null, false);
      }
    }
  );

  auth.name = name;
  return auth;

})('adminBasic');

