var Client = require('ripple-rest-client');
var config = require(__dirname+'/../../config/environment');
var _ = require('lodash');

module.exports = function getLiabilities(fn) {
  var client = new Client({
    api: config.get('RIPPLE_REST_API'),
    account: config.get('COLD_WALLET')
  });

  client.getAccountBalance(function(err, resp) {
    var aggregated;

    if (err) {
      fn (err, null);
    } else {

      //aggregate all balances by currency
      aggregated = _.reduce(resp.balances, function(accumulator, val) {
        if (val.currency && val.value) {

          //need to convert undefined to 0 before adding
          accumulator[val.currency] = (accumulator[val.currency] || 0) + Number(val.value);
        } else {
          accumulator = val;
        }

        return accumulator;
      }, {});

      //reformat object to array of objects and original types
      aggregated = _.map(aggregated, function(val, key){
        return {
          value: val.toString(),
          currency: key
        };
      });

      //reassign if aggregated is truthy
      resp.balances = aggregated || resp.balances;

      fn(null, resp);
    }
  });
};

