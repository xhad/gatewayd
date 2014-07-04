var config = require(__dirname+'/../../config/config.js');
var crypto = require('crypto');

/**
 * @requires config, crypto
 * @function setKey
 *
 * @description Generates a 32 bit key, and stores it in the config.json file.
 * It will server as an admin password in the webapp part of the Gateway.
 * @param {getKeyCallback} fn - Callback that handles response upon getting key.
 */

function setKey(fn){
  try {
    var password = crypto.randomBytes(32).toString('hex');
    config.set('KEY', password);
    config.save( function () {
      fn(null, config.get('KEY'));
    });
  } catch(error) {
    fn(error, null);
  }
}

module.exports = setKey;

