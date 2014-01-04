var express = require('express')
var requireAll = require('./lib/node-require-all/index')

controllers = requireAll({
  dirname: __dirname + '/app/controllers',
  filter: /(.+)\.js(on)?$/
})

var app = express()

require('./config/initializers/middleware.js').configure(app)
require('./config/routes').configure(app, controllers)

port = process.env.PORT || 4000
app.listen(port)
console.log('Listening on port ', port)

