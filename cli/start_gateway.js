
var exec = require('child_process').exec;

var processes = {
  webapp: 'processes/webapp',
  deposits: 'processes/deposits',
  outgoing: 'processes/outgoing',
  incoming: 'processes/incoming',
  withdrawals: 'processes/withdrawals',
  ripple_rest: 'processes/ripple_rest'
};

function startGateway() {
  var command, name;

  for (i in processes) {
    name = processes[i];
    command = 'node '+ name
    processes[i] = exec(command);
    processes[i].stdout.setEncoding('utf8');
    processes[i].stdout.on('data', function(data) {
      console.log(data);  
    });
  }

}

module.exports = startGateway;
