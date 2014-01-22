var express = require('express')
var requireAll = require('./lib/require-all')
var authorization = require('express-authorization')
var passport = require('passport')
var utils = require("./lib/utils")
var BasicStrategy = require("passport-http").BasicStrategy
var User = require("./app/models/user")
var ExternalTransaction = require("./app/models/external_transaction")
var RippleAddress = require('./app/models/ripple_address');
var ExternalAccount = require("./app/models/external_account")
var sys = require('sys');
var exec = require('child_process').exec;

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.find({ where: { name: username }}).complete(function (err, user) {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      if (!utils.verifyPassword(password, user.salt, user.passwordHash)) { return done(null, false) }
      return done(null, user)
    })
  }
))

ctrls = requireAll({
  dirname: __dirname + '/app/controllers',
  filter: /(.+)\.js(on)?$/
})

var app = express()
app.use(express.static(__dirname + '/public'))
app.use(passport.initialize())

require('./config/initializers/middleware.js').configure(app)

app.get('/api/v1/users/:id/ripple_addresses', ctrls['ripple_addresses'].userIndex);
app.get('/api/v1/users/:id/ripple_transactions', ctrls['ripple_transactions'].userIndex);
app.get('/api/v1/users/:id/external_accounts', ctrls['external_accounts'].userIndex);
app.get('/api/v1/users/:id/external_transactions', ctrls['external_transactions'].userIndex);
app.get('/api/v1/users/:id/balances', ctrls['balances'].userIndex);

app.get('/api/v1/gateway/settings', function(req, res) {
  User.find({ where: { admin: true }}).complete(function(err, user) {
    if (err) { res.send({ success: false }); return }
    RippleAddress.find({ where: { type: 'hot' }}).complete(function(err, address) {
      if (!user) { 
        res.send({ success: true, settings: { adminExists: false }}) 
      } else {
        res.send({ success: true, settings: { adminExists: user.admin, hotWallet: address.address } })
      }  
    });    
  });
});

app.get('/api/v1/gateway/settings', function(req, res) {
});

app.post('/api/v1/gateway/users', ctrls['users'].create)

app.post('/api/v1/gateway/users/login', 
  passport.authenticate('basic', { session: false }),
  ctrls['users'].login);

app.get('/api/v1/gateway/users', function(req, res) {
  User.all().complete(function(err, users){
    if(err){ res.send({ success: false, error: err }); return }
    res.send({ success: true, gatewayUsers: users });
  }); 
});

app.get('/api/v1/gateway/user', 
  passport.authenticate('basic', { session: false }), 
  ctrls['users'].show);

app.get('/api/v1/gateway/account/transactions', 
  passport.authenticate('basic', { session: false }), function(req,res){
    res.send({ success: true, user: req.user });
  });

app.post('/api/v1/gateway/account/withdrawal/request', 
  passport.authenticate('basic', { session: false }), function(req,res){
    res.send({ success: true, user: req.user })
  });

app.post('/api/v1/admin/users', ctrls['users'].createAdmin);

app.post('/api/v1/ripple_transactions', ctrls['ripple_transactions'].create)
app.get('/api/v1/ripple_transactions', ctrls['ripple_transactions'].index)

app.get('/api/v1gateway_users/:user_id/balances', ctrls['balances'].gateway)

app.post("/api/v1/gateway/users/:user_id/external_accounts", ctrls['external_accounts'].userIndex);
app.get('/api/v1/gateway/users/:id/external_transactions', ctrls['external_transactions'].userIndex);

address = process.env.ADDRESS
port = process.env.PORT || 4000

if (address){
  app.listen(port, address)
  console.log('Listening on IP address ', address)
} else {
  app.listen(port)
}
console.log('Listening on port ', port)

// Spawn child proccesses
var listener = exec("node listener.js", print);
console.log('spawned child process "node listener.js"');

function print(error, stdout, stderr) {
  console.log(stdout)
  if (error !== null) {
    console.log('exec error: ' + error)
  }
}

