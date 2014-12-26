var gateway = require(__dirname+'/../../');

function setLastPaymentHash(hash){
  gateway.api.setLastPaymentHash(hash)
    .then(function(newlySetHash){
      logger.info('set the last payment hash to', newlySetHash);
    })
    .error(function(error){
      logger.error(error);
    });
}

module.exports = setLastPaymentHash;

