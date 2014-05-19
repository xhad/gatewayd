var config = require(__dirname+'/../../config/config.js');
var crypto = require('crypto');

function setKey(fn){
  try {
    var password = crypto.randomBytes(32).toString('hex');
    config.set('KEY', password);
    config.save(function(err){
      fn(null, config.get('KEY'));
    });
  } catch(error) {
    fn(error, null);
  }
};

module.exports = setKey;

