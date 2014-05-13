var balance = require(__dirname+'/../../../ripple/get_account_balance.js');

module.exports = function(req, res){
  balance.getLiabilities(function(err, balance){
    if (err){
      res.send(500, { error: err });
    } else {
      res.send(balance);
    }
  });
};
