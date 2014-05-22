var gateway = require(__dirname+'/../../');

/**
* @require Config
* @function setLastPaymentHash
* @description In order to poll Ripple REST for new payment notifications to
* the Gateway cold wallet, a starting-point transaction hash
* must be set.
*
* @param options
* @param options.hash Last transaction hash of the cold wallet address
* @params {function} callback
*/

module.exports = function(hash, callback){
  gateway.config.set('LAST_PAYMENT_HASH', hash);
  gateway.config.save(function(err){
    if (err) {
      fn(err, null);
    } else {
      fn(null, gateway.config.get('LAST_PAYMENT_HASH'));
    }
  });
};

