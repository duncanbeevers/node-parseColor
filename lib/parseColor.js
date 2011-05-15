function hexStr2rgb(hex) {
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

function rgbStr2rgb(rgb) {
  var m = rgb.match(/^rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)$/);
  return {r:parseInt(m[1],10), g:parseInt(m[2],10), b:parseInt(m[3],10)};
}

function rgbaStr2rgba(rgba) {
  var m = rgba.match(/^rgba\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+(?:\.\d+))\)$/);
  return {r:parseInt(m[1],10), g:parseInt(m[2],10), b:parseInt(m[3],10), a:alphaCent2Octet(m[4])};
}

function alphaCent2Octet(alpha) {
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

function rgb2rgbaStr(rgb, alpha) {
  return rgba2rgbaStr({ r: rgb.r, g: rgb.g, b: rgb.b, a: alpha });
}

function rgba2rgbaStr(rgba) {
  return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
}

function hsv2rgb(hsv) {
  var h = hsv.h * 180 / Math.PI,
      s = hsv.s, v = hsv.v,
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
      r: map[i][0] * 255,
      g: map[i][1] * 255,
      b: map[i][2] * 255
    };
}

function rgb2hsv(rgb) {
  var r = rgb.r / 0xff, g = rgb.g / 0xff, b = rgb.b / 0xff,
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
    h: h,
    s: s,
    v: v
  };
}

module.exports = {
  hexStr2rgb: hexStr2rgb,
  rgbStr2rgb: rgbStr2rgb,
  rgbaStr2rgba: rgbaStr2rgba,
  alphaCent2Octet: alphaCent2Octet,
  normalize: normalize,
  rgb2rgbaStr: rgb2rgbaStr,
  rgba2rgbaStr: rgba2rgbaStr,
  rgb2hsv: rgb2hsv,
  hsv2rgb: hsv2rgb
};

