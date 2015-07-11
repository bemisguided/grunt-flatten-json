/*
 * grunt-flatten-json
 * https://github.com/bemisguided/grunt-flatten-json
 *
 * Copyright (c) 2015 Martin Crawford
 * Licensed under the MIT license.
 * https://github.com/bemisguided/grunt-flatten-json/blob/master/LICENSE
 */

module.exports = function (grunt) {

  var chalk = require('chalk');

  grunt.registerMultiTask('flatten', 'Flatten one or more JSON files into a single-level file', function () {

    var options = this.options({
      encoding: grunt.file.defaultEncoding,
      rootKey: null,
      separator: '.'
    });
    grunt.verbose.writeln('Options set: ' + chalk.green(JSON.stringify(options)));


    this.files.forEach(function (filePair) {
      var dest = filePair.dest;
      var result = {};

      filePair.src.forEach(function (src) {
        grunt.verbose.writeln('Reading JSON file ' + chalk.green(src));
        var json = grunt.file.readJSON(src, {encoding: options.encoding});
        _flattenObject(result, json, options.rootKey, options.separator);
      });

      grunt.log.writeln('Flattened JSON file created ' + chalk.cyan(dest));
      grunt.file.write(dest, JSON.stringify(result), {encoding: options.encoding});
    });
  });

};

function _flattenObject(result, object, keyContext, separator) {
  Object.keys(object).forEach(function (key) {
    var keyCurrent = key;
    if (keyContext) {
      keyCurrent = keyContext + separator + key;
    }
    var value = object[key];
    if (typeof value != 'object') {
      result[keyCurrent] = value;
      return;
    }
    _flattenObject(result, value, keyCurrent, separator);
  });
}
