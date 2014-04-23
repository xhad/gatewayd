var gateway = require(__dirname+'/../../');

function listCurrencies(){
  var currencies = gateway.config.get('CURRENCIES') || {};
  for (c in currencies) {
    console.log(c);
  }
}

module.exports = listCurrencies;
