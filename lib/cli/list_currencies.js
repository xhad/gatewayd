var gateway = require(__dirname+'/../../');
var logger = require('winston');

function listCurrencies(){
  var currencies = gateway.config.get('CURRENCIES') || {};
  for (var _currency in currencies) {
    logger.info(_currency);
  }
}

module.exports = listCurrencies;
