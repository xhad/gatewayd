BasicStrategy = require('passport-http').BasicStrategy;
var gateway = require(__dirname + '/../');
var passport = require('passport');

var passportAuth = {};

passportAuth.adminBasic = new BasicStrategy(
  function(username, password, done) {
    var domain = gateway.config.get('domain');
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
    User.findOne({ username: userid }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
);
passportAuth.userBasic.name = 'userBasic';

module.exports = passportAuth;
