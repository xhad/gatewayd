var WalletGenerator = require('ripple-wallet').Generator;

function generateWallet() {
  walletGenerator = new WalletGenerator();
  return walletGenerator.generate();
}

module.exports = generateWallet;

