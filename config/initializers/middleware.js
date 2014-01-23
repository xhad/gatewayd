var express = require('express')
var expressValidator = require('express-validator')
var passport = require('./passport.js');

module.exports = (function(){
  function configure(app) {
    app.use(function(req,res,next) {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      next()
    })
    app.use(express.bodyParser())
    app.use(expressValidator());
    app.use(express.cookieParser())
    app.use(express.session({secret: 'oi09ajsdf09fwlkej33lkjpx'}))
    app.use(express.methodOverride())
    app.use(express.static(__dirname + '/../../public'))
    app.use(passport.initialize())
    app.use(function(err, req, res, next) {
      res.send({ error: err })
    });
  }
  return { configure: configure }
})()
