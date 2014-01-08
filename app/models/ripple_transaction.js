var Balance = require("../models/balance");
var PendingRippleTransaction = require("../models/pending_ripple_transaction");
var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize');

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
		createIncomingWithBalance: function(balance, txParams, fn) {
			var RippleTransaction = this;
			txParams.balanceId = balance.id;	
			txParams.bankAccountId = txParams.destinationTag;
			RippleTransaction.create(txParams).complete(function(err, tx) {
				if (err) { fn(err, null); return false; }
			  fn(null, rippleTransaction);	
			});
		}	
	},
	instanceMethods: {
		updateBalance: function(fn){
			var rippleTransaction = this;
			Balance.find(rippleTransaction.balanceId).complete(function(err, balance) {
				var oldAmount = parseFloat(balance.amount);
				var newAmount = rippleTransaction.toAmount;
				var sign = rippleTransaction.issuance ? -1 : 1;
				var diff = sign * parseFloat(rippleTransaction.toAmount);
				balance.updateAttributes({
					amount: (oldAmount + diff)
				}).complete(fn);
			});
		}
	}
});

module.exports = RippleTx;
