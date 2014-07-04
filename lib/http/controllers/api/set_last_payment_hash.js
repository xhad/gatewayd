var gateway = require(__dirname+'/../../../../');

/*
* @require Api
* @function setLastPaymentHash
* @description HTTP version of setLastPaymentHash api call
* @param {RippleTransactionHash} payment_hash
*
*/

module.exports = function(req, res){
  gateway.api.setLastPaymentHash({ hash: req.body.payment_hash }, function(err){
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ 'LAST_PAYMENT_HASH': gateway.config.get('LAST_PAYMENT_HASH') });
    } 
  });
};

