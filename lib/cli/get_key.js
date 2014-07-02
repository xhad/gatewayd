var gateway = require(__dirname+'/../../');

function getKey(){
  gateway.api.getKey(function(err, key){
    if (err) {
      logger.error(err);
      return;
    }
    logger.info(key);
  });
}

module.exports = getKey;
