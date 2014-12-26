var gateway = require(__dirname+'/../../');

module.exports = function (){
  gateway.api.getOrFetchLastPaymentHash()
    .then(function(hash){
      logger.info(hash);
    })
    .error(function(error){
      logger.error(error);
    });
};
