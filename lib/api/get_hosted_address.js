var data = require(__dirname+'/../data/');
var config = require(__dirname+'/../../config/environment.js');

/**@requires data, config
 * @function getHostedAddress
 *
 * @description Queries database for hosted wallet address
 * and creates a record if it doesn't exist.
 *
 * @param tag
 * @param {getHostAddressCallback} fn - Callback that handles the response up on query results or record creation.
 */
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

