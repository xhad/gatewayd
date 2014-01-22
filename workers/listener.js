var Ripple = require('ripple-lib')
var request = require('request')
var RippleAddress = require('../app/models/ripple_address.js');
var RippleTransaction = require('../app/models/ripple_transaction.js');

var address = null;
var lastTxId = null;

function getNextNotification() {
  base = 'http://ripple-simple-api.herokuapp.com/api/v1/';
  url = base + 'address/' + address + '/next_notification';
  if (lastTxId) { url = (url + '/' + lastTxId) };
  request.get({ url: url, json: true }, function(err, resp, body) {
    if (body.notification) {
      lastTxId = body.notification.txHash;
      handleNewNotification(body.notification);
    } else {
      setTimeout(getNextNotification, 2000);
    }
  });
}

function getHotWallet(fn) {
  RippleAddress.find({ where: { type: 'hot' }}).complete(function(err, address) {
    fn(address);
  });
}

function handleNewNotification(notification) {
  // Inbound
  // -- Create ripple transaction

  // Outbound
  // -- Find and update ripple transaction
  console.log(notification);

  var base = 'http://ripple-simple-api.herokuapp.com/api/v1/';
  url = base + 'address/'+notification.address+'/tx/'+notification.txHash;
  request.get({ url: url, json: true }, function(err, resp, body) {
    getHotWallet(function(address) {
      address.previous_transaction_hash = body.tx.hash;
      address.save().complete(function(err, add) {
        console.log('updated the last transaction hash for the hot wallet address');
        if (notification.direction == 'incoming') {
          console.log('received an incoming payment');
          console.log('TODO: create a new ripple transaction record');
          console.log(body.tx);
        } else {
          console.log('received confirmation of an outgoing payment');
          RippleTransaction.find({ where: { transaction_hash: body.tx.hash } }).complete(function(err, transaction) {
            console.log("trying to match a ripple transaction from the database...");
            if (transaction) {
              console.log('a transaction in the database matches!');
              console.log(transaction);
            } else {
              console.log('no transaction record found in the databse.');
            }
            getNextNotification();
          });
        }
      });
    });
  });
}


getHotWallet(function(wallet){
  lastTxId = wallet.previous_transaction_hash;
  address = wallet.address;
  console.log('listening for transactions on', address);
  getNextNotification();
});

