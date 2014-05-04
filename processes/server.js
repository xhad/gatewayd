var gateway = require(__dirname + '/../');
process.env.DATABASE_URL = gateway.config.get('DATABASE_URL');

var express = require('express');
var fs = require('fs');
var https = require('https');
var sequelize = require(__dirname+'/../node_modules/ripple-gateway-data-sequelize/lib/sequelize.js');
var restful = require('sequelize-restful');

var userCtrl = require(__dirname + '/../lib/http/controllers/users');
var publicCtrl = require(__dirname + '/../lib/http/controllers/public');
var ApiRouter = require(__dirname+'/../lib/http/routers/api_router.js');

var passportAuth = require(__dirname + '/../lib/http/passport_auth');
var passport = require('passport');
passport.use(passportAuth.adminBasic);
passport.use(passportAuth.userBasic);

app = express();
app.use("/", express.static(gateway.config.get('WEBAPP_PATH')));
app.use(express.json());
app.use(express.urlencoded());
app.use(restful(sequelize));

var apiRouter =  new ApiRouter({
  passport: passport,
  authName: 'adminBasic'
});
apiRouter.bind(app);

app.get('/ripple.txt', publicCtrl.rippleTxt);

if (gateway.config.get('WEBAPP')) {
  app.get('/app', publicCtrl.webapp);
  app.post('/v1/register', publicCtrl.registerUser);
}

if (gateway.config.get('USER_AUTH')) {
  function userAuth() {
    return passport.authenticate('userBasic', {session: false });
  }
  app.post('/v1/users/login', userAuth(), publicCtrl.loginUser);
  app.get('/v1/users/:id', userAuth(), userCtrl.show);
  app.get('/v1/users/:id/external_accounts', userAuth(), userCtrl.externalAccounts);
  app.get('/v1/users/:id/external_transactions', userAuth(), userCtrl.externalTransactions);
  app.get('/v1/users/:id/ripple_addresses', userAuth(), userCtrl.rippleAddresses);
  app.get('/v1/users/:id/ripple_transactions', userAuth(), userCtrl.rippleTransactions);
}

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

