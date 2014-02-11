RippleTransaction = require("../models/ripple_transaction");
var async = require("async");

module.exports = (function(){
  function index(req, res) {
    req.user.balances(function(err, balances) {
      if (err) {
        res.send(500, { error: err });
      } else {
        res.send({ balances: balances });
      }
    });
  } 

  return {
    index: index
  }
})();
