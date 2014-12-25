var features = require(__dirname+'/../features');

if (features.isEnabled('bridge-payments')) {

  var Promise = require('bluebird');
  var GSP     = {};

  var ExternalQuoteOutbound = function() {
    this.quote = function(options) {
      var _this = this;
      return new Promise(function(resolve, reject) {
        if (!_this._quote) {
          reject(new Error('must be implemented')); 
        }
        _this._quote(options, resolve, reject);
      });
    };
  };

  ExternalQuoteOutbound.prototype.extend = function(options) {
    if (typeof options.quote === 'function') {
      this._quote = options.quote;
    }
  };

  GSP.external = {
    outbound: new ExternalQuoteOutbound()
  };

  module.exports = GSP;

}
