var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  var address = req.body.address;
  var secret = req.body.secret;

  if (!(address && secret)){
    gateway.api.generateWallet(function(err, wallet){
      address = wallet.address;
      secret = wallet.secret;
    });
  }

  gateway.api.setHotWallet(address, secret, function(err, wallet){
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ 'HOT_WALLET': wallet });
    }
  });

};
