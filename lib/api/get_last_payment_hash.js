var config = require(__dirname+'/../../config/config.js');
var logger = require('winston');

/**
 * @require config
 * @description This function gets the last
 * transaction has from the config file.
 *
 * @param {callback} - fn
 */
module.exports = function (fn){
  var hash = config.get('LAST_PAYMENT_HASH');
  if (hash) {
    fn(null, hash);
  } else {
    logger.info('Last payment hash not been set yet.');
  }
};