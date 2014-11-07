const Link = require(__dirname + '/link.js');

function WebfingerLink(options) {
  Link.call(this, {
    rel: 'lrdd',
    template: 'https://' + options.gatewayd.config.get('DOMAIN') + '/.well-known/webfinger.json?resource={uri}'
  });
}

WebfingerLink.prototype = Object.create(Link.prototype);
WebfingerLink.prototype.constructor = WebfingerLink;

module.exports = WebfingerLink;