var gateway = require(__dirname+'/../..');
var logger = require('winston');

function setHotWallet(address, secret){
  gateway.api.setHotWallet(address, secret, logger.info);
}

module.exports = setHotWallet;
