var Sequelize = require('sequelize');
var db = require('../config/sequelize');

var Balance = sequelize.define('balance', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true
	},
  bankAccountId: { type: Sequelize.INTEGER, notNull: true },
  currency: { type: Sequelize.STRING, notNull: true },
  amount: { type: Sequelize.DECIMAL, notNull: true, default: 0 }
}, {
	classMethods: {
		findOrCreateByCurrencyAndBankAccountId: function(bankAccountId, currency, callback) {
			Balance.findAll({
				where: {
					bankAccountId: bankAccountId,
					currency: currency	
				}, limit: 1
			}).success(function(balances) {
				var balance = balances[0];
				if (!!balance) {
					callback(null, balance)
				} else {
					Balance.create({
						bankAccountId: bankAccountId,
						currency: currency,
						amount: 0
					}).success(function(balance){ 
						callback(null, balance);
					}).error(function(err){
						callback(err, null);
					});
				}
			}).error(function(err) {
				callback(err, null)
			});
		}
	}
});

module.exports = Balance;
