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
    topic: function() { return parseColor.normalize({ r: 201, g: 68, b:45, a: 192 }); },
    'red should be preserved': function(octets) { assert.strictEqual(octets.r, 201); },
    'green should be preserved': function(octets) { assert.strictEqual(octets.g, 68); },
    'blue should be preserved': function(octets) { assert.strictEqual(octets.b, 45); },
    'alpha should be preserved': function(octets) { assert.strictEqual(octets.a, 192); }
  },
  'normalize sets missing alpha to 255': {
    topic: function() { return parseColor.normalize({ r: 100, g:10, b:1 }); },
    'alpha should be 1': function(octets) { assert.strictEqual(octets.a, 255); }
  },
  'rgbaOctets2rgba encodes octets like { r: 105, g: 208, b:191, a: 255 }': {
    topic: function() { return parseColor.rgbaOctets2rgba({ r: 105, g: 208, b:191, a: 255 }); },
    'colors and alpha should be encoded': function(rgba) { assert.strictEqual(rgba, 'rgba(105,208,191,1)'); }
  },
  'rgbOctets2hsvOctets encodes octets like { r: 80, g: 2, b: 186 }': {
    topic: function() { return parseColor.rgbOctets2hsvOctets({ r: 80, g: 2, b: 186 }); },
    'hue should be encoded': function(hsvOctets) { assert.strictEqual(hsvOctets.h, 4); },
    'saturation should be encoded': function(hsvOctets) { assert.strictEqual(hsvOctets.s, 252); },
    'value should be encoded': function(hsvOctets) { assert.strictEqual(hsvOctets.v, 186); }
  },
  'hsvOctets2rgbOctets encodes octets like { h: 101, s: 215, v: 44 }': {
    topic: function() { return parseColor.hsvOctets2rgbOctets({ h: 101, s: 215, v: 44 }); },
    'red should be encoded': function(rgbOctets) { assert.strictEqual(rgbOctets.r, 44); },
    'green should be encoded': function(rgbOctets) { assert.strictEqual(rgbOctets.g, 23); },
    'blue should be encoded': function(rgbOctets) { assert.strictEqual(rgbOctets.b, 6); }
  }
}).run();

