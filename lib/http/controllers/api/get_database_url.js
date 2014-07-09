var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  res.send({
    DATABASE_URL: gateway.config.get('DATABASE_URL')
  });
};
