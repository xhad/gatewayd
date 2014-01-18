var Ripple = require('ripple-lib')
var request = require('request')

var address = 'rHKueQebtVU9cEamhBbMV8AEViqKjXcBcB';
var lastTxId = 'E0785E2C6F7A7F84E03B05635A15C4992EA65532D650FF5CB4CE18BA3707DAD8';

function getNextNotification() {
  base = 'http://simple-ripple-listener.herokuapp.com/api/v1/';
  url = base + 'address/' + address + '/next_notification/' + lastTxId;
  request.get({ url: url, json: true }, function(err, resp, body) {
    if (body.notification) {
      lastTxId = body.notification.txHash;
      handleNewNotification(body.notification)
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

