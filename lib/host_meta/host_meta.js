const BridgeQuoteLink = require(__dirname + '/bridge_quote_link.js');
const BridgePaymentLink = require(__dirname + '/bridge_payment_link.js');
const BridgePaymentStatusLink = require(__dirname + '/bridge_payment_status_link.js');
const WebfingerLink = require(__dirname + '/webfinger_link.js');

function HostMeta(options) {
  this.webfingerLink = new WebfingerLink(options);
  this.bridgeQuoteLink = new BridgeQuoteLink(options);
  this.bridgePaymentLink = new BridgePaymentLink(options);
  this.bridgePaymentStatusLink = new BridgePaymentStatusLink(options);
}

HostMeta.prototype.getLink = function getLink(link) {
  var _this = this;
  if (link === 'bridge_payment') {
    return _this.bridgePaymentLink;
  }
  if (link === 'bridge_payment_status') {
    return _this.bridgePaymentStatusLink;
  }
  if (link === 'bridge_quote') {
    return _this.bridgeQuoteLink;
  }
  if (link === 'webfinger') {
    return _this.webfingerLink;
  }
};

HostMeta.prototype.getLinks = function getLinks() {
  var _this = this;
  return [_this.webfingerLink, _this.bridgeQuoteLink, _this.bridgePaymentLink, _this.bridgePaymentStatusLink];
};

HostMeta.prototype.getWebfingerLinks = function getWebfingerLinks() {
  var _this = this;
  return [_this.bridgeQuoteLink, _this.bridgePaymentLink, _this.bridgePaymentStatusLink];
};

module.exports = HostMeta;