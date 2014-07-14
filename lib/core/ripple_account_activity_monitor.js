var gateway = require(__dirname+'/../../');
var RippleRestClient = require('ripple-rest-client');

function RippleAccountActivityMonitor(options) {
  var self = this;
  if (!options.rippleAccount ||
      !gateway.validator.isRippleAddress(options.rippleAccount)) 
  {
    throw new Error('valid rippleAccount required');
  }
  self.rippleAccount = options.rippleAccount;
  self.previousTransactionHash = options.previousTransactionHash;
  self.rippleRestClient = new RippleRestClient({
    account: self.rippleAccount,
    secret: ''
  });
}

RippleAccountActivityMonitor.prototype = {
  _getMostRecentTransactionHash: function(callback) {
    var self = this;
    self.rippleRestClient.getPayments(function(error, transactions) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, transactions[0].payment.hash);
      }
    });
  }
}

module.exports = RippleAccountActivityMonitor;

