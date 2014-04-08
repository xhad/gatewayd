
var exec = require('child_process').exec;

function startGateway() {

  foreman = exec('./node_modules/foreman/nf.js start');

  foreman.stdout.on('data', console.log);

}

module.exports = startGateway;

