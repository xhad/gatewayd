var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  res.send({ 'RIPPLE_REST_API': gateway.config.get('RIPPLE_REST_API') });
};
