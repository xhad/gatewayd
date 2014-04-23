var gateway = require(__dirname+'/../../');

function removeCurrency(currency){

  gateway.api.removeCurrency(currency, function(err, currencies){
    for (c in currencies) {
      console.log(c);
    }
  });
}

module.exports = removeCurrency;
