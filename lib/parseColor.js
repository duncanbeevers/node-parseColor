function hex2rgbOctets(hex) {
  var c, o = [], k = 0, m = hex.match(
    /^#(([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})|([0-9a-f])([0-9a-f])([0-9a-f]))$/i);
      
  if (!m) return {r:0,g:0,b:0};
  for (var i = 2, s = m.length; i < s; i++) {
    if (undefined === m[i]) continue;
    c = parseInt(m[i], 16);
    o[k++] = c + (i > 4 ? c * 16 : 0);
  }
  return {r:o[0], g:o[1], b:o[2]};
}

function rgb2rgbOctets(rgb) {
  var m = rgb.match(/^rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)$/);
  return {r:parseInt(m[1],10), g:parseInt(m[2],10), b:parseInt(m[3],10)};
}

function rgba2rgbaOctets(rgba) {
  var m = rgba.match(/^rgba\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+(?:\.\d+))\)$/);
  return {r:parseInt(m[1],10), g:parseInt(m[2],10), b:parseInt(m[3],10), a:alpha2Octet(m[4])};
}

function alpha2Octet(alpha) {
  return Math.floor(parseFloat(alpha, 10) * 255);
}

module.exports = {
  hex2rgbOctets: hex2rgbOctets,
  rgb2rgbOctets: rgb2rgbOctets,
  rgba2rgbaOctets: rgba2rgbaOctets,
  alpha2Octet: alpha2Octet
};

