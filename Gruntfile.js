var nconf = require(__dirname+'/config/config.js');

module.exports = function (grunt) {

  grunt.initConfig({
    migrate: {
      options: {
        env: {
          DATABASE_URL: nconf.get('DATABASE_URL')
        },
        'migrations-dir': './node_modules/ripple-gateway-data-sequelize/migrations/',
        verbose: true
      }
    }
  }); 

  
  grunt.loadNpmTasks('grunt-db-migrate');
  grunt.registerTask('default', ['migrate']);
};
