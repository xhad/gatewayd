var gateway = require(__dirname+'/../../');

function listCurrencies(){
  var currencies = gateway.config.get('CURRENCIES') || {};
  for (var _currency in currencies) {
    logger.info(_currency);
  }
}

module.exports = listCurrencies;
