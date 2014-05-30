var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  gateway.config.set('KEY', req.body.key);
  gateway.config.save(function(err){
    if(err){
      res.send(500, {error: err});
    } else {
      res.send({ 'KEY': gateway.config.get('KEY') });
    }
  })

};
