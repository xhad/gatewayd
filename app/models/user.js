var Sequelize = require('sequelize');
var db = require('../../config/initializers/sequelize.js');
var utils = require("../../lib/utils");
var RippleAddress = require('./ripple_address.js');

var User = sequelize.define('user', {
  id: { 
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		notNull: true,
		unique: true,
	},
  federationTag: Sequelize.STRING,
  admin: Sequelize.BOOLEAN,
  federationName: Sequelize.STRING,
  kycId: Sequelize.INTEGER,
  name: Sequelize.STRING,
  salt: Sequelize.STRING,
  passwordHash: Sequelize.STRING
}, {
  instanceMethods: {
  },
  classMethods: {
    createEncrypted: function(name, password, callback) {
      var salt = utils.generateSalt();
      var passwordHash = utils.saltPassword(password, salt);

      var user = User.create({
        name: name,
        salt: salt,
        passwordHash: passwordHash,
      }).complete(function(err, user){
        callback(err, user)
      })
    }
  }
});

module.exports = User;
