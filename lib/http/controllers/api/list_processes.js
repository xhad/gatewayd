var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  gateway.api.listProcesses({ json: true },function(err, resp){
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send(resp);
    }
  });
};
