BasicStrategy = require('passport-http').BasicStrategy;
var gateway = require(__dirname + '/../../');
var passport = require('passport');

var passportAuth = {};

passportAuth.adminBasic = new BasicStrategy(
  function(username, password, done) {
    var domain = gateway.config.get('DOMAIN');
    if (username == ('admin@'+domain) && password == gateway.config.get('KEY')) {
      return done(null, { admin: true });
    } else {
      return done(null, false);
    }
  }
);
passportAuth.adminBasic.name = 'adminBasic';

passportAuth.userBasic = new BasicStrategy(
  function(username, password, done) {
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
passportAuth.userBasic.name = 'userBasic';

module.exports = passportAuth;

