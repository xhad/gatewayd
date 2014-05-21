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

  grunt.initConfig({
    jsdoc : {
      dist : {
        src: ['index.js', 'lib/api/*.js'],
        options: {
            destination: 'doc/jsdoc/'
        }
      }
    }
  });


  
  grunt.loadNpmTasks('grunt-db-migrate');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.registerTask('default', ['migrate']);
};
