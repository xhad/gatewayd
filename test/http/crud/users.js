var request = require('supertest');
var app = require(__dirname+'/../../../lib/app.js');
var gateway = require(__dirname+'/../../../');
var assert = require('assert');
var crypto = require("crypto");

var random = function(){ return crypto.randomBytes(16).toString('hex') }

var userCreatedId;

describe('CRUD Users', function(){

  it('should list users', function(done){
    request(app)
      .get('/v1/users')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        assert(response.body.success);
        assert(response.body.users);
        done();
      });
  });

  it('should create a user', function(done){
    var name = random();
    request(app)
      .post('/v1/users')
      .send({
        name: name,
        password: random()
      })
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        assert(response.body.success); 
        assert.strictEqual(response.body.user.name, name);
        assert(response.body.user.id);
        userCreatedId = response.body.user.id;
        done();
      });
  });

});

