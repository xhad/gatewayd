var express = require('express')
var requireAll = require('./lib/require-all')

ctrls = requireAll({
  dirname: __dirname + '/app/controllers',
  filter: /(.+)\.js(on)?$/
})

var app = express()
app.use(express.static(__dirname + '/public'))

require('./config/initializers/middleware.js').configure(app)
require('./config/routes').configure(app, ctrls)

app.post('/api/v1/sessions', ctrls['sessions'].create)
app.post('/api/v1/gateway/users', ctrls['gateway_users'].create)
app.get('/api/v1/sessions', ctrls['sessions'].show)
app.post('/api/v1/sessions/destroy', ctrls['sessions'].destroy)

app.post('/api/v1/ripple_transactions', ctrls['ripple_transactions'].create)

address = process.env.ADDRESS
port = process.env.PORT || 4000

if (address){
  app.listen(port, address)
  console.log('Listening on IP address ', address)
} else {
  app.listen(port)
}
console.log('Listening on port ', port)

