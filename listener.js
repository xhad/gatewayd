var Ripple = require('ripple-lib')
var request = require('request')

var address = process.env.RIPPLE_ADDRESS;
var lastTxId = process.env.LAST_TX_ID;

function getNextNotification() {
  base = 'http://simple-ripple-listener.herokuapp.com/api/v1/';
  url = base + 'address/' + address + '/next_notification/' + lastTxId;
  request.get({ url: url, json: true }, function(err, resp, body) {
    if (body.notification) {
      lastTxId = body.notification.txHash;
      handleNewNotification(body.notification);
      getNextNotification();
    } else {
      setTimeout(getNextNotification, 2000);
    }
  })
}

function handleNewNotification(notification) {
  // Inbound
  // -- Create ripple transaction

  // Outbound
  // -- Find and update ripple transaction

  console.log(notification);
}

getNextNotification();

