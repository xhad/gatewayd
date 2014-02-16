var requireAll = require('./require-all.js')

function TestAdapter() {
}

var controllers = requireAll({
  dirname: __dirname + '/../app/controllers',
  filter: /(.+)\.js(on)?$/
})

var Gateway = {
  Controllers: controllers,
  Adapter: new TestAdapter()
}

module.exports = Gateway;
