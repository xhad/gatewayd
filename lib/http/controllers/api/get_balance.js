var ripple = require(__dirname+'/../../../ripple/get_account_balance.js');

module.exports = function(req, res){
  ripple(function(err, balance){
    if (err){
      res.send(500, { error: err });
    } else {
      res.send(balance);
    }
  });
};