var babelify = require('babelify');
var dotenv = require('dotenv');
dotenv.load();

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    browserify: {
      options: {
        transform: [babelify],
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
    sass: {
      dev: {
        files: [{
          src: './src/**/*.scss',
          dest: './tmp/main.css'
        }]
      },
      dist: {
        files: [{
          src: './src/**/*.scss',
          dest: './public/main.css'
        }]
      },
    },
    watch: {
      app: {
        files: ['src/**/*.js', 'src/**/*.scss'],
        tasks: ['browserify:dev', 'sass:dev']
      },
      options: {
        livereload: true,
        files: [
          './src/app.js'
        ]
      }
    },
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
      'sass:dev',
      'open',
      'watch:app'
    ]);
  });


  grunt.registerTask('dist', function(target) {
    grunt.task.run([
      'replace:vars',
      'browserify:dist'
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
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-replace');
};
