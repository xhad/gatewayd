var enqueueOutgoingPayment = require(__dirname+'/../../../api/enqueue_outgoing_payment.js');

function OutgoingRipplePaymentsController() {
  this.resource = '/payments/outgoing';
}

OutgoingRipplePaymentsController.prototype = {
  post: function(request, response) {
    enqueueOutgoingPayment(request.body)
      .then(function(payment) {
        response.status(200).send({
            success: true,
            payment: payment.toJSON()
          });
      })
      .error(function(error){
        response.status(500).send({
            success: false,
            error: error
          });
      });
  }
};

var controller = new OutgoingRipplePaymentsController();

module.exports = controller.post;
