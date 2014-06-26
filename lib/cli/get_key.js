var gateway = require(__dirname+'/../../');
var logger = require('winston');

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
