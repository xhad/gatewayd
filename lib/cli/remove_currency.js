var gateway = require(__dirname+'/../../');
var logger = require('winston');

function removeCurrency(currency){

  gateway.api.removeCurrency(currency, function(err, currencies){
    for (c in currencies) {
      logger.info(c);
    }
  });
}

module.exports = removeCurrency;
