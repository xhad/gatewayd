BasicStrategy = require('passport-http').BasicStrategy;
var gateway = require(__dirname + '/../../');
var passport = require('passport');


module.exports.adminBasic = (function(name){

  var adminBasic = new BasicStrategy(
    function(username, password, done) {
      var domain = gateway.config.get('DOMAIN');
      if (username == ('admin@'+domain) && password == gateway.config.get('KEY')) {
        return done(null, { admin: true });
      } else {
        return done(null, false);
      }
    }
  );
  adminBasic.name = name;
  return adminBasic;

})('adminBasic');

module.exports.userBasic = (function(name){

  var userBasic = new BasicStrategy(
    function(username, password, done) {
      if (username == ('admin@'+domain) && password == gateway.config.get('KEY')) {
        return done(null, { admin: true });
      }
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
  );
  userBasic.name = name;
  return userBasic;

})('userBasic');

