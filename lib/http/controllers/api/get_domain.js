var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  res.send({ DOMAIN: gateway.config.get('DOMAIN') });

};
