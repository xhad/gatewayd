var User = require('../models/user'),
    utils = require('../../lib/utils'),
    util = require('util');

module.exports = (function() {
  function index(req, res) {
    if (req.user.admin) {
      User.findAll().complete(function(err, users){
        res.send({ admin: true, users: users });
      });
    } else {
      res.send({ user: req.user });
    }
  }

  function show(req, res) {
    if (req.user.admin || (req.user.id == req.params.user_id)) {
      User.find(req.params.user_id).complete(function(err, user){
        res.send({ user: user });
      });  
    } else {
      res.status(401);
      res.send('401: access denied');
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
    create: create,
    show: show
  }
})();
