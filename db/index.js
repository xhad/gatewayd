var requireAll = require('../lib/require-all');
var sequelize = require('../config/initializers/sequelize.js');

var models = requireAll({
  dirname: __dirname + '/../app/models',
  filter: /(.+)\.js(on)?$/
})

var db = { models: models };

module.exports = db;

