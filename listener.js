var Ripple = require('ripple-lib')
var request = require('request')

var address = process.env.RIPPLE_ADDRESS || 'rwqhRo41zXZKooNbDNUqQ5dTRrQPQ1BDF7'
var lastTxId = process.env.LAST_TX_ID || 'E0785E2C6F7A7F84E03B05635A15C4992EA65532D650FF5CB4CE18BA3707DAD8';

function getNextNotification() {
  base = 'http://simple-ripple-listener.herokuapp.com/api/v1/';
  url = base + 'address/' + address + '/next_notification/' + lastTxId;
  request.get({ url: url, json: true }, function(err, resp, body) {
    if (body.notification) {
      lastTxId = body.notification.txHash;
      console.log('got a new notification!');
      console.log(body.notification);
      handleNewNotification(body.notification);
    } else {
      console.log('no payments, sleep 2 sec');
      setTimeout(getNextNotification, 2000);
    }
  })
}

function handleNewNotification(notification) {
  console.log(notification);
  getNextNotification();
}

getNextNotification();

