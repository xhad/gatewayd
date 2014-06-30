var gateway = require(__dirname+'/../..');
var logger = require('winston');

function setColdWallet(address){
  coldWallet = gateway.config.get('COLD_WALLET');
  if (coldWallet) {
    logger.info('cold wallet already set:', coldWallet);
  } else {
    gateway.config.set('COLD_WALLET', address);
    gateway.config.save(function(){
      logger.info('set cold wallet address to:', address);
    });
  }
}

module.exports = setColdWallet;
