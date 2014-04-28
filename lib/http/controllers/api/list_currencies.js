var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  res.send({ 'CURRENCIES': gateway.config.get('CURRENCIES') });
};
