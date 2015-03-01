var babelify = require('babelify');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      options: {
        transform: [babelify],
        debug: true
      },
      dev: {
        src: './src/app.js',
        dest: './tmp/app.js',
        options: {
          require: ['./config/environment.js/:config', './config/firebase_ref.js:firebaseRef']
        }
      }
    },
    sass: {
      dist: {
        files: [{
          src: './src/**/*.scss',
          dest: './tmp/main.css'
        }]
      }
    },
    watch: {
      app: {
        files: ['src/**/*.js', 'src/**/*.scss'],
        tasks: ['browserify:dev', 'sass:dist']
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
      'connect:livereload',
      'browserify:dev',
      'sass:dist',
      'open',
      'watch:app'
    ]);
  });
  grunt.registerTask('default', ['serve']);

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-sass');

};
