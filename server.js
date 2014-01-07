var express = require('express')
var requireAll = require('./lib/require-all')

controllers = requireAll({
  dirname: __dirname + '/app/controllers',
  filter: /(.+)\.js(on)?$/
})

var app = express()
app.use(express.static(__dirname + '/public'))

require('./config/initializers/middleware.js').configure(app)
require('./config/routes').configure(app, controllers)

address = process.env.ADDRESS
port = process.env.PORT || 4000

if (address){
  app.listen(port, address)
  console.log('Listening on IP address ', address)
} else {
  app.listen(port)
}
console.log('Listening on port ', port)

