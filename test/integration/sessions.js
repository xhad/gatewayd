var request = require('request')
var assert = require('assert')
var crypto = require('crypto')
var sinon = require('sinon')
Ripple = require('../../lib/ripple')
baseUrl = 'http://127.0.0.1:4000/'

describe('managing a user session', function(){
  before(function(done){
    client = new Ripple.Gateway.Client({
      api: 'http://localhost:3000',
      clientId: 'username',  
      clientSecret: 'password'
    })

    client.createUser({
      username: crypto.randomBytes(16).toString('hex'),
      password: 'password' 
    }, function(err, user){
      testUser = user
      done()
    })
  })
    
  afterEach(function(){
    console.log(this.currentTest.title)
  })

  it('should create a session with credentials', function(done) {
    client.createSession({ 
      username: testUser.name,
      password: 'password'
    }, function(err, session) {
      console.log(err)
      assert.equal(session.username, testUser.name)
      done()
    })
  })

  it("should fail without username", function(done) {
    client.createSession({}, function(err, session){
      assert(!!err)
      done()
    })
  })
})

