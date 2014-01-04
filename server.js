var express = require('express')

controllers = require('./lib/node-require-all')({
  dirname: __dirname + '/app/controllers',
  filter: /(.+)\.js(on)?$/
})

var app = express()

require('./config/initializers/middleware.js').configure(app)
require('./config/routes').configure(app, controllers)

app.get('/api/steven', function(req,res){ res.send('zeiler') })

port = process.env.PORT || 4000
app.listen(port)
console.log('Listening on port ', port)

