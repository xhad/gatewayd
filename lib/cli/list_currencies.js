var gateway = require(__dirname+'/../../');
var logger = require('winston');

function listCurrencies(){
  var currencies = gateway.config.get('CURRENCIES') || {};
  for (c in currencies) {
    logger.info(c);
  }
}

module.exports = listCurrencies;
