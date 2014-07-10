var gateway = require(__dirname+'/../../');

function setLastPaymentHash(hash){
  gateway.api.setLastPaymentHash({ hash: hash }, function(err, newlySetHash){
    if (err) {
      logger.error(err);
      return;
    }
    logger.info('set the last payment hash to', newlySetHash);
  });
}

module.exports = setLastPaymentHash;

