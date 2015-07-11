/*
 * grunt-flatten-json
 * https://github.com/bemisguided/grunt-flatten-json
 *
 * Copyright (c) 2015 Martin Crawford
 * Licensed under the MIT license.
 * https://github.com/bemisguided/grunt-flatten-json/blob/master/LICENSE
 */

module.exports = function (grunt) {

  // Load this library's tasks
  grunt.loadTasks('tasks');

  // Load dependency tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-jscs');

  // Main grunt targets
  grunt.registerTask('default', ['build']);
  grunt.registerTask('test', ['jscs', 'jshint', 'flatten', 'nodeunit']);

  // Project Configuration
  grunt.initConfig({

    // Main -----------------------------------------

    flatten: {
      simple: {
        files: [{
          dest: 'dest/simple.json',
          src: ['test/simple/*_en_CA.json']
        }]
      },

      separator: {
        options: {
          separator: ':'
        },
        files: [{
          dest: 'dest/separator.json',
          src: ['test/separator/*_en_CA.json']
        }]
      },

      rootkey: {
        options: {
          rootKey: 'root'
        },
        files: [{
          dest: 'dest/rootkey.json',
          src: ['test/rootkey/*_en_CA.json']
        }]
      }
    },

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
    },

    // Unit Tests -----------------------------------

    nodeunit: {
      all: ['test/*.spec.js']
    }

  });

};
