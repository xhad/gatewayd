var UsersCtrl = require('../controllers/users.js');
var User = require("../models/user.js");

var assert = require("assert")
var sinon = require('sinon');

describe("Users Controller", function(){
	describe("creating a new user", function(){
		beforeEach(function(){
			validParams = {
				username: 'someusernam',
				password: 'av3rysecurep@ssword',
				ripple_address: 'myrippleaddress'
 			};
			userSpy = sinon.spy(User);
		});
		
		it('should have a function to do so', function(){
		  assert.equal(typeof UsersCtrl.create, 'function');	
		})

		it('should require a username in the request body', function(){
			req.body = validParams;
			res = sinon.spy();
			UsersCtrl.create(req, res);
		});
	});
});
