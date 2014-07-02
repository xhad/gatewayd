var gateway = require(__dirname+'/../../');

function addCurrency(currency){
  gateway.api.addCurrency(currency, function(err, currencies){
    for (var _currency in currencies) {
      logger.info(_currency);
    }
  });
}

module.exports = addCurrency;
