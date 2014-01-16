var Sequelize = require('sequelize')
var db = require('../../config/initializers/sequelize.js')
var utils = require("../../lib/utils")
var RippleAddress = require('./ripple_address.js')
var crypto = require("crypto")

var User = sequelize.define('user', {
  id: { 
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		notNull: true,
		unique: true,
	},
  federationTag: Sequelize.STRING,
  admin: Sequelize.BOOLEAN,
  federationName: Sequelize.STRING,
  kycId: Sequelize.INTEGER,
  name: Sequelize.STRING,
  salt: Sequelize.STRING,
  passwordHash: Sequelize.STRING
}, {
  instanceMethods: {
  },
  classMethods: {
    createAdmin: function(email, callback) {
      User.find({ where: { admin: true }}).complete(function(err, admins){
        console.log(admins)
        if (typeof admins == 'undefined') {
          var password = crypto.randomBytes(32).toString('hex')
          User.createEncrypted({
            name: email,
            password: password
          }, function(err, admin) {
            admin.password = password 
            callback(err, admin)
          })
        } else {
          callback('admin already exists', null)
        }
      })
    },
    createEncrypted: function(opts, callback) {
      var salt = utils.generateSalt();
      var passwordHash = utils.saltPassword(opts.password, salt);
      var admin = opts.admin || false

      var user = User.create({
        name: opts.name,
        admin: admin,
        salt: salt,
        passwordHash: passwordHash,
      }).complete(function(err, user){
        callback(err, user)
      })
    }
  }
});

module.exports = User;
