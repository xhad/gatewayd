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
    externalBalances: function(fn){
      var query = 'select * from external_transactions';
      query += ' left outer join ripple_transactions';
      query += ' on ripple_transactions.ripple_address_id = ripple_addresses.id'; 
      query += ' left outer join ripple_addresses';
      query += ' on ripple_addresses.user_id = ?';
      sequelize.query(query, this.id).complete(fn);
    },
    rippleBalances: function(fn) {
      var query = 'select * from ripple_transactions';
      query += ' left outer join ripple_transactions';
      query += ' on ripple_transactions.ripple_address_id = ripple_addresses.id'; 
      query += ' left outer join ripple_addresses';
      query += ' on ripple_addresses.user_id = ?';
      sequelize.query(query, this.id).complete(fn);
    },
    externalAccounts: function(fn){
      var query = 'select * from external_accounts where user_id = '+this.id;
      sequelize.query(query).complete(fn);
    },
    externalTransactions: function(fn){
      this.externalAccounts(function(err, accounts) {
        externalAccountIds = accounts.map(function(account){
          return account.id;
        });
        ExternalTransaction.findAll({ where: { external_account_id: externalAccountIds }}).complete(function(err, transactions) {
          fn(err, transactions);
        });
      });
    },
    rippleAddresses: function(fn){
      RippleAddress.findAll({ where: { user_id: this.id }}).complete(fn);
    },
    rippleTransactions: function(fn){
      this.rippleAddresses(function(err, addresses) {
        rippleAddressIds = addresses.map(function(address){
          return address.id;
        });
        RippleTransaction.findAll({ where: { ripple_address_id: rippleAddressIds }}).complete(function(err, transactions) {
          fn(err, transactions);
        });
      });
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
              user_id: admin.id,
              type: 'hot',
              address: hotWallet.address,
              secret: hotWallet.secret
            }).complete(function(err, hotAddress) {
              if(err) { 
                callback(null, { admin: admin, wallets: { hot: hotWallet, cold: coldWallet }})
              }
              RippleAddress.create({
                managed: true,
                user_id: admin.id,
                type: 'cold',
                address: coldWallet.address,
                secret: coldWallet.secret
              }).complete(function(err, coldAddress) {
                console.log('error creating address', err);
                if (err) { 
                  callback(err, { admin: admin, wallets: { hot: hotWallet, cold: coldWallet }})
                }
                callback(null, { admin: admin, password: password, addresses: [hotAddress, coldAddress], wallets: { hot: hotWallet, cold: coldWallet }})
              })
            })
          })
        }
      })
    },
    createEncrypted: function(opts, callback) {
      var salt = utils.generateSalt();
      var passwordHash = utils.saltPassword(opts.password, salt)
      var admin = opts.admin || false

      var user = User.create({
        name: opts.name,
        admin: admin,
        salt: salt,
        password_hash: passwordHash,
      }).complete(function(err, user){
        if (err) {
          callback(err, null);
        } else {
          if (!!user) {
            if (!user.admin) {
              RippleAddress.createHosted(user, function(err, address) {
                console.log('created hosted address');
                console.log(address);
                callback(err, user);
              });
            } else {
              callback(null, user);
            }
          } else {
             callback(err, user);
          }
        }
      })
    }
  }
});

module.exports = User;
