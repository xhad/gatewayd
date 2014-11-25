module.exports = function (grunt) {

  grunt.initConfig({
    env: {
      test: {
        NODE_ENV: 'test'
      },
      test_in_memory: {
        NODE_ENV: 'test_in_memory'
      }
    },

    migrate: {
      options: {
        config: './lib/data/database.json',
        'migrations-dir': './lib/data/migrations',
        verbose: true
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
      test_in_memory: {
        options: {
          reporter: 'spec'
        },
        src: ['test/models/**/*.js']
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
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('test_im', ['env:test_in_memory', 'mochaTest:test_in_memory']);

  grunt.registerTask('default', ['migrate']);
};
