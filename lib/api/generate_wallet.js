var WalletGenerator = require('ripple-wallet').Generator;

/**@requites WalletGenerator
 *
 * @function generateWallet
 *
 * @description Generates a wallet using the `ripple-wallet` module,
 * which is a lightweight tool to generate a new ripple wallet,
 * which consists of public and secret key components.
 *
 * @returns {Object.<string, string>} Object that contains a Ripple address and a secret
 */

function generateWallet() {
  walletGenerator = new WalletGenerator();
  return walletGenerator.generate();
}

module.exports = generateWallet;

