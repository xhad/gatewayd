var gateway = require(__dirname+'/../../');

function setLastPaymentHash(hash){
  gateay.api.setLastPaymentHash({ hash: hash }, function(err, newlySetHash){
    if (err) { console.log('error', err); return };
    console.log('set the last payment hash to '+ newlySetHash);
  });
}

module.exports = setLastPaymentHash;

