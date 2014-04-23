var gateway = require(__dirname+'/../../');

function listCurrencies(){
  var currencies = gateway.config.get('currencies') || {};
  for (c in currencies) {
    console.log(c);
  }
}

module.exports = listCurrencies;
