var express = require('express')

controllers = require('./lib/node-require-all')({
  dirname: __dirname + '/app/controllers',
  filter: /(.+)\.js(on)?$/
})

var app = express()

require('./config/initializers/middleware.js').configure(app)
require('./config/routes').configure(app, controllers)

app.listen()
console.log('Listening on port ', app.set('port'))

