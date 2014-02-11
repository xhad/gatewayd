var RippleGateway = require('../../lib/http_client.js').Gateway;
var crypto = require('crypto');
var assert = require('assert');

function rand() {
  return crypto.randomBytes(32).toString('hex');
}

describe('Users', function() {
  before(function(){
    client = new RippleGateway.Client({
      api: 'https://localhost:4000'
    });
  })

  it('should create a new user given a name and password', function(done){
    // POST /users
    client.user = rand();
    client.secret = rand();
    client.createUser({}, function(err, user) {
      if (err) {
        console.log('error', err);
      } else {
        assert(user.id > 0);
      }
      done();
    })
  });

  it("should verify a user's credentials given a name and password", function(done){
    // GET /users
    client.secret = rand();
    client.createUser({}, function(err, user) {
      var id = user.id;
      client.getUser({}, function(err, user) {
        assert(id == user.id);
        done();
      });
    });
  });

  it('should not allow the creation of two users with the same name', function(done){
    // POST /users
    client.user = rand();
    client.secret = rand();
    client.createUser({}, function(err, user){
      var id = user.id;
      client.secret = rand();
      client.createUser({}, function(err, user){
        assert(typeof err != 'undefined');
        assert(user == 'Unauthorized');
        done();
      });
    });
  });

  it('should not allow the creation of a user with the name "admin"', function(done){
    // POST /users
    client.user = 'admin';
    client.secret = rand();
    client.createUser({}, function(err, user){
      assert(user == 'invalid admin key');
      done();
    });
  });

});
