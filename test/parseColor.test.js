var vows = require('vows');
var assert = require('assert');
assert.inDelta = (function inDelta(actual, expected, delta) {
  if (Math.abs(expected - actual) > delta)
    assert.fail(actual, expected, undefined, 'within ' + delta + ' of', inDelta);
});

var parseColor = require('../lib/parseColor');

vows.describe('Parse color string').addBatch({
  'hexStr2rgb parses hash-prefixed hexadecimal octets like #d0812f': {
    topic: function() { return parseColor.hexStr2rgb('#d0812f'); },
    'red should be parsed': function(rgb) { assert.strictEqual(rgb.r, 208); },
    'green should be parsed': function(rgb) { assert.strictEqual(rgb.g, 129); },
    'blue should be parsed': function(rgb) { assert.strictEqual(rgb.b, 47); },
    'alpha should be absent': function(rgb) { assert.ok(!rgb.hasOwnProperty('a')); }
  },
  'hexStr2rgb parses hash-prefixed hexadecimal nibbles like #d8w': {
    topic: function() { return parseColor.hexStr2rgb('#d82'); },
    'red should be parsed': function(rgb) { assert.strictEqual(rgb.r, 221); },
    'green should be parsed': function(rgb) { assert.strictEqual(rgb.g, 136); },
    'blue should be parsed': function(rgb) { assert.strictEqual(rgb.b, 34); },
    'alpha should be absent': function(rgb) { assert.ok(!rgb.hasOwnProperty('a')); }
  },
  'rgbStr2rgb parses rgb expressions like rgb(84, 191, 62)': {
    topic: function() { return parseColor.rgbStr2rgb('rgb(84, 191, 62)'); },
    'red should be parsed': function(rgb) { assert.strictEqual(rgb.r, 84); },
    'green should be parsed': function(rgb) { assert.strictEqual(rgb.g, 191); },
    'blue should be parsed': function(rgb) { assert.strictEqual(rgb.b, 62); },
    'alpha should be absent': function(rgb) { assert.ok(!rgb.hasOwnProperty('a')); }
  },
  'rgbaStr2rgba parses rgba expressions like rgba(100, 89, 206, 0.0)': {
    topic: function() { return parseColor.rgbaStr2rgba('rgba(100, 89, 206, 0.0)'); },
    'red should be parsed': function(rgba) { assert.strictEqual(rgba.r, 100); },
    'green should be parsed': function(rgba) { assert.strictEqual(rgba.g, 89); },
    'blue should be parsed': function(rgba) { assert.strictEqual(rgba.b, 206); },
    'alpha should be parsed': function(rgba) { assert.strictEqual(rgba.a, 0); }
  },
  'alphaCent2Octet parses alpha floats like 0.0': {
    topic: function() { return parseColor.alphaCent2Octet('0.0'); },
    'alpha should be parsed to 0': function(octet) { assert.strictEqual(octet, 0); }
  },
  'alphaCent2Octet parses alpha floats like 0.2': {
    topic: function() { return parseColor.alphaCent2Octet('0.2'); },
    'alpha should be parsed': function(octet) { assert.strictEqual(octet, 51); }
  },
  'alphaCent2Octet parses alpha floats like 1.0': {
    topic: function() { return parseColor.alphaCent2Octet('1.0'); },
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
  'rgba2rgbaStr encodes octets like { r: 105, g: 208, b:191, a: 1 }': {
    topic: function() { return parseColor.rgba2rgbaStr({ r: 105, g: 208, b:191, a: 1 }); },
    'colors and alpha should be encoded': function(rgbaStr) { assert.strictEqual(rgbaStr, 'rgba(105,208,191,1)'); }
  },
  'rgb2hsv encodes octets like { r: 80, g: 2, b: 186 }': {
    topic: function() { return parseColor.rgb2hsv({ r: 80, g: 2, b: 186 }); },
    'hue should be encoded': function(hsv) { assert.inDelta(hsv.h, 4.63, 0.01); },
    'saturation should be encoded': function(hsv) { assert.inDelta(hsv.s, 0.98, 0.01); },
    'value should be encoded': function(hsv) { assert.inDelta(hsv.v, 0.72, 0.01); }
  },
  'hsv2rgb encodes octets like { h: 101, s: 0.8, v: 0.33 }': {
    topic: function() { return parseColor.hsv2rgb({ h: 101, s: 0.8, v: 0.33 }); },
    'red should be encoded': function(rgb) { assert.inDelta(rgb.r, 84.15, 0.01); },
    'green should be encoded': function(rgb) { assert.inDelta(rgb.g, 46.98, 0.01); },
    'blue should be encoded': function(rgb) { assert.inDelta(rgb.b, 16.83, 0.01); }
  }
}).run();

