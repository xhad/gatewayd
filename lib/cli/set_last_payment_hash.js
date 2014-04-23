var gateway = require(__dirname+'/../../');

function setLastPaymentHash(hash){
  gateway.api.setLastPaymentHash(hash, console.log);
}

module.exports = setLastPaymentHash;
