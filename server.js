var express = require('express')
var requireAll = require('./lib/require-all')
var authorization = require('express-authorization')
var passport = require('passport')
var utils = require("./lib/utils")
var BasicStrategy = require("passport-http").BasicStrategy
var User = require("./app/models/user")
var GatewayAccount = require("./app/models/gateway_account")

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

app.post('/api/v1/gateway/users/login', 
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    if (req.user) {
      res.json({ success: true, user: req.user })
    } else {
      res.json({ success: false })
    }
  })

app.get('/api/v1/gateway/users', function(req, res) {
  User.all().complete(function(err, users){
    if(err){ res.send({ success: false, error: err }); return }
    res.send({ success: true, gatewayUsers: users })
  }) 
})

app.get('/api/v1/gateway/accounts/:id', 
  passport.authenticate('basic', { session: false }), function(req,res){
    GatewayAccount.find(req.params.id).complete(function(err, account){
      if (err) { res.send({ success: false }); return false }
      res.send({ success: true, gatewayAccount: account })
    }) 
  })

app.get('/api/v1/gateway/account/balances', 
  passport.authenticate('basic', { session: false }), function(req,res){
    GatewayAccount.find({ where: { userId: req.user.id.toString() }}).complete(function(err, account){
      account.getBalances(function(resp){
        res.send({ success: true, gatewayAccount: account, balances: resp.balances || [] })
      })
    }) 
  })

app.get('/api/v1/gateway/account', 
  passport.authenticate('basic', { session: false }), function(req,res){
    GatewayAccount.findAll({ where: { userId: req.user.id.toString() }}).complete(function(err, account){
      if (err) { res.send({ success: false, user: req.user, account: account }); return false }
      res.send({ success: true, gatewayAccount: account })
    }) 
  })

app.get('/api/v1/gateway/account/transactions', 
  passport.authenticate('basic', { session: false }), function(req,res){
    res.send({ success: true, user: req.user })
  })

app.post('/api/v1/gateway/account/deposit/request', 
  passport.authenticate('basic', { session: false }), function(req,res){
    res.send({ success: true, user: req.user })
  })

app.post('/api/v1/gateway/account/withdrawal/request', 
  passport.authenticate('basic', { session: false }), function(req,res){
    res.send({ success: true, user: req.user })
  })

app.post('/api/v1/sessions', ctrls['sessions'].create)
app.post('/api/v1/gateway/users', ctrls['gateway_users'].create)
//app.post('/api/v1/admin/users', ctrls['admin_users'].create)

app.post('/api/v1/ripple_transactions', ctrls['ripple_transactions'].create)
app.get('/api/v1/ripple_transactions', ctrls['ripple_transactions'].index)

app.post('/api/v1/ripple_withdrawals', ctrls['ripple_withdrawals'].create)
app.post('/api/v1/ripple_deposits', ctrls['ripple_deposits'].create)

app.get('/api/v1/gateway_accounts/:accountId/balances', ctrls['balances'].gateway)

address = process.env.ADDRESS
port = process.env.PORT || 4000

if (address){
  app.listen(port, address)
  console.log('Listening on IP address ', address)
} else {
  app.listen(port)
}
console.log('Listening on port ', port)

