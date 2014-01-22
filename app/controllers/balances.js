RippleTransaction = require("../models/ripple_transaction")

module.exports = (function(){
  function userIndex(req, res) {
    User.find(req.params.id).complete(function(err, user) {
      user.externalBalances(function(err, externalBalances) {
        user.rippleBalances(function(err, rippleBalances) {
          res.send({ 
            external_balances: (externalBalances || []),
            ripple_balances: (rippleBalances || []) 
          });
        })
      });
    });
  } 

  function index(req, res) {
    var query = 'SELECT to_currency as currency, SUM(to_amount) as amount FROM ripple_transactions';
    query += ' GROUP BY to_currency';
    sequelize.query(query).complete(function(err, result){
      var rippleTransactions = result;

      var query = 'SELECT currency, SUM(cash_amount) as amount FROM external_transactions GROUP BY currency';
      sequelize.query(query).complete(function(err, external){
        res.send({ error: err, balances: result.concat(external), external_balances: external });
      });
    });
  }

  return {
    index: index,
    userIndex: userIndex,

    gateway: function(req, res) {
      sequelize.query('select SUM("cashAmount") as amount, "currency" FROM bank_txs GROUP BY "currency" WHERE accountId = ?', req.params.accountId).complete(function(err,rows){
        if (err) { res.send({ success: false, error: err }) }
        res.send({ success: true, rippleTransactions: rows })
      })
    }

  }
})();
