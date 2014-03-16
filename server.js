var nconf = require('./config/nconf.js');
process.env.DATABASE_URL = nconf.get('DATABASE_URL');

var express = require('express');
var fs = require('fs');
var https = require('https');

var adapter = require(nconf.get('RIPPLE_DATAMODEL_ADAPTER'));
var GatewayExpress = require(nconf.get('RIPPLE_EXPRESS_GATEWAY'));
var passport = require('./config/passport')(adapter);

app = express(); //new GatewayExpress(express(), passport, adapter);


app.use("/", express.static(__dirname + "/app"));

app.get('/ripple.txt', function(req, res) {
  res.set({ 'Content-Type': 'text/plain' });
  res.send("[accounts]\n"+nconf.get('gateway_cold_wallet'));
});

var ssl = (nconf.get('SSL') && (nconf.get('SSL') != 'false'));

if (ssl) {
  app = https.createServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt')
  }, app);
}

var host = nconf.get('HOST');
var port = nconf.get('PORT');

app.listen(port, host);
