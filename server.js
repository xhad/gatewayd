var express = require('express');
var childProcess = require('child_process');
var middleware = require('./config/initializers/middleware.js');
var router = require('./config/routes.js');
var host = process.env.HOST;
var port = process.env.PORT || 4000;
var app = express();
var sequelize = require('./config/initializers/sequelize.js');
var nconf = require('./config/nconf.js');

middleware.configure(app);
router.route(app);

sequelize.sync().success(function(){
  host ? app.listen(port, host) : app.listen(port);

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

  console.log('Serving HTTP on', (host || 'localhost')+":"+port);
})

