/*
 * grunt-flatten-json
 * https://github.com/bemisguided/grunt-flatten-json
 *
 * Copyright (c) 2015 Martin Crawford
 * Licensed under the MIT license.
 * https://github.com/bemisguided/grunt-flatten-json/blob/master/LICENSE
 */

module.exports = {

  simple: function (test) {
    var result = require('../dest/simple.json');
    var expected = require('./simple/expected.json');

    test.deepEqual(result, expected);
    test.done();
  },

  separator: function (test) {
    var result = require('../dest/separator.json');
    var expected = require('./separator/expected.json');

    test.deepEqual(result, expected);
    test.done();
  },

  basekey: function (test) {
    var result = require('../dest/basekey.json');
    var expected = require('./basekey/expected.json');

    test.deepEqual(result, expected);
    test.done();
  },

  keyfilter_string: function (test) {
    var result = require('../dest/keyfilter_string.json');
    var expected = require('./keyfilter_string/expected.json');

    test.deepEqual(result, expected);
    test.done();
  },

  keyfilter_array: function (test) {
    var result = require('../dest/keyfilter_array.json');
    var expected = require('./keyfilter_array/expected.json');

    test.deepEqual(result, expected);
    test.done();
  },

  keyfilter_function: function (test) {
    var result = require('../dest/keyfilter_function.json');
    var expected = require('./keyfilter_function/expected.json');

    test.deepEqual(result, expected);
    test.done();
  }

};
