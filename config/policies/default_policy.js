const Promise = require('bluebird');

module.exports = {

  doesApply: function() {
    return new Promise(function(resolve, reject) {
      resolve(true);
    });
  },

  apply: function(payment) {
    console.log('about to apply default policy to', payment.toJSON());
    data = payment.data || {};
    data.error = 'no applicable policy found';
    return payment.updateAttributes({
      status: 'failed:incoming',
      data: data
    });
  }
}

