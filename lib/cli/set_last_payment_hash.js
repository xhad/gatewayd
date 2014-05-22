var gateway = require(__dirname+'/../../');
var config = require(__dirname+'/../../config/config.js');

function setLastPaymentHash(hash){
  
  config.set('LAST_PAYMENT_HASH', hash);
  config.save(function(){
    console.log('set the last payment hash to '+ hash);
  });
}

module.exports = setLastPaymentHash;
