var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize');
var User = require('../models/user');
var RippleAddress = require('../models/ripple_address');
var RippleTransaction = require('../models/ripple_transaction');

var GatewayAccount = sequelize.define('gateway_account', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true,
	},
  userId: { 
		type: Sequelize.STRING,
    notNull: true,
    unique: true
	}
}, {
  instanceMethods: {
    gatewayBalances: function(fn){
      var query = '';
      query = 'select SUM("cashAmount") as amount, "currency"';
      query += 'FROM bank_txs GROUP BY "currency"';
      query += 'WHERE accountId = ?';
      sequelize.query(query, this.id).complete(fn);
    },
    user: function(fn){
      var query = 'select * from users where gatewayAccountId = ?';
      sequelize.query(query, this.id).complete(fn);
    },
    rippleAddresses: function(fn){
      var query = 'select * from ripple_addresses where gatewayAccountId = ?';
      sequelize.query(query, this.id).complete(fn);
    },
    rippleTransactions: function(fn){
      var query = 'select * from ripple_transactions';
      query += 'left outer join ripple_transactions' ;
      query += 'on ripple_transactions.rippleAddressId = ripple_addresses.id'; 
      query += 'left outer join ripple_addresses';
      query += 'on ripple_addresses.gatewayAccountId = ?';
      sequelize.query(query, this.id).complete(fn);
    }
  }
});

module.exports = GatewayAccount
