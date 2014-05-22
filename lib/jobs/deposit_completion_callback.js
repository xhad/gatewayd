var gateway = require(__dirname+'/../../');
var callbackUrl = gateway.config.get("DEPOSITS_CALLBACK_URL");
var request = require("request");

/**
* @requires Data
* @requires Config
*
* @function depositCompleteCallbackJob
* @description Job to fire up failure or success of
* a ripple transaction in the Ripple ledger, corresponding
* to a given External Transaction deposit record entered
* in the Gateway using the Gateway API record_deposit function.
*
* The job is designed to implement the Resque prototcol interface for
* background worker processes, to enable asynchronous processing of
* queues of jobs in a database-agnostic fashion.
*
* @params {RippleTransaction} rippleTransactionId
* @callback {ResqueCallback}
*
*/

function postDepositCallback(rippleTransaction, callback) {
  body = rippleTransaction.toJSON();
  console.log('DEPOSIT COMPLETE', body);
  request({
    method: 'POST',
    form: body,
    uri: callbackUrl
  }, function(err, resp, body){
    if (err) {
      console.log('ERROR', err);
      callback(err, null);
    } else {
      if (resp) { console.log('CODE', resp.statusCode); };
      console.log('BODY', body);
      callback(null, body);
    }
  }); 
}

function getRippleTransaction(rippleTransactionId, callback){
  gateway.data.models.rippleTransactions.find({ 
    where: {id: rippleTransactionId }
  }).complete(function(err, rippleTransaction){
    if (err) {
      callback(err, null);
    } else if (rippleTransaction) {
      callback(null, rippleTransaction);
    } else {
      callback('no record found', null);
    }
  });
}

module.exports = {
  perform: function(args, callback){
    console.log('PERFORM JOB');
    if (typeof callback != "function") { callback = console.log };
    var rippleTransactionId = args[0];

    if (callbackUrl) {
      console.log('WORK', callbackUrl);
      console.log(args[0]);
      getRippleTransaction(args[0], function(err, rippleTransaction){
        if (err) {
          callback(err, null);
        } else {
          console.log('about to postDepositCallback');
          postDepositCallback(rippleTransaction, callback);
        }
      });
    } else {
      callback('DEPOSITS_CALLBACK_URL not set', null);
    }
  }
};

