var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  res.send({ 'KEY': gateway.config.get('KEY') });
};
