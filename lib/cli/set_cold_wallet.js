var gateway = require(__dirname+'/../..');

function setColdWallet(address){
  coldWallet = gateway.config.get('COLD_WALLET');
  if (coldWallet) {
    console.log('cold wallet already set:', coldWallet);
  } else {
    gateway.config.set('COLD_WALLET', address);
    gateway.config.save(function(){
      console.log('set cold wallet address to', address);
    });
  }
}

module.exports = setColdWallet;
