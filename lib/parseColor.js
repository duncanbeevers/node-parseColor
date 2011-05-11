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

function octet2alpha(octet) {
  return octet / 255;
}

function normalize(octets) {
  if (!octets.hasOwnProperty('a')) {
    octets.a = 255;
  }
  return octets;
}

function rgbaOctets2rgba(octets) {
  return 'rgba(' + octets.r + ',' + octets.g + ',' + octets.b + ',' + octet2alpha(octets.a) + ')';
}

function hsvOctets2rgbOctets(hsv) {
  var h = hsv.h * 180 / Math.PI,
      s = hsv.s / 255, v = hsv.v / 255,
      r = 0, g = 0, b = 0,
      i, f, p1, p2, p3, map;

  if (s < 0) s = 0;
  else if (s > 1) s = 1;
  if (v < 0) v = 0;
  else if (v > 1) v = 1;

  h %= 360;
  if (h < 0) h += 360;
    h /= 60;
    i = Math.floor(h);
    f = h - i;
    p1 = v * (1 - s);
    p2 = v * (1 - s * f);
    p3 = v * (1 - s * (1 - f));

    map = [
      [ v, p3, p1 ], [ p2, v, p1 ],
      [ p1, v, p3 ], [ p1, p2, v ],
      [ p3, p1, v ], [ v, p1, p2 ]
    ];

   return {
      r: Math.floor(map[i][0] * 255),
      g: Math.floor(map[i][1] * 255),
      b: Math.floor(map[i][2] * 255)
    };
}

function rgbOctets2hsvOctets(rgbOctets) {
  var r = rgbOctets.r / 0xff, g = rgbOctets.g / 0xff, b = rgbOctets.b / 0xff, 
    h = 0, s = 0, v = 0, c = 0, cmax, cmin;

  cmax = r >= g ? r : g;
  if (b > cmax) cmax = b;

  cmin = r <= g ? r : g;
  if (b < cmin) cmin = b;

  v = cmax;
  c = cmax - cmin;

  if (0 === cmax) s = 0;
  else s = c / cmax;

  if (0 !== s) {
    if (r == cmax) h = (g - b) / c;
    else {
      if (g == cmax) h = 2 + (b - r) / c;
      else if (b == cmax) h = 4 + (r - g) / c;
    }
    h = h * 60;
    if (h < 0) h += 360;
  }
  h = h * Math.PI / 180;

  return {
    h: Math.floor(h),
    s: Math.floor(s * 255),
    v: Math.floor(v * 255)
  };
}

module.exports = {
  hex2rgbOctets: hex2rgbOctets,
  rgb2rgbOctets: rgb2rgbOctets,
  rgba2rgbaOctets: rgba2rgbaOctets,
  alpha2Octet: alpha2Octet,
  normalize: normalize,
  rgbaOctets2rgba: rgbaOctets2rgba,
  rgbOctets2hsvOctets: rgbOctets2hsvOctets,
  hsvOctets2rgbOctets: hsvOctets2rgbOctets
};

