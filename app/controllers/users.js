var User = require('../models/user'),
    utils = require('../../lib/utils'),
    util = require('util');

module.exports = (function() {
  function index(req, res) {
    if (req.user.admin) {
      User.findAll().complete(function(err, users){
        if (err) {
          res.send(500, { error: err });
        } else {
          res.send({ admin: true, users: users });
        }
      });
    } else {
      res.send({ user: req.user });
    }
  }

  function show(req, res) {
    if (req.user.admin || (req.user.id == req.params.user_id)) {
      User.find(req.params.user_id).complete(function(err, user){
        if (err) {
          res.send(500, { error: err });
        } else {
          res.send({ user: user });
        }
      });  
    } else {
      res.send(401, { error: 'Access Denied' });
    }
  }

  function create(req, res) {
    if (req.user.admin) {
      req.checkBody('name', 'Invalid name').notNull();
      req.checkBody('password', 'Invalid password').notNull();
      if (errors = req.validationErrors()) {
        res.send(500, { error: errors });
      }
      User.createWithSalt({ name: req.body.name, password: req.body.password },function(err, user){
        if (err) { 
          req.send(500, { error: err });
        } else {
          res.send({ user: user });
        }
      })
    } else {
      res.send({ user: req.user });
    }
  }
  
  return {
    index: index,
    create: create,
    show: show
  }
})();
