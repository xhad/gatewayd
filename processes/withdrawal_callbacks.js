var gateway = require(__dirname+'/../');
var request = require('request');

function getQueuedWithdrawal(fn){
  gateway.api.listQueuedWithdrawals(function(err, withdrawals){
    if (err){
      fn(err, null);
    } else {
      if (withdrawals && withdrawals[0]){
        fn(null, withdrawals[0]);
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
    console.log('CODE', resp.statusCode);
    console.log('ERROR', err);
    console.log('BODY', body);
    fn(err, body);
  });
}

loop();
