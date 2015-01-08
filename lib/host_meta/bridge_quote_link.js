const Link = require(__dirname + '/link.js');

function BridgeQuoteLink(options) {
  var version = options.gatewayd.config.get('VERSION') || '1';
  Link.call(this, {
    rel: 'https://gatewayd.org/gateway-services/bridge_payments/quotes',
    href: 'https://' + options.gatewayd.config.get('DOMAIN') + '/v' + version + '/bridge_payments/quotes/{sender}/{receiver}/{amount}'
  });
  this.properties.version = options.gatewayd.config.get('VERSION');
}

BridgeQuoteLink.prototype = Object.create(Link.prototype);
BridgeQuoteLink.prototype.constructor = BridgeQuoteLink;

module.exports = BridgeQuoteLink;