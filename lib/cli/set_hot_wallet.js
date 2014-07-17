var gateway = require(__dirname+'/../..');

function setHotWallet(address, secret){
  gateway.api.setHotWallet(address, secret, logger.info);
}

module.exports = setHotWallet;
