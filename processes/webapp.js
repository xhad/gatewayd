var gateway = require(__dirname + '/../');
process.env.DATABASE_URL = gateway.config.get('DATABASE_URL');

var express = require('express');
var fs = require('fs');
var https = require('https');

var passportAuth = require(__dirname + '/../lib/passport_auth');
var passport = require('passport');
passport.use(passportAuth.adminBasic);
passport.use(passportAuth.userBasic);

var userCtrl = require(__dirname + '/../http/controllers/users');
var adminCtrl = require(__dirname + '/../http/controllers/admin');
var publicCtrl = require(__dirname + '/../http/controllers/public');

app = express();

app.use("/", express.static(__dirname + "/../app"));
app.use(express.json());
app.use(express.urlencoded());

// PUBLIC

app.get('/ripple.txt', publicCtrl.rippleTxt);
app.get('/app', publicCtrl.webapp);
app.get('/api/v1/currencies', publicCtrl.currencies);
app.post('/api/v1/register', publicCtrl.registerUser);
app.post('/api/v1/users/login', publicCtrl.loginUser);

// USER

function userAuth() {
  return passport.authenticate('userBasic', {session: false });
}

app.get('/api/v1/users/:id/external_accounts', userAuth(), userCtrl.externalAccounts);
app.get('/api/v1/users/:id/external_transactions', userAuth(), userCtrl.externalTransactions);
app.get('/api/v1/users/:id/ripple_addresses', userAuth(), userCtrl.rippleAddresses);

// ADMIN

function adminAuth() {
  return passport.authenticate('adminBasic', {session: false });
}

app.get('/api/v1/users', adminAuth(), adminCtrl.users);
app.get('/api/v1/ripple_addresses', adminAuth(), adminCtrl.rippleAddresses);
app.get('/api/v1/external_accounts', adminAuth(), adminCtrl.externalAccounts);
app.get('/api/v1/withdrawals', adminAuth(), adminCtrl.pendingWithdrawals);
app.get('/api/v1/deposits', adminAuth(), adminCtrl.pendingDeposits);
app.get('/api/v1/payments/outgoing', adminAuth(), adminCtrl.outgoingRipplePayments);
app.get('/api/v1/payments/incoming', adminAuth(), adminCtrl.incomingRipplePayments);
app.post('/api/v1/withdrawals/:id/clear', adminAuth(), adminCtrl.clearPendingWithdrawal);
app.post('/api/v1/deposits', adminAuth(), adminCtrl.recordDeposit);

var ssl = (gateway.config.get('SSL') && (gateway.config.get('SSL') != 'false'));

if (ssl) {
  app = https.createServer({
    key: fs.readFileSync(__dirname + '/../certs/server.key'),
    cert: fs.readFileSync(__dirname + '/../certs/server.crt')
  }, app);
}

var host = gateway.config.get('HOST');
var port = gateway.config.get('PORT'); 
var protocol = ssl ? 'https' : 'http'

app.listen(port, host);

console.log('Serving REST API and Angular WebApp at '+protocol+'://'+host+':'+port);

