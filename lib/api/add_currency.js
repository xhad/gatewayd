var config = require(__dirname+'/../../config/config.json');

function addCurrency(currency, fn){
  var currencies = config.get('CURRENCIES') || {};
  if (!(currency in currencies)) {
    currencies[currency] = 0;
  }
  config.set('CURRENCIES', currencies);
  config.save(function(){
    fn(null, currencies);
  });
}

module.exports = addCurrency;

