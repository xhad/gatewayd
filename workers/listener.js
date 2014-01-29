var Ripple = require('ripple-lib')
var request = require('request')
var RippleAddress = require('../app/models/ripple_address.js');
var RippleTransaction = require('../app/models/ripple_transaction.js');
var RippleSimpleClient = require('../lib/ripple_simple_client.js');
var sequelize = require("../config/initializers/sequelize.js");

var client = new RippleSimpleClient({
  apiUrl: process.env.RIPPLE_SIMPLE_API
});


// Proposed!!
/*
client.on('payment:inbound', function(payment) {

});

client.on('payment:outbound', function(payment) {

});

client.listener.start();
*/

sequelize.sync().success(function(){

  getHotWallet(function(wallet){
    address = wallet.address;
    client.address = wallet.address;
    getNextNotification();
    console.log("listening for transactions to ", address);
  });

});

function getNextNotification() {
  client.getNextNotification(function(err, notification){
    if (notification) {
      handlePayment(notification, function(){
        setTimeout(getNextNotification, 2000);
      });
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

function handleUnknownPayment(notification, fn) {
  client.getPayment(notification.tx_hash, function(err, payment) {
    if (payment && payment.dst_tag) {
      RippleAddress.find({ where: { 
        address: address, 
        tag: payment.dst_tag.toString() 
      }}).complete(function(err, address){
        if (address) {
          RippleTransaction.create({
            ripple_address_id: address.id,
            to_address: payment.dst_address,
            from_address: payment.src_address,
            from_amount: payment.src_amount.value,
            from_currency: payment.src_amount.currency,
            from_issuer: payment.src_amount.issuer,
            to_address: payment.dst_address,
            to_amount: payment.dst_amount.value,
            to_currency: payment.dst_amount.currency,
            to_issuer: payment.dst_amount.issuer,
            transaction_state: payment.tx_state,
            transaction_hash: payment.tx_hash,
            issuance: false
          }).complete(function(err, transaction) {
            console.log(err);
            fn();
          });
        } else {
          console.log(err);
          fn();
        }
      });
    } else {
      console.log('no destination tag');
      fn();
    }
  });
}

function handleKnownPayment(notification, record, fn) {
  record.transaction_state = notification.tx_result;
  record.save().complete(fn);
}

function handlePayment(notification,fn) {
  if (notification.type == 'payment') {
    lookupTransaction(notification.tx_hash, function(err, transaction) {
      console.log(notification.tx_hash);
      if (transaction) {
        handleKnownPayment(notification, transaction, fn);
      } else {
        handleUnknownPayment(notification, fn);
      }
    });
  } else {
    fn();
  }
}

