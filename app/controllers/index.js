var requireAll = require('require-all');

module.exports = requireAll({
  dirname: __dirname,
  filter: /(.+)\.js(on)?$/
})
