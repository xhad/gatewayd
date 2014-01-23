var express = require('express');
var childProcess = require('child_process');
var middleware = require('./config/initializers/middleware.js');
var router = require('./config/routes.js');
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 4000;
var app = express();

middleware.configure(app);
router.route(app);

app.listen(port, host);
childProcess.exec("node listener.js");

console.log('Serving HTTP on', host+":"+port);

