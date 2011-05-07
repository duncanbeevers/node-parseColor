var vows = require('vows');
var assert = require('assert');

var parseColor = require('../lib/parseColor');

vows.describe('Parse color string').addBatch({
  'When color string is hash-prefixed hexadecimal octets like #d0812f': {
    topic: function() { return parseColor.hex2rgbOctets('#d0812f'); },
    'red should be parsed': function(octets) { assert.strictEqual(octets.r, 208); },
    'green should be parsed': function(octets) { assert.strictEqual(octets.g, 129); },
    'blue should be parsed': function(octets) { assert.strictEqual(octets.b, 47); },
    'alpha should be absent': function(octets) { assert.ok(!octets.hasOwnProperty('a')); }
  },
  'When color string is hash-prefixed hexadecimal nibbles like #d8w': {
    topic: function() { return parseColor.hex2rgbOctets('#d82'); },
    'red should be parsed': function(octets) { assert.strictEqual(octets.r, 221); },
    'green should be parsed': function(octets) { assert.strictEqual(octets.g, 136); },
    'blue should be parsed': function(octets) { assert.strictEqual(octets.b, 34); },
    'alpha should be absent': function(octets) { assert.ok(!octets.hasOwnProperty('a')); }
  },
  'When color string is rgb expression like rgb(84, 191, 62)': {
    topic: function() { return parseColor.rgb2rgbOctets('rgb(84, 191, 62)'); },
    'red should be parsed': function(octets) { assert.strictEqual(octets.r, 84); },
    'green should be parsed': function(octets) { assert.strictEqual(octets.g, 191); },
    'blue should be parsed': function(octets) { assert.strictEqual(octets.b, 62); },
    'alpha should be absent': function(octets) { assert.ok(!octets.hasOwnProperty('a')); }
  },
  'When color string is rgba expression like rgba(100, 89, 206, 0.0)': {
    topic: function() { return parseColor.rgba2rgbaOctets('rgba(100, 89, 206, 0.0)'); },
    'red should be parsed': function(octets) { assert.strictEqual(octets.r, 100); },
    'green should be parsed': function(octets) { assert.strictEqual(octets.g, 89); },
    'blue should be parsed': function(octets) { assert.strictEqual(octets.b, 206); },
    'alpha should be parsed': function(octets) { assert.strictEqual(octets.a, 0); }
  },
  'When color string is alpha float like 0.0': {
    topic: function() { return parseColor.alpha2Octet('0.0'); },
    'alpha should be parsed to 0': function(octet) { assert.strictEqual(octet, 0); }
  },
  'When color string is alpha float like 0.2': {
    topic: function() { return parseColor.alpha2Octet('0.2'); },
    'alpha should be parsed': function(octet) { assert.strictEqual(octet, 51); }
  },
  'When color string is alpha float like 1.0': {
    topic: function() { return parseColor.alpha2Octet('1.0'); },
    'alpha should be parsed to 255': function(octet) { assert.strictEqual(octet, 255); }
  }
}).run();

