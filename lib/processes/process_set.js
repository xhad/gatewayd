
function ProcessSet() {
  this.processes = {
    './processes/deposits.js': 1,
    './processes/withdrawals.js': 1,
    './processes/server.js': 1,
    './processes/incoming.js': 1,
    './processes/outgoing.js': 1
  };
}

ProcessSet.prototype = {
  constructor: ProcessSet,

  add: function(path) {
    this.processes[path] = 1;
    return this.processes;
  },

  remove: function(path) {
    delete this.processes[path];
    return this.processes;
  },

  toString: function() {
    return this.processes.toString()
  },

  toArray: function() {
    var array = [];
    for (path in this.processes) {
      array.push(path);
    } 
    return array;
  }
}

module.exports = ProcessSet;

