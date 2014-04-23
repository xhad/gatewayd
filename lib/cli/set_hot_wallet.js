var gateway = require(__dirname+'/../..');

function setHotWallet(address, secret){
  gateway.rippleAddresses.setHotWallet(address, secret, console.log);
}

module.exports = setHotWallet;
