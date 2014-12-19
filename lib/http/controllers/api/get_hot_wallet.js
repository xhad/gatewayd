var api = require(__dirname+'/../../../api');

module.exports = function(request, response){

  api.getHotWallet()
    .then(function(hotWallet) {
      var wallet = hotWallet.toJSON();
      wallet.secret = 'SECRET';
      response.status(200).send({
        success: true,
        hot_wallet: wallet
      });
    })
    .error(function(error) {
      response.status(500).send({ error: error });
    });
};

