var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {

  var options = {
    amount: req.body.amount,
    currency: req.body.currency,
    secret: req.body.secret
  };

  gateway.api.fundHotWallet(options, function(error, response){
    if (error) {
      res.send(500, { success: false, error: error });
    } else {
      res.send(200, { success: true, hot_wallet: response });
    }
  });
  
};

