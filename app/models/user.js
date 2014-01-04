var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize.js');
var utils = require("../../lib/utils");
var BankAccount = require('./account.js');
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
  bankAccountId: Sequelize.INTEGER,
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
		createWithAddress: function(name, password, rippleAddress,callback){
			var salt = utils.generateSalt();
			var passwordHash = utils.saltPassword(password, salt);

			var user = User.create({
				name: name,
				salt: salt,
				passwordHash: passwordHash,
				federationTag: 'federationTag',
				federationName: name
			})
			.success(function(user) {
				RippleAddress.create({
					userId: user.id,
					address: rippleAddress
				})
				.success(function(rippleAddress) {
					user.rippleAddress = rippleAddress;
					callback(null, user);
				})
				.error(function(err){
					callback(null, user);
				});
			})
			.error(function(err) {
				callback(err, null)
			})
		}
  }
});
	module.exports = User;
