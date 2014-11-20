var config = require( __dirname + '/config/environment.js' );

module.exports = function (grunt) {

  grunt.initConfig({

    migrate: {
      options: {
        config: './lib/data/database.json',
        'migrations-dir': './lib/data/migrations',
        verbose: true,
        env: {
          DATABASE_URL: 'postgres://' + config.get('DATABASE_USER') + ':' + config.get('DATABASE_PASSWORD') + '@' + config.get('DATABASE_HOST') + ':' + config.get('DATABASE_PORT') + '/' + config.get('DATABASE_NAME')
        }
      }
    },

    jsdoc : {
      dist : {
        src: ['./index.js', './lib/api/*.js'],
        options: {
          destination: './doc/jsdoc'
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/http/**/*.js']
      }
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'index.js',
        'package.json',
        'bin/gateway',
        'config/*',
        'lib/**/*.js',
        '!lib/data/migrations/*.js',
        'processes/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    }

  });

  grunt.loadNpmTasks('grunt-db-migrate');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['jshint', 'mochaTest']);

  grunt.registerTask('default', ['migrate']);
};
