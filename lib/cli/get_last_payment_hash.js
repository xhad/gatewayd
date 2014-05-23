var gateway = require(__dirname+'/../../');

module.exports = function (){
  gateway.api.getLastPaymentHash(function(err, hash){
    if (err) { console.log('error:', err); return };
    console.log(hash);
  });
};