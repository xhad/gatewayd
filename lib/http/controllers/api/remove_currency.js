var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  gateway.api.removeCurrency(req.params.currency, function(err, currencies){
    if (err){
      res.send(500, { error: err });
    } else {
      res.send({ currencies: currencies });
    }
  });

};
