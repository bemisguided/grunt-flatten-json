/*
 * grunt-flatten-json
 * https://github.com/bemisguided/grunt-flatten-json
 *
 * Copyright (c) 2015 Martin Crawford
 * Licensed under the MIT license.
 * https://github.com/bemisguided/grunt-flatten-json/blob/master/LICENSE
 */

module.exports = function (grunt) {

  // Load dependency tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  // Main grunt targets
  grunt.registerTask('default', ['build']);
  grunt.registerTask('test', ['jscs', 'jshint']);

  // Project Configuration
  grunt.initConfig({

    // Code Quality ---------------------------------

    jscs: {
      src: [
        'tasks/**/*.js',
        'test/**/*.js'
      ],
      options: {
        esnext: true,
        config: '.jscs.json'
      }
    },

    jshint: {
      all: [
        'tasks/**/*.js',
        'test/**/*.js'
      ]
    }

  });

};
