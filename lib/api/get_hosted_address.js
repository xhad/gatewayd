var data = require('ripple-gateway-data-sequelize');
var config = require(__dirname+'/../../config/config.js');

function getHostedAddress(tag, fn) {
  var params = {
    address: config.get('COLD_WALLET'),
    tag: tag,
    type: 'hosted',
    managed: true
  };
  data.rippleAddresses.read(params, function(err, address) {
    if (address && !err) {
      fn(null, address);
    } else {
      data.rippleAddresses.create(params, fn);
    }
  });
}

module.exports = getHostedAddress;

