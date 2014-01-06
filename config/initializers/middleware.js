express = require('express')
expressValidator = require('express-validator')

module.exports = (function(){
  function configure(app) {
    app.set('port', process.env.PORT || 3000);
    app.set('host', process.env.HOST || '127.0.0.1')
    app.use(express.static(__dirname + '/public'));
    app.use(function(req,res,next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      next()
    })
    app.use(express.bodyParser())
    app.use(expressValidator());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'oi09ajsdf09fwlkej33lkjpx'}));
    app.use(express.methodOverride())
    app.use(function(err, req, res, next) {
      res.send({ error: err });
    });
  }
  return { configure: configure }
})()
