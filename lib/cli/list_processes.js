var gateway = require(__dirname+'/../../');
var logger = require('winston');

module.exports = function(){
  gateway.api.listProcesses({ json: false }, function(err, processes){
    logger.info(processes);
  }); 
};
