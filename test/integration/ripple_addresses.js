var RippleGateway = require('../../lib/http_client.js').Gateway;
var crypto = require('crypto');
var assert = require('assert');
var admin = require('../../lib/admin.js');
function rand() { return crypto.randomBytes(32).toString('hex'); }

describe('RippleAddresses', function(){
  
  describe('user', function(){
    before(function(done){
      client = new RippleGateway.Client({
        api: 'https://localhost:4000'
      });
      client.user = rand();
      client.secret = rand();
      client.createUser({}, function(err, resp){
        if (err) { throw new Error(err); }
        user = resp;
        done();
      });
    });

    it.skip('a user should not be able to create ripple address', function(done){
      // POST /ripple_addresses  
      done();
    });

    it('a user should be able to see its ripple addresses', function(done){
      client.getRippleAddresses(function(err, rippleAddresses){
        if (err) { throw new Error(err) };
        assert(rippleAddresses.length > -1);
        done();
      });
    });

  });

  describe('admin', function(){
    before(function(done){
      admin.getKey(function(err, key){
        if (err) {
          throw new Error('Could not get the admin key. Try running `bin/gateway init`');
        } else {
          client = new RippleGateway.Client({
            api: 'https://localhost:4000',
            user: 'admin',
            secret: key 
          });
          done();
        }
      });
    });

    it('should create a ripple_address and associate it with a given a user', function(done){

      client.createRippleAddress({}, function(err, rippleAddress){
        assert(!err);
        assert(rippleAddress);
        done();
      });
    });

    it.skip('should list ripple_addresses of a given user', function(done){
      // GET /ripple_addresses
      done();
    });

    it.skip('should list all ripple_addresss of all users', function(done){
      // GET /ripple_addresses
      done();
    });

  }); 

});
