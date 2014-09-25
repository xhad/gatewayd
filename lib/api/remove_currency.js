var config = require(__dirname+'/../../config/environment.js');

/**
 * @requires config
 * @function removeCurrency
 *
 * @description Removes currency from the config file.
 *
 * @param {Number} currency
 * @param {callback} fn
 */

function removeCurrency(currency, fn){
  var currencies = config.get('CURRENCIES') || {};
  delete currencies[currency];
  config.set('CURRENCIES', currencies);
  config.save(function(){
    fn(null, currencies);
  });
}

module.exports = removeCurrency;

