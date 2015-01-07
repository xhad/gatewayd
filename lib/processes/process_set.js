var path = require('path')

function processPath(name) {
  return path.join(__dirname, '/../../processes/'+name+'.js')
}

function ProcessSet() {
  this.processes = {};
  this.processes[processPath('deposits')]    = true;
  this.processes[processPath('withdrawals')] = true;
  this.processes[processPath('server')]      = true;
  this.processes[processPath('incoming')]    = true;
  this.processes[processPath('outgoing')]    = true;
}

ProcessSet.prototype = {
  constructor: ProcessSet,

  add: function(name) {
    this.processes[processPath(name)] = true;
    return this.processes;
  },

  remove: function(name) {
    delete this.processes[processPath(name)];
    return this.processes;
  },

  toString: function() {
    return this.processes.toString();
  },

  toArray: function() {
    var array = [];
    for (var path in this.processes) {
      array.push(path);
    } 
    return array;
  }
};

module.exports = ProcessSet;

