var request = require('request').defaults({ jar: true })
var assert = require('assert')
var crypto = require('crypto')
var sinon = require('sinon')
Ripple = require('../../lib/ripple')
baseUrl = 'http://127.0.0.1:4000/'


describe('managing a user session', function(){
  jar = request.jar

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

  it('should get the current session', function(done){
    client.createSession({ 
      username: testUser.name,
      password: 'password',
      cookieJar: jar
    }, function(err, resp) {
      client.getSession({ cookieJar: jar }, function(err, session){
        assert(session)
        done()
      })
    })
  })
})

