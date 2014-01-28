var Ripple = require('ripple-lib')
var request = require('request')
var RippleAddress = require('../app/models/ripple_address.js');
var RippleTransaction = require('../app/models/ripple_transaction.js');
var RippleSimpleClient = require('../lib/ripple_simple_client.js');

var client = new RippleSimpleClient({
  apiUrl: process.env.RIPPLE_SIMPLE_API
});

getHotWallet(function(wallet){
  address = wallet.address;
  client.address = wallet.address;
  getNextNotification();
});

function getNextNotification() {
  client.getNextNotification(function(err, notification){
    if (notification) {
      handleNewNotification(notification);
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

function lookupTransaction(transactionHash, fn){
  RippleTransaction.find({ where: { 
    transaction_hash: transactionHash 
  }}).complete(fn);
}

function handleNewNotification(notification) {
  if (notification.type == 'payment') {
    console.log(notification.tx_hash);
    lookupTransaction(notification.tx_hash, function(err, transaction) {
      console.log(err);
      console.log(transaction);
      if (transaction) {
        transaction.transaction_state = notification.tx_result;
        transaction.save().complete(function(err, transaction){
          console.log(transaction); 
        });
      } else if (notification.tx_direction == 'inbound') {
        console.log('inbound transaction');
      }
    });
  }
}
