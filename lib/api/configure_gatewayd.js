const Promise       = require('bluebird');
const _             = require('lodash');
const validator     = require(__dirname+'/../../lib/validator.js');
var gatewaydLogger  = require(__dirname+'/../../lib/data/logs.js');
var config          = require(__dirname+'/../../config/environment.js');

function ConfigureGatewayd () {
  //White list of config properties so that only specified properties can be set.
  this.whitelist = {
    notifications_url: true
  };
}

ConfigureGatewayd.prototype = {
  set: function(options) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      _this._validate(options)
        .then(function(validatedOptions) {
          return _this._filterWhiteListed(validatedOptions);
        })
        .then(function(filtered) {
          return _this._saveToConfigFile(filtered);
        })
        .then(function(savedConfig){
          resolve(savedConfig);
        })
        .catch(reject);
    });
  },
  _validate: function(options) {
    return new Promise(function(resolve, reject) {
      if (_.isEmpty(options)) {
        gatewaydLogger.error('ConfigureGatewayd', 'ConfigurationParametersMissing');
        return reject(new Error('ConfigurationParametersMissing'));
      }

      if (_.isEmpty(options.notifications_url)) {
        gatewaydLogger.error('ConfigureGatewayd', 'MissingNotificationURL');
        return reject(new Error('MissingNotificationURL'));
      }

      if (!validator.isURL(options.notifications_url)) {
        gatewaydLogger.error('ConfigureGatewayd', 'InvalidNotificationURL');
        return reject(new Error('InvalidNotificationURL'));
      }

      resolve(options);

    });
  },
  _filterWhiteListed: function(options) {
    var _this  = this;
    var filterArr = [];

    //If config property is not in the white list, it will be ignored
    return new Promise(function(resolve) {
      _.forOwn(_this.whitelist, function(value, key) {
        if (value) {
          filterArr.push(key);
        }
      });
      var filered = _.pick(options, filterArr);

      resolve(filered);
    });
  },
  _saveToConfigFile: function(filtered) {
    return new Promise(function(resolve, reject) {
      _.forOwn(filtered, function(value, key) {
        config.set(key.toUpperCase(), value);
        config.save(function(error) {
          if (error) { return reject(error); }
          resolve(filtered);
        });
      });
    });
  }
};

module.exports = new ConfigureGatewayd();
