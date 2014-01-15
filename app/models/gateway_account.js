var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize');
var User = require('../models/user');

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
    getBalances: function(fn){
      query = ''
      query += 'select SUM("cashAmount") as amount, "currency"'
      query += 'FROM bank_txs GROUP BY "currency"'
      query += 'WHERE accountId = ?'
      sequelize.query(query, this.id).complete(function(err, rows){
        if (err) { fn({ success: false, error: err }); return false }
        fn({ success: true, balances: rows })
      })
    }
  }
});

module.exports = GatewayAccount
