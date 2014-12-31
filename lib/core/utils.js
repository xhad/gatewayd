var _      = require('lodash');

module.exports.parseSourceBalanceChanges = function(changes) {
  var nonXrpChanges;
  if (changes.length === 1) {
    return changes[0];
  } else if (changes.length > 1) {
    nonXrpChanges = _.reject(changes, function(change) {
      return change.currency === 'XRP';
    });
    return {
      currency: nonXrpChanges[0].currency,
      value: _.reduce(nonXrpChanges, function(memo, change) {
        return memo + Number(change.value);
      }, 0),
      issuer: nonXrpChanges[0].issuer
    };
  } else {
    throw new Error('no source balance changes');
  }
};


module.exports.parseDestinationBalanceChanges = function(changes) {
  return {
    currency: changes[0].currency,
    value: _.reduce(changes, function(memo, change) {
      return memo + Number(change.value);
    }, 0),
    issuer: changes[0].issuer
  };
};

