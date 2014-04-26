var gateway = require(__dirname + '/../');
process.env.DATABASE_URL = gateway.config.get('DATABASE_URL');

var express = require('express');
var fs = require('fs');
var https = require('https');
var sequelize = require(__dirname+'/../node_modules/ripple-gateway-data-sequelize/lib/sequelize.js');
var restful = require('sequelize-restful');

var userCtrl = require(__dirname + '/../lib/http_json/controllers/users');
var publicCtrl = require(__dirname + '/../lib/http_json/controllers/public');
var ApiRouter = require(__dirname+'/../lib/http_json/routers/api_router.js');

var passportAuth = require(__dirname + '/../lib/http_json/passport_auth');
var passport = require('passport');
passport.use(passportAuth.adminBasic);
passport.use(passportAuth.userBasic);

var apiRouter =  new ApiRouter({
  passport: passport,
  authName: 'adminBasic'
});

app = express();

app.use("/", express.static(__dirname + "/../node_modules/ripple-gateway-webapp-example/"));
app.use(express.json());
app.use(express.urlencoded());
app.use(restful(sequelize));

// PUBLIC

app.get('/ripple.txt', publicCtrl.rippleTxt);
app.get('/app', publicCtrl.webapp);

// USER

function userAuth() {
  return passport.authenticate('userBasic', {session: false });
}

app.post('/api/v1/users/register', publicCtrl.registerUser);
app.post('/api/v1/users/login', publicCtrl.loginUser);
app.get('/api/v1/users/:id/external_accounts', userAuth(), userCtrl.externalAccounts);
app.get('/api/v1/users/:id/external_transactions', userAuth(), userCtrl.externalTransactions);
app.get('/api/v1/users/:id/ripple_addresses', userAuth(), userCtrl.rippleAddresses);
app.get('/api/v1/users/:id/ripple_transactions', userAuth(), userCtrl.rippleTransactions);

// ADMIN

function adminAuth() {
  return passport.authenticate('adminBasic', {session: false });
}
apiRouter.bind(app);


var ssl = (gateway.config.get('SSL') && (gateway.config.get('SSL') != 'false'));

if (ssl) {
  app = https.createServer({
    key: fs.readFileSync(gateway.config.get('SSL_KEY_PATH')),
    cert: fs.readFileSync(gateway.config.get('SSL_CERTIFICATE_PATH'))
  }, app);
  console.log('SSL enabled');
}

var host = gateway.config.get('HOST');
var port = gateway.config.get('PORT'); 
var protocol = ssl ? 'https' : 'http';

app.listen(port, host);

console.log('Serving REST API and Angular WebApp at '+protocol+'://'+host+':'+port);

