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
  federation_tag: Sequelize.STRING,
  admin: Sequelize.BOOLEAN,
  federation_name: Sequelize.STRING,
  kyc_id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  salt: Sequelize.STRING,
  password_hash: Sequelize.STRING,
  external_id: Sequelize.STRING
}, {
  instanceMethods: {
    gatewayBalances: function(fn){
      var query = '';
      query = 'select SUM("cashAmount") as amount, "currency"';
      query += ' FROM external_transactions GROUP BY "currency"';
      query += ' WHERE accountId = ?';
      sequelize.query(query, this.id).complete(fn);
    },
    user: function(fn){
      var query = 'select * from users where gatewayAccountId = ?';
      sequelize.query(query, this.id).complete(fn);
    },
    externalAccounts: function(fn){
      var query = 'select * from external_accounts where gateway_account_id = '+this.id;
      sequelize.query(query).complete(fn);
    },
    externalTransactions: function(fn){
      var query = 'select * from external_transactions';
      query += ' left outer join external_transactions';
      query += ' on external_transactions.externalAccountId = external_accounts.id';
      query += ' left outer join external_accounts';
      query += ' on external_accounts.gatewayAccountId = ?';
      sequelize.query(query, this.id).complete(fn);
    },
    rippleAddresses: function(fn){
      var query = 'select * from ripple_addresses where gatewayAccountId = ?';
      sequelize.query(query, this.id).complete(fn);
    },
    rippleTransactions: function(fn){
      var query = 'select * from ripple_transactions';
      query += ' left outer join ripple_transactions';
      query += ' on ripple_transactions.rippleAddressId = ripple_addresses.id'; 
      query += ' left outer join ripple_addresses';
      query += ' on ripple_addresses.gatewayAccountId = ?';
      sequelize.query(query, this.id).complete(fn);
    }
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
            admin.password = password 

            RippleAddress.create({
              managed: true,
              userId: admin.id,
              type: 'hot',
              address: hotWallet.address,
              secret: hotWallet.secret
            }).complete(function(err, address) {
              if(err) { 
                callback(null, { admin: admin, wallets: { hot: hotWallet, cold: coldWallet }})
              }
              RippleAddress.create({
                managed: true,
                userId: admin.id,
                type: 'cold',
                address: coldWallet.address,
                secret: coldWallet.secret
              }).complete(function(err, address) {
                callback(null, { admin: admin, wallets: { hot: hotWallet, cold: coldWallet }})
                if (err) { 
                  callback(null, { admin: admin, wallets: { hot: hotWallet, cold: coldWallet }})
                }
                callback(null, { admin: admin, password: password, wallets: { hot: hotWallet, cold: coldWallet }})
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
