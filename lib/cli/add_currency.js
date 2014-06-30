var gateway = require(__dirname+'/../../');
var logger = require('winston');

function addCurrency(currency){
  gateway.api.addCurrency(currency, function(err, currencies){
    for (c in currencies) {
      logger.info(c);
    }
  });
};

module.exports = addCurrency;
