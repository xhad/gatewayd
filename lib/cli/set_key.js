var gateway = require(__dirname+'/../../');

function setKey(){
  gateway.api.setKey(function(err, newKey){
    if (err){
      console.log('error:', err);
    } else {
      console.log('set key to', newKey);
    } 
  });
}

module.exports = setKey;
