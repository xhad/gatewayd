var gateway = require(__dirname+'/../../');

module.exports = function(){
  gateway.api.listProcesses({ json: false }, function(err, processes){
    logger.info(processes);
  }); 
};
