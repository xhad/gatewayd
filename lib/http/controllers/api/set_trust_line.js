var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  var currency = req.body.currency;
  var amount = req.body.amount;

  gateway.api.setTrustLine({currency: currency, amount: amount}, function(err, resp){
    if (err){
      res.send({ error: err });
    } else {
      res.send({ lines: resp });
    }
  });
};


