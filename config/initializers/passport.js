var passport = require('passport');
var BasicStrategy = require("passport-http").BasicStrategy;
var User = require("../../app/models/user");
var utils = require("../../lib/utils");
var nconf = require('../../config/nconf.js');

passport.use(new BasicStrategy(
  function(username, password, done) {
    if (username == 'admin') {
      if (password && (password == nconf.get('KEY'))) {
        return done(null, { admin: true }); 
      } else {
        return done('Invalid admin key');
      }
    } else { 
      User.find({ where: { name: username }}).complete(function (err, user) {
        if (err) { return done(err) }
        if (user) { 
          if (!utils.verifyPassword(password, user.salt, user.password_hash)) { return done(null, false) }
          return done(null, user);
        } else {
          User.createWithSalt({ name: username, password: password }, function(err, user) {
            // if there are no errors, allow addtional logic to be executed
            return err ? done(err, user) : done(null, user);
          });
        }
      })
    }
  }
))

module.exports = passport;
