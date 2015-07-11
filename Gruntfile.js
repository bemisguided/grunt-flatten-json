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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-release');
  // rename the default name for grunt-release so we can use it as a target
  grunt.renameTask('release', 'grunt_release');

  // Main grunt targets
  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['jscs', 'jshint', 'flatten', 'nodeunit']);
  grunt.registerTask('release', ['clean', 'test', 'grunt_release']);

  // Project Configuration
  grunt.initConfig({

    // Clean ----------------------------------------

    clean: {
      all: ['dest/']
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

      basekey: {
        options: {
          baseKey: 'root'
        },
        files: [{
          dest: 'dest/basekey.json',
          src: ['test/basekey/*_en_CA.json']
        }]
      }
    },

    nodeunit: {
      all: ['test/*.spec.js']
    },

    // Release --------------------------------------

    grunt_release: {
      options: {
        commitMessage: 'Release of <%= version %>',
        github: {
          repo: 'bemisguided/grunt-flatten-json',
          accessTokenVar: 'GITHUB_API_TOKEN'
        }
      }
    }

  });

};
