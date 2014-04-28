var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  gateway.config.set('LAST_PAYMENT_HASH', req.body.payment_hash);
  res.send({ 'LAST_PAYMENT_HASH': gateway.config.get('LAST_PAYMENT_HASH') });

};
