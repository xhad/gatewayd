var Sequelize = require('sequelize')
var db = require('../../config/initializers/sequelize.js')
var utils = require("../../lib/utils")
var RippleAddress = require('./ripple_address.js')
var RippleWallet = require('./../../lib/rippleAddress').RippleWallet
var crypto = require("crypto")
var sjcl = require('sjcl')

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
        if (admins && (admins.length > 0)) {
          callback('admin already exists', null)
        } else {
          var password = crypto.randomBytes(32).toString('hex')
          User.createEncrypted({
            name: email,
            password: password,
            admin: true
          }, function(err, admin) {
            if (err) { callback(err, null); return } 
            hotWallet = RippleWallet.generate()
            coldWallet = RippleWallet.generate()
            RippleAddress.create({
              managed: true,
              userId: admin.id,
              type: 'hot',
              address: hotWallet.address,
              secret: hotWallet.secret
            }).complete(function(err, address) {
              if(err) { return }
              RippleAddress.create({
                managed: true,
                userId: admin.id,
                type: 'cold',
                address: coldWallet.address,
                secret: coldWallet.secret
              }).complete(function(err, address) {
                admin.password = password 
                callback(null, { admin: admin, wallets: { hot: hotWallet, cold: coldWallet }})
              })
            })
          })
        }
      })
    },
    generateWallet: function() {
      
    },
    createEncrypted: function(opts, callback) {
      var salt = utils.generateSalt();
      var passwordHash = utils.saltPassword(opts.password, salt)
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
