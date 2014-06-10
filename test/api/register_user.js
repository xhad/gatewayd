var gateway = require(__dirname+'/../../');
var assert = require('assert');
var crypto = require('crypto');
var random = function(){ return crypto.randomBytes(16).toString('hex') }

describe('Register User', function(){

  it('should register a user with a valid ripple address', function(done){

    var validUserParameters = {
      name: random(),
      password: random(),
      ripple_address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    };

    gateway.api.registerUser(validUserParameters, function(error, response){
      assert(!error);
      assert(!response.active);
      assert.strictEqual(response.name, validUserParameters.name);
      assert(response.salt);
      assert(response.password_hash);
      done();
    });

  });

  it('should create a hosted ripple address record for the user', function(done){
    var validUserParameters = {
      name: random(),  
      password: random(),
      ripple_address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    };

    gateway.api.registerUser(validUserParameters, function(error, response){
      assert(!error);
      assert(response.hosted_address);
      assert(response.hosted_address.id);
      assert(response.hosted_address.address);
      assert.strictEqual(response.hosted_address.type, 'hosted');
      done();
    });

  })

  it('should create an independent ripple address record for the user', function(done){
    var validUserParameters = {
      name: random(),  
      password: random(),
      ripple_address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    };

    gateway.api.registerUser(validUserParameters, function(error, response){
      assert(!error);
      assert(response.ripple_address);
      assert(response.ripple_address.id);
      assert.strictEqual(response.ripple_address.address, validUserParameters.ripple_address);
      assert.strictEqual(response.ripple_address.type, 'independent');
      done();
    });

  })
  
  it('should create a default external account', function(done){
    var validUserParameters = {
      name: random(),
      password: random(),
      ripple_address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    };

    gateway.api.registerUser(validUserParameters, function(error, response){
      assert(!error);
      assert(response.external_account);
      assert(response.external_account.id);
      assert.strictEqual(response.external_account.name, 'default');
      done();
    });

  });

  it('should not create a user record with an invalid ripple addres', function(done){
    var name = random();

    var validUserParameters = {
      name: name,
      password: random(),
      ripple_address: '1232342lkjsdlkd'
    };

    gateway.api.registerUser(validUserParameters, function(error, response){
      assert(error.ripple_address);
      assert.strictEqual(error.ripple_address, 'invalid ripple address');

      gateway.data.models.users.find({ where: { name: name }})
        .complete(function(error, user){
          assert(!error);
          assert(!user);
          done();
        });
    });
  });
});

