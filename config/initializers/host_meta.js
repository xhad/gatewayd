const HostMetaPlugin = require('host-meta-plugin');
const HostMeta = require(__dirname + '/../../lib/host_meta/host_meta.js');

module.exports = function(gatewayd) {

  var plugin = new HostMetaPlugin({
    gatewayd: gatewayd
  });

  gatewayd.server.use('/.well-known', plugin.router);

  gatewayd.hostMeta = new HostMeta({
    gatewayd: gatewayd
  });
};

