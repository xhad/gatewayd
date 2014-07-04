var db = require('../sequelize');
var Sequelize = require('sequelize');

var KycData = db.define('kyc_data', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true
	},
  user_id: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  }
}, {
  getterMethods: {
    data: function () {
      try {
        return JSON.parse(this.getDataValue('data'));
      } catch(e) {
        return this.getDataValue('data');
      }
    }
  },
  setterMethods: {
    data: function (value) {
      this.setDataValue('data', JSON.stringify(value));
    }
  }
});

module.exports = KycData;

