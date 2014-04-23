var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  gateway.config.set('DOMAIN', req.body.domain);
  res.send({ 'DOMAIN': gateway.config.get('DOMAIN') });

};
