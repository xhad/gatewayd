RippleTransaction = require("../models/ripple_transaction");
var async = require("async");

module.exports = (function(){
  function userIndex(req, res) {
    User.find(req.params.id).complete(function(err, user) {
      user.balances(function(err, balances) {
        res.send({ error: err, balances: balances });
      });
    });
  } 

  return {
    userIndex: userIndex
  }
})();
