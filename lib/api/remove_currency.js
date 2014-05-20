var config = require(__dirname+'/../../config/config.js');

function removeCurrency(currency, fn){
  var currencies = config.get('CURRENCIES') || {};
  delete currencies[currency];
  config.set('CURRENCIES', currencies);
  config.save(function(){
    fn(null, currencies);
  });
}

module.exports = removeCurrency;

