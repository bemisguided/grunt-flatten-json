/*
 * grunt-flatten-json
 * https://github.com/bemisguided/grunt-flatten-json
 *
 * Copyright (c) 2015 Martin Crawford
 * Licensed under the MIT license.
 * https://github.com/bemisguided/grunt-flatten-json/blob/master/LICENSE
 */
var fs = require('fs');

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

  rootkey: function (test) {
    var result = require('../dest/rootkey.json');
    var expected = require('./rootkey/expected.json');

    test.deepEqual(result, expected);
    test.done();
  }

};
