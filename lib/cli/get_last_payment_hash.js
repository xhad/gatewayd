var gateway = require(__dirname+'/../../');

module.exports = function (){
  gateway.api.getLastPaymentHash(function(err, hash){
    if (err) {
      logger.error(err);
      return;
    }
    logger.info(hash);
  });
};