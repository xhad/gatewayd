var nconf = require('../config/nconf.js');
process.env.DATABASE_URL = nconf.get('DATABASE_URL');

var express = require('express');
var fs = require('fs');
var https = require('https');
var abstract = require("../lib/abstract.js");
var gateway = require('../lib/gateway.js');

var api = require(nconf.get('RIPPLE_DATAMODEL_ADAPTER'));
var passport = require('../config/passport')(api);

var userCtrl = require('../http/controllers/users');
var adminCtrl = require('../http/controllers/admin');
var publicCtrl = require('../http/controllers/public');

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

app.get('/api/v1/users/:id/external_accounts', userCtrl.externalAccounts);
app.get('/api/v1/users/:id/external_transactions', userCtrl.externalTransactions);
app.get('/api/v1/users/:id/ripple_addresses', userCtrl.rippleAddresses);

// ADMIN

app.get('/api/v1/users', adminCtrl.users);
app.get('/api/v1/ripple_addresses', adminCtrl.rippleAddresses);
app.get('/api/v1/external_accounts', adminCtrl.externalAccounts);
app.get('/api/v1/withdrawals', adminCtrl.pendingWithdrawals);
app.get('/api/v1/deposits', adminCtrl.pendingDeposits);
app.get('/api/v1/payments/outgoing', adminCtrl.outgoingRipplePayments);
app.get('/api/v1/payments/incoming', adminCtrl.incomingRipplePayments);
app.post('/api/v1/withdrawals/:id/clear', adminCtrl.clearPendingWithdrawal);
app.post('/api/v1/deposits', adminCtrl.recordDeposit);

var ssl = (nconf.get('SSL') && (nconf.get('SSL') != 'false'));

if (ssl) {
  app = https.createServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt')
  }, app);
}

var host = nconf.get('HOST');
var port = nconf.get('PORT'); 
var protocol = ssl ? 'https' : 'http'

app.listen(port, host);

console.log('Serving REST API and Angular WebApp at '+protocol+'://'+host+':'+port);
