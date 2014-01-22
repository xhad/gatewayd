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

  return {
    userIndex: userIndex,

    gateway: function(req, res) {
      sequelize.query('select SUM("cashAmount") as amount, "currency" FROM bank_txs GROUP BY "currency" WHERE accountId = ?', req.params.accountId).complete(function(err,rows){
        if (err) { res.send({ success: false, error: err }) }
        res.send({ success: true, rippleTransactions: rows })
      })
    }

  }
})();
