var Balance = require("../models/balance");
var Sequelize = require('sequelize');
var db = require('../config/sequelize');

var RippleTx = sequelize.define('ripple_transaction', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, notNull: true },
  toCurrency: { type: Sequelize.STRING, notNull: true },
  toAddress: { type: Sequelize.STRING, notNull: true },
  toCurrency: { type: Sequelize.STRING, notNull: true },
  toAmount: { type: Sequelize.DECIMAL, notNull: true },
  fromCurrency: { type: Sequelize.STRING, notNull: true },
  fromAmount: { type: Sequelize.DECIMAL, notNull: true },
  fromAddress: { type: Sequelize.STRING, notNull: true },
  destinationTag: { type: Sequelize.STRING },
  balanceId: { type: Sequelize.INTEGER, notNull: true },
  issuance: { type: Sequelize.BOOLEAN, notNull: true },
  txHash: { type: Sequelize.STRING },
  txState: Sequelize.STRING
}, {
  classMethods: {
		createIncomingWithBalance: function(balance, txParams, callback) {
			var RippleTransaction = this;
			txParams.balanceId = balance.id;	
			txParams.bankAccountId = txParams.destinationTag;
			RippleTransaction.create(txParams) 
			.success(function(rippleTransaction) {
				balance.updateAttributes({
					amount: (parseFloat(balance.amount) + parseFloat(txParams.toAmount))
				})
				.success(function(){
					callback(null, {
						balance: balance,
						rippleTransaction: rippleTransaction 
					});
				})
				.error(function(){ callback(err, null) });
			})
			.error(function(){ callback(err, null) });
		}	
	}
});

module.exports = RippleTx;
