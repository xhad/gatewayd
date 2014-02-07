RippleTransaction = require("../models/ripple_transaction");
var async = require("async");

module.exports = (function(){
  function index(req, res) {
    req.user.balances(function(err, balances) {
      res.send({ error: err, balances: balances });
    });
  } 

  return {
    index: index
  }
})();
