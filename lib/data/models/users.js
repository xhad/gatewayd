var db = require('../sequelize.js');
var Sequelize = require('sequelize');

var User = db.define('user', {
  id: { 
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		notNull: true,
		unique: true,
	},
  federation_tag: Sequelize.STRING,
  admin: Sequelize.BOOLEAN,
  federation_name: Sequelize.STRING,
  kyc_id: Sequelize.INTEGER,
  name: { type: Sequelize.STRING, unique: true },
  salt: Sequelize.STRING,
  password_hash: Sequelize.STRING,
  external_id: Sequelize.STRING,
  data: Sequelize.STRING,
  uid: {
    type: Sequelize.STRING,
    unique: true
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;
