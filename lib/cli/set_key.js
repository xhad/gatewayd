var gateway = require(__dirname+'/../../');

function setKey(){
  gateway.api.setKey(function(err, newKey){
    if (err){
      logger.error(err);
    } else {
      logger.info('set key to', newKey);
    } 
  });
}

module.exports = setKey;
