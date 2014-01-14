RippleTransaction = require("../models/ripple_transaction")

module.exports = (function(){
  return {
    index: function(req, res){

    },

    gateway: function(req, res) {
      sequelize.query('select SUM("cashAmount") as amount, "currency" FROM bank_txs GROUP BY "currency" WHERE accountId = ?', req.params.accountId).complete(function(err,rows){
        if (err) { res.send({ success: false, error: err }) }
        res.send({ success: true, rippleTransactions: rows })
      })
    }

  }
})();
