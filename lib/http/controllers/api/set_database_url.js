var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  gateway.config.set('DATABASE_URL', req.body.database_url);
  res.send({ 'DATABASE_URL': gateway.config.get('DATABASE_URL') });

};
