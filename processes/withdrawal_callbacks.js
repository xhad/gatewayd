var gateway = require(__dirname+'/../');
var request = require('request');

function getQueuedWithdrawal(fn){
  gateway.data.models.externalTransactions.find({
    where: { status: "queued" }
  }).complete(function(err, withdrawal){
    if (err){
      fn(err, null);
    } else {
      if (withdrawal){
        fn(null, withdrawal);
      } else {
        fn(null,null);
      }
    }
  });
}

function loop() {
  getQueuedWithdrawal(function(err, withdrawal){
    if (err || !withdrawal) { setTimeout(loop, 500); return; }

    var url = gateway.config.get('WITHDRAWALS_CALLBACK_URL');
    postWithdrawalCallback(withdrawal, url, function(err, resp){
      if (err) {
        setTimeout(loop, 500);
      } else {
        withdrawal.status = 'notified';
        withdrawal.save().complete(function(){
          setTimeout(loop, 500);
        });
      }
    });

  });
}

function postWithdrawalCallback(withdrawal, url, fn) {
  body = withdrawal.toJSON();
  console.log('about to post withdrawal', body);
  console.log('WITHDRAWAL', body);
  request({
    method: 'POST',
    uri: url,
    form: body
  }, function(err, resp, body){
    if (err) {
      console.log('ERROR', err);
    } else {
      console.log('CODE', resp.statusCode);
      console.log('BODY', body);
    }
    fn(err, body);
  });
}

loop();
