var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  var coldWallet = gateway.config.get('COLD_WALLET') || {};
  res.send({ 'COLD_WALLET': { address: coldWallet }});

};
