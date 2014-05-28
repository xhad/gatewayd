var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  var url = req.body.url;
  gateway.api.setRippleRestUrl(url, function(err, url){
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ 'RIPPLE_REST_API': url });
    }
  });
};
