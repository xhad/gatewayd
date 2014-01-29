var db = require('../../config/initializers/sequelize.js');

var ExternalAccount = db.define('external_accounts', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  user_id: { type: Sequelize.INTEGER, allowNull: false },
});

module.exports = ExternalAccount;
