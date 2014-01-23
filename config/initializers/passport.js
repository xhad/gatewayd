var passport = require('passport');
var BasicStrategy = require("passport-http").BasicStrategy;
var User = require("../../app/models/user");

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.find({ where: { name: username }}).complete(function (err, user) {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      if (!utils.verifyPassword(password, user.salt, user.password_hash)) { return done(null, false) }
      return done(null, user)
    })
  }
))

module.exports = passport;
