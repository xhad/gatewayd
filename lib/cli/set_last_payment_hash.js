var gateway = require(__dirname+'/../../');
var config = require(__dirname+'/../../config/config.js');

function setLastPaymentHash(hash){
  gateway.api.setLastPaymentHash({ hash: hash }, function(err, newlySetHash){
    if (err) { console.log('error', err); return };
    console.log('set the last payment hash to '+ newlySetHash);
  });
}

module.exports = setLastPaymentHash;

