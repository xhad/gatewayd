var config = require(__dirname+'/../../config/environment.js');
var RippleAddresses = require(__dirname+'/../data/').models.rippleAddresses;

/**@requires config, rippleAddresses
 * @function getHostedAddress
 *
 * @description Returns the promise from a RippleAddresses findOrCreate using the gatewayd cold_wallet, provided tag,
 * type: 'hosted' and managed: true
 *
 * @param tag
 */
function getHostedAddress(tag) {
  return RippleAddresses.findOrCreate({
      address: config.get('COLD_WALLET'),
      tag: tag,
      type: 'hosted',
      managed: true
    });
}

module.exports = getHostedAddress;

