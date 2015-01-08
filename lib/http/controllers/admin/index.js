function bind(action, filename){
  module.exports[action] = require(__dirname+'/'+filename);
}

bind('login', 'login.js');