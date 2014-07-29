var enqueueOutgoingPayment = require(__dirname+'/../../../api/enqueue_outgoing_payment.js');

function OutgoingRipplePaymentsController() { 
  this.resource = '/payments/outgoing';
}

OutgoingRipplePaymentsController.prototype = {
  post: function(request, response) { 
    enqueueOutgoingPayment(request.body, function(error, payment) {
      if (error) {
        response.send(500, {
          success: false,
          error: error
        })
      } else {
        response.send(200, {
          success: true,
          payment: payment.toJSON()
        });
      }
    });
  }
}

var controller = new OutgoingRipplePaymentsController;

module.exports = controller.post;

