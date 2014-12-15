var RippleTransactions = require(__dirname+'/../../').data.models.rippleTransactions;
var Chance = require('chance');
var chance = new Chance();

/**
* seed db transactions
*
* @param {int} how_many
*/

function dbRippleTxSeed(howMany) {
  var i = howMany || 1;

  while (i) {
    RippleTransactions.create({
      to_address_id: chance.integer({min: 1, max: 99999}),
      from_address_id: chance.integer({min: 1, max: 99999}),
      to_amount: chance.floating({fixed: 2}),
      to_currency: chance.currency().code,
      to_issuer: 'r' + chance.character({length: 34, alpha: true}),
      from_amount: chance.floating({fixed: 2}),
      from_currency: chance.currency().code,
      from_issuer: 'r' + chance.character({length: 34, alpha: true}),
      invoice_id: chance.hash({length: 32, casing: 'upper'})
    }).then(logFunction);
    i--;
  }
}

function logFunction() {
  console.log('successfully created transaction record');
}

module.exports = dbRippleTxSeed;
