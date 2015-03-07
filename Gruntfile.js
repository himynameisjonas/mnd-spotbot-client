var babelify = require('babelify');
var sassify = require('sassify');
var dotenv = require('dotenv');
dotenv.load();

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Replace
    replace: {
      vars: {
        options: {
          patterns: [
            {
              match: 'firebaseUrl',
              replacement: process.env.FIREBASE_URL
            }
          ]
        },
        files: [
          { src: ['./config/environment_template.js'], dest: './config/environment.js' }
        ]
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/app.min.js': ['public/app.js']
        }
      }
    },
    // Browserify
    browserify: {
      options: {
        transform: [babelify, sassify],
        debug: true
      },
      dev: {
        src: './src/app.js',
        dest: './tmp/app.js',
        options: {
          require: ['./config/environment.js/:env', './config/firebase_ref.js:firebaseRef']
        }
      },
      dist: {
        src: './src/app.js',
        dest: './public/app.js',
        options: {
          require: ['./config/environment.js/:env', './config/firebase_ref.js:firebaseRef']
        }
      }
    },
    // Watch
    watch: {
      app: {
        files: ['src/**/*.js', 'src/**/*.scss'],
        tasks: ['browserify:dev']
      },
      options: {
        livereload: true,
        files: [
          './src/app.js'
        ]
      }
    },
    // Connect
    connect: {
      options: {
        port: 8000,
        hostname: 'localhost',
        livereload: true
      },
      livereload: {
        options: {
          livereload: true,
          base: {
            path: 'tmp'
          }
        }
      }
    },
    // Open
    open: {
      server: {
        url: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
      }
    }
  });

  grunt.registerTask('serve', function(target) {
    grunt.task.run([
      'replace:vars',
      'connect:livereload',
      'browserify:dev',
      'open',
      'watch:app'
    ]);
  });

  grunt.registerTask('dist', function(target) {
    grunt.task.run([
      'replace:vars',
      'browserify:dist',
      'uglify'
    ]);
  });

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('heroku:production', ['dist']);
  grunt.registerTask('build', ['dist']);

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};
