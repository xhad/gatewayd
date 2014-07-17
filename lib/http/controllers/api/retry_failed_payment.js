var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  gateway.api.retryFailedPayment(req.params.id, function(error, payment){
    if (error){
      if (error.field === 'id') {
        return res.send(404, { error: {
          field: 'id',
          message: 'does not exist'
        }});
      }
      if (error.state === 'must be "failed"') {
        return res.send(400, { error: {
          field: 'state',
          message: 'is not failed'
        }});
      } else {
        res.send(500, { error: error });
      }
    } else {
      res.send(200, { payment: payment });
    }
  });
};
