var gateway = require(__dirname+'/../../');
var logger = require('winston');

module.exports = function (){
  gateway.api.getLastPaymentHash(function(err, hash){
    if (err) {
      logger.error(err);
      return;
    }
    logger.info(hash);
  });
};