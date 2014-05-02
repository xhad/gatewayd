BasicStrategy = require('passport-http').BasicStrategy;
var gateway = require(__dirname + '/../../');
var passport = require('passport');
var domain = gateway.config.get('DOMAIN');

function verifyAdmin(username, password){
  if (username === ('admin@'+gateway.config.get('DOMAIN'))) {
    if (password === gateway.config.get('KEY')){
      return true;
    } else {
      return false;
    }
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

module.exports.userBasic = (function(name){

  var userBasic = new BasicStrategy(
    function(username, password, done) {
      if (verifyAdmin(username, password)) {
        return done(null, { admin: true });
      } else {
        gateway.data.users.read({ name: username }, function (err, user) {
          console.log(user);
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (user) {
            var verified = gateway.data.users.verifyPassword(password, user.salt, user.password_hash);
            if (verified) {
              return done(null, user);
            } else {
              return done(null, null);
            }
          }
          return done(null, user);
        });
      }
    }
  );
  userBasic.name = name;
  return userBasic;

})('userBasic');

