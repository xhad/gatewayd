var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {
  var processes = req.processes;

  gateway.api.startGateway(processes, function(err, processes){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ processes: processes });
    }
  });
};

