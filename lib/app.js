var gatewayd = require(__dirname + '/../');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var apiRouter = require(__dirname+'/http/routers/api_router.js');
var resourcesRouter = require(__dirname+'/http/routers/resources_router.js');
var passportAuth = require(__dirname + '/http/passport_auth');
const cors = require('cors')();

process.env.DATABASE_URL = gatewayd.config.get('DATABASE_URL');

passport.use(passportAuth.adminBasic);

var app = express();
app.use(cors);
app.use('/', express.static(gatewayd.config.get('WEBAPP_PATH')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

if (gatewayd.config.get('BASIC_AUTH')) {
  app.use('/v1', passport.authenticate('adminBasic', { session: false }), resourcesRouter);
  app.use('/v1', passport.authenticate('adminBasic', { session: false }), apiRouter);
} else {
  app.use('/v1', resourcesRouter);
  app.use('/v1', apiRouter);
}

module.exports = app;

