var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  gateway.config.set('KEY', req.body.key);
  res.send({ 'KEY': gateway.config.get('KEY') });

};
