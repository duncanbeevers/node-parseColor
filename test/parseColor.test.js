var vows = require('vows');
var assert = require('assert');

var parseColor = require('../lib/parseColor');

vows.describe('Parse color string').addBatch({
  'When color string is hash-prefixed hexadecimal octets': {
    topic: function() { return parseColor.hex2rgbOctets('#d0812f'); },
    'red should be parsed': function(octets) { assert.strictEqual(octets.r, 208); },
    'green should be parsed': function(octets) { assert.strictEqual(octets.g, 129); },
    'blue should be parsed': function(octets) { assert.strictEqual(octets.b, 47); },
    'alpha should be absent': function(octets) { assert.ok(!octets.hasOwnProperty('a')); }
  },
  'When color string is hash-prefixed hexadecimal nibbles': {
    topic: function() { return parseColor.hex2rgbOctets('#d82'); },
    'red should be parsed': function(octets) { assert.strictEqual(octets.r, 221); },
    'green should be parsed': function(octets) { assert.strictEqual(octets.g, 136); },
    'blue should be parsed': function(octets) { assert.strictEqual(octets.b, 34); },
    'alpha should be absent': function(octets) { assert.ok(!octets.hasOwnProperty('a')); }
  }
}).run();

