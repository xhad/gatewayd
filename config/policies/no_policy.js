const Promise = require('bluebird');

module.exports = {

  doesApply: function() {
    return new Promise(function(resolve, reject) {
      resolve(true);
    });
  },

  apply: function(payment) {
    data = payment.data || {};
    data.error = 'no applicable policy found';
    return payment.updateAttributes({
      status: 'failed',
      data: data
    });
  }
}

