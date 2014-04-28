var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  res.send({ 'LAST_PAYMENT_HASH': gateway.config.get('LAST_PAYMENT_HASH') });
};
