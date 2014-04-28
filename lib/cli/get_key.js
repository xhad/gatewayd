var gateway = require(__dirname+'/../../');

function getKey(){
  gateway.api.getKey(function(err, key){
    if (err) { console.log('error:', err); return };
    console.log(key);
  });
}

module.exports = getKey;
