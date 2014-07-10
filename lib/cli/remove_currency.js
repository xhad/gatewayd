var gateway = require(__dirname+'/../../');

function removeCurrency(currency){

  gateway.api.removeCurrency(currency, function(err, currencies){
    for (var _currency in currencies) {
      logger.info(_currency);
    }
  });
}

module.exports = removeCurrency;
