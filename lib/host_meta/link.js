function Link(options) {
  this.rel = options.rel;
  this.template = options.template;
  this.properties = options.properties || {};
}

module.exports = Link;