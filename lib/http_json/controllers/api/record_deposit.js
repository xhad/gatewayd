var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {

  var opts =  {
    external_account_id: req.external_account_id,
    amount: req.amount,
    secret: req.body.secret
  }
  
  gateway.api.recordDeposit(function(err, withdrawals){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ withdrawals: withdrawals });
    }
  });
  
};

