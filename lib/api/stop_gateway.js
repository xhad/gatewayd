var path       = require('path');
var Supervisor = require(path.join(__dirname,'/../processes/supervisor'));

/**
 * @function stopGateway
 * @description Halts all pocesses.
 */
function stopGateway() {
  return new Supervisor().stop();
}

module.exports = stopGateway;

