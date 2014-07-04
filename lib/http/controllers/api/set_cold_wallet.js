var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  var coldWallet = gateway.config.get('COLD_WALLET');
  if (coldWallet) {
    res.end(304);
  } else {
    gateway.config.set('COLD_WALLET', req.body.address);
    res.send(201, { 'COLD_WALLET':
      gateway.config.get('COLD_WALLET')
    });
  }

};
