
function rgbToHex(r, g, b) {
  function toHex(x) {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

function cielabf(t) {
    const threshold = Math.pow(6.0 / 29.0, 3);
    return t > threshold ? Math.pow(t, 1.0 / 3.0) : (t * Math.pow(6.0 / 29.0, -2) / 3.0) + (4.0 / 29.0);
}

function cielabfm(t) {
    const threshold = 6.0 / 29.0;
    return t > threshold ? Math.pow(t, 3) : 3 * Math.pow(6.0 / 29.0, 2) * (t - 4.0 / 29.0);
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function interpolateColor(rgb1, rgb2, factor) {
    const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * factor);
    const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * factor);
    const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * factor);
    return [r, g, b];
}


function rgbToCmyk(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    let k = 1 - Math.max(r, g, b);
    let c = (1 - r - k) / (1 - k) || 0;
    let m = (1 - g - k) / (1 - k) || 0;
    let y = (1 - b - k) / (1 - k) || 0;

    return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}
function rgbToCmy(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    let c = 1 - r;
    let m = 1 - g;
    let y = 1 - b;

    return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100)];
}
function cmykToRgb(c, m, y, k) {
    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    let r = 1 - Math.min(1, c * (1 - k) + k);
    let g = 1 - Math.min(1, m * (1 - k) + k);
    let b = 1 - Math.min(1, y * (1 - k) + k);

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function cmyToRgb(c, m, y) {
    c /= 100;
    m /= 100;
    y /= 100;
    
    let r = 1 - c;
    let g = 1 - m;
    let b = 1 - y;

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

        function rgbToHsv(r, g, b) {
            r /= 255, g /= 255, b /= 255;
            let max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, v = max;
            let d = max - min;
            s = max === 0 ? 0 : d / max;
            if (max === min) {
                h = 0; 
            } else {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
        }

        function hsvToRgb(h, s, v) {
            let r, g, b;
            h /= 360;
            s /= 100;
            v /= 100;
            let i = Math.floor(h * 6);
            let f = h * 6 - i;
            let p = v * (1 - s);
            let q = v * (1 - f * s);
            let t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0: r = v, g = t, b = p; break;
                case 1: r = q, g = v, b = p; break;
                case 2: r = p, g = v, b = t; break;
                case 3: r = p, g = q, b = v; break;
                case 4: r = t, g = p, b = v; break;
                case 5: r = v, g = p, b = q; break;
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        function rgbToHsl(r, g, b) {
            r /= 255, g /= 255, b /= 255;
            let max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) {
                h = s = 0; 
            } else {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
        }

        function hslToRgb(h, s, l) {
            let r, g, b;
            h /= 360;
            s /= 100;
            l /= 100;
            if (s === 0) {
                r = g = b = l; 
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                let p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }
		function rgbToHsi(r, g, b) {
    // Normalize the RGB values to [0, 1]
    r /= 255;
    g /= 255;
    b /= 255;

    // Intensity calculation
    let I = (r + g + b) / 3;

    // Saturation calculation
    let minVal = Math.min(r, g, b);
    let S = I === 0 ? 0 : 1 - minVal / I;

    // Hue calculation
    let H = 0;
    if (S !== 0) {
        let num = 0.5 * ((r - g) + (r - b));
        let den = Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
        H = Math.acos(num / den); // Hue in radians
        if (b > g) {
            H = 2 * Math.PI - H;
        }
        H = H * (180 / Math.PI); // Convert to degrees
    }

    return [Math.round(H), Math.round(S * 100), Math.round(I * 100)];
}

// Convert HSI to RGB
function hsiToRgb(h, s, i) {
    h = h % 360; // Make sure hue is between 0-360
    s /= 100;
    i /= 100;

    let r, g, b;

    if (h < 120) {
        r = i * (1 + s * Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180)));
        g = i * (1 + s * (1 - Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180))));
        b = i * (1 - s);
    } else if (h < 240) {
        h -= 120;
        g = i * (1 + s * Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180)));
        b = i * (1 + s * (1 - Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180))));
        r = i * (1 - s);
    } else {
        h -= 240;
        b = i * (1 + s * Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180)));
        r = i * (1 + s * (1 - Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180))));
        g = i * (1 - s);
    }

    // Convert normalized values back to [0, 255]
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return [r, g, b];
}
function rgbToHwb(r, g, b) {
    let h = r;
    let s = g;
    let l = b;
    const hsv = rgbToHsv(h, s, l);
    h = hsv[0];
    s = hsv[1];
    l = hsv[2];
    let gs = (100 - s) * l / 100;
    let bs = (100 - l);
    return [h, gs, bs];
}

function hwbToRgb(h, w, bd) {
    let s = w;
    let v = bd;
    s = 100 - (s / (100 - v/1))*100;
    v = 100 - v;
    const r = hsvToRgb(h, s, v)[0];
    const g = hsvToRgb(h, s, v)[1];
    const ba = hsvToRgb(h, s, v)[2];
    return [r, g, ba];
}
function rgbToHcl(r, g, b) {
    let [h, s, v] = rgbToHsv(r, g, b);
    let c = s * v / 10000;
    let l = 1 * Math.abs(v/100 - c / 2);
    return [h, c* 100, l * 100];
}

function hclToRgb(h, c, l) {
    let v = l + c / 2;
    let s = c / v;
    return hsvToRgb(h, s*100 , v );
}


function scrgbToRgb(r, g, b) {
    // Define the conversion matrices
    const mtx = [
    [0.640, 0.330, 0.030],
    [0.300, 0.600, 0.100],
    [0.150, 0.060, 0.790]
];
    const mtxx = [
    [2.363, -0.896, -0.468],
    [-0.512, 1.426, 0.089],
    [0.005, -0.014, 1.009]
];
    
    // Apply the first matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    // Apply the second matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtxx);
    
    return [Math.round(r), Math.round(g), Math.round(b)];
}

function matrixMult(r, g, b, matrix) {
    return [
        matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b,
        matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b,
        matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b
    ];
}
function rgbToScrgb(r, g, b) {
    // Define the conversion matrices
    const mtx = [
        [2.088, -1.1552878, 0.06693],
        [-0.9906, 2.236, -0.2454],
        [-0.3212, 0.0495, 1.2717]
    ];
    const mtxx = [
        [0.490, 0.310, 0.200],
        [0.176, 0.812, 0.010],
        [0.000, 0.010, 0.990]
    ];
    
    // Apply the first matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtxx);
    // Apply the second matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    return [Math.round(r), Math.round(g), Math.round(b)];
}

function rgbToEcirgb(r, g, b) {
    // Define the conversion matrix
    const mtx = [
        [1.8951, -0.5943, -0.2824],
        [-0.9666, 1.9783, -0.0561],
        [0.0768, -0.0768, 1.3072]
    ];
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    // Apply inverse gamma correction
    r = Math.round(Math.pow(r/256, 1.0 / 1.8)*256);
    g = Math.round(Math.pow(g/256, 1.0 / 1.8)*256);
    b = Math.round(Math.pow(b/256, 1.0 / 1.8)*256);
    
    return [r, g, b];
}
function ecirgbToRgb(r, g, b) {
    // Define the conversion matrix
    const mtx = [
    [0.620, 0.192, 0.142],
    [0.302, 0.600, 0.091],
    [-0.019, 0.024, 0.762]
];
    
    // Apply gamma correction
    r = Math.round(Math.pow(r/256, 1.8)*256);
    g = Math.round(Math.pow(g/256, 1.8)*256);
    b = Math.round( Math.pow(b/256, 1.8)*256);
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    return [Math.round(r), Math.round(g), Math.round(b)];
}
function rgbToSrgb(r, g, b) {
    // Convert linear RGB values to gamma-corrected sRGB values
    return [r, g, b].map(val => {
	val=val/256;
        if (val <= 0.0031308) {
            return 12.92 * val;
        }
        return Math.round(256*(1.055 * Math.pow(val, 1 / 2.4) - 0.055));
    });
}
function srgbToRgb(r, g, b) {

    // Convert gamma-corrected sRGB values to linear RGB values
    return [r, g, b].map(val => {
	val=val/256;
        if (val <= 0.04045) {
            return val / 12.92;
        }
        return Math.round( 256*Math.pow((val + 0.055) / 1.055, 2.4));
    });
}


function rgbToXyz(r, g, b) {
    // Define the conversion matrix for XYZ
    const mtx = [
        [0.490, 0.310, 0.200],
        [0.176, 0.812, 0.010],
        [0.000, 0.010, 0.990]
    ];
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    return [r, g, b];
}
function srgbToLinear(c) {
    return (c <= 0.04045) ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function rgbToOklab(r, g, b) {
    // Normalize and linearize
    function srgbToLinear(c) {
    return (c <= 0.04045) ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
    r = srgbToLinear(r / 255);
    g = srgbToLinear(g / 255);
    b = srgbToLinear(b / 255);

    // Convert to LMS
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

    // Nonlinear transform
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);

    // Convert to Oklab
    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

    return [L*255, a*255, b_*255]; // L in [0,1], a and b roughly [-0.4, 0.4]
}


function rgbToYjk(r, g, b) {
    // Calculate YJK values
    const r1 = r;
    const g1 = g;
    const b1 = b;
    
    r = b1 / 2 + r1 / 4 + g1 / 8;
    g = r1 - r;
    b = g1 - r;
    
    return [r, g, b];
}




function lchToRgb(L, C, Hdeg) {
    const H = Hdeg * Math.PI / 180; // degrees to radians
    const a = C * Math.cos(H);
    const bb = C * Math.sin(H);  // renamed from b to bb to avoid conflict

const Xn = 0.95047;
const Yn = 1.0;
const Zn = 1.08883;
    const fy = (L + 16) / 116;
    const fx = fy + a / 500;
    const fz = fy - bb / 200;

    const X = Xn * cielabfm(fx);
    const Y = Yn * cielabfm(fy);
    const Z = Zn * cielabfm(fz);

    // XYZ to RGB matrix (sRGB D65)
    const mtx = [
        [ 3.2406, -1.5372, -0.4986],
        [-0.9689,  1.8758,  0.0415],
        [ 0.0557, -0.2040,  1.0570]
    ];

    // Convert XYZ to RGB
let [r, g, b] = matrixMult(X, Y, Z, mtx);

    return [r*255, g*255, b*255];
}

// Convert from RGB to LCH via XYZ and LAB
function rgbToLch(r, g, b) {
   const Xn = 0.95047;
const Yn = 1.0;
const Zn = 1.08883;
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];

let [X, Y, Z] = matrixMult(r/255, g/255, b/255, mtx);

    // Convert XYZ to LAB
    const fx = cielabf(X / Xn);
    const fy = cielabf(Y / Yn);
    const fz = cielabf(Z / Zn);

    const L = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const bb = 200 * (fy - fz);  // renamed from b_ to bb

    const C = Math.sqrt(a * a + bb * bb);
    let H = Math.atan2(bb, a) * 180 / Math.PI;
    if (H < 0) H += 360;

    return [L, C, H];
}




function rgbToUvw(r, g, b) {
    // Define the conversion matrix for UVW
    const mtx = [
        [0.490, 0.310, 0.200],
        [0.176, 0.812, 0.010],
        [0.000, 0.010, 0.990]
    ];
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    // Convert to UVW
    const r1 = r;
    const g1 = g;
    const b1 = b;
    r = r * 2.0 / 3.0;
    b = (-r1 + 3.0 * b1 + g1) / 2.0;
    
    return [r, g, b];
}
function lmsToRgb(l, m, s) {
    // Define the conversion matrices for Lms to RGB
    const mtx = [
        [2.364, -0.896, -0.468],
        [-0.515, 1.426, 0.088],
        [0.005, -0.014, 1.009]
    ];
    const mtx2 = [
        [1.947, -1.14, 0.364],
        [0.689, 0.348, 0.000],
        [0.000, 0.000, 1.934]
    ];
    
    // Apply first matrix multiplication
    [l, m, s] = matrixMult(l, m, s, mtx2);
    
    // Apply second matrix multiplication
    [l, m, s] = matrixMult(l, m, s, mtx);
    
    // Return RGB values in the range [0, 255]
    return [l, m , s ];
}
function rgbToLms(r, g, b) {
    // Define the conversion matrices for Lms
    const mtx1 = [
        [0.490, 0.310, 0.200],
        [0.176, 0.812, 0.010],
        [0.000, 0.010, 0.990]
    ];
    const mtx2 = [
    [0.238, 0.779, -0.045],
    [-0.471, 1.331, 0.089],
    [0.000, 0.000, 0.517]
];
    
    // Apply first matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx1);
    
    // Apply second matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx2);
    
    return [r, g, b];
}

function matrixMult(r, g, b, matrix) {
    return [
        matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b,
        matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b,
        matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b
    ];
}

function rgbToYdbdr(r, g, b) {
    // Define the conversion matrix for YDbDr
    const mtx = [
    [0.669, 0.278, 0.054],
    [-1.007, -0.418, 1.425],
    [-0.630, 0.528, 0.103]
];
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    return [r, g, b];
}

function rgbToYiq(r, g, b) {
    // Define the conversion matrix for YIQ
    const mtx = [
        [0.299, 0.587, 0.114],
        [0.595, -0.274, -0.3213],
        [0.2115, -0.522, 0.3112]
    ];
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    return [r, g, b];
}

function rgbToYcocg(r, g, b) {
    // Define the conversion matrix for YCoCg
    const mtx = [
        [0.25, 0.5, 0.25],
        [0.5, 0, -0.5],
        [-0.25, 0.5, -0.25]
    ];
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    return [r, g, b];
}


function rgbToYcocgr(r, g, b) {
    // Define the conversion matrix for YCoCgR
    const mtx = [
        [0.25, 0.5, 0.25],
        [1, 0, -1],
        [-0.5, 1, -0.5]
    ];
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    return [r, g, b];
}


function rgbToYuv(r, g, b) {
    // Define the conversion matrix for YUV
    const mtx = [
        [0.299, 0.587, 0.114],
        [-0.137, -0.288, 0.436],
        [0.615, -0.514, -0.100]
    ];
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    return [r, g, b];
}

// YPbPr → RGB (BT.601)
function rgbToYpbpr(r, g, b) {
    const mtx = [
    [0.213, 0.715, 0.072],
    [-0.115, -0.385, 0.500],
    [0.500, -0.454, -0.046]
];
    return matrixMult(r, g, b, mtx);
}

// BT . 709
function rgbToBt(r, g, b) {
    const mtx = [
    [0.213, 0.715, 0.072],
    [-0.115, -0.385, 0.500],
    [0.500, -0.454, -0.046]
];
    return matrixMult(r, g, b, mtx);
}

function rgbToBt2020(r, g, b) {
    const mtx = [
    [0.262, 0.678, 0.059],
    [-0.140, -0.360, 0.500],
    [0.500, -0.460, -0.040]
];
    return matrixMult(r, g, b, mtx);
}
function rgbToBt470(r, g, b) {
    const mtx = [
    [0.299, 0.587, 0.114],
    [-0.169, -0.331, 0.500],
    [0.500, -0.419, -0.081]
];
    return matrixMult(r, g, b, mtx);
}
function rgbToSmpte240m(r, g, b) {
    const mtx = [
    [0.213, 0.715, 0.072],
    [-0.115, -0.385, 0.500],
    [0.500, -0.454, -0.046]
];
    return matrixMult(r, g, b, mtx);
}
function rgbToJpegycbcr(r, g, b) {
    const mtx = [
    [0.299, 0.587, 0.114],
    [-0.169, -0.331, 0.500],
    [0.500, -0.419, -0.081]
];
    return matrixMult(r, g, b, mtx);
}
function rgbToBt4706(r, g, b) {
    const mtx = [
    [0.212, 0.722, 0.066],
    [-0.135, -0.458, 0.593],
    [0.530, -0.486, -0.044]
];
    return matrixMult(r, g, b, mtx);
}
function rgbToItut871(r, g, b) {
    const mtx = [
    [0.299, 0.587, 0.114],
    [-0.169, -0.331, 0.500],
    [0.500, -0.419, -0.081]
];
    return matrixMult(r, g, b, mtx);
}
function rgbToYcbcrturbo(r, g, b) {
    const mtx = [
    [0.213, 0.715, 0.072],
    [-0.115, -0.385, 0.500],
    [0.500, -0.454, -0.046]
];
    return matrixMult(r, g, b, mtx);
}




function rgbToLuv(r, g, b) {
     // Normalize to 0-1
    r /= 255; g /= 255; b /= 255;

    // Convert sRGB to linear RGB
    const lin = v => (v <= 0.04045) ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    r = lin(r); g = lin(g); b = lin(b);

    // RGB to XYZ (D65)
    const X = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const Y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const Z = r * 0.0193 + g * 0.1192 + b * 0.9505;

    const refX = 0.95047, refY = 1.00000, refZ = 1.08883; // D65 white
    const denom = X + 15 * Y + 3 * Z;
    const uPrime = (4 * X) / denom;
    const vPrime = (9 * Y) / denom;

    const denomRef = refX + 15 * refY + 3 * refZ;
    const uRef = (4 * refX) / denomRef;
    const vRef = (9 * refY) / denomRef;

    // L*
    let L = (Y / refY > 0.008856)
        ? (116 * Math.cbrt(Y / refY) - 16)
        : (903.3 * (Y / refY));

    // u*, v*
    const u = 13 * L * (uPrime - uRef);
    const v = 13 * L * (vPrime - vRef);

    return [L, u, v];
}








function ycbcrToRgb(y, cb, cr) {
    // Define the conversion matrix for YCbCr to RGB
    const mtx = [
        [1, 0, 1.402],
        [1, -0.344, -0.714],
        [1, 1.772, 0]
    ];
    
    // Convert YCbCr to normalized RGB values
    let r1 = (y - 16) / 219.0;
    let g1 = (cb - 128) / 224.0;
    let b1 = (cr - 128) / 224.0;
    
    // Apply matrix multiplication
    [r1, g1, b1] = matrixMult(r1, g1, b1, mtx);
    
    // Scale back to [0, 255] and return RGB values
    return [r1*256 , g1*256 , b1*256 ];
}
function rgbToYcbcr(r, g, b) {
    // Normalize RGB to [0, 1]
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;

    // Apply the YCbCr conversion matrix (BT.601)
    const y  =  16   + (65.738 * r + 129.057 * g + 25.064 * b);
    const cb = 128   + (-37.945 * r - 74.494  * g + 112.439 * b);
    const cr = 128   + (112.439 * r - 94.154  * g - 18.285  * b);

    // Clamp and return
    return [
        Math.min(Math.max(y, 16), 235),
        Math.min(Math.max(cb, 16), 240),
        Math.min(Math.max(cr, 16), 240)
    ];
}

function xyzToRgb(x, y, z) {
    // Define the conversion matrix for XYZ to RGB
    const mtx = [
        [2.364, -0.896, -0.468],
        [-0.515, 1.426, 0.088],
        [0.005, -0.014, 1.009]
    ];
    
    // Apply matrix multiplication
    [x, y, z] = matrixMult(x, y, z, mtx);
    
    // Return RGB values in the range [0, 255]
    return [x , y , z];
}
function labToXyz(L, a, b, Xn=95.047, Yn=100.000, Zn=108.883) {
    const fy = (L + 16) / 116;
    const fx = a / 500 + fy;
    const fz = fy - b / 200;

    const X = Xn * cielabfm(fx);
    const Y = Yn * cielabfm(fy);
    const Z = Zn * cielabfm(fz);

    return [X, Y, Z];
}

function xyzToLab(X, Y, Z, Xn=95.047, Yn=100.000, Zn=108.883) {
    // Xn, Yn, Zn are reference white points (D65 default in %)
    const fx = cielabf(X / Xn);
    const fy = cielabf(Y / Yn);
    const fz = cielabf(Z / Zn);

    const L = (116 * fy) - 16;
    const a = 500 * (fx - fy);
    const b = 200 * (fy - fz);

    return [L, a, b];
}
function oklabToRgb(L, a, b) {
    
    // Convert to LMS cube roots
    function linearToSrgb(c) {
    return (c <= 0.0031308) ? c * 12.92 : 1.055 * Math.pow(c, 1/2.4) - 0.055;
}
    const l_ = L/255 + 0.3963377774 * a/255 + 0.2158037573 * b/255;
    const m_ = L/255 - 0.1055613458 * a/255 - 0.0638541728 * b/255;
    const s_ = L/255 - 0.0894841775 * a/255 - 1.2914855480 * b/255;

    // Cube
    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    // Convert to linear RGB
    let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let b_ = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

    // Convert to sRGB and clamp
    r = Math.min(Math.max(0, linearToSrgb(r)), 1);
    g = Math.min(Math.max(0, linearToSrgb(g)), 1);
    b_ = Math.min(Math.max(0, linearToSrgb(b_)), 1);

    return [r * 255, g * 255, b_ * 255];
}


function yjkToRgb(r, g, b) {
    // Convert YJK to RGB
    const r1 = r;
    const g1 = g;
    const b1 = b;

    r = r1 + g1;
    g = r1 + b1;
    b = (5.0 / 4.0) * r1 - g1 / 2 - b1 / 4;

    return [r, g, b];
}

function rgbToLab(r, g, b) {
return xyzToLab(...rgbToXyz(r,g,b));
}
function labToRgb(l, a, b) {
return xyzToRgb(...labToXyz(l,a,b));
}

function uvwToRgb(u, v, w) {
    // Define the conversion matrix for UVW to RGB
    const mtx = [
    [2.363, -0.896, -0.468],
    [-0.512, 1.426, 0.089],
    [0.005, -0.014, 1.009]
];
    
    // Apply inverse transformation for UVW to RGB
    const r1 = u * 1.5;
    const g1 = v;
    const b1 = (2 * w + 1.5 * u - v)/3;
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r1, g1, b1, mtx);
    
    // Return RGB values in the range [0, 255]
    return [r , g , b];
}


function ydbdrToRgb(y, db, dr) {
    // Define the conversion matrix for YDbDr to RGB
    const mtx = [
        [1, 0, -0.5259],
        [1, -0.129, 1.267],
        [1, 0.664, 0]
    ];
    
    // Apply matrix multiplication
    [y, db, dr] = matrixMult(y, db, dr, mtx);
    
    // Return RGB values in the range [0, 255]
    return [y , db , dr ];
}

function yiqToRgb(y, i, q) {
    // Define the conversion matrix for YIQ to RGB
    const mtx = [
        [1, 0.956, 0.619],
        [1, -0.272, -0.647],
        [1, -1.106, 1.703]
    ];
    
    // Apply matrix multiplication
    [y, i, q] = matrixMult(y, i, q, mtx);
    
    // Return RGB values in the range [0, 255]
    return [y , i , q ];
}

function ycocgToRgb(y, co, cg) {
    // Define the conversion matrix for YCoCg to RGB
    const mtx = [
        [1, 1, -1],
        [1, 0, 1],
        [1, -1, -1]
    ];
    
    // Apply matrix multiplication
    [y, co, cg] = matrixMult(y, co, cg, mtx);
    
    // Return RGB values in the range [0, 255]
    return [y , co , cg ];
}

function ycocgrToRgb(y, co, cg) {
    // Define the conversion matrix for YCoCgR to RGB
    const mtx = [
        [1, 0.5, -0.5],
        [1, 0, 0.5],
        [1, -0.5, -0.5]
    ];
    
    // Apply matrix multiplication
    [y, co, cg] = matrixMult(y, co, cg, mtx);
    
    // Return RGB values in the range [0, 255]
    return [y , co, cg ];
}

function yuvToRgb(y, u, v) {
    // Define the conversion matrix for YUV to RGB
    const mtx = [
        [1, 0, 1.139],
        [1, -0.394, -0.58],
        [1, 2.032, 0]
    ];
    
    // Apply matrix multiplication
    [y, u, v] = matrixMult(y, u, v, mtx);
    
    // Return RGB values in the range [0, 255]
    return [y , u , v];
}

// YPbPr → RGB (BT.601)
function ypbprToRgb(y, pb, pr) {
    const mtx = [
        [1, 0, 1.5748],        // R
        [1, -0.187324, -0.468124], // G
        [1, 1.8556, 0]         // B
    ];
return matrixMult(y, pb, pr, mtx);
}

// BT . 709
function btToRgb(r, g, b) {
    const mtx = [
        [1, 0, 1.5748],         // R
        [1, -0.1873, -0.4681],  // G
        [1, 1.8556, 0]          // B
    ];
    return matrixMult(r, g, b, mtx);
}

function bt2020ToRgb(r, g, b) {
    const mtx = [
            [1, 0, 1.4746],
            [1, -0.164553, -0.571353],
            [1, 1.8814, 0]
        ];
    return matrixMult(r, g, b, mtx);
}
function bt470ToRgb(r, g, b) {
    const mtx = [
    [1, 0, 1.402],
    [1, -0.344136, -0.714136],
    [1, 1.772, 0]
  ];
    return matrixMult(r, g, b, mtx);
}
function smpte240mToRgb(r, g, b) {
    const mtx = [
        [1, 0, 1.5748],
        [1, -0.1873, -0.4681],
        [1, 1.8556, 0]
    ];
    return matrixMult(r, g, b, mtx);
}
function jpegycbcrToRgb(r, g, b) {
    const mtx = [
        [1, 0, 1.402],
        [1, -0.344136, -0.714136],
        [1, 1.772, 0]
    ];
    return matrixMult(r, g, b, mtx);
}
function bt4706ToRgb(r, g, b) {
    const mtx = [
        [1, 0, 1.486],
        [1, -0.14382, -0.4356],
        [1, 1.5748, 0]
    ];
    return matrixMult(r, g, b, mtx);
}
function itut871ToRgb(r, g, b) {
    const mtx = [
        [1, 0, 1.402],
        [1, -0.344136, -0.714136],
        [1, 1.772, 0]
    ];
    return matrixMult(r, g, b, mtx);
}
function ycbcrturboToRgb(r, g, b) {
    const mtx = [
        [1, 0, 1.5748],
        [1, -0.1873, -0.4681],
        [1, 1.8556, 0]
    ];
    return matrixMult(r, g, b, mtx);
}function rgbToTsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;

    const sum = r + g + b;
    if (sum === 0) return [0, 0, 0]; // black case

    const rs = r / sum;
    const gs = g / sum;
    const rsp = rs - 1 / 3;
    const gsp = gs - 1 / 3;

    // Hue T in degrees [0..360)
    let T = Math.atan2(gsp, rsp) * (180 / Math.PI);
    if (T < 0) T += 360;

    // Saturation S (scaled to [0..255])
    const S = Math.sqrt((9 / 5) * (rsp * rsp + gsp * gsp)) * 255;

    // Luminance (scaled to [0..255])
    const L = (0.299 * r + 0.587 * g + 0.114 * b) * 255;

    return [T, S, L];
}

function tslToRgb(T, S, L) {
    // Normalize inputs
    const angle = (T % 360) * (Math.PI / 180);
    const sNorm = (S / 255);
    const lNorm = (L / 255);

    const rsp = (Math.sqrt(5) / 3) * sNorm * Math.cos(angle);
    const gsp = (Math.sqrt(5) / 3) * sNorm * Math.sin(angle);

    const rs = rsp + 1 / 3;
    const gs = gsp + 1 / 3;
    const bs = 1 - rs - gs;

    const k = lNorm / (0.299 * rs + 0.587 * gs + 0.114 * bs);

    const R = Math.min(Math.max(k * rs * 255, 0), 255);
    const G = Math.min(Math.max(k * gs * 255, 0), 255);
    const B = Math.min(Math.max(k * bs * 255, 0), 255);

    return [R, G, B];
}
function luvToRgb(L, u, v) {
    if (L === 0) return [0, 0, 0];

    const refX = 0.95047, refY = 1.00000, refZ = 1.08883;

    const denomRef = refX + 15 * refY + 3 * refZ;
    const uRef = (4 * refX) / denomRef;
    const vRef = (9 * refY) / denomRef;

    const uPrime = u / (13 * L) + uRef;
    const vPrime = v / (13 * L) + vRef;

    const Y = (L > 8) ? Math.pow((L + 16) / 116, 3) : L / 903.3;
    const X = -(9 * Y * uPrime) / ((uPrime - 4) * vPrime - uPrime * vPrime);
    const Z = (9 * Y - (15 * vPrime * Y) - (vPrime * X)) / (3 * vPrime);

    // XYZ → linear RGB
    let r = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
    let g = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
    let b = X * 0.0557 + Y * -0.2040 + Z * 1.0570;

    // Linear to sRGB
    const comp = v => (v <= 0.0031308) ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;

    r = Math.min(Math.max(comp(r), 0), 1);
    g = Math.min(Math.max(comp(g), 0), 1);
    b = Math.min(Math.max(comp(b), 0), 1);

    return [r * 255, g * 255, b * 255];
}







function rgbToHsm(r, g, b) {
    // 1. Get h, s from standard HSV
    let [h, s, v] = rgbToHsv(r, g, b); // h in [0,360], s in [0,100], v in [0,100]

    // 2. Binary search for m
    let low = 0, high = 100;
    let bestM = 0;
    let bestDiff = Infinity;

    for (let i = 0; i < 30; i++) {
        let mid = (low + high) / 2;
        let [r2, g2, b2] = hsmToRgb(h, s, mid);
        
        // Compute difference
        let diff = Math.abs(r - r2) + Math.abs(g - g2) + Math.abs(b - b2);
        if (diff < bestDiff) {
            bestDiff = diff;
            bestM = mid;
        }

        // Decide direction based on brightness
        let avgOrig = (r + g + b) / 3;
        let avgGuess = (r2 + g2 + b2) / 3;
        if (avgGuess < avgOrig) low = mid;
        else high = mid;
    }

    return [h, s, bestM]; // h in [0,360], s and m in [0,100]
}
function hsmToRgb(h, s, m) {
    h = h % 360; // Ensure hue is within 0-360
    s /= 100;    // Scale saturation to [0, 1]
    m /= 100;    // Scale lightnessValue to [0, 1]

    // Calculate intermediate values based on hue and saturation
    let r, g, b;

    if (h < 120) {
        r = m * (1 + s * Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180)));
        g = m * (1 + s * (1 - Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180))));
        b = m * (1 - s);
    } else if (h < 240) {
        h -= 120;
        g = m * (1 + s * Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180)));
        b = m * (1 + s * (1 - Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180))));
        r = m * (1 - s);
    } else {
        h -= 240;
        b = m * (1 + s * Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180)));
        r = m * (1 + s * (1 - Math.cos(h * (Math.PI / 180)) / Math.cos((60 - h) * (Math.PI / 180))));
        g = m * (1 - s);
    }

    // Convert normalized values back to [0, 255]
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return [r, g, b];
}



// HSH to RGB: Converts HSH to RGB
function hshToRgb(h, s, hValue2) {
    h /= 360.0; // Normalize hue to [0, 1]
    s /= 100.0; // Normalize saturation to [0, 1]
let hValue=hValue2/100;
    // Harmonic mean in reverse
    let r, g, b;

    // If there's no saturation, it's a shade of gray
    if (s === 0) {
        r = g = b = hValue; // Set RGB to the harmonic mean (HSH component)
    } else {
        // Find the intermediate RGB values
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1.0;
            if (t > 1) t -= 1.0;
            if (t < 1 / 6) return p + (q - p) * 6.0 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3.0 - t) * 6.0;
            return p;
        };

        const q = hValue < 0.5 ? hValue * (1 + s) : hValue + s - hValue * s;
        const p = 2 * hValue - q;

        r = hue2rgb(p, q, h + 1 / 3.0);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3.0);

        // Reverse harmonic mean calculation
        const invR = 1 / r;
        const invG = 1 / g;
        const invB = 1 / b;

        r = hValue / invR;
        g = hValue / invG;
        b = hValue / invB;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
// HSG to RGB: Converts HSG to RGB
function hsgToRgb(h, s, g) {
    h /= 360; // Normalize hue to [0, 1]
    s /= 100; // Normalize saturation to [0, 1]
    g /= 100; // Normalize G to [0, 1]

    let r, b, g_;
    
    // If there's no saturation, it's a shade of gray
    if (s === 0) {
        r = g_ = b = g * g; // Square the G value to undo the sqrt from rgbToHsg
    } else {
        // Find the intermediate RGB values
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = g < 0.5 ? g * (1 + s) : g + s - g * s;
        const p = 2 * g - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g_ = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);

        // Square the RGB components to reverse the sqrt from rgbToHsg
        r = r * r;
        g_ = g_ * g_;
        b = b * b;
    }

    return [Math.round(r * 255), Math.round(g_ * 255), Math.round(b * 255)];
}
function rgbToHsg(r, g, b) {
    let [h, s, v] = rgbToHsv(r, g, b);
    let low = 0, high = 100;
    let bestX = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < 30; i++) {
        let mid = (low + high) / 2;
        let [r2, g2, b2] = hsgToRgb(h, s, mid);
        let diff = Math.abs(r - r2) + Math.abs(g - g2) + Math.abs(b - b2);
        if (diff < bestDiff) {
            bestDiff = diff;
            bestX = mid;
        }
        let avgOrig = (r + g + b) / 3;
        let avgGuess = (r2 + g2 + b2) / 3;
        if (avgGuess < avgOrig) low = mid;
        else high = mid;
    }
    return [h, s, bestX];
}

function rgbToHsh(r, g, b) {
    let [h, s, v] = rgbToHsv(r, g, b);
    let low = 0, high = 100;
    let bestX = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < 30; i++) {
        let mid = (low + high) / 2;
        let [r2, g2, b2] = hshToRgb(h, s, mid);
        let diff = Math.abs(r - r2) + Math.abs(g - g2) + Math.abs(b - b2);
        if (diff < bestDiff) {
            bestDiff = diff;
            bestX = mid;
        }
        let avgOrig = (r + g + b) / 3;
        let avgGuess = (r2 + g2 + b2) / 3;
        if (avgGuess < avgOrig) low = mid;
        else high = mid;
    }
    return [h, s, bestX];
}

function rgbToYpo (rr, gg, bb) {
    const r=rr/255;const g=gg/255;const b=bb/255;
    let psi = 0.6521 * r*g*b - 0.7357 * r*g - 0.7213 * r*b - 0.6716 * g*b + 0.7483 * r + 0.7500 * g + 0.7247 * b;
    let y = psi * psi * 1.5501;                                    // 0 <= y <= 1

    let v_r = (r - y + 1)      * 0.7764;
    let v_g = (g - y + 0.8759) * 0.8606;
    let v_b = (b - y + 0.9014) * 0.8275;

    let p = -2.0129 * v_r - 1.9366 * v_g + 1.1076 * v_b + 2.5071; // -1.6018 <= p <= 3.6147
    let o = 0.7162  * v_r + 2.4964 * v_g - 1.6594;                // -1.6594 <= o <= 1.5532

    return [y*100, p*100, o*100];
}

function ypoToRgb(yy, pp, oo, maxIterations = 10, tolerance = 1e-6) {
     const y=yy/100;const p=pp/100;const o=oo/100;
    let r = y, g = y, b = y; // Initial guess: Assume RGB starts at Y

    for (let i = 0; i < maxIterations; i++) {
        let psi = 0.6521 * r * g * b - 0.7357 * r * g - 0.7213 * r * b - 0.6716 * g * b + 0.7483 * r + 0.7500 * g + 0.7247 * b;
        let y_est = psi * psi * 1.5501;

        let v_r = (r - y_est + 1) * 0.7764;
        let v_g = (g - y_est + 0.8759) * 0.8606;
        let v_b = (b - y_est + 0.9014) * 0.8275;

        let p_est = -2.0129 * v_r - 1.9366 * v_g + 1.1076 * v_b + 2.5071;
        let o_est = 0.7162 * v_r + 2.4964 * v_g - 1.6594;

        // Compute errors
        let err_y = y_est - y;
        let err_p = p_est - p;
        let err_o = o_est - o;

        // Check convergence
        if (Math.abs(err_y) < tolerance && Math.abs(err_p) < tolerance && Math.abs(err_o) < tolerance) {
            break;
        }

        // Jacobian matrix (partial derivatives)
        let J = [
            [1.5501 * 2 * psi * (0.6521 * g * b - 0.7357 * g - 0.7213 * b + 0.7483), 
             1.5501 * 2 * psi * (0.6521 * r * b - 0.7357 * r - 0.6716 * b + 0.7500), 
             1.5501 * 2 * psi * (0.6521 * r * g - 0.7213 * r - 0.6716 * g + 0.7247)],
            
            [-2.0129 * 0.7764, -1.9366 * 0.8606, 1.1076 * 0.8275],
            
            [0.7162 * 0.7764, 2.4964 * 0.8606, 0]
        ];

        // Solve linear system J * Δ = -Error using a simple inverse approximation
        let detJ = J[0][0] * (J[1][1] * J[2][2] - J[1][2] * J[2][1]) -
                   J[0][1] * (J[1][0] * J[2][2] - J[1][2] * J[2][0]) +
                   J[0][2] * (J[1][0] * J[2][1] - J[1][1] * J[2][0]);

        if (Math.abs(detJ) < 1e-9) break; // Avoid division by near-zero determinant

        let J_inv = [
            [(J[1][1] * J[2][2] - J[1][2] * J[2][1]) / detJ,
             (J[0][2] * J[2][1] - J[0][1] * J[2][2]) / detJ,
             (J[0][1] * J[1][2] - J[0][2] * J[1][1]) / detJ],

            [(J[1][2] * J[2][0] - J[1][0] * J[2][2]) / detJ,
             (J[0][0] * J[2][2] - J[0][2] * J[2][0]) / detJ,
             (J[0][2] * J[1][0] - J[0][0] * J[1][2]) / detJ],

            [(J[1][0] * J[2][1] - J[1][1] * J[2][0]) / detJ,
             (J[0][1] * J[2][0] - J[0][0] * J[2][1]) / detJ,
             (J[0][0] * J[1][1] - J[0][1] * J[1][0]) / detJ]
        ];

        let delta_r = -(J_inv[0][0] * err_y + J_inv[0][1] * err_p + J_inv[0][2] * err_o);
        let delta_g = -(J_inv[1][0] * err_y + J_inv[1][1] * err_p + J_inv[1][2] * err_o);
        let delta_b = -(J_inv[2][0] * err_y + J_inv[2][1] * err_p + J_inv[2][2] * err_o);

        // Update estimates
        r += delta_r;
        g += delta_g;
        b += delta_b;

        // Clamp to valid range
        r = Math.max(0, Math.min(1, r));
        g = Math.max(0, Math.min(1, g));
        b = Math.max(0, Math.min(1, b));
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


function yrlToRgb(y, r, l) {
  function fade(a, b, i) {
    return i < 0 ? a : i > 1 ? b : a + (b - a) * i;
  }

  function R(r) {
    return [
      fade(0, 256, r / 255),
      fade(0, 256, -r / 255),
      fade(0, 256, -r / 255)
    ];
  }

  function L(l) {
    return [
      fade(0, 128, Math.abs(l) / 255),
      fade(0, 256, l / 255),
      fade(0, 256, -l / 255)
    ];
  }

  const combined = R(r).map((val, i) => val + L(l)[i]);
  return combined.map(val => fade(val, 256, y / 510 + 0.5)); // y ∈ [-255,255]
}

function rgbToYrl(Rin, Gin, Bin) {
  function yrlToRgb(y, r, l) {
    function fade(a, b, i) {
      return i < 0 ? a : i > 1 ? b : a + (b - a) * i;
    }

    function R(r) {
      return [
        fade(0, 256, r / 255),
        fade(0, 256, -r / 255),
        fade(0, 256, -r / 255)
      ];
    }

    function L(l) {
      return [
        fade(0, 128, Math.abs(l) / 255),
        fade(0, 256, l / 255),
        fade(0, 256, -l / 255)
      ];
    }

    const combined = R(r).map((val, i) => val + L(l)[i]);
    return combined.map(val => fade(val, 256, y / 510 + 0.5));
  }

  let best = { error: Infinity, y: 0, r: 0, l: 0 };

  for (let y = -255; y <= 255; y += 32) {
    for (let r = -255; r <= 255; r += 32) {
      for (let l = -255; l <= 255; l += 32) {
        const [rOut, gOut, bOut] = yrlToRgb(y, r, l);
        const error = Math.pow(rOut - Rin, 2) + Math.pow(gOut - Gin, 2) + Math.pow(bOut - Bin, 2);
        if (error < best.error) {
          best = { error, y, r, l };
        }
      }
    }
  }

  return [  best.y,  best.r,  best.l ];
}











function labToLch(L, a, b) {
    const C = Math.sqrt(a * a + b * b);
    const H = Math.atan2(b, a) * (180 / Math.PI); // in degrees
    return [L, C, H < 0 ? H + 360 : H]; // Normalize H to [0, 360]
}
function labToLms(L, a, b) {
    // Reference white D65
    const refY = 100;

    // Calculate Y from L
    const Y = (L + 16) / 116 * refY;
    const X = a / 500 + Y;
    const Z = Y - b / 200;

    // Inverse transformation to get RGB values
    const fx = (t) => (t > 0.206897) ? t * t * t : (t - 16 / 116) / 7.787;

    const X_ref = 95.047;
    const Y_ref = 100.000;
    const Z_ref = 108.883;

    const l = fx(X) * X_ref;
    const m = fx(Y) * Y_ref;
    const s = fx(Z) * Z_ref;

    return [l, m, s];
}
function dLmsDwavelength(wavelength) {
    const epsilon = 1e-6; // Small change for numerical derivative
    const [L1, M1, S1] = wavelengthToLms(wavelength);
    const [L2, M2, S2] = wavelengthToLms(wavelength + epsilon);

    return [
        (L2 - L1) / epsilon,
        (M2 - M1) / epsilon,
        (S2 - S1) / epsilon,
    ]; // Return derivatives as an array
}

// Newton's Method to find wavelength for given LMS values
function lmsToWavelength(L, M, S, initialGuess = 500, tolerance = 1e-6, maxIterations = 100) {
    let wavelength = initialGuess;
    let iteration = 0;

    while (iteration < maxIterations) {
        const [currentL, currentM, currentS] = wavelengthToLms(wavelength);
        const [dL, dM, dS] = dLmsDwavelength(wavelength);

        // Calculate the error
        const errorL = L - currentL;
        const errorM = M - currentM;
        const errorS = S - currentS;

        // If the error is within the tolerance, we have found our wavelength
        if (Math.abs(errorL) < tolerance && Math.abs(errorM) < tolerance && Math.abs(errorS) < tolerance) {
            return wavelength;
        }

        // Update the wavelength using Newton's method
        wavelength += (errorL / dL + errorM / dM + errorS / dS) / 3; // Average adjustment
        iteration++;
    }

    return wavelength; // Return the estimated wavelength
}

function wavelengthToLms(wavelength) {
    let L, M, S;

    if (wavelength >= 380 && wavelength <= 780) {
        L = 0.400 * Math.exp(-0.5 * Math.pow((wavelength - 605) / 50, 2));
        M = 0.700 * Math.exp(-0.5 * Math.pow((wavelength - 535) / 50, 2));
        S = 1.000 * Math.exp(-0.5 * Math.pow((wavelength - 445) / 50, 2));
    } else {
        L = M = S = 0; // Out of range
    }

    return [L, M, S]; // Return LMS as an array
}
// Function to convert RGB to LCW
function rgbToLcw(r, g, b) {
    const [L, a, b_lab] = rgbToLab(r, g, b);
    const [L_chroma, C, H] = labToLch(L, a, b_lab);
    const [L_lms, M_lms, S_lms] = rgbToLms(r, g, b);

    // Wavelength calculation using Lms
    const W = lmsToWavelength(L_lms, M_lms, S_lms);
    return [L_chroma, C, W];
}
function lmsToLab(L, M, S) {
    // Apply inverse transformation
    const X = L * 0.4002 + M * 0.7075 + S * -0.0808; // Linear transformation to XYZ
    const Y = L * -0.2263 + M * 1.1653 + S * 0.0457;
    const Z = L * 0.0000 + M * 0.0000 + S * 0.8252;

    const refX = 95.047;
    const refY = 100.000;
    const refZ = 108.883;

    // Normalize values
    const x = X / refX;
    const y = Y / refY;
    const z = Z / refZ;

    // Convert to CIELAB
    const f = (t) => (t > 0.008856) ? Math.cbrt(t) : (t * 7.787 + 16 / 116);
    
    const L2 = Math.max(0, Math.min(100, 116 * f(y) - 16));
    const a = 500 * (f(x) - f(y));
    const b_lab = 200 * (f(y) - f(z));

    return [L2, a, b_lab];
}
function lmsToLch(L, M, S) {
    // Convert LMS to CIELAB
    const [L_lab, a, b_lab] = lmsToLab(L, M, S);

    // Convert CIELAB to LCH
    const C = Math.sqrt(a ** 2 + b_lab ** 2); // Calculate Chroma
    const H = Math.atan2(b_lab, a) * (180 / Math.PI); // Calculate Hue in degrees

    return [L_lab, C, H < 0 ? H + 360 : H]; // Ensure Hue is positive
}
function lcwToRgb(L, C, W) {
    // Step 1: Convert wavelength to LMS
    const [L_lms, M_lms, S_lms] = wavelengthToLms(W);

    // Step 2: Scale LMS values based on Luma
    const scale = L / Math.sqrt(L_lms ** 2 + M_lms ** 2 + S_lms ** 2);
    const scaledLMS = [L_lms * scale, M_lms * scale, S_lms * scale];

    // Step 3: Convert LMS to LCH
    const [L_lab, newC, newH] = lmsToLch(scaledLMS[0], scaledLMS[1], scaledLMS[2]);

    return lchToRgb(L,C,newH);
}

function temperatureToWavelength(temperature) {
    const b = 2898e-6; // Wien's displacement constant in meters*K
    return b / temperature * 1e9; // Convert to nanometers
}
function wavelengthToTemperature(wavelength) {
    const b = 2898e-6; // Wien's displacement constant in meters*K
    return b / (wavelength * 1e-9); // Convert nm to meters
}
function lctToRgb(L, C, T) {
    // Calculate the wavelength from temperature
    const W = temperatureToWavelength(T);
    return lcwToRgb(L,C,W);
    // Convert wavelength to Lms
    const [L_lms, M_lms, S_lms] = wavelengthToLms(W);
    
    // Adjust Lms values based on chroma
    // Calculate a scaling factor based on C (Chroma)
    const scale = C / Math.sqrt(L_lms ** 2 + M_lms ** 2 + S_lms ** 2);
    const adjustedL = L_lms * scale;
    const adjustedM = M_lms * scale;
    const adjustedS = S_lms * scale;


    // Convert adjusted Lms back to RGB
    return lmsToRgb(adjustedL, adjustedM, adjustedS);
}
function lchToLms(l,c,h){
    return rgbToLms(lchToRgb(l,c,h));
}
/*function rgbToLcw(r, g, b) {
    const [L, a, b_lab] = rgbToLab(r, g, b);
    const [L_chroma, C, H] = labToLch(L, a, b_lab);
    const [L_lms, M_lms, S_lms] = rgbToLms(r, g, b);

    // Wavelength calculation using Lms
    const W = lmsToWavelength(L_lms, M_lms, S_lms);
    return [L_chroma, C, W];
    
    function lcwToRgb(L, C, W) {
    // Step 1: Convert wavelength to LMS
    const [L_lms, M_lms, S_lms] = wavelengthToLms(W);

    // Step 2: Scale LMS values based on Luma
    const scale = L / Math.sqrt(L_lms ** 2 + M_lms ** 2 + S_lms ** 2);
    const scaledLMS = [L_lms * scale, M_lms * scale, S_lms * scale];

    // Step 3: Convert LMS to LCH
    const [L_lab, newC, newH] = lmsToLch(scaledLMS[0], scaledLMS[1], scaledLMS[2]);

    return lchToRgb(L,C,newH);
}
}*/function rgbToLct(r, g, b) {
    // Step 1: Estimate initial values
    let T = estimateTemperature(r, g, b);
    let L = estimateLuma(r, g, b);
    let C = estimateChroma(r, g, b);
const eee=2;
    // Step 2: Iteratively refine (L, C, T) using Halley's Method
    for (let i = 0; i < 20; i++) {  // Max 10 iterations for convergence
        const rgb_est = lctToRgb(L, C, T);
        const error = colorDifference(rgb_est, [r, g, b]);
//console.log(T)
        if (error < eee) break; // Converged

        // Compute first derivatives
        const dL = (colorDifference(lctToRgb(L + eee, C, T), [r, g, b]) - error) / eee;
        const dC = (colorDifference(lctToRgb(L, C + eee, T), [r, g, b]) - error) / eee;
        const dT = (colorDifference(lctToRgb(L, C, T + eee), [r, g, b]) - error) / eee;

        // Compute second derivatives
        const dL2 = (colorDifference(lctToRgb(L + 2e-5, C, T), [r, g, b]) - 2 * colorDifference(lctToRgb(L + eee, C, T), [r, g, b]) + error) / (eee ** 2);
        const dC2 = (colorDifference(lctToRgb(L, C + 2e-5, T), [r, g, b]) - 2 * colorDifference(lctToRgb(L, C + eee, T), [r, g, b]) + error) / (eee ** 2);
        const dT2 = (colorDifference(lctToRgb(L, C, T + 2e-5), [r, g, b]) - 2 * colorDifference(lctToRgb(L, C, T + eee), [r, g, b]) + error) / (eee ** 2);

        // Apply Halley's method update
        L -= (0.5 * error * dL) / (2 * dL ** 2 - error * dL2);
        C -= (0.5 * error * dC) / (2 * dC ** 2 - error * dC2);
        T -= (0.5 * error * dT) / (2 * dT ** 2 - error * dT2);
    }

    return [L, C, T];
}
// **Helper Functions**

// Estimate initial temperature (T) from RGB
function estimateTemperature(r, g, b) {
    return 1000 + ((r + g + b) / 3) * 20; // Roughly scale from 1000K to 7000K
}

// Estimate Luma (L) from RGB
function estimateLuma(r, g, b) {
    return rgbToLch(r,g,b)[0] // Standard luminance formula
}

// Estimate Chroma (C) from RGB
function estimateChroma(r, g, b) {
return rgbToLch(r,g,b)[1] // Chroma is the color intensity range
}

// Compute Euclidean Color Difference
function colorDifference(rgb1, rgb2) {
    return Math.sqrt(
        (rgb1[0] - rgb2[0]) ** 2 +
        (rgb1[1] - rgb2[1]) ** 2 +
        (rgb1[2] - rgb2[2]) ** 2
    );
}








function jzazbzToXyz(Jz, az, bz) {
    const peakLum=1;
  const Jzazbz_d0 = (1.6295499532821566e-11);
  const Jzazbz_d = (-0.56);
  const Jzazbz_c1 = (3424/4096.0);
  const Jzazbz_c2 = (2413/128.0);
  const Jzazbz_c3 = (2392/128.0);
  const Jzazbz_n = (2610/16384.0);
  const Jzazbz_b = 1.15;
  const Jzazbz_g = 0.66;
const Jzazbz_p = 1.7*2523/32.0;
    
  function pqDecode(channel) {
   return peakLum * Math.pow((Jzazbz_c1 - Math.pow(channel, 1/Jzazbz_p))/(Jzazbz_c3*Math.pow(channel, 1/Jzazbz_p)-Jzazbz_c2),1/Jzazbz_n)
  }

  const tmp = Jz/255 + Jzazbz_d0;
  const Iz = tmp / (1 + Jzazbz_d - Jzazbz_d * tmp);

  const azz = az/255 - 0.5;
  const bzz = bz/255 - 0.5;

  const Lp = Iz + 0.138605043271539 * azz + 0.0580473161561189 * bzz;
  const Mp = Iz - 0.138605043271539 * azz - 0.0580473161561189 * bzz;
  const Sp = Iz - 0.0960192420263189 * azz - 0.811891896056039 * bzz;

  const L = pqDecode(Lp);
  const M = pqDecode(Mp);
  const S = pqDecode(Sp);

  const mtx = [
    [1.92422643578761, -1.00479231259537, 0.037651404030618],
    [0.350316762094999, 0.726481193931655, -0.065384422948085],
    [-0.0909828109828476, -0.312728290523074, 1.52276656130526]
  ];

  return matrixMult(L*255, M*255, S*255, mtx);
}

function jzazbzToRgb(jz, az, bz) {
  const xyz = xyzToRgb(...jzazbzToXyz(jz, az, bz));
  if (xyz.some(Number.isNaN)) return [0, 0, 0];
 
  return xyz;
}

function xyzToJzazbz(X, Y, Z) {
    const peakLum=1;
  const Jzazbz_d0 = (1.6295499532821566e-11);
  const Jzazbz_d = (-0.56);
  const Jzazbz_c1 = (3424/4096.0);
  const Jzazbz_c2 = (2413/128.0);
  const Jzazbz_c3 = (2392/128.0);
  const Jzazbz_n = (2610/16384.0);
  const Jzazbz_b = 1.15;
  const Jzazbz_g = 0.66;
const Jzazbz_p = 1.7*2523/32.0;
 const Xp = (Jzazbz_b*X/255 - (Jzazbz_b-1)*Z/255);
 const  Yp = (Jzazbz_g*Y/255 - (Jzazbz_g-1)*X/255);
 const  Zp = Z/255;
  const L = 0.41478972*Xp + 0.579999*Yp + 0.0146480*Zp;
 const  M = -0.2015100*Xp + 1.120649*Yp + 0.0531008*Zp;
 const  S = -0.0166008*Xp + 0.264800*Yp + 0.6684799*Zp;
function pqEncode(channel){
    return Math.pow((Jzazbz_c1+Jzazbz_c2*Math.pow(channel/peakLum,Jzazbz_n))/(1+Jzazbz_c3*Math.pow(channel/peakLum,Jzazbz_n)),Jzazbz_p)
}


const Lp=pqEncode(L)
const Mp=pqEncode(M)
const Sp=pqEncode(S)

 const Iz  = 0.5*Lp + 0.5*Mp;
 const az = 3.52400*Lp  - 4.066708*Mp + 0.542708*Sp + 0.5;
 const bz = 0.199076*Lp + 1.096799*Mp - 1.295875*Sp + 0.5;

 const Jz = (1+Jzazbz_d)*Iz/(1+Jzazbz_d*Iz) - Jzazbz_d0;
 return [Jz*255,az*255,bz*255]
}
function rgbToJzazbz(r,g,b) {
  const xyz = xyzToJzazbz(...rgbToXyz(r, g, b));
  if (xyz.some(Number.isNaN)) return [0, 0, 0];
 
  return xyz; 
}

function rgbToJzczhz(r, g, b) {
  const [Jz, az, bz] = rgbToJzazbz(r, g, b);
  const Cz = Math.sqrt(az * az + bz * bz);
  let h = Math.atan2(bz, az) * (180 / Math.PI);
  if (h < 0) h += 360;
  return [Jz, Cz, h];
}
function jzczhzToRgb(Jz, Cz, h) {
  const hz = h * (Math.PI / 180);
  const az = Cz * Math.cos(hz);
  const bz = Cz * Math.sin(hz);
  return jzazbzToRgb(Jz, az, bz);
}



function pqEncode(x) {
  const m1 = 2610 / 16384;
  const m2 = 2523 / 32;
  const c1 = 3424 / 4096;
  const c2 = 2413 / 128;
  const c3 = 2392 / 128;
  const xp = Math.pow(x, m1);
  return Math.pow((c1 + c2 * xp) / (1 + c3 * xp), m2);
}

function pqDecode(x) {
  const m1 = 2610 / 16384;
  const m2 = 2523 / 32;
  const c1 = 3424 / 4096;
  const c2 = 2413 / 128;
  const c3 = 2392 / 128;
  const xp = Math.pow(x, 1 / m2);
  return Math.pow((Math.max(xp - c1, 0)) / (c2 - c3 * xp), 1 / m1);
}

function hlgEncode(x) {
  const a = 0.17883277, b = 1 - 4 * a, c = 0.5 - a * Math.log(4 * a);
  return x <= 1/12 ? Math.sqrt(3 * x) : a * Math.log(12 * x - b) + c;
}

function hlgDecode(x) {
  const a = 0.17883277, b = 1 - 4 * a, c = 0.5 - a * Math.log(4 * a);
  return x <= 0.5 ? (x * x) / 3 : (Math.exp((x - c) / a) + b) / 12;
}

function rgbToPqlms(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const [lr, lg, lb] = rgbToLms(r, g, b);
  return [
    pqEncode(lr) * 255,
    pqEncode(lg) * 255,
    pqEncode(lb) * 255
  ];
}

function pqlmsToRgb(pr, pg, pb) {
  pr /= 255; pg /= 255; pb /= 255;
  const lr = pqDecode(pr), lg = pqDecode(pg), lb = pqDecode(pb);
  const [r, g, b] = lmsToRgb(lr, lg, lb);
  return [r * 255, g * 255, b * 255];
}

function rgbToHlglms(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const [lr, lg, lb] = rgbToLms(r, g, b);
  return [
    hlgEncode(lr) * 255,
    hlgEncode(lg) * 255,
    hlgEncode(lb) * 255
  ];
}

function hlglmsToRgb(hr, hg, hb) {
  hr /= 255; hg /= 255; hb /= 255;
  const lr = hlgDecode(hr), lg = hlgDecode(hg), lb = hlgDecode(hb);
  const [r, g, b] = lmsToRgb(lr, lg, lb);
  return [r * 255, g * 255, b * 255];
}
function rgbToPqxyz(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const [xr, xg, xb] = rgbToXyz(r, g, b);
  return [
    pqEncode(xr) * 255,
    pqEncode(xg) * 255,
    pqEncode(xb) * 255
  ];
}

function pqxyzToRgb(pr, pg, pb) {
  pr /= 255; pg /= 255; pb /= 255;
  const xr = pqDecode(pr), xg = pqDecode(pg), xb = pqDecode(pb);
  const [r, g, b] = xyzToRgb(xr, xg, xb);
  return [r * 255, g * 255, b * 255];
}
function rgbToHlgxyz(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const [xr, xg, xb] = rgbToXyz(r, g, b);
  return [
    hlgEncode(xr) * 255,
    hlgEncode(xg) * 255,
    hlgEncode(xb) * 255
  ];
}

function hlgxyzToRgb(hr, hg, hb) {
  hr /= 255; hg /= 255; hb /= 255;
  const xr = hlgDecode(hr), xg = hlgDecode(hg), xb = hlgDecode(hb);
  const [r, g, b] = xyzToRgb(xr, xg, xb);
  return [r * 255, g * 255, b * 255];
}








function rgbToIctcp(r, g, b) {
   let [l,m,s]=rgbToPqlms(r,g,b)
    const mtx = [
    [0.5,       0.5,        0],
    [1.614746, -3.325684,  0.170898],
    [4.378174, -4.245117, -0.132568]
];
    return matrixMult(l, m, s, mtx);
}


function ictcpToRgb(i, t, p) {
    
    const mtx = [
    [1.096, 0.062, 0.080],
    [0.904, -0.062, -0.080],
    [7.230, 4.045, -2.318]
];
   let[l,m,s]=  matrixMult(i, t, p, mtx);
   return pqlmsToRgb(l,m,s)
}



function rgbToHlgictcp(r, g, b) {
   let [l,m,s]=rgbToHlglms(r,g,b)
    const mtx = [
  [0.5,        0.5,        0],
  [0.885986,  -1.822754,   0.9375],
  [2.319336,  -2.249023,  -0.0703125]
];
    return matrixMult(l, m, s, mtx);
}


function hlgictcpToRgb(i, t, p) {
    
    const mtx = [
    [1.000, 0.016, 0.210],
    [1.000, -0.016, -0.210],
    [0.999, 1.021, -0.605]
];
   let[l,m,s]=  matrixMult(i, t, p, mtx);
   return hlglmsToRgb(l,m,s)
}




function rgbToIctcpqc2(r, g, b) {
   let [l,m,s]=rgbToPqlms(r,g,b)
    const mtx = [
    [0.399, 0.401, 0.200],
    [4.443, -4.838, 0.395],
    [0.807, 0.357, -1.164]
];
    return matrixMult(l, m, s, mtx);
}


function ictcpqc2ToRgb(i, t, p) {
    
    const mtx = [
  [1.0,       0.097534,   0.205444],
  [1.0,      -0.1138916,  0.1333008],
  [1.0,       0.0325928, -0.6760254]
];
   let[l,m,s]=  matrixMult(i, t, p, mtx);
   return pqlmsToRgb(l,m,s)
}





















































//SOLARZONE
/*
function add(...args) {
    return args.reduce((acc, val) => (acc+ val));
}

function sub(...args) {
    return args.reduce((acc, val) =>(acc-val));
}

function mul(...args) {
    return args.reduce((acc, val) => (acc*val));
}

function div(...args) {
    return args.reduce((acc, val) => (acc/val));
}

function rxyToRgb(r, x, y) {
let a = Math.sqrt(sub(sub(mul(3,r,r),mul(2,x,x)),mul(2,y,y)));
return [mul(add(a,y,y),1),mul(1,sub(add(a,mul(1.73205081,x)),y)),mul(sub(add(a,mul(-1,1.73205081,x)),y),1)];
}
function rgbToRxy(r, x, y) {
rp = div(r,1);
xp = div(x,1);
yp = div(y,1);
return [Math.sqrt(add(mul(rp,rp),mul(xp,xp),mul(yp,yp))),add(mul(1.73205081,-0.5,rp),mul(1.73205081,-0.5,xp)),add(mul(-0.5,rp),mul(-0.5,xp),yp)]


}*/
//SOLARZONE ENDS





//STUFF IDK IT MDOES STUFF
const reg = 30;
function rgbToRgb (r, g, b) {
	return [r,g,b];
}

function normal(r, g, b) {
	return [r,g,b];
}

function ROT1(r, g, b) {
	return [b,r,g];
}


function ROT2(r, g, b) {
	return [g,b,r];
}


function rgG(r, g, b) {

    let r1 = r * b / g;
    let b1 = (1.0 - r - g) * b / g;
    r = r1;
    g = b;
    b = b1;
    return [r, g, b];
}

function SPH(r, g, b) {
//		console.log(r);
    let rho = r;
    let the = g;
    let phi = b;
    r = rho * Math.sin(the/reg) * Math.cos(phi/reg);
    g = rho * Math.sin(the/reg) * Math.sin(phi/reg);
    b = rho * Math.cos(the/reg);
    return [r, g, b];
}

function CYL(r, g, b) {
    let x = r;
    let y = g;
    r = x * Math.cos(y/reg);
    g = x * Math.sin(y/reg);
    return [r, g, b];
}

function TRP(r, g, b) {
    let x = r;
    let y = g;
    r = x * Math.sin(y/reg);
    g = x * Math.sin(y/reg + 2 * Math.PI / 3);
    b = x * Math.sin(y/reg + 4 * Math.PI / 3);
    return [r, g, b];
}
function TPH(r, g, b){//threeohase
 let x = r;
    let y = g;
    r = b + x * Math.sin(y/reg);
    g = b + x * Math.sin(y/reg+2*3.14159265/3);
	b = b + x * Math.sin(y/reg+4*3.14159265/3);
    return [r, g, b];
}
function HSV(r,g,b){return hsvToRgb(r,g,b);}
function HSL(r,g,b){return hslToRgb(r,g,b);}
function CMY(r,g,b){return cmyToRgb(r,g,b);}

function TOR(r, g, b) {
    let t = r;
    let s = g;
    let p = b;
    r = Math.sinh(t/reg) / (Math.cosh(t/reg) - Math.cos(s/reg)) * Math.cos(p/reg);
    g = Math.sinh(t/reg) / (Math.cosh(t/reg) - Math.cos(s/reg)) * Math.sin(p/reg);
    b = Math.sin(t/reg) / (Math.cosh(t/reg) - Math.cos(s/reg));
    return [r*100, g*100, b*100];
}

function PCC(r, g, b) {
    let s = r/100;
    let t = g/100;
    r = s * t;
    g = (t * t - s * s) / 2.0;
    return [r*100, g*100, b];
}

function OSC(r, g, b) {
    let m = r;
    let v = g;
    let p = b;
    r = Math.cosh(m/reg) * Math.cos(v/reg) * Math.cos(p/reg);
    g = Math.cosh(m/reg) * Math.cos(v/reg) * Math.sin(p/reg);
    b = Math.sinh(m/reg) * Math.sin(v/reg);
    return [r, g, b];
}

function OSCzxp(r, g, b) {
    let z = r/100;
    let x = g/100;
    let p = b;
    r = Math.sqrt((1.0 + z * z) * (1.0 - x * x)) * Math.cos(p/reg);
    g = Math.sqrt((1.0 + z * z) * (1.0 - x * x)) * Math.sin(p/reg);
    b = z * x;
    return [r*100, g*100, b*100];
}

function OSCstp(r, g, b) {
    let s = r/100;
    let t = g/100;
    let p = b;
    r = s * t * Math.cos(p/reg);
    g = s * t * Math.sin(p/reg);
    b = (s * s - 1.0) * (1.0 - t * t);
    return [r*100, g*100, b*100];
}

function PSC(r, g, b) {
    let m = r;
    let v = g;
    let p = b;
    r = Math.sinh(m/reg) * Math.sin(v/reg) * Math.cos(p/reg);
    g = Math.sinh(m/reg) * Math.sin(v/reg) * Math.sin(p/reg);
    b = Math.cosh(m/reg) * Math.cos(v/reg);
    return [r*100, g*100, b*100];
}

function PC(r, g, b) {
    let m = r/100;
    let v = g/100;
    let l = b/100;
    let B = 1;
    let C = 1;
    r = Math.sqrt(4.0 / (B - C) * (m - B) * (B - v) * (B - l));
    g = Math.sqrt(4.0 / (B - C) * (m - C) * (C - v) * (l - C));
    b = m + v + l - B - C;
    return [r*100, g*100, b*100];
}

function ECC(r, g, b) {
    let m = r;
    let v = g;
    r = Math.cosh(m/reg) * Math.cos(v/reg);
    g = Math.sinh(m/reg) * Math.sin(v/reg);
    return [r*100, g*100, b];
}

function CC(r, g, b) {
    let r1 = r/100;
    let m = g/100;
    let v = b/100;
    let B = 1;
    let C = 1;
    r = r1 * m * v / B / C;
    g = r1 / B * Math.sqrt(((m * m - B * B) * (v * v - B * B)) / (B * B - C * C));
    b = r1 / C * Math.sqrt(((m * m - C * C) * (v * v - C * C)) / (C * C - B * B));
    return [r*100, g*100, b*100];
}

function BC(r, g, b) {
    let t = r;
    let s = g;
    let p = b;
    r = Math.sin(s/reg) / (Math.cosh(t/reg) - Math.cos(s/reg)) * Math.cos(p/reg);
    g = Math.sin(s/reg) / (Math.cosh(t/reg) - Math.cos(s/reg)) * Math.sin(p/reg);
    b = Math.sinh(t/reg) / (Math.cosh(t/reg) - Math.cos(s/reg));
    return [r*100, g*100, b*100];
}

function BCC(r, g, b) {
    let s = r;
    let t = g;
    r = Math.sinh(t/reg) / (Math.cosh(t/reg) - Math.cos(s/reg));
    g = Math.sin(s/reg) / (Math.cosh(t/reg) - Math.cos(s/reg));
    return [r*100, g*100, b];
}

function rgGp(r, g, b) {
    let r1 = r / (r + g + b);
    let g1 = g / (r + g + b);
    r = r1*100;
    g = g1*100;
    b = g;
    return [r, g, b];
}

function iCMY(r, g, b) {
    let c = 255 - r;
    let m = 255 - g;
    let y = 255 - b;
    r = c;
    g = m;
    b = y;
    return [r, g, b];
}

function iSPH(r, g, b) {
    let x = r/100;
    let y = g/100;
    let z = b/100;
    r = Math.sqrt(x * x + y * y + z * z);
    g = Math.acos(100*z / r)*100;
    b = Math.sign(y) * Math.acos(x / Math.sqrt(x * x + y * y));
    return [r*100, g, b*100];
}

function iCYL(r, g, b) {
    let x = r/100;
    let y = g/100;
    r = Math.sqrt(x * x + y * y);
    g = Math.atan2(y, x);
    return [r*100, g*100, b*100];
}



function getSectorColor(complexOutput, sectorMode) {
 // if (colorMode !== sectorMode) return [0, 0, 0];

  const angle = Math.atan2(complexOutput.im, complexOutput.re); // -π to π
  const twoPi = Math.PI * 2;

  let normalized = angle;
  if (normalized < 0) normalized += twoPi;

  const sectors = {
    'sector3': 3,
    'sector6': 6,
    'sector8': 8,
    'sector12': 12
  };

  const numSectors = sectors[sectorMode];
  const sectorSize = twoPi / numSectors;
  const sectorIndex = Math.floor(normalized / sectorSize);
if(!(sectorIndex<14))return [255,255,255]
  // Define colors for each sector mode
  const palettes = {
    sector3: [
      [255, 0, 0],   // Red
      [0, 255, 0],   // Green
      [0, 0, 255]    // Blue
      
      ,[0,0,0]
    ],
    sector6: [
      [255, 0, 0],
      [255, 128, 0],
      [255, 255, 0],
      [0, 255, 0],
      [0, 255, 255],
      [0, 0, 255]
            
      ,[0,0,0]
    ],
    sector8: [
      [255, 0, 0],
      [255, 128, 0],
      [255, 255, 0],
      [128, 255, 0],
      [0, 255, 0],
      [0, 255, 128],
      [0, 255, 255],
      [0, 128, 255]
            
      ,[0,0,0]
    ],
    sector12: [
      [255, 0, 0],
      [255, 64, 0],
      [255, 128, 0],
      [255, 192, 0],
      [255, 255, 0],
      [192, 255, 0],
      [128, 255, 0],
      [64, 255, 0],
      [0, 255, 0],
      [0, 255, 128],
      [0, 255, 255],
      [0, 128, 255]
            
      ,[0,0,0]
    ]
  };

  return palettes[sectorMode][sectorIndex];
}





function clamp255(value) {
    return Math.min(255, Math.max(0, value));
}

			function complexToColor(complexInput, complexOutput, magnitudeToLightnessExpr, colorMode, saturationChroma, lightness, paletteImageData, contourThresholdd = 0.15, deriv = 1) {
    // Calculate magnitude and phase of the complex output
	
	
	
    const magnitude = math.abs(complexOutput);
    const phase = (math.arg(complexOutput) + 2 * Math.PI) % (2 * Math.PI);
    
    // Calculate lightness value based on the magnitude
   
    
    // Calculate the differences from the nearest integers for contour mode

 if (colorMode === 'contour') {
	
 	const contourThreshold=contourThresholdd * mag(deriv);
    const reDiff = Math.abs(complexOutput.re % 1);
    const imDiff = Math.abs(complexOutput.im % 1);
    const minDiff = Math.min(reDiff, imDiff);
    const doubleThreshold = contourThreshold * 1;
    const halfThreshold = Math.min(Math.abs(complexInput.re % dd), Math.abs(complexInput.im % dd));

    if (minDiff < contourThreshold) {
    
        const isCloseToZero = (Math.abs(complexOutput.re % dd) < doubleThreshold  && Math.abs(complexOutput.re) < doubleThreshold ) ||
                              (Math.abs(complexOutput.im % dd) < doubleThreshold  && Math.abs(complexOutput.im) < doubleThreshold );
        
        if (isCloseToZero) return [00, 00, 00]; // Black if the closest integer is 0


return [
    ((complexOutput.im < 0 && imDiff === minDiff) || (complexOutput.re > 0 && reDiff === minDiff)) ? 255 : 0,   
    complexOutput.im > 0 && imDiff === minDiff ? 255 : 0     // Blue
       , 
    complexOutput.re < 0 && reDiff === minDiff ? 255 :  (complexOutput.im < 0 && imDiff === minDiff ? 255 : 0)    
];
    }
	if (halfThreshold < contourThresholdd/2) return [128, 128, 128];
    return [255, 255, 255]; 
}






 if (colorMode === 'pcontour') {
	
 	const contourThreshold=contourThresholdd * mag(deriv);
    const reDiff = Math.abs((arg(complexOutput)*8/3.14159265) % 1);
    const imDiff = mag(complexOutput) % 1;
 
    const doubleThreshold = contourThreshold * 1;
    const halfThreshold = Math.min(Math.abs(complexInput.re % 1), Math.abs(complexInput.im % 1));

if(reDiff*mag(complexOutput)<doubleThreshold)return [255, 0, 0];
if(imDiff<doubleThreshold)return [ 0,255, 0];

    if (halfThreshold < contourThresholdd/2) return [128, 128, 128];
    return [255, 255, 255]; 
}


 const lightnessValue = teth.evaluate(magnitudeToLightnessExpr, { x: magnitude, z: complexOutput , c: complexInput , t: arg(complexOutput) , r: magnitude });
    const chroma = saturationChroma;
    const lightnessAdjusted = lightnessValue * lightness;


if (colorMode === 'acontour') {
	const dd=1;

        const chroma = saturationChroma;
    const lightnessAdjusted = lightnessValue * lightness;
 const ccomplexOutput=div(complexOutput,(lightnessAdjusted / mag(complexOutput)))
 	const contourThreshold=contourThresholdd * mag(deriv);
    const reDiff = Math.abs(ccomplexOutput.re % dd);
    const imDiff = Math.abs(ccomplexOutput.im % dd);
    const minDiff = Math.min(reDiff, imDiff);
    const doubleThreshold = contourThreshold * 1;
    const halfThreshold = Math.min(Math.abs(complexInput.re % dd), Math.abs(complexInput.im % dd));

    if (minDiff < contourThreshold) {
    
        const isCloseToZero = (Math.abs(ccomplexOutput.re % dd) < doubleThreshold  && Math.abs(ccomplexOutput.re) < doubleThreshold ) ||
                              (Math.abs(ccomplexOutput.im % dd) < doubleThreshold  && Math.abs(ccomplexOutput.im) < doubleThreshold );
        
        if (isCloseToZero) return [00, 00, 00]; // Black if the closest integer is 0


return [
    ((ccomplexOutput.im < 0 && imDiff === minDiff) || (ccomplexOutput.re > 0 && reDiff === minDiff)) ? 255 : 0,   
    ccomplexOutput.im > 0 && imDiff === minDiff ? 255 : 0     // Blue
       , 
    ccomplexOutput.re < 0 && reDiff === minDiff ? 255 :  (ccomplexOutput.im < 0 && imDiff === minDiff ? 255 : 0)    
];
    }
	if (halfThreshold < contourThresholdd/2) return [128, 128, 128];
    return [255, 255, 255]; 
}




    if (colorMode === 'hsv' || colorMode === 'hsl') {
        return colorMode === 'hsv'
            ? hsvToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
            : hslToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted);
    }

    if (colorMode === 'hcl' || colorMode === 'cielch') {
        return colorMode === 'hcl'
            ? hclToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
            : lchToRgb(lightnessAdjusted, chroma ,phase * 180 / Math.PI);
    }
 const yuvModes = ['ycbcr', 'ydbdr', 'ycocg', 'ypbpr'];
if (yuvModes.includes(colorMode)) {
    const convertYUV = {
        ycbcr: ycbcrToRgb,
        ydbdr: ydbdrToRgb,
        ycocg: ycocgToRgb,
        ypbpr: ypbprToRgb
    }[colorMode];

    return convertYUV(lightnessAdjusted * saturationChroma / 10, complexOutput.re * lightness, complexOutput.im * lightness);
}

if (colorMode === 'real') {
return ycbcrToRgb(lightnessAdjusted * saturationChroma / 10,  complexOutput.re * lightness, -complexOutput.re * lightness);
 //   return ycbcrToRgb(lightnessAdjusted * saturationChroma / 10, complexOutput.re * 100,lightness);
}

if (colorMode === 'imag') {

    return ycbcrToRgb(lightnessAdjusted * saturationChroma / 10,lightness, complexOutput.im * 100);
}
    if (colorMode === '2d') {
        return [
            Math.sign(complexOutput.re) * 50 + Math.sign(complexOutput.im) * 100,
            Math.abs(complexOutput.re) * 255,
            Math.abs(complexOutput.im) * 255
        ];
    }

    if (colorMode === 'palette' && paletteImageData) {
        const hueIndex = Math.floor(((phase * 180 / Math.PI) % 360 + 360) % 360);
        const lightnessIndex = 99 - Math.floor(Math.min(Math.max(lightnessValue, 0), 1) * 98);
        const index = (lightnessIndex * 360 + hueIndex) * 4;
        return [
            paletteImageData[index],
            paletteImageData[index + 1],
            paletteImageData[index + 2]
        ];
    }





if (colorMode === 'freergb') {
return lightnessValue;

}

if (colorMode === 'freehsv') {
return hsvToRgb(g(lightnessValue,0),g(lightnessValue,1),g(lightnessValue,2));

}
if (colorMode === 'freehsl') {
return hslToRgb(g(lightnessValue,0),g(lightnessValue,1),g(lightnessValue,2));

}

if (colorMode === 'isolines') {
    const phaseDiff = Math.abs(phase % (2 * Math.PI) - Math.PI); // Difference from a reference phase
    const isolineThreshold = 0.1; // Threshold for creating isolines
    const isIsoline = (phaseDiff < isolineThreshold || Math.abs(phaseDiff - Math.PI) < isolineThreshold);

    if (isIsoline) {
        // Create isoline colors based on phase
        return [
            Math.floor(255 * (1 - Math.abs(phaseDiff / Math.PI - 0.5))),  // Ranges from 255 to 0 based on phase
            0,
            Math.floor(255 * Math.abs(phaseDiff / Math.PI - 0.5))   // Ranges from 0 to 255 based on phase
        ];
    }
    return [255, 255, 255]; // Default white
}



// Color mode: 'dynamic'
if (colorMode === 'dynamic') {
    // Create a dynamic effect based on phase and lightnessValue
    const timeEffect = 0; // Sinusoidal effect over time
    const dynamicPhase = (phase + timeEffect * Math.PI) % (2 * Math.PI);

    return [
        Math.floor(127.5 * (Math.sin(dynamicPhase) + 1)), // Red channel with dynamic effect
        Math.floor(127.5 * (Math.sin(dynamicPhase + Math.PI / 2) + 1)), // Green channel with offset
        Math.floor(127.5 * (Math.sin(dynamicPhase + Math.PI) + 1)) // Blue channel with opposite phase
    ];
}

// Color mode: 'lightnessValue'
if (colorMode === 'magnitudeold') {
    const normMagnitude = (lightnessValue / 10); // Normalize lightnessValue
    return [
        Math.floor(255 * normMagnitude), // Red channel based on lightnessValue
        Math.floor(25 * (10 - normMagnitude)), // Green channel inverse of lightnessValue
        mag( normMagnitude*10) // Blue channel constant
    ];
}
if (colorMode === 'magnitude') {
    const nore = (mag(complexOutput) / 10); // Normalize lightnessValue
    return hsvToRgb(nore*520,50+30*sin(58*nore),50+30*cos(72*nore));
}
if (colorMode === 'magnitudecolour') {
   // const normMagnitude = Math.min(lightnessValue / 10, 1); // Normalize lightnessValue
    const lightnessValue =lightnessAdjusted //teth.evaluate(lightnessValueToLightnessExpr, { x: lightnessValue, z: });
    return hsvToRgb(lightnessValue*100,100,Math.max(lightnessValue,50))
}

if (colorMode === 'neon') {
    // Calculate the neon intensity based on complexOutput lightnessValue
    const neonIntensity = Math.pow(Math.abs(((1000+complexOutput.re) % 2) - 1), 5) +
                          Math.pow(Math.abs(((1000+complexOutput.im) % 2) - 1), 5);
    
    // Normalize neon intensity to range [0, 1]
    const normalizedIntensity = Math.min(neonIntensity / 3, 1);

    // Convert to HSV: Use hue as phase, saturation and value based on intensity
    const hue = (phase * 180 / Math.PI) % 360; // Convert phase to hue
    const saturation = 100; // Full saturation for neon effect
    const value = normalizedIntensity*255; // Value based on intensity

    // Convert HSV to RGB
    return hsvToRgb(hue, saturation, value);
}

if (colorMode === 'differ') {
    // Calculate absolute values
    const absRe = Math.abs(complexOutput.re);
    const absIm = Math.abs(complexOutput.im);
    const absZ = Math.sqrt(absRe * absRe + absIm * absIm); // abs(z)
    
    // Calculate Green channel
    const green = Math.min(Math.floor(absZ * 255)+(absRe-2*complexOutput.re+absIm-2*complexOutput.im)*100, 255); // Limit to [0, 255]

    // Calculate Red channel
    const red = Math.min(Math.floor(Math.abs(complexOutput.re + complexOutput.im) * 255 + absZ*50), 255); // Limit to [0, 255]

    // Calculate Blue channel
	// const blue = Math.min(Math.floor(Math.pow(Math.sqrt(absRe) + Math.sqrt(absIm), 2) * 555), 255); // Limit to [0, 255]
    const blue = Math.min(Math.floor(Math.abs(-complexOutput.re + complexOutput.im) * 155 + absZ*50), 255);  // Limit to [0, 255]

    return [red, green, blue];
}

if (colorMode === 'purify') {
    // Calculate absolute values
    const absRe = Math.abs(complexOutput.re);
    const absIm = Math.abs(complexOutput.im);
    const lightnessValue = Math.sqrt(absRe * absRe + absIm * absIm); // abs(z)
    const phase = Math.atan2(complexOutput.im, complexOutput.re); // Angle in radians

    // Calculate Red channel based on the absolute value of the real part
    const red = Math.min(Math.floor(absRe * 255), 255);

    // Calculate Green channel based on the absolute value of the imaginary part
    const green = Math.min(Math.floor(absIm * 255), 255);

    // Calculate Blue channel with a dynamic blend based on lightnessValue and phase
    const dynamicBlue = Math.sin(phase * 2) * 0.5 + 0.5; // Create a smooth blend effect
    const blue = Math.min(Math.floor(dynamicBlue * lightnessValue * 255), 255);

    return [red, green, blue];
}

if (colorMode === 'quadrant') {
   if (complexOutput.re > 0 && complexOutput.im > 0 ) return [255,128,255];
   if (complexOutput.re > 0 && complexOutput.im < 0 ) return [255,128,0];
   if (complexOutput.re > 0 && complexOutput.im ==0 ) return [255,128,125];
   if (complexOutput.re < 0 && complexOutput.im > 0 ) return [0,128,255];
   if (complexOutput.re < 0 && complexOutput.im < 0 ) return [0,128,0];
   if (complexOutput.re < 0 && complexOutput.im ==0 ) return [0,128,128];
   if (complexOutput.re ==0 && complexOutput.im > 0 ) return [128,128,255];
   if (complexOutput.re ==0 && complexOutput.im < 0 ) return [128,128,0];
   if (complexOutput.re ==0 && complexOutput.im ==0 ) return [128,128,128];
return [0,0,0];
}

if (colorMode === 'upperplanebw') {
    if(complexOutput.im > 0)
        return [255,255,255];
return [0,0,0];
}
if (colorMode === 'unitcirclebw') {
    if(mag(complexOutput) < 1)
        return [255,255,255];
return [0,0,0];
}
if (colorMode === 'trisect') {return getSectorColor(complexOutput, 'sector3');}
if (colorMode === 'hexasect') {return getSectorColor(complexOutput, 'sector6');}
if (colorMode === 'octant') {return getSectorColor(complexOutput, 'sector8');}
if (colorMode === 'dodecasect') {return getSectorColor(complexOutput, 'sector12');}




if (colorMode === 'griddistort') {
   return [128+128*mul(signum(complexOutput.re),signum(complexOutput.im)),255*modc(complexOutput.im,1),255*modc(complexOutput.re,1)]

}
if (colorMode === 'griddistorts') {
   return [128+128*mul(signum(complexOutput.re),signum(complexOutput.im)),255*round(modc(complexOutput.im,1)),255*round(modc(complexOutput.re,1))]

}
if (colorMode === 'griddistortbw') {
   q=255*signum((modc(complexOutput.im,2)-1)*(modc(complexOutput.re,2)-1))
   return [q,q,q]

}if (colorMode === 'realimagheat') {
    return [
        127 + 127 * mag((complexOutput.im)*(complexOutput.im)/(complexOutput.re)),
        127 + 127 * mag((complexOutput.re)*(complexOutput.re)/(complexOutput.im)),
    10*mag(complexOutput) 
    ];
}

if (colorMode === 'mag4') {
    let m = mag(complexOutput);
    return [255 * Math.sin(5 * m), 255 * Math.sin(3 * m), 255 * Math.sin(7 * m)];
}








    return [0, 0, 0]; // Default return if no color mode matches
}



















function inversetransform(
    transformFn,
    targetOutput,
    inputMins = [0, 0, 0],
    inputMaxs = [255, 255, 255],
    outputMins = [0, 0, 0],
    outputMaxs = [255, 255, 255],
    wrapInputs = [false, false, false],
    tolerance = 0.01, // normalized error tolerance
    maxIterations = 500,
    learningRate = 0.1
) {
    const normalizedTarget = targetOutput.map((val, i) =>
        (val - outputMins[i]) / (outputMaxs[i] - outputMins[i])
    );

    let params = inputMins.map((min, i) => min + (inputMaxs[i] - min) * 0.5);
    let bestParams = [...params];
    let bestError = Infinity;

    const delta = 1e-2; // bigger step for numeric gradient
    const learningRates = params.map(() => learningRate);
    const prevGradients = params.map(() => 0);

    for (let iter = 0; iter < maxIterations; iter++) {
        const currentOutput = transformFn(...params);
        const normalizedOutput = currentOutput.map((val, i) =>
            (val - outputMins[i]) / (outputMaxs[i] - outputMins[i])
        );

        // Compute error
        let error = 0;
        const errors = normalizedTarget.map((t, i) => {
            const e = t - normalizedOutput[i];
            error += e * e;
            return e;
        });
        error = Math.sqrt(error);

        // Save best
        if (error < bestError) {
            bestError = error;
            bestParams = [...params];
        }

        if (error <= tolerance) break;

        // Compute gradients
        const gradients = [];
        for (let p = 0; p < params.length; p++) {
            const perturbedParams = [...params];
            perturbedParams[p] += delta;
            if (wrapInputs[p]) {
                const range = inputMaxs[p] - inputMins[p];
                perturbedParams[p] = inputMins[p] + ((perturbedParams[p] - inputMins[p]) % range);
            }
            const perturbedOutput = transformFn(...perturbedParams).map((val, i) =>
                (val - outputMins[i]) / (outputMaxs[i] - outputMins[i])
            );

            const paramGradients = perturbedOutput.map((val, i) =>
                (val - normalizedOutput[i]) / delta
            );
            gradients.push(paramGradients);
        }

        // Update params
        for (let p = 0; p < params.length; p++) {
            let gradient = 0;
            for (let o = 0; o < targetOutput.length; o++) {
                gradient += -2 * errors[o] * gradients[p][o];
            }

            // Adaptive learning rate
            if (gradient * prevGradients[p] < 0) {
                learningRates[p] *= 0.5;
            } else {
                learningRates[p] *= 1.05;
            }
            prevGradients[p] = gradient;

            params[p] += learningRates[p] * gradient;

            if (wrapInputs[p]) {
                const range = inputMaxs[p] - inputMins[p];
                params[p] = inputMins[p] + ((params[p] - inputMins[p] + range) % range);
            } else {
                params[p] = Math.max(inputMins[p], Math.min(inputMaxs[p], params[p]));
            }
        }
    }

    return bestParams.map((val, i) => Math.max(inputMins[i], Math.min(inputMaxs[i], val)));
}
