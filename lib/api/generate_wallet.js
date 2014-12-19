var rippleLib    = require('ripple-lib');
var Wallet = require('ripple-wallet-generator')({
  sjcl: rippleLib.sjcl
});

/**@requires WalletGenerator
 *
 * @function generateWallet
 *
 * @description Generates a wallet using the `ripple-wallet` module,
 * which is a lightweight tool to generate a new ripple wallet,
 * which consists of public and secret key components.
 *
 * @returns {Object.<string, string>} Object that contains a Ripple address and a secret
 */

function generateWallet(fn) {
  var wallet = Wallet.generate();

  if(wallet){
    fn(null, wallet);
  } else {
    fn(new Error('wallet generator error'), null);
  }

}

module.exports = generateWallet;

