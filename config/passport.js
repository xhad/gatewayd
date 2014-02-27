var passport = require('passport');
var BasicStrategy = require("passport-http").BasicStrategy;
var utils = require("../../lib/utils");
var nconf = require('../../config/nconf.js');
var Adapter = require('ripple-gateway-data-sequelize-adapter');
var adapter = new Adapter();

passport.use(new BasicStrategy(
  function(username, password, done) {
    if (username == 'admin') {
      if (password && (password == nconf.get('KEY'))) {
        return done(null, { admin: true }); 
      } else {
        return done('Invalid admin key');
      }
    } else { 
      adapter.getUser({ name: username }, function(err, user) { 
        if (err) { return done(err) }
        if (user) { 
          if (!utils.verifyPassword(password, user.salt, user.password_hash)) { return done(null, false) }
          return done(null, user);
        } else {
          adapter.createUser({ name: username, password: password }, function(err, user) {
            // if there are no errors, allow addtional logic to be executed
            return err ? done(err, user) : done(null, user);
          });
        }
      })
    }
  }
))

module.exports = passport;
