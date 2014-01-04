fs      = require('fs')
express = require('express')
http    = require('http')
https   = require('https')
path    = require('path')
expressValidator = require('express-validator')

module.exports = (function(){
  function configure(app) {
    app.set('port', process.env.PORT || 3000);
    app.set('host', process.env.HOST || '127.0.0.1')
    app.use(express.favicon())
    app.use(express.bodyParser())
    app.use(expressValidator());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'oi09ajsdf09fwlkej33lkjpx'}));
    app.use(express.methodOverride())
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(function(err, req, res, next) {
      res.send({ error: err });
    });
  }
  return { configure: configure }
})()
