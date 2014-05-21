var request = require('request');
var gateway = require(__dirname +'/../../');
var restApiUrl = gateway.config.get('RIPPLE_REST_API');

module.exports = function(url, fn){

  //remove "/"
  var path = url.substr(1);
  var url = restApiUrl + path;

  request.get({url: url, json: true}, function(err,_,resp){
    if(err){
      fn(err, null);
    } else {
      if(resp.success) {
        fn(null, resp.payment);
      }
    }
  });
};