var gateway = require(__dirname+'/../../');
var logger = require('winston');

function addCurrency(currency){
  gateway.api.addCurrency(currency, function(err, currencies){
    for (var _currency in currencies) {
      logger.info(_currency);
    }
  });
}

module.exports = addCurrency;
