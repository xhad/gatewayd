var gateway = require(__dirname+'/../../');
var config = require(__dirname+'/../../config/config.js');

function setLastPaymentHash(opts){
  gateay.api.setLastPaymentHash({ hash: opts.hash }, function(err, newlySetHash){
    if (err) { console.log('error', err); return };
    console.log('set the last payment hash to '+ newlySetHash);
  });
}

module.exports = setLastPaymentHash;

