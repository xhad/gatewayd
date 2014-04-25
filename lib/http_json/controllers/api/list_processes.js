var gateway = require(__dirname+'/../../');

module.exports = function(req, res){
  var json = true;
  if (req.query.json === 'false'){
    json = false 
  }
  gateway.api.listProcesses({ json: json }, function(err, resp){
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ processes: resp });
    }
  });
};
