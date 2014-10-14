const HostMetaPlugin = require('host-meta-plugin');

module.exports = function(gatewayd) {

  plugin = new HostMetaPlugin({
    gatewayd: gatewayd
  });

  gatewayd.server.use('/.well-known', plugin.router);
}

