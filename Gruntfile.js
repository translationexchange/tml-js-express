module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-blanket');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      coverage: {
        src: ['coverage/']
      }
    },

    copy: {
      coverage: {
        expand: true,
        cwd: 'test/',
        src: ['**'],
        dest: 'coverage/test'
      },
      config: {
        expand: true,
        cwd: 'config/',
        src: ['**'],
        dest: 'coverage/config'
      }
    },

    blanket: {
      coverage: {
        src: ['lib/'],
        dest: 'coverage/lib/'
      }
    },

    mochaTest: {
      'spec': {
        options: {
          reporter: 'spec',
          timeout: 10000
        },
        src: ['coverage/test/**/*.js']
      },
      'html-cov': {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'reports/coverage.html'
        },
        src: ['coverage/test/**/*.js']
      },
      'mocha-lcov-reporter': {
        options: {
          reporter: 'mocha-lcov-reporter',
          quiet: true,
          captureFile: 'reports/lcov.info'
        },
        src: ['coverage/test/**/*.js']
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['coverage/test/**/*.js']
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js'],
      options: {
        curly:    false,
        eqeqeq:   false,
        undef:    false,
        immed:    false,
        latedef:  false,
        newcap:   false,
        noarg:    false,
        sub:      false,
        unused:   false,
        boss:     true,
        eqnull:   true,
        node:     true,
        globals: {
          jQuery:   true,
          console:  true,
          module:   true,
          document: true
        }
      }
    },

    jsdoc : {
      dist : {
        src: ['lib/**/*.js'],
        options: {
          destination: 'doc'
        }
      }
    },

    watch: {
      all: {
        files: ['lib/**/*.js', 'test/**/*.js'],
        tasks: ['test', 'uglify']
      }
    },

    coveralls: {
      options: {
        force: true
      },
      all: {
        src: 'reports/lcov.info'
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'blanket', 'copy', 'mochaTest', 'coveralls']);
  grunt.registerTask('docs', ['jsdoc']);
  grunt.registerTask('build', ['test']);
  grunt.registerTask('default', ['test']);

};
