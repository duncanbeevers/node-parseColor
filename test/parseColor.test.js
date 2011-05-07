var vows = require('vows');
var assert = require('assert');

var parseColor = require('../lib/parseColor');

vows.describe('Parse color string').addBatch({
  'hex2rgbOctets parses hash-prefixed hexadecimal octets like #d0812f': {
    topic: function() { return parseColor.hex2rgbOctets('#d0812f'); },
    'red should be parsed': function(octets) { assert.strictEqual(octets.r, 208); },
    'green should be parsed': function(octets) { assert.strictEqual(octets.g, 129); },
    'blue should be parsed': function(octets) { assert.strictEqual(octets.b, 47); },
    'alpha should be absent': function(octets) { assert.ok(!octets.hasOwnProperty('a')); }
  },
  'hex2rgbOctets parses hash-prefixed hexadecimal nibbles like #d8w': {
    topic: function() { return parseColor.hex2rgbOctets('#d82'); },
    'red should be parsed': function(octets) { assert.strictEqual(octets.r, 221); },
    'green should be parsed': function(octets) { assert.strictEqual(octets.g, 136); },
    'blue should be parsed': function(octets) { assert.strictEqual(octets.b, 34); },
    'alpha should be absent': function(octets) { assert.ok(!octets.hasOwnProperty('a')); }
  },
  'rgb2rgbOctets parses rgb expressions like rgb(84, 191, 62)': {
    topic: function() { return parseColor.rgb2rgbOctets('rgb(84, 191, 62)'); },
    'red should be parsed': function(octets) { assert.strictEqual(octets.r, 84); },
    'green should be parsed': function(octets) { assert.strictEqual(octets.g, 191); },
    'blue should be parsed': function(octets) { assert.strictEqual(octets.b, 62); },
    'alpha should be absent': function(octets) { assert.ok(!octets.hasOwnProperty('a')); }
  },
  'rgba2rgbaOctets parses rgba expressions like rgba(100, 89, 206, 0.0)': {
    topic: function() { return parseColor.rgba2rgbaOctets('rgba(100, 89, 206, 0.0)'); },
    'red should be parsed': function(octets) { assert.strictEqual(octets.r, 100); },
    'green should be parsed': function(octets) { assert.strictEqual(octets.g, 89); },
    'blue should be parsed': function(octets) { assert.strictEqual(octets.b, 206); },
    'alpha should be parsed': function(octets) { assert.strictEqual(octets.a, 0); }
  },
  'alpha2Octet parses alpha floats like 0.0': {
    topic: function() { return parseColor.alpha2Octet('0.0'); },
    'alpha should be parsed to 0': function(octet) { assert.strictEqual(octet, 0); }
  },
  'alpha2Octet parses alpha floats like 0.2': {
    topic: function() { return parseColor.alpha2Octet('0.2'); },
    'alpha should be parsed': function(octet) { assert.strictEqual(octet, 51); }
  },
  'alpha2Octet parses alpha floats like 1.0': {
    topic: function() { return parseColor.alpha2Octet('1.0'); },
    'alpha should be parsed to 255': function(octet) { assert.strictEqual(octet, 255); }
  },
  'normalize preserves extant alpha': {
    topic: function() { return parseColor.normalize({ r: 201, g: 68, b:45, a: 0.9 }); },
    'red should be preserved': function(octets) { assert.strictEqual(octets.r, 201); },
    'green should be preserved': function(octets) { assert.strictEqual(octets.g, 68); },
    'blue should be preserved': function(octets) { assert.strictEqual(octets.b, 45); },
    'alpha should be preserved': function(octets) { assert.strictEqual(octets.a, 0.9); }
  },
  'normalize sets missing alpha to 1': {
    topic: function() { return parseColor.normalize({ r: 100, g:10, b:1 }); },
    'alpha should be 1': function(octets) { assert.strictEqual(octets.a, 1); }
  }
}).run();

