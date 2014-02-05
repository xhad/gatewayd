var express = require('express');
var childProcess = require('child_process');
var middleware = require('./config/initializers/middleware.js');
var router = require('./config/routes.js');
var host = process.env.HOST;
var port = process.env.PORT || 4000;
var app = express();
var sequelize = require('./config/initializers/sequelize.js');
var nconf = require('./config/nconf.js');
var fs = require('fs');
var https = require('https');

middleware.configure(app);
router.route(app);

var sslOptions = {
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt')
};

sequelize.sync().success(function(){
  var ssl = nconf.get('SSL');
  if (ssl == 'false') { ssl = false }
  if (host && ssl) {
    https.createServer(sslOptions, app).listen(port, host);
  } else if (ssl) {
    https.createServer(sslOptions, app).listen(port);
  } else if (host) {
    app.listen(port, host);
  } else {
    app.listen(port);
  }
  
  var incomingPaymentsMonitor = childProcess.spawn("node", ["workers/listener.js"]);

  incomingPaymentsMonitor.stdout.on('data', function(data){
    console.log(data.toString());
  });

  incomingPaymentsMonitor.stderr.on('data', function(data){  
    console.log(data.toString());
  });

  setTimeout(function(){
    var outgoingPaymentsMonitor = childProcess.spawn("node", ["workers/outgoing_ripple_payments.js"]);
    outgoingPaymentsMonitor.stdout.on('data', function(data) {
      console.log(data.toString());
    });

    outgoingPaymentsMonitor.stderr.on('data', function(data) {
      console.log(data.toString());
    });
  },10000);

  console.log('Serving '+ (ssl ? 'HTTPS' : 'HTTP') +' on', (host || 'localhost')+":"+port);
})

