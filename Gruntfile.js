module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-coveralls');

  grunt.initConfig({
    clean: {
      coverage: {
        src: ['coverage/']
      }
    },

    mochaTest: {
      'spec': {
        options: {
          reporter: 'spec',
          timeout: 10000
        },
        src: ['test/**/*.js']
      }
    },

    mocha_istanbul: {
      coverage: {
        src: 'test', // a folder works nicely
        options: {
          mask: './**/*.js'
        }
      },
      coveralls: {
        src: ['test'], // multiple folders also works
        options: {
          coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered
          check: {
            lines: 75,
            statements: 75
          },
          root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
          reportFormats: ['cobertura', 'lcovonly']
        }
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
        src: ['lib/**/**/*.js'],
        options: {
          destination: 'doc'
        }
      }
    },

    watch: {
      all: {
        files: ['lib/**/**/*.js', 'test/**/**/*.js'],
        tasks: ['test']
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

  grunt.registerTask('test', ['clean', 'jshint', 'mochaTest']);
  grunt.registerTask('coverage', ['clean', 'jshint', 'mocha_istanbul:coverage', 'coveralls']);
  grunt.registerTask('docs', ['jsdoc']);
  grunt.registerTask('default', ['coverage']);

};
