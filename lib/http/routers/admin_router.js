var express = require('express');

var adminController = require(__dirname+'/../controllers/admin/');

var router = new express.Router();

router.post('/login', adminController.login);

module.exports = router;


