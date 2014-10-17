module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'src/*.js',
        'examples/**/*.js'
      ]
    },
    jasmine: {
      components: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
          'node_modules/jasmine-ajax/lib/mock-ajax.js',
          'src/*js'
        ],
        options: {
          specs: 'specs/*.spec.js',
          outfile: 'specs/_SpecRunner.html',
          keepRunner : true,
          display : 'short',
          summary : true,
          helpers: 'specs/helpers/*.js'
        }
      }
    },
    uglify: {
      minify: {
        files: {
          'dist/jquery.remote.min.js': [
            'src/*',
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('jshintage', [
    'jshint',
  ]);

  grunt.registerTask('test', [
    'jasmine',
  ]);

  grunt.registerTask('default', [
    'jasmine',
    'jshint',
    'uglify'
  ]);
};
