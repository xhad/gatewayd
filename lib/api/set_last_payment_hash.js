var config = require(__dirname+'/../../config/config.js');

/**
* @require Config
* @function setLastPaymentHash
* @description In order to poll Ripple REST for new payment notifications to
* the Gateway cold wallet, a starting-point transaction hash
* must be set.
*
* @param opts
* @param opts.hash Last transaction hash of the cold wallet address
* @params {function} callback
*/

module.exports = function(opts, callback){
  config.set('LAST_PAYMENT_HASH', opts.hash);
  config.save(function(err){
    if (err) {
      callback(err, null);
    } else {
      callback(null, config.get('LAST_PAYMENT_HASH'));
    }
  });
};
