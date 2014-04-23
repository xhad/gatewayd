var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  gateway.config.set('RIPPLE_REST_API', req.body.ripple_rest_api);
  res.send({ 'RIPPLE_REST_API': gateway.config.get('RIPPLE_REST_API') });

};
