var config = require(__dirname+'/../../config/config.js');

/**
 * @requires config
 * @function getKey
 *
 * @description Gets admin password.
 * @param {getKeyCallback} fn - Callback that handles response upon getting key.
 */
function getKey(fn){
  key = config.get('KEY'); 
  if (key) {
    fn(null, key);
  } else {
    setKey(fn);
  }
};

module.exports = getKey;

