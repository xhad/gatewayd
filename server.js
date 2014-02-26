var express = require('express');
var nconf = require('./config/nconf.js');
var fs = require('fs');
var https = require('https');
var http = require('http');

var SequelizeAdapter = require('ripple-gateway-data-sequelize-adapter');
var GatewayExpress = require("ripple-gateway-express");
var passport = require('./config/initializers/passport.js');
var adapter = new SequelizeAdapter();

app = new GatewayExpress(express(), passport, adapter);

if (nconf.get('SSL')) {
  app = https.createServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt')
  }, app);
}

app.listen(nconf.get('PORT'), nconf.get('HOST'));

console.log('Serving '+ (nconf.get('SSL') ? 'HTTPS' : 'HTTP') +' on', (nconf.get('HOST') || 'localhost')+":"+nconf.get('PORT'));
