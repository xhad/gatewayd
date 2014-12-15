const config = require(__dirname+'/../../config/environment.js');
const RippleAddress = require(__dirname+'/../data/').models.rippleAddresses;

module.exports = function(callback) {
  if (!config.get('COLD_WALLET')) {
    throw new Error('Gateway COLD_WALLET not set in config');
  }
  RippleAddress.findOrCreate({
    address: config.get('COLD_WALLET'),
    type: 'cold',
    managed: true
  })
  .then(function(address) {
    callback(null, address); 
  })
  .error(callback);
};

