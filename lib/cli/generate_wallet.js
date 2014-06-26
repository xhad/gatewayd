var gateway = require(__dirname+'/../../');
var logger = require('winston');

module.exports = function() {
  gateway.api.generateWallet(function(error, wallet) {
    if (error) {
      throw new Error(error);
    } else {
      logger.info(wallet);
    }
  });
}

