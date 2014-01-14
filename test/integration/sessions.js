var request = require('request')
var assert = require('assert')
var crypto = require('crypto')
var sinon = require('sinon')
Ripple = require('../../lib/ripple')
baseUrl = 'http://127.0.0.1:4000/'

describe('managing a user session', function(){
  before(function(){
    console.log(Ripple)
    client = new Ripple.Gateway.Client({
      api: 'http://localhost:3000',
      clientId: 'username',  
      clientSecret: 'password'
    })
  })
    
  afterEach(function(){
    console.log(this.currentTest.title)
  })

  it('should create a session with credentials', function(done) {
    client.createSession({ 
      username: 'username',
      password: 'password'
    }, function(err, resp, body) {
      assert(body.success)
      done()
    })
  })
})

  




  

