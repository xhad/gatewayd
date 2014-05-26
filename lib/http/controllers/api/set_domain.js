var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  gateway.config.set('DOMAIN', req.body.domain);
  gateway.config.save(function(){
    res.send({ 'DOMAIN': gateway.config.get('DOMAIN') });
  });

};
