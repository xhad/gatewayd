var db = require('../sequelize');
var validator = require(__dirname+'/../../validator');
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const http = require('superagent');
const config = require(__dirname+'/../../../config/environment.js');

var RippleAddress = db.define('ripple_addresses', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true
	},
  user_id: { 
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      isInt: true
    }
  },
  managed: { 
    type: Sequelize.BOOLEAN, 
    validate: { 
      notNull: true 
    }
  },
  address: { 
    type: Sequelize.STRING,
    validate: { 
      notNull: true,

      isRippleAddress: function(value) {
        if (!validator.isRippleAddress(value)) {
          throw new Error('Only valid Ripple public addresses allowed');
        }
      }
    }
  },
  type: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: { 
      notNull: true,
      isIn: [['hot','cold','hosted','independent']]
    }
  },
  secret: { 
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isAlphanumeric: true
    }
  },
  tag: { 
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      isInt: true
    }
  },
  previous_transaction_hash: { 
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isAlphanumeric: true
    }
  },
  uid: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
    validate: {
      isAlphanumeric: true
    }
  },
  data: {
    type: Sequelize.STRING,
    allowNull: true,
  }
}, {
  instanceMethods: {
    setLastPaymentHash: function(hash) {
      var data = this.data || {};
      data.lastPaymentHash = hash;
      return this.updateAttributes({
        data: data
      });
    },
    getLastPaymentHash: function() {
      if (this.data) {
        return this.data.lastPaymentHash;
      } else {
        return null;
      }
    },
    fetchLastPaymentHash: function() {
      var _this = this;
      return new Promise(function(resolve,reject) {
        http
          .get(config.get('RIPPLE_REST_API')+'v1/accounts/'+_this.get('address')+'/payments')
          .end(function(error, response) {
            if (error) { return reject(error) }
            resolve(response.body.payments[0].payment.hash);
          });
      });
    }
  },
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

RippleAddress.initModel = function(forced) {
  return db.sync({force: forced});
};

module.exports = RippleAddress;
