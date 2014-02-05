var User = require('../models/user'),
    utils = require('../../lib/utils'),
    util = require('util');

module.exports = (function() {
  function index(req, res) {
    if (req.user.admin) {
      req.validate('name', 'isAlphaNumeric');
      User.find({ where: { name: req.body.name }}).complete(function(err, user) {
        res.send(user);
      })
    } else {
      res.send(req.user);
    }
  }

  function create(req, res) {
    if (req.user.admin) {
      req.validate('name', 'isAlphaNumeric');
      req.validate('password', 'isAlphaNumeric');
      User.createEncrypted({ name: req.body.name, password: req.body.password },function(err, user){
        if (err) { 
          res.send(err)
        } else {
          res.send(user);
        }
      })
    } else {
      res.send(req.user);
    }
  }
  
  return {
    index: index,
    create: create
  }
})();
