var gateway = require(__dirname+'/../..');

function setColdWallet(address){
  gateway.coldWallet.set(address, console.log);
}

module.exports = setColdWallet;
