var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize.js');
var utils = require("../../lib/utils");
var RippleAddress = require('./ripple_address.js');

var User = sequelize.define('user', {
  id: { 
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		notNull: true,
		unique: true,
	},
  federationTag: Sequelize.STRING,
  federationName: Sequelize.STRING,
  kycId: Sequelize.INTEGER,
  name: Sequelize.STRING,
  salt: Sequelize.STRING,
  passwordHash: Sequelize.STRING
}, {
  instanceMethods: {
    balance: function(currency) {
	    //return this.bankBalance(currency) - this.rippleBalance(currency);  	
    },
		bankDeposits: function(done) {
			BankTx.where({ userId: this.id, deposit: true }, done);
		},
    bankWithdrawals: function (done) {
			BankTx.where({ userId: this.id, deposit: false }, done);
		},
		balances: function() {},
		bankBalance: function(currency) {},
		bankBalances: function() {},
		rippleBalance: function(currency) {},
		rippleBalances: function() {} 
  },
  classMethods: {
    createEncrypted: function(name, password, callback) {
      var salt = utils.generateSalt();
      var passwordHash = utils.saltPassword(password, salt);

      var user = User.create({
        name: name,
        salt: salt,
        passwordHash: passwordHash,
      }).complete(function(err, user){
        callback(err, user)
      })
    }
  }
});

module.exports = User;
