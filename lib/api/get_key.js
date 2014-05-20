var config = require(__dirname+'/../../config/config.js');

function getKey(fn){
  key = config.get('KEY'); 
  if (key) {
    fn(null, key);
  } else {
    setKey(fn);
  }
};

module.exports = getKey;

