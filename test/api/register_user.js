var gatewayd = require(__dirname+'/../../');
var assert   = require('assert');
var crypto   = require('crypto');

describe('Register User', function() {

  it('should register a user with a username, password, and ripple address', function(done) {
    var sha  = crypto.createHash('sha256');
    var name = sha.update(crypto.randomBytes(128)).digest('hex');

    gatewayd.api.registerUser({
      name: name,
      password: 123345,
      ripple_address: 'rLnrHRyDKbcHXzm3h87q75hrkrS33Jpagz'
    }, function(error, registration) {
      assert(!error);
      done();
    })
  });

  it('should prevent registering users with the same name', function(done) {
    var sha  = crypto.createHash('sha256');
    var name = sha.update(crypto.randomBytes(128)).digest('hex');

    var userParams = {
      name: name,
      password: 123345,
      ripple_address: 'rLnrHRyDKbcHXzm3h87q75hrkrS33Jpagz'
    }
    gatewayd.api.registerUser(userParams, function(error, registration) {
      assert(!error);
      gatewayd.api.registerUser(userParams, function(error, registration) {
        assert(error);
        done();
      });
    });
  });
});

