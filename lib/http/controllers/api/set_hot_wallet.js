var api = require(__dirname+'/../../../api');

module.exports = function(request, response){
  var address = request.body.address;
  var secret = request.body.secret;

  api.setHotWallet({
    address: address,
    secret: secret
  })
  .then(function(wallet) {
    wallet = wallet.toJSON();
    wallet.secret = 'SECRET';
    response.status(200).send({
      success: true,
      hot_wallet: wallet
    });
  })
  .error(function(error) {
    response.status(500).send({ error: error.message });
  });
};

