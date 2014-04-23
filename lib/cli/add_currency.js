var gateway = require(__dirname+'/../../');

function addCurrency(currency)
  gateway.api.addCurrency(currency, function(err, currencies){
    for (c in currencies) {
      console.log(c);
    }
  });
};

module.exports = addCurrency;
