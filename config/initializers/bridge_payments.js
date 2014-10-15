const BridgePaymentsPlugin = require('bridge-payments-plugin');

module.exports = function(gatewayd) {

  var bridgePaymentsPlugin = new BridgePaymentsPlugin({
    gatewayd: gatewayd
  });

  gatewayd.server.use('/', bridgePaymentsPlugin.router);
};