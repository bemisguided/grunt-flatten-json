/*
 * grunt-flatten-json
 * https://github.com/bemisguided/grunt-flatten-json
 *
 * Copyright (c) 2015 Martin Crawford
 * Licensed under the MIT license.
 * https://github.com/bemisguided/grunt-flatten-json/blob/master/LICENSE
 */

var chalk = require('chalk');

module.exports = function (grunt) {

  grunt.registerMultiTask('flatten_json', 'Flatten one or more JSON files into a single-level file', function () {

    var options = this.options({
      encoding: grunt.file.defaultEncoding,
      baseKey: null,
      separator: '.',
      keyFilter: null,
      valueFilter: null
    });
    grunt.verbose.writeln('Options set: ' + chalk.green(JSON.stringify(options)));


    this.files.forEach(function (filePair) {
      var dest = filePair.dest;
      var result = {};

      filePair.src.forEach(function (src) {
        grunt.verbose.writeln('Reading JSON file ' + chalk.green(src));
        var json = grunt.file.readJSON(src, {encoding: options.encoding});
        _flattenObject(grunt, result, json, options.baseKey, options);
      });

      grunt.log.writeln('Flattened JSON file created ' + chalk.cyan(dest));
      grunt.file.write(dest, JSON.stringify(result), {encoding: options.encoding});
    });
  });

};

function _flattenObject(grunt, result, object, keyContext, options) {
  Object.keys(object).forEach(function (key) {
    // Filter the key if configured
    if (!_filterKey(grunt, keyContext, key, options)) {
      return;
    }
    var keyCurrent = key;
    if (keyContext) {
      keyCurrent = keyContext + options.separator + key;
    }
    var value = object[key];
    if (typeof value != 'object') {
      result[keyCurrent] = value;
      return;
    }
    _flattenObject(grunt, result, value, keyCurrent, options);
  });
}

function _filterKey(grunt, keyContext, key, options) {
  var keyFilter = options.keyFilter;
  if (!keyFilter) {
    return true;
  }

  var underKey = '';
  if (keyContext) {
    underKey = ' under key ' + chalk.red(keyContext);
  }

  // Filter if the keyFilter is a string
  if (typeof keyFilter === 'string') {
    if (key == keyFilter) {
      grunt.verbose.writeln('Filtering key using filter ' + chalk.green(keyFilter) + ' (string) on key ' + chalk.red(key) + underKey);
      return false;
    }
    return true;
  }

  // Filter if the keyFilter is an array
  if (Array.isArray(keyFilter)) {
    for (var i = 0; i < keyFilter.length; i++) {
      if (key == keyFilter[i]) {
        grunt.verbose.writeln('Filtering key using filter ' + chalk.green(keyFilter) + ' (array) on key ' + chalk.red(key) + underKey);
        return false;
      }
    }
    return true;
  }

  // Filter if the keyFilter is a function
  if (typeof keyFilter === 'function') {
    var keyFilterResult = keyFilter(keyContext, key);
    if (keyFilterResult) {
      grunt.verbose.writeln('Filtering key using function on key ' + chalk.red(key) + underKey);
      return false;
    }
  }
  return true;
}
