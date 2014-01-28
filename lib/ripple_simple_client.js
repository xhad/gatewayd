var request = require('request');

function RippleSimpleClient(opts) {
  this.address = opts.address;
  this.apiUrl = opts.apiUrl;
  this.previousTransactionHash = opts.previousTransactionHash;
};

RippleSimpleClient.prototype.getNextNotification = function(fn) {
  var url = this.apiUrl + 'addresses/'+this.address+'/next_notification';
  if (this.previousTransactionHash) {
    url += '/' + this.previousTransactionHash;
  }
  request.get({ url: url, json: true }, function(err, resp, body){
    try {
      this.previousTransactionHash = body.notification.tx_hash;
      fn(err, body.notification);
    } catch(error) {
      fn(error, null);
    }
  });
};

RippleSimpleClient.prototype.getPayment = function(transactionHash, fn) {
  var url = this.apiUrl+'addresses/'+this.address+'/payments/'+transactionHash;
  request.get({ url: url, json: true }, function(err, resp, body) {
    fn(err, body.payment); 
  })
};

RippleSimpleClient.prototype.createPayment = function(options) {

};

RippleSimpleClient.prototype.payment = function(opts){
  console.log('payment opts', opts);
};

module.exports = RippleSimpleClient;
