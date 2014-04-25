var gateway = require(__dirname+'/../../');

module.exports = function(){
  console.log('this');
  console.log(this.options);
  console.log(this.options.json);
  gateway.api.listProcesses(function(err, processes){
    console.log(processes);
  }); 
};
