var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  var hotWallet = gateway.config.get('HOT_WALLET') || {};
  res.send({ 'HOT_WALLET': { address: hotWallet.address }});

};
