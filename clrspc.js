//this is stupid
function inv3(m) {
 let a=m.map((r,i)=>[...r,...[0,0,0].map((_,j)=>i==j?1:0)]);
 for(let i=0;i<3;i++){
  let k=i;
  for(let j=i+1;j<3;j++)if(Math.abs(a[j][i])>Math.abs(a[k][i]))k=j;
  [a[i],a[k]]=[a[k],a[i]];
  let q=a[i][i];
  for(let j=0;j<6;j++)a[i][j]/=q;
  for(let k=0;k<3;k++)if(k!=i){
   q=a[k][i];
   for(let j=0;j<6;j++)a[k][j]-=q*a[i][j];
  }
 }
 return a.map(r=>r.slice(3));
};
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


function cubehelixToRgb(h, s, l) {
    const hNorm = h / 360;
    const sNorm = s / 100;
    const lNorm = l / 100;
    
    const angle = 2 * Math.PI * (hNorm / 3 + 1 + sNorm * lNorm);
    const amp = sNorm * lNorm * (1 - lNorm) / 2;
    
    const r = lNorm + amp * (-0.14861 * Math.cos(angle) + 1.78277 * Math.sin(angle));
    const g = lNorm + amp * (-0.29227 * Math.cos(angle) - 0.90649 * Math.sin(angle));
    const b = lNorm + amp * (1.97294 * Math.cos(angle));
    
    return [
        Math.round(Math.min(1, Math.max(0, r)) * 255),
        Math.round(Math.min(1, Math.max(0, g)) * 255),
        Math.round(Math.min(1, Math.max(0, b)) * 255)
    ];
}

function rgbToCubehelix(r, g, b) {
    let best = { error: Infinity, h: 0, s: 0, l: 0 };
    for (let h = 0; h < 360; h += 2) {
        for (let s = 0; s <= 100; s += 2) {
            for (let l = 0; l <= 100; l += 2) {
                const [r2, g2, b2] = cubehelixToRgb(h, s, l);
                const e = Math.hypot(r - r2, g - g2, b - b2);
                if (e < best.error) best = { error: e, h, s, l };
            }
        }
    }
    return [best.h, best.s, best.l];
}

function cubehelixlapToRgb(l, a, p) {
    const lNorm = l / 100;
    const aNorm = a / 100;
    const pRad = p * Math.PI / 180;
    
    const angle = pRad;
    const amp = aNorm;
    
    const r = lNorm + amp * (-0.14861 * Math.cos(angle) + 1.78277 * Math.sin(angle));
    const g = lNorm + amp * (-0.29227 * Math.cos(angle) - 0.90649 * Math.sin(angle));
    const b = lNorm + amp * (1.97294 * Math.cos(angle));
    
    return [
        Math.round(Math.min(1, Math.max(0, r)) * 255),
        Math.round(Math.min(1, Math.max(0, g)) * 255),
        Math.round(Math.min(1, Math.max(0, b)) * 255)
    ];
}

function rgbToCubehelixlap(r, g, b) {
    let best = { error: Infinity, l: 0, a: 0, p: 0 };
    for (let l = 0; l <= 100; l += 2) {
        for (let a = 0; a <= 100; a += 2) {
            for (let p = 0; p < 360; p += 2) {
                const [r2, g2, b2] = cubehelixlapToRgb(l, a, p);
                const e = Math.hypot(r - r2, g - g2, b - b2);
                if (e < best.error) best = { error: e, l, a, p };
            }
        }
    }
    return [best.l, best.a, best.p];
}



// HPLuv: h=0-360, p=0-100, l=0-100
// Uses CIELChuv with compressed chroma to fit sRGB gamut
function hpluvToRgb(h, p, l) {
    // CIELChuv uses L range 0-100, C range 0-~180
    const luvL = Math.min(100, Math.max(0, l));
    // HPLuv uses perceptually uniform chroma scaled to fit sRGB
    const luvC = Math.min(180, Math.max(0, p * 1.8));
    const luvH = ((h % 360) + 360) % 360;
    
    const rad = luvH * Math.PI / 180;
    const u = luvC * Math.cos(rad);
    const v = luvC * Math.sin(rad);
    
    const [r2, g2, b2] = luvToRgb(luvL, u, v);
    return [
        Math.round(Math.min(255, Math.max(0, r2))),
        Math.round(Math.min(255, Math.max(0, g2))),
        Math.round(Math.min(255, Math.max(0, b2)))
    ];
}

function rgbToHpluv(r, g, b) {
    const [L, u, v] = rgbToLuv(r, g, b);
    const C = Math.sqrt(u * u + v * v);
    let h = Math.atan2(v, u) * 180 / Math.PI;
    if (h < 0) h += 360;
    // Compress chroma back to HPLuv scale
    const p = Math.min(100, C / 1.8);
    return [h, p, Math.min(100, Math.max(0, L))];
}

// HPLuv entry: ['hpluv', 'h', 'p', 'l', 0, 0, 0, 255, 360, 100, 100, 0, 0, 100]

// HSLuv: h=0-360, s=0-100, l=0-100
// Uses CIELChuv with saturation as percentage of available chroma
function hsluvToRgb(h, s, l) {
    const luvL = Math.min(100, Math.max(0, l));
    const sNorm = Math.min(1, Math.max(0, s / 100));
    const luvH = ((h % 360) + 360) % 360;
    
    // Maximum chroma varies with lightness (largest around 50%)
    const maxC = 180 * (1 - Math.abs(luvL / 100 - 0.5) * 1.5) * 0.8;
    const luvC = sNorm * maxC;
    
    const rad = luvH * Math.PI / 180;
    const u = luvC * Math.cos(rad);
    const v = luvC * Math.sin(rad);
    
    const [r2, g2, b2] = luvToRgb(luvL, u, v);
    return [
        Math.round(Math.min(255, Math.max(0, r2))),
        Math.round(Math.min(255, Math.max(0, g2))),
        Math.round(Math.min(255, Math.max(0, b2)))
    ];
}

function rgbToHsluv(r, g, b) {
    const [L, u, v] = rgbToLuv(r, g, b);
    const C = Math.sqrt(u * u + v * v);
    let h = Math.atan2(v, u) * 180 / Math.PI;
    if (h < 0) h += 360;
    
    const maxC = 180 * (1 - Math.abs(L / 100 - 0.5) * 1.5) * 0.8;
    const s = maxC > 0 ? Math.min(100, (C / maxC) * 100) : 0;
    return [h, s, Math.min(100, Math.max(0, L))];
}

// HSLuv entry: ['hsluv', 'h', 's', 'l', 0, 0, 0, 255, 360, 100, 100, 0, 0, 100]

// Okhsv: h=0-360, s=0-100, v=0-100
// Uses Oklab with HSV-like model
function okhsvToRgb(h, s, v) {
    h = ((h % 360) + 360) % 360;
    const sNorm = Math.min(1, Math.max(0, s / 100));
    const vNorm = Math.min(1, Math.max(0, v / 100));
    const hRad = h * Math.PI / 180;
    
    // Oklab lightness: 0-1 (scaled to 0-255 in oklabToRgb)
    const L = 0.2 + vNorm * 0.8;
    let a = 0, b = 0;
    
    if (sNorm > 0) {
        // Max chroma depends on lightness and hue
        const maxC = vNorm * 0.4 * (1 - Math.abs(vNorm - 0.5) * 0.5);
        const C = sNorm * maxC;
        a = C * Math.cos(hRad);
        b = C * Math.sin(hRad);
    }
    
    const [r2, g2, b2] = oklabToRgb(L * 255, a * 255, b * 255);
    return [
        Math.round(Math.min(255, Math.max(0, r2))),
        Math.round(Math.min(255, Math.max(0, g2))),
        Math.round(Math.min(255, Math.max(0, b2)))
    ];
}

function rgbToOkhsv(r, g, b) {
    const [L, a, b_] = rgbToOklab(r, g, b);
    const Lnorm = L / 255; // 0-1
    const aNorm = a / 255;
    const bNorm = b_ / 255;
    
    const C = Math.sqrt(aNorm * aNorm + bNorm * bNorm);
    let h = Math.atan2(bNorm, aNorm) * 180 / Math.PI;
    if (h < 0) h += 360;
    
    // Value: perceptual lightness scaled
    const v = Math.min(100, Math.max(0, (Lnorm - 0.2) / 0.8 * 100));
    
    // Saturation: chroma relative to max possible
    const maxC = (v / 100) * 0.4 * (1 - Math.abs(v / 100 - 0.5) * 0.5);
    const s = maxC > 0 ? Math.min(100, (C / maxC) * 100) : 0;
    
    return [h, s, v];
}

// Okhsv entry: ['okhsv', 'h', 's', 'v', 0, 0, 0, 255, 360, 100, 100, 0, 0, 100]

// Okhsl: h=0-360, s=0-100, l=0-100
// Uses Oklab with HSL-like model
function okhslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360;
    const sNorm = Math.min(1, Math.max(0, s / 100));
    const lNorm = Math.min(1, Math.max(0, l / 100));
    const hRad = h * Math.PI / 180;
    
    // Oklab lightness: 0-1
    const L = 0.15 + lNorm * 0.85;
    let a = 0, b = 0;
    
    if (sNorm > 0) {
        // Max chroma depends on lightness (higher at mid lightness)
        const maxC = (1 - Math.abs(lNorm - 0.5) * 2) * 0.45;
        const C = sNorm * maxC;
        a = C * Math.cos(hRad);
        b = C * Math.sin(hRad);
    }
    
    const [r2, g2, b2] = oklabToRgb(L * 255, a * 255, b * 255);
    return [
        Math.round(Math.min(255, Math.max(0, r2))),
        Math.round(Math.min(255, Math.max(0, g2))),
        Math.round(Math.min(255, Math.max(0, b2)))
    ];
}

// HPLuv: h=0-360, p=0-100, l=0-100
function hpluvToRgb(h, p, l) {
    const luvL = Math.min(100, Math.max(0, l));
    const luvC = Math.min(180, Math.max(0, p * 1.8));
    const luvH = ((h % 360) + 360) % 360;
    const rad = luvH * Math.PI / 180;
    const u = luvC * Math.cos(rad);
    const v = luvC * Math.sin(rad);
    const [r2, g2, b2] = luvToRgb(luvL, u, v);
    return [
        Math.round(Math.min(255, Math.max(0, r2))),
        Math.round(Math.min(255, Math.max(0, g2))),
        Math.round(Math.min(255, Math.max(0, b2)))
    ];
}

function rgbToHpluv(r, g, b) {
    const [L, u, v] = rgbToLuv(r, g, b);
    const C = Math.sqrt(u * u + v * v);
    let h = Math.atan2(v, u) * 180 / Math.PI;
    if (h < 0) h += 360;
    const p = Math.min(100, C / 1.8);
    return [h, p, Math.min(100, Math.max(0, L))];
}

// ['hpluv', 'h', 'p', 'l', 0, 0, 0, 255, 360, 100, 100, 0, 0, 100]

// HSLuv: h=0-360, s=0-100, l=0-100
function hsluvToRgb(h, s, l) {
    const luvL = Math.min(100, Math.max(0, l));
    const sNorm = Math.min(1, Math.max(0, s / 100));
    const luvH = ((h % 360) + 360) % 360;
    const maxC = 180 * (1 - Math.abs(luvL / 100 - 0.5) * 1.5) * 0.8;
    const luvC = sNorm * maxC;
    const rad = luvH * Math.PI / 180;
    const u = luvC * Math.cos(rad);
    const v = luvC * Math.sin(rad);
    const [r2, g2, b2] = luvToRgb(luvL, u, v);
    return [
        Math.round(Math.min(255, Math.max(0, r2))),
        Math.round(Math.min(255, Math.max(0, g2))),
        Math.round(Math.min(255, Math.max(0, b2)))
    ];
}

function rgbToHsluv(r, g, b) {
    const [L, u, v] = rgbToLuv(r, g, b);
    const C = Math.sqrt(u * u + v * v);
    let h = Math.atan2(v, u) * 180 / Math.PI;
    if (h < 0) h += 360;
    const maxC = 180 * (1 - Math.abs(L / 100 - 0.5) * 1.5) * 0.8;
    const s = maxC > 0 ? Math.min(100, (C / maxC) * 100) : 0;
    return [h, s, Math.min(100, Math.max(0, L))];
}

// ['hsluv', 'h', 's', 'l', 0, 0, 0, 255, 360, 100, 100, 0, 0, 100]

// Okhsv: h=0-360, s=0-100, v=0-100
function okhsvToRgb(h, s, v) {
    h = ((h % 360) + 360) % 360;
    const sNorm = Math.min(1, Math.max(0, s / 100));
    const vNorm = Math.min(1, Math.max(0, v / 100));
    const hRad = h * Math.PI / 180;
    const L = 0.2 + vNorm * 0.8;
    let a = 0, b = 0;
    if (sNorm > 0) {
        const maxC = vNorm * 0.4 * (1 - Math.abs(vNorm - 0.5) * 0.5);
        const C = sNorm * maxC;
        a = C * Math.cos(hRad);
        b = C * Math.sin(hRad);
    }
    const [r2, g2, b2] = oklabToRgb(L * 255, a * 255, b * 255);
    return [
        Math.round(Math.min(255, Math.max(0, r2))),
        Math.round(Math.min(255, Math.max(0, g2))),
        Math.round(Math.min(255, Math.max(0, b2)))
    ];
}

function rgbToOkhsv(r, g, b) {
    const [L, a, b_] = rgbToOklab(r, g, b);
    const Lnorm = L / 255;
    const aNorm = a / 255;
    const bNorm = b_ / 255;
    const C = Math.sqrt(aNorm * aNorm + bNorm * bNorm);
    let h = Math.atan2(bNorm, aNorm) * 180 / Math.PI;
    if (h < 0) h += 360;
    const v = Math.min(100, Math.max(0, (Lnorm - 0.2) / 0.8 * 100));
    const maxC = (v / 100) * 0.4 * (1 - Math.abs(v / 100 - 0.5) * 0.5);
    const s = maxC > 0 ? Math.min(100, (C / maxC) * 100) : 0;
    return [h, s, v];
}

// ['okhsv', 'h', 's', 'v', 0, 0, 0, 255, 360, 100, 100, 0, 0, 100]

// Okhsl: h=0-360, s=0-100, l=0-100
function okhslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360;
    const sNorm = Math.min(1, Math.max(0, s / 100));
    const lNorm = Math.min(1, Math.max(0, l / 100));
    const hRad = h * Math.PI / 180;
    const L = 0.15 + lNorm * 0.85;
    let a = 0, b = 0;
    if (sNorm > 0) {
        const maxC = (1 - Math.abs(lNorm - 0.5) * 2) * 0.45;
        const C = sNorm * maxC;
        a = C * Math.cos(hRad);
        b = C * Math.sin(hRad);
    }
    const [r2, g2, b2] = oklabToRgb(L * 255, a * 255, b * 255);
    return [
        Math.round(Math.min(255, Math.max(0, r2))),
        Math.round(Math.min(255, Math.max(0, g2))),
        Math.round(Math.min(255, Math.max(0, b2)))
    ];
}

function rgbToOkhsl(r, g, b) {
    const [L, a, b_] = rgbToOklab(r, g, b);
    const Lnorm = L / 255;
    const aNorm = a / 255;
    const bNorm = b_ / 255;
    const C = Math.sqrt(aNorm * aNorm + bNorm * bNorm);
    let h = Math.atan2(bNorm, aNorm) * 180 / Math.PI;
    if (h < 0) h += 360;
    const l = Math.min(100, Math.max(0, (Lnorm - 0.15) / 0.85 * 100));
    const maxC = (1 - Math.abs(l / 100 - 0.5) * 2) * 0.45;
    const s = maxC > 0 ? Math.min(100, (C / maxC) * 100) : 0;
    return [h, s, l];
}




function din99ToRgb(L99, a99, b99) {
    // Inverse DIN99 -> CIELAB -> RGB
    const [L, a, b_] = din99ToLab(L99, a99, b99);
    return labToRgb(L, a, b_);
}

function rgbToDin99(r, g, b) {
    const [L, a, b_] = rgbToLab(r, g, b);
    return labToDin99(L, a, b_);
}

// --- Core DIN99 Transformations (using DIN99o parameters) ---

function labToDin99(L, a, b) {
    // Parameters for DIN99o (from 2018 version)
    const kE = 1;
    const kCH = 1;

    // 1. Lightness transformation
    const L99 = (105.51 * Math.log(1 + 0.0158 * L)) / kE;

    // 2. Chroma transformation - rotate by 16 degrees (DIN99o)
    const angle = 16 * Math.PI / 180;
    const e = a * Math.cos(angle) + b * Math.sin(angle);
    const f = 0.7 * (-a * Math.sin(angle) + b * Math.cos(angle));

    const G = Math.sqrt(e * e + f * f);
    let a99 = 0, b99 = 0;
    if (G > 0) {
        const k = Math.log(1 + 0.045 * G) / 0.045;
        a99 = k * (e / G);
        b99 = k * (f / G);
    }

    return [L99, a99, b99];
}

function din99ToLab(L99, a99, b99) {
    const kE = 1;
    const kCH = 1;

    // 1. Inverse Lightness
    const L = (Math.exp(L99 * kE / 105.51) - 1) / 0.0158;

    // 2. Inverse Chroma
    const C99 = Math.sqrt(a99 * a99 + b99 * b99);
    let a = 0, b = 0;
    if (C99 > 0) {
        const G = (Math.exp(0.045 * C99 * kCH * kE) - 1) / 0.045;
        const e = G * (a99 / C99);
        const f = G * (b99 / C99);

        // Rotate back by 16 degrees
        const angle = 16 * Math.PI / 180;
        a = e * Math.cos(angle) - (f / 0.7) * Math.sin(angle);
        b = e * Math.sin(angle) + (f / 0.7) * Math.cos(angle);
    }

    return [L, a, b];
}
function din99lchToRgb(L, C, H) {
    const hRad = H * Math.PI / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);
    return din99ToRgb(L, a, b);
}

function rgbToDin99lch(r, g, b) {
    const [L, a, b_] = rgbToDin99(r, g, b);
    const C = Math.sqrt(a * a + b_ * b_);
    let H = Math.atan2(b_, a) * 180 / Math.PI;
    if (H < 0) H += 360;
    return [L, C, H];
}



function a98rgbToRgb(r, g, b) {
    
    const lin = v => Math.pow(v / 255, 2.2);
    const R = lin(r), G = lin(g), B = lin(b);
    
    
    const mtx = [
        [0.576669, 0.185558, 0.188228],
        [0.297345, 0.627355, 0.075285],
        [0.027031, 0.070687, 0.991109]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    
    
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}

function rgbToA98rgb(r, g, b) {
    
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    
    
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    
    const mtx2 = [
        [2.041369, -0.564946, -0.344694],
        [-0.969266, 1.876010, 0.041556],
        [0.013447, -0.118389, 1.015409]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    R2 = Math.min(1, Math.max(0, R2));
    G2 = Math.min(1, Math.max(0, G2));
    B2 = Math.min(1, Math.max(0, B2));
    
    
    const a98 = v => Math.pow(v, 1/2.2) * 255;
    return [Math.round(a98(R2)), Math.round(a98(G2)), Math.round(a98(B2))];
}








function displayp3ToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.4);
    const R = lin(r), G = lin(g), B = lin(b);
    
    
    const mtx = [
        [0.486571, 0.265668, 0.198217],
        [0.228975, 0.691739, 0.079287],
        [0.000000, 0.045113, 1.043944]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}

function rgbToDisplayp3(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [2.493180, -0.931266, -0.402659],
        [-0.829503, 1.762660, 0.023625],
        [0.035854, -0.076189, 0.956714]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    R2 = Math.min(1, Math.max(0, R2));
    G2 = Math.min(1, Math.max(0, G2));
    B2 = Math.min(1, Math.max(0, B2));
    const p3 = v => Math.pow(v, 1/2.4) * 255;
    return [Math.round(p3(R2)), Math.round(p3(G2)), Math.round(p3(B2))];
}





function lrgbToRgb(r, g, b) {
    const R = r / 255, G = g / 255, B = b / 255;
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R)*255), Math.round(srgb(G)*255), Math.round(srgb(B)*255)];
}

function rgbToLrgb(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return [Math.round(lin(r)*255), Math.round(lin(g)*255), Math.round(lin(b)*255)];
}








function rec2020ToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.4);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.636958, 0.144617, 0.168881],
        [0.262700, 0.677998, 0.059302],
        [0.000000, 0.028073, 1.060985]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}

function rgbToRec2020(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [1.716651, -0.355671, -0.253366],
        [-0.666684, 1.616481, 0.015769],
        [0.017640, -0.042771, 0.942103]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    R2 = Math.min(1, Math.max(0, R2));
    G2 = Math.min(1, Math.max(0, G2));
    B2 = Math.min(1, Math.max(0, B2));
    const rec = v => Math.pow(v, 1/2.4) * 255;
    return [Math.round(rec(R2)), Math.round(rec(G2)), Math.round(rec(B2))];
}








function adobergbToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.2);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.576669, 0.185558, 0.188228],
        [0.297345, 0.627355, 0.075285],
        [0.027031, 0.070687, 0.991109]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}

function rgbToAdobergb(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [2.041369, -0.564946, -0.344694],
        [-0.969266, 1.876010, 0.041556],
        [0.013447, -0.118389, 1.015409]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    R2 = Math.min(1, Math.max(0, R2));
    G2 = Math.min(1, Math.max(0, G2));
    B2 = Math.min(1, Math.max(0, B2));
    const adobe = v => Math.pow(v, 1/2.2) * 255;
    return [Math.round(adobe(R2)), Math.round(adobe(G2)), Math.round(adobe(B2))];
}
function a98rgbhslToRgb(h, s, l) { const [r, g, b] = hslToRgb(h, s, l); return a98rgbToRgb(r, g, b); }
function rgbToA98rgbhsl(r, g, b) { const [R, G, B] = rgbToA98rgb(r, g, b); return rgbToHsl(R, G, B); }
function a98rgbhsvToRgb(h, s, v) { const [r, g, b] = hsvToRgb(h, s, v); return a98rgbToRgb(r, g, b); }
function rgbToA98rgbhsv(r, g, b) { const [R, G, B] = rgbToA98rgb(r, g, b); return rgbToHsv(R, G, B); }

function displayp3hslToRgb(h, s, l) { const [r, g, b] = hslToRgb(h, s, l); return displayp3ToRgb(r, g, b); }
function rgbToDisplayp3hsl(r, g, b) { const [R, G, B] = rgbToDisplayp3(r, g, b); return rgbToHsl(R, G, B); }
function displayp3hsvToRgb(h, s, v) { const [r, g, b] = hsvToRgb(h, s, v); return displayp3ToRgb(r, g, b); }
function rgbToDisplayp3hsv(r, g, b) { const [R, G, B] = rgbToDisplayp3(r, g, b); return rgbToHsv(R, G, B); }

function lrgbhslToRgb(h, s, l) { const [r, g, b] = hslToRgb(h, s, l); return lrgbToRgb(r, g, b); }
function rgbToLrgbhsl(r, g, b) { const [R, G, B] = rgbToLrgb(r, g, b); return rgbToHsl(R, G, B); }
function lrgbhsvToRgb(h, s, v) { const [r, g, b] = hsvToRgb(h, s, v); return lrgbToRgb(r, g, b); }
function rgbToLrgbhsv(r, g, b) { const [R, G, B] = rgbToLrgb(r, g, b); return rgbToHsv(R, G, B); }

function rec2020HslToRgb(h, s, l) { const [r, g, b] = hslToRgb(h, s, l); return rec2020ToRgb(r, g, b); }
function rgbToRec2020hsl(r, g, b) { const [R, G, B] = rgbToRec2020(r, g, b); return rgbToHsl(R, G, B); }
function rec2020hsvToRgb(h, s, v) { const [r, g, b] = hsvToRgb(h, s, v); return rec2020ToRgb(r, g, b); }
function rgbToRec2020hsv(r, g, b) { const [R, G, B] = rgbToRec2020(r, g, b); return rgbToHsv(R, G, B); }

function adobergbhslToRgb(h, s, l) { const [r, g, b] = hslToRgb(h, s, l); return adobergbToRgb(r, g, b); }
function rgbToAdobergbhsl(r, g, b) { const [R, G, B] = rgbToAdobergb(r, g, b); return rgbToHsl(R, G, B); }
function adobergbhsvToRgb(h, s, v) { const [r, g, b] = hsvToRgb(h, s, v); return adobergbToRgb(r, g, b); }
function rgbToAdobergbhsv(r, g, b) { const [R, G, B] = rgbToAdobergb(r, g, b); return rgbToHsv(R, G, B); }

function rec709hslToRgb(h, s, l) { const [r, g, b] = hslToRgb(h, s, l); return rec709ToRgb(r, g, b); }
function rgbToRec709hsl(r, g, b) { const [R, G, B] = rgbToRec709(r, g, b); return rgbToHsl(R, G, B); }
function rec709hsvToRgb(h, s, v) { const [r, g, b] = hsvToRgb(h, s, v); return rec709ToRgb(r, g, b); }
function rgbToRec709hsv(r, g, b) { const [R, G, B] = rgbToRec709(r, g, b); return rgbToHsv(R, G, B); }


function rec709ToRgb(r, g, b) {
    
    return srgbToRgb(r, g, b);
}

function rgbToRec709(r, g, b) {
    
    return rgbToSrgb(r, g, b);
}


function rgbToAgx(r, g, b) {

    // sRGB -> linear RGB
    const lin = v => {
        const c = v / 255;

        if (c <= 0.04045) {
            return c / 12.92;
        }

        return Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const R = lin(r);
    const G = lin(g);
    const B = lin(b);


    // Linear RGB -> AgX working space
    const mtx = [
        [0.842479062253094,  0.0423282422610123, 0.0423756549057051],
        [0.0784336000000000, 0.8784686364697720, 0.0784336000000000],
        [0.0792237451477643,  0.0791661274605434, 0.8791429737931040]
    ];

    let [R2, G2, B2] = matrixMult(R, G, B, mtx);


    // Log2 exposure
    const minEV = -12.47393;
    const maxEV = 4.026069;

    const logAgx = v => {
        return Math.log2(Math.max(v, 1e-10));
    };

    R2 = logAgx(R2);
    G2 = logAgx(G2);
    B2 = logAgx(B2);


    // Normalize AgX exposure range
    const normalize = v => {
        v = Math.min(maxEV, Math.max(minEV, v));
        return (v - minEV) / (maxEV - minEV);
    };

    R2 = normalize(R2);
    G2 = normalize(G2);
    B2 = normalize(B2);


    // AgX sigmoid / contrast approximation
    const agxCurve = v => {
        const x2 = v * v;
        const x4 = x2 * x2;

        return (
            15.5   * x4 * x2
          - 40.14  * x4 * v
          + 31.96  * x4
          - 6.868  * x2 * v
          + 0.4298 * x2
          + 0.1191 * v
          - 0.00232
        );
    };

    R2 = agxCurve(R2);
    G2 = agxCurve(G2);
    B2 = agxCurve(B2);


    // AgX working space -> output RGB
    const mtx2 = [
        [ 1.19687900512017,  -0.0528968517574562, -0.0529716355144438],
        [-0.0980208811401368,  1.15190312990417,  -0.0980434501171241],
        [-0.0990297440797205, -0.0989611768448433,  1.15107367264116]
    ];

    [R2, G2, B2] = matrixMult(R2, G2, B2, mtx2);


    // AgX output -> sRGB
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));

        if (c <= 0.0031308) {
            return c * 12.92;
        }

        return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    };


    return [
        Math.round(srgb(R2) * 255),
        Math.round(srgb(G2) * 255),
        Math.round(srgb(B2) * 255)
    ];
}

function agxToRgb(r, g, b) {

    // sRGB -> linear RGB
    const lin = v => {
        const c = v / 255;

        if (c <= 0.04045) {
            return c / 12.92;
        }

        return Math.pow((c + 0.055) / 1.055, 2.4);
    };

    // Input is assumed to be 8-bit sRGB output from AgX
    let R = lin(r);
    let G = lin(g);
    let B = lin(b);


    // Output RGB -> AgX working space
    const mtx = [
        [ 1.19687900512017,  -0.0528968517574562, -0.0529716355144438],
        [-0.0980208811401368,  1.15190312990417,  -0.0980434501171241],
        [-0.0990297440797205, -0.0989611768448433,  1.15107367264116]
    ];

    [R, G, B] = matrixMult(R, G, B, mtx);


    // AgX sigmoid / contrast approximation
    const agxCurve = v => {
        const x2 = v * v;
        const x4 = x2 * x2;

        return (
            15.5   * x4 * x2
          - 40.14  * x4 * v
          + 31.96  * x4
          - 6.868  * x2 * v
          + 0.4298 * x2
          + 0.1191 * v
          - 0.00232
        );
    };


    // Numerically invert the AgX curve
    const inverseAgxCurve = value => {

        let low = 0.0;
        let high = 1.0;

        for (let i = 0; i < 32; i++) {

            const mid = (low + high) * 0.5;
            const result = agxCurve(mid);

            if (result < value) {
                low = mid;
            } else {
                high = mid;
            }
        }

        return (low + high) * 0.5;
    };


    R = inverseAgxCurve(R);
    G = inverseAgxCurve(G);
    B = inverseAgxCurve(B);


    // Undo AgX exposure normalization
    const minEV = -12.47393;
    const maxEV = 4.026069;

    const denormalize = v => {
        return v * (maxEV - minEV) + minEV;
    };

    R = denormalize(R);
    G = denormalize(G);
    B = denormalize(B);


    // Log2 exposure -> linear AgX RGB
    R = Math.pow(2, R);
    G = Math.pow(2, G);
    B = Math.pow(2, B);


    // AgX working space -> linear RGB
    const mtx2 = [
        [0.842479062253094,  0.0423282422610123, 0.0423756549057051],
        [0.0784336000000000, 0.8784686364697720, 0.0784336000000000],
        [0.0792237451477643,  0.0791661274605434, 0.8791429737931040]
    ];

    [R, G, B] = matrixMult(R, G, B, mtx2);


    // Linear RGB -> sRGB
    const srgb = v => {

        const c = Math.max(0, Math.min(1, v));

        if (c <= 0.0031308) {
            return c * 12.92;
        }

        return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    };


    return [
        Math.round(srgb(R) * 255),
        Math.round(srgb(G) * 255),
        Math.round(srgb(B) * 255)
    ];
}


function aces2065ToRgb(r, g, b) {
    
    const R = r / 255;
    const G = g / 255;
    const B = b / 255;
    
    
    const mtx = [
        [0.9525523959, 0.0000000000, 0.0000936786],
        [0.3439664498, 0.7281660967, -0.0721325464],
        [0.0000000000, 0.0000000000, 1.0088251844]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    
    
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}

function rgbToAces2065(r, g, b) {
    
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    
    
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    
    const mtx2 = [
        [1.0498110175, 0.0000000000, -0.0000974845],
        [-0.4959030231, 1.3733130458, 0.0982400361],
        [0.0000000000, 0.0000000000, 0.9912520182]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    
    
    return [
        Math.round(Math.min(255, Math.max(0, R2 * 255))),
        Math.round(Math.min(255, Math.max(0, G2 * 255))),
        Math.round(Math.min(255, Math.max(0, B2 * 255)))
    ];
}






function acescgToRgb(r, g, b) {
    const R = r / 255, G = g / 255, B = b / 255;
    
    
    const mtx = [
        [0.6624541811, 0.1340042065, 0.1561876870],
        [0.2722287168, 0.6740817658, 0.0536895174],
        [-0.0055746495, 0.0040607335, 1.0103391003]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}

function rgbToAcescg(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    
    const mtx2 = [
        [1.6410233797, -0.3248032942, -0.2364246952],
        [-0.6636628587, 1.6153315917, 0.0167563477],
        [0.0117218943, -0.0082844420, 0.9883948585]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, R2 * 255))),
        Math.round(Math.min(255, Math.max(0, G2 * 255))),
        Math.round(Math.min(255, Math.max(0, B2 * 255)))
    ];
}






function acesccToRgb(r, g, b) {
    const R = r / 255, G = g / 255, B = b / 255;
    
    const ccToLinear = (v) => {
        if (v <= 0.155251141552511) {
            return (v - 0.0729055341958355) / 10.5402377416545;
        } else {
            return Math.pow(2, v * 17.52 - 9.72);
        }
    };
    const Rlin = ccToLinear(R);
    const Glin = ccToLinear(G);
    const Blin = ccToLinear(B);
    
    return acescgToRgb(Rlin * 255, Glin * 255, Blin * 255);
}

function rgbToAcescc(r, g, b) {
    const [Rcg, Gcg, Bcg] = rgbToAcescg(r, g, b);
    const R = Rcg / 255, G = Gcg / 255, B = Bcg / 255;
    
    const linearToCc = (v) => {
        if (v <= 0.0078125) {
            return 10.5402377416545 * v + 0.0729055341958355;
        } else {
            return (Math.log2(v) + 9.72) / 17.52;
        }
    };
    return [
        Math.round(Math.min(255, Math.max(0, linearToCc(R) * 255))),
        Math.round(Math.min(255, Math.max(0, linearToCc(G) * 255))),
        Math.round(Math.min(255, Math.max(0, linearToCc(B) * 255)))
    ];
}






function acescctToRgb(r, g, b) {
    const R = r / 255, G = g / 255, B = b / 255;
    
    const cctToLinear = (v) => {
        const Ybreak = 0.155251141552511;
        if (v <= Ybreak) {
            return (v - 0.0729055341958355) / 10.5402377416545;
        } else {
            return Math.pow(2, v * 17.52 - 9.72);
        }
    };
    const Rlin = cctToLinear(R);
    const Glin = cctToLinear(G);
    const Blin = cctToLinear(B);
    
    return acescgToRgb(Rlin * 255, Glin * 255, Blin * 255);
}

function rgbToAcescct(r, g, b) {
    const [Rcg, Gcg, Bcg] = rgbToAcescg(r, g, b);
    const R = Rcg / 255, G = Gcg / 255, B = Bcg / 255;
    
    const linearToCct = (v) => {
        const Xbreak = 0.0078125;
        if (v <= Xbreak) {
            return 10.5402377416545 * v + 0.0729055341958355;
        } else {
            return (Math.log2(v) + 9.72) / 17.52;
        }
    };
    return [
        Math.round(Math.min(255, Math.max(0, linearToCct(R) * 255))),
        Math.round(Math.min(255, Math.max(0, linearToCct(G) * 255))),
        Math.round(Math.min(255, Math.max(0, linearToCct(B) * 255)))
    ];
}






function acesproxyToRgb(r, g, b) {
    const R = r / 255, G = g / 255, B = b / 255;
    
    const StepsPerStop = 50.0;
    const MidCVoffset = 425.0;
    const CVmin = 64, CVmax = 940;
    
    const proxyToLinear = (v) => {
        const cv = v * 1023;
        if (cv < CVmin) return 0;
        if (cv > CVmax) return 65504;
        return Math.pow(2, (cv - MidCVoffset) / StepsPerStop - 2.5);
    };
    const Rlin = proxyToLinear(R);
    const Glin = proxyToLinear(G);
    const Blin = proxyToLinear(B);
    
    
    return acescgToRgb(Math.min(1, Rlin) * 255, Math.min(1, Glin) * 255, Math.min(1, Blin) * 255);
}

function rgbToAcesproxy(r, g, b) {
    const [Rcg, Gcg, Bcg] = rgbToAcescg(r, g, b);
    const R = Rcg / 255, G = Gcg / 255, B = Bcg / 255;
    
    const StepsPerStop = 50.0;
    const MidCVoffset = 425.0;
    const CVmin = 64, CVmax = 940;
    
    const linearToProxy = (v) => {
        if (v <= Math.pow(2, -9.72)) return 0;
        const cv = Math.round((Math.log2(v) + 2.5) * StepsPerStop + MidCVoffset);
        const clamped = Math.max(CVmin, Math.min(CVmax, cv));
        return clamped / 1023;
    };
    return [
        Math.round(Math.min(255, Math.max(0, linearToProxy(R) * 255))),
        Math.round(Math.min(255, Math.max(0, linearToProxy(G) * 255))),
        Math.round(Math.min(255, Math.max(0, linearToProxy(B) * 255)))
    ];
}
function aces2065FloatToRgb(r,g,b){
    let [R,G,B]=matrixMult(r,g,b,[
        [3.2406,-1.5372,-0.4986],
        [-0.9689,1.8758,0.0415],
        [0.0557,-0.2040,1.0570]
    ]);

    const srgb=v=>{
        v=Math.max(0,Math.min(1,v));
        return v<=0.0031308?v*12.92:1.055*Math.pow(v,1/2.4)-0.055;
    };

    return [
        Math.round(srgb(R)*255),
        Math.round(srgb(G)*255),
        Math.round(srgb(B)*255)
    ];
}

function rgbToAces2065Float(r,g,b){
    const lin=v=>{
        v/=255;
        return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4);
    };

    let [X,Y,Z]=matrixMult(lin(r),lin(g),lin(b),[
        [.4124,.3576,.1805],
        [.2126,.7152,.0722],
        [.0193,.1192,.9505]
    ]);

    return matrixMult(X,Y,Z,[
        [1.0498110175,0,-.0000974845],
        [-.4959030231,1.3733130458,.0982400361],
        [0,0,.9912520182]
    ]);
}


//ADD https://github.com/aces-aswf/aces-input-and-colorspaces/tree/2383d3759514dc7f4c6c3a573b089f417ad3a9f1/ACEScc

function ntscjToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.2);
    const R = lin(r), G = lin(g), B = lin(b);
    
    const mtx = [
        [0.6069, 0.1735, 0.2003],
        [0.2989, 0.5866, 0.1145],
        [0.0000, 0.0661, 1.1162]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToNtscj(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [1.7472, -0.4302, -0.2682],
        [-0.9535, 1.7851, 0.0811],
        [0.0159, -0.0643, 0.9429]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, Math.pow(R2, 1/2.2) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(G2, 1/2.2) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(B2, 1/2.2) * 255)))
    ];
}








function museToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 1.67);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.6076, 0.1942, 0.1511],
        [0.2787, 0.6597, 0.0616],
        [0.0000, 0.0587, 1.0522]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToMuse(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [1.7323, -0.4356, -0.2272],
        [-0.7345, 1.5954, 0.1391],
        [0.0456, -0.0966, 0.9594]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, Math.pow(R2, 1/1.67) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(G2, 1/1.67) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(B2, 1/1.67) * 255)))
    ];
}








function macToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 1.8);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToMac(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, Math.pow(R2, 1/1.8) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(G2, 1/1.8) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(B2, 1/1.8) * 255)))
    ];
}





function ictcppqToRgb(i, ct, cp) {
    
    
    
    
    const mtx = [
        [1.096, 0.062, 0.080],
        [0.904, -0.062, -0.080],
        [7.230, 4.045, -2.318]
    ];
    let [l, m, s] = matrixMult(i, ct, cp, mtx);
    
    
    l = pqDecode(l);
    m = pqDecode(m);
    s = pqDecode(s);
    
    
    const [r, g, b] = lmsToRgb(l, m, s);
    
    const pqEOTF = (v) => {
        const m1 = 2610 / 16384;
        const m2 = 2523 / 32;
        const c1 = 3424 / 4096;
        const c2 = 2413 / 128;
        const c3 = 2392 / 128;
        const vp = Math.pow(Math.max(v, 0), 1/m2);
        const val = Math.pow((vp - c1) / (c2 - c3 * vp), 1/m1);
        return Math.max(0, Math.min(1, val));
    };
    return [
        Math.round(Math.min(255, Math.max(0, pqEOTF(r) * 255))),
        Math.round(Math.min(255, Math.max(0, pqEOTF(g) * 255))),
        Math.round(Math.min(255, Math.max(0, pqEOTF(b) * 255)))
    ];
}

function rgbToIctcppq(r, g, b) {
    
    const pqEncode = (v) => {
        const m1 = 2610 / 16384;
        const m2 = 2523 / 32;
        const c1 = 3424 / 4096;
        const c2 = 2413 / 128;
        const c3 = 2392 / 128;
        const vp = Math.pow(v, m1);
        return Math.pow((c1 + c2 * vp) / (1 + c3 * vp), m2);
    };
    const R = pqEncode(r / 255);
    const G = pqEncode(g / 255);
    const B = pqEncode(b / 255);
    
    
    const [l, m, s] = rgbToLms(R * 65535, G * 65535, B * 65535);
    
    
    const lPq = pqEncode(l / 65535);
    const mPq = pqEncode(m / 65535);
    const sPq = pqEncode(s / 65535);
    
    
    const mtx = [
        [0.5, 0.5, 0],
        [1.614746, -3.325684, 0.170898],
        [4.378174, -4.245117, -0.132568]
    ];
    const [i, ct, cp] = matrixMult(lPq * 255, mPq * 255, sPq * 255, mtx);
    return [i, ct, cp];
}






function ictcphlgToRgb(i, ct, cp) {
    
    const mtx = [
        [1.096, 0.062, 0.080],
        [0.904, -0.062, -0.080],
        [7.230, 4.045, -2.318]
    ];
    let [l, m, s] = matrixMult(i, ct, cp, mtx);
    
    
    l = hlgDecode(l / 255);
    m = hlgDecode(m / 255);
    s = hlgDecode(s / 255);
    
    const [r, g, b] = lmsToRgb(l, m, s);
    const hlgEOTF = (v) => {
        const a = 0.17883277;
        const b = 1 - 4 * a;
        const c = 0.5 - a * Math.log(4 * a);
        if (v <= 0.5) return (v * v) / 3;
        return (Math.exp((v - c) / a) + b) / 12;
    };
    return [
        Math.round(Math.min(255, Math.max(0, hlgEOTF(r) * 255))),
        Math.round(Math.min(255, Math.max(0, hlgEOTF(g) * 255))),
        Math.round(Math.min(255, Math.max(0, hlgEOTF(b) * 255)))
    ];
}

function rgbToIctcphlg(r, g, b) {
    const hlgEncode = (v) => {
        const a = 0.17883277;
        const b = 1 - 4 * a;
        const c = 0.5 - a * Math.log(4 * a);
        if (v <= 1/12) return Math.sqrt(3 * v);
        return a * Math.log(12 * v - b) + c;
    };
    const R = hlgEncode(r / 255);
    const G = hlgEncode(g / 255);
    const B = hlgEncode(b / 255);
    
    const [l, m, s] = rgbToLms(R * 255, G * 255, B * 255);
    const lHlg = hlgEncode(l / 255);
    const mHlg = hlgEncode(m / 255);
    const sHlg = hlgEncode(s / 255);
    
    const mtx = [
        [0.5, 0.5, 0],
        [1.614746, -3.325684, 0.170898],
        [4.378174, -4.245117, -0.132568]
    ];
    const [i, ct, cp] = matrixMult(lHlg * 255, mHlg * 255, sHlg * 255, mtx);
    return [i, ct, cp];
}







function icamToRgb(i, c, h) {
    
    
    const hRad = h * Math.PI / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);
    
    
    const L = i / 100;
    const [r, g, bb] = oklabToRgb(L * 255, a * 255, b * 255);
    return [
        Math.round(Math.min(255, Math.max(0, r))),
        Math.round(Math.min(255, Math.max(0, g))),
        Math.round(Math.min(255, Math.max(0, bb)))
    ];
}

function rgbToIcam(r, g, b) {
    const [L, a, b_] = rgbToOklab(r, g, b);
    const Lnorm = L / 255;
    const aNorm = a / 255;
    const bNorm = b_ / 255;
    
    const c = Math.sqrt(aNorm * aNorm + bNorm * bNorm) * 100;
    let h = Math.atan2(bNorm, aNorm) * 180 / Math.PI;
    if (h < 0) h += 360;
    return [Lnorm * 100, c, h];
}






function zcamToRgb(z, c, h) {
    
    
    const hRad = h * Math.PI / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);
    
    
    const L = Math.pow(z / 100, 1.2) * 100;
    const [r, g, bb] = oklabToRgb(L * 255, a * 255, b * 255);
    return [
        Math.round(Math.min(255, Math.max(0, r))),
        Math.round(Math.min(255, Math.max(0, g))),
        Math.round(Math.min(255, Math.max(0, bb)))
    ];
}

function rgbToZcam(r, g, b) {
    const [L, a, b_] = rgbToOklab(r, g, b);
    const Lnorm = L / 255;
    const aNorm = a / 255;
    const bNorm = b_ / 255;
    
    
    const z = Math.pow(Lnorm, 1/1.2) * 100;
    const c = Math.sqrt(aNorm * aNorm + bNorm * bNorm) * 100;
    let h = Math.atan2(bNorm, aNorm) * 180 / Math.PI;
    if (h < 0) h += 360;
    return [z, c, h];
}






function jzczhzToRgb(jz, cz, hz) {
    
    const hRad = hz * Math.PI / 180;
    const az = cz * Math.cos(hRad);
    const bz = cz * Math.sin(hRad);
    return jzazbzToRgb(jz, az, bz);
}

function rgbToJzczhz(r, g, b) {
    
    
    return rgbToJzczhz(r, g, b);
}








function ntscToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.2);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.6069, 0.1735, 0.2003],
        [0.2989, 0.5866, 0.1145],
        [0.0000, 0.0661, 1.1162]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToNtsc(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [1.7317, -0.4960, -0.1267],
        [-0.8715, 1.7762, 0.0367],
        [0.0394, -0.0753, 0.9816]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, Math.pow(R2, 1/2.2) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(G2, 1/2.2) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(B2, 1/2.2) * 255)))
    ];
}








function palToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.8);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.6069, 0.1735, 0.2003],
        [0.2989, 0.5866, 0.1145],
        [0.0000, 0.0661, 1.1162]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToPal(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [1.7472, -0.4302, -0.2682],
        [-0.9535, 1.7851, 0.0811],
        [0.0159, -0.0643, 0.9429]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, Math.pow(R2, 1/2.8) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(G2, 1/2.8) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(B2, 1/2.8) * 255)))
    ];
}








function smptecToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.2);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.6069, 0.1735, 0.2003],
        [0.2989, 0.5866, 0.1145],
        [0.0000, 0.0661, 1.1162]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToSmptec(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [1.7472, -0.4302, -0.2682],
        [-0.9535, 1.7851, 0.0811],
        [0.0159, -0.0643, 0.9429]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, Math.pow(R2, 1/2.2) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(G2, 1/2.2) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(B2, 1/2.2) * 255)))
    ];
}








function ebutech3213ToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.8);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.6069, 0.1735, 0.2003],
        [0.2989, 0.5866, 0.1145],
        [0.0000, 0.0661, 1.1162]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToEbutech3213(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [1.7472, -0.4302, -0.2682],
        [-0.9535, 1.7851, 0.0811],
        [0.0159, -0.0643, 0.9429]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, Math.pow(R2, 1/2.8) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(G2, 1/2.8) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(B2, 1/2.8) * 255)))
    ];
}








function dcip3ToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.6);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.486571, 0.265668, 0.198217],
        [0.228975, 0.691739, 0.079287],
        [0.000000, 0.045113, 1.043944]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    const cat = [
        [0.9556, -0.0234, 0.0632],
        [-0.0281, 1.0095, 0.0186],
        [0.0123, -0.0205, 1.3305]
    ];
    const [X2, Y2, Z2] = matrixMult(X, Y, Z, cat);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X2, Y2, Z2, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToDcip3(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    const catInv = [
        [1.0478, 0.0229, -0.0502],
        [0.0296, 0.9905, -0.0171],
        [-0.0092, 0.0151, 0.7519]
    ];
    const [X2, Y2, Z2] = matrixMult(X, Y, Z, catInv);
    const mtx2 = [
        [2.493180, -0.931266, -0.402659],
        [-0.829503, 1.762660, 0.023625],
        [0.035854, -0.076189, 0.956714]
    ];
    let [R2, G2, B2] = matrixMult(X2, Y2, Z2, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, Math.pow(R2, 1/2.6) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(G2, 1/2.6) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(B2, 1/2.6) * 255)))
    ];
}










function pqToRgb(r, g, b) {
    
    
    const pqDecode = (v) => {
        const m1 = 2610 / 16384;
        const m2 = 2523 / 32;
        const c1 = 3424 / 4096;
        const c2 = 2413 / 128;
        const c3 = 2392 / 128;
        const vp = Math.pow(Math.max(v, 0), 1/m2);
        const val = Math.pow((vp - c1) / (c2 - c3 * vp), 1/m1);
        return Math.max(0, Math.min(1, val));
    };
    const R = pqDecode(r / 255);
    const G = pqDecode(g / 255);
    const B = pqDecode(b / 255);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [
        Math.round(srgb(R)*255),
        Math.round(srgb(G)*255),
        Math.round(srgb(B)*255)
    ];
}
function rgbToPq(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const pqEncode = (v) => {
        const m1 = 2610 / 16384;
        const m2 = 2523 / 32;
        const c1 = 3424 / 4096;
        const c2 = 2413 / 128;
        const c3 = 2392 / 128;
        const vp = Math.pow(Math.max(v, 0), m1);
        return Math.pow((c1 + c2 * vp) / (1 + c3 * vp), m2);
    };
    return [
        Math.round(pqEncode(R)*255),
        Math.round(pqEncode(G)*255),
        Math.round(pqEncode(B)*255)
    ];
}






function hlglToRgb(r, g, b) {
    const hlgDecode = (v) => {
        const a = 0.17883277;
        const b = 1 - 4 * a;
        const c = 0.5 - a * Math.log(4 * a);
        const vn = v / 255;
        if (vn <= 0.5) return (vn * vn) / 3;
        return (Math.exp((vn - c) / a) + b) / 12;
    };
    const R = hlgDecode(r);
    const G = hlgDecode(g);
    const B = hlgDecode(b);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [
        Math.round(srgb(R)*255),
        Math.round(srgb(G)*255),
        Math.round(srgb(B)*255)
    ];
}
function rgbToHlgl(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const hlgEncode = (v) => {
        const a = 0.17883277;
        const b = 1 - 4 * a;
        const c = 0.5 - a * Math.log(4 * a);
        if (v <= 1/12) return Math.sqrt(3 * v);
        return a * Math.log(12 * v - b) + c;
    };
    return [
        Math.round(hlgEncode(R)*255),
        Math.round(hlgEncode(G)*255),
        Math.round(hlgEncode(B)*255)
    ];
}







function hlgToRgb(r, g, b) {
    
    const hlgEOTF = (E) => {
        const a = 0.17883277;
        const b = 1 - 4 * a;
        const c = 0.5 - a * Math.log(4 * a);
        
        if (E <= 0.5) {
            return (E * E) / 3;
        } else {
            return (Math.exp((E - c) / a) + b) / 12;
        }
    };
    
    
    let R_lin = hlgEOTF(r / 255);
    let G_lin = hlgEOTF(g / 255);
    let B_lin = hlgEOTF(b / 255);
    
    
    
    const hlgOOTF = (R, G, B) => {
        const Lw = 1000; 
        const gamma = 1.2; 
        const alpha = Lw / 1000; 
        
        
        const Ys = 0.2627 * R + 0.6780 * G + 0.0593 * B;
        
        
        const factor = alpha * Math.pow(Ys, gamma - 1);
        return [
            factor * R,
            factor * G,
            factor * B
        ];
    };
    
    
    let [R_disp, G_disp, B_disp] = hlgOOTF(R_lin, G_lin, B_lin);
    
    
    const linToSrgb = (v) => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    
    
    
    const scale = 1.0;
    return [
        Math.round(Math.min(255, Math.max(0, linToSrgb(R_disp * scale) * 255))),
        Math.round(Math.min(255, Math.max(0, linToSrgb(G_disp * scale) * 255))),
        Math.round(Math.min(255, Math.max(0, linToSrgb(B_disp * scale) * 255)))
    ];
}

function rgbToHlg(r, g, b) {
    
    const srgbToLin = (v) => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    
    let R_lin = srgbToLin(r);
    let G_lin = srgbToLin(g);
    let B_lin = srgbToLin(b);
    
    
    const invHlgOOTF = (R, G, B) => {
        const gamma = 1.2;
        
        const Yd = 0.2627 * R + 0.6780 * G + 0.0593 * B;
        
        const alpha = 1.0;
        const Ys = Math.pow(Yd / alpha, 1 / gamma);
        
        const factor = Math.pow(Ys, 1 - gamma);
        return [
            R * factor,
            G * factor,
            B * factor
        ];
    };
    
    let [R_scene, G_scene, B_scene] = invHlgOOTF(R_lin, G_lin, B_lin);
    
    
    const hlgOETF = (E) => {
        const a = 0.17883277;
        const b = 1 - 4 * a;
        const c = 0.5 - a * Math.log(4 * a);
        
        
        if (E <= 1/12) {
            return Math.sqrt(3 * E);
        } else {
            return a * Math.log(12 * E - b) + c;
        }
    };
    
    
    const scale = 1.0;
    return [
        Math.round(Math.min(255, Math.max(0, hlgOETF(R_scene * scale) * 255))),
        Math.round(Math.min(255, Math.max(0, hlgOETF(G_scene * scale) * 255))),
        Math.round(Math.min(255, Math.max(0, hlgOETF(B_scene * scale) * 255)))
    ];
}






function hlg2020ToRgb(r, g, b) {
    
    
    const hlgEOTF = (E) => {
        const a = 0.17883277;
        const b = 1 - 4 * a;
        const c = 0.5 - a * Math.log(4 * a);
        if (E <= 0.5) {
            return (E * E) / 3;
        } else {
            return (Math.exp((E - c) / a) + b) / 12;
        }
    };
    
    
    let R_lin = hlgEOTF(r / 255);
    let G_lin = hlgEOTF(g / 255);
    let B_lin = hlgEOTF(b / 255);
    
    
    const hlgOOTF = (R, G, B) => {
        const Lw = 1000;
        const gamma = 1.2;
        const alpha = Lw / 1000;
        const Ys = 0.2627 * R + 0.6780 * G + 0.0593 * B;
        const factor = alpha * Math.pow(Ys, gamma - 1);
        return [factor * R, factor * G, factor * B];
    };
    
    let [R_disp, G_disp, B_disp] = hlgOOTF(R_lin, G_lin, B_lin);
    
    
    const mtx = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R_srgb, G_srgb, B_srgb] = matrixMult(R_disp, G_disp, B_disp, mtx);
    
    const linToSrgb = (v) => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    
    return [
        Math.round(linToSrgb(R_srgb) * 255),
        Math.round(linToSrgb(G_srgb) * 255),
        Math.round(linToSrgb(B_srgb) * 255)
    ];
}

function rgbToHlg2020(r, g, b) {
    
    const srgbToLin = (v) => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    
    let R_srgb = srgbToLin(r);
    let G_srgb = srgbToLin(g);
    let B_srgb = srgbToLin(b);
    
    
    const mtx = [
        [0.636958, 0.144617, 0.168881],
        [0.262700, 0.677998, 0.059302],
        [0.000000, 0.028073, 1.060985]
    ];
    let [R_2020, G_2020, B_2020] = matrixMult(R_srgb, G_srgb, B_srgb, mtx);
    
    
    const invHlgOOTF = (R, G, B) => {
        const gamma = 1.2;
        const Yd = 0.2627 * R + 0.6780 * G + 0.0593 * B;
        const alpha = 1.0;
        const Ys = Math.pow(Yd / alpha, 1 / gamma);
        const factor = Math.pow(Ys, 1 - gamma);
        return [R * factor, G * factor, B * factor];
    };
    
    let [R_scene, G_scene, B_scene] = invHlgOOTF(R_2020, G_2020, B_2020);
    
    
    const hlgOETF = (E) => {
        const a = 0.17883277;
        const b = 1 - 4 * a;
        const c = 0.5 - a * Math.log(4 * a);
        if (E <= 1/12) {
            return Math.sqrt(3 * E);
        } else {
            return a * Math.log(12 * E - b) + c;
        }
    };
    
    return [
        Math.round(Math.min(255, Math.max(0, hlgOETF(R_scene) * 255))),
        Math.round(Math.min(255, Math.max(0, hlgOETF(G_scene) * 255))),
        Math.round(Math.min(255, Math.max(0, hlgOETF(B_scene) * 255)))
    ];
}






function cieluv1960ToRgb(u, v, Y) {
    // Convert CIE 1960 UCS to XYZ, then to sRGB
    // u, v are in 0-100 range (scaled from normal 0-0.6 range)
    // Y is 0-100 (luminance)
    
    // Normalize u,v from 0-100 to 0-0.6 range
    const uNorm = u / 100 * 0.6;
    const vNorm = v / 100 * 0.6;
    const Yn = Y / 100;
    
    // UCS to XYZ (D65)
    const X = (9 * uNorm * Yn) / (4 * vNorm);
    const Z = ((12 - 3 * uNorm - 20 * vNorm) * Yn) / (4 * vNorm);
    
    const [r, g, b] = xyzToRgb(X * 100, Yn * 100, Z * 100);
    return [
        Math.round(Math.min(255, Math.max(0, r))),
        Math.round(Math.min(255, Math.max(0, g))),
        Math.round(Math.min(255, Math.max(0, b)))
    ];
}

function rgbToCieluv1960(r, g, b) {
    // Convert sRGB to XYZ, then to CIE 1960 UCS
    const [X, Y, Z] = rgbToXyz(r, g, b);
    const sum = X + 15 * Y + 3 * Z;
    const u = (4 * X) / sum;
    const v = (6 * Y) / sum;
    
    // Scale u,v from 0-0.6 to 0-100 range
    return [
        Math.round(Math.min(100, Math.max(0, u / 0.6 * 100))),
        Math.round(Math.min(100, Math.max(0, v / 0.6 * 100))),
        Math.round(Math.min(100, Math.max(0, Y)))
    ];
}






function cie1931rgbToRgb(R, G, B) {
    
    
    const mtx = [
        [2.3646, -0.8966, -0.4681],
        [-0.5152, 1.4264, 0.0888],
        [0.0052, -0.0144, 1.0092]
    ];
    const [X, Y, Z] = matrixMult(R/100, G/100, B/100, mtx);
    const [r, g, b] = xyzToRgb(X * 100, Y * 100, Z * 100);
    return [
        Math.round(Math.min(255, Math.max(0, r))),
        Math.round(Math.min(255, Math.max(0, g))),
        Math.round(Math.min(255, Math.max(0, b)))
    ];
}

function rgbToCie1931rgb(r, g, b) {
    const [X, Y, Z] = rgbToXyz(r, g, b);
    const mtx = [
        [0.4185, -0.0912, 0.0009],
        [-0.1587, 0.2524, -0.0025],
        [-0.0828, 0.0157, 0.1786]
    ];
    let [R, G, B] = matrixMult(X/100, Y/100, Z/100, mtx);
    return [
        Math.round(Math.min(100, Math.max(0, R * 100))),
        Math.round(Math.min(100, Math.max(0, G * 100))),
        Math.round(Math.min(100, Math.max(0, B * 100)))
    ];
}





function yuvpalToRgb(y, u, v) {
    
    const mtx = [
        [1.0, 0.0, 1.1398],
        [1.0, -0.3947, -0.5806],
        [1.0, 2.0321, 0.0]
    ];
    let [r, g, b] = matrixMult(y/255, u/255, v/255, mtx);
    return [
        Math.round(Math.min(255, Math.max(0, r * 255))),
        Math.round(Math.min(255, Math.max(0, g * 255))),
        Math.round(Math.min(255, Math.max(0, b * 255)))
    ];
}

function rgbToYuvpal(r, g, b) {
    const mtx = [
        [0.299, 0.587, 0.114],
        [-0.147, -0.289, 0.436],
        [0.615, -0.515, -0.100]
    ];
    const [y, u, v] = matrixMult(r/255, g/255, b/255, mtx);
    return [
        Math.round(Math.min(255, Math.max(0, y * 255))),
        Math.round(Math.min(255, Math.max(0, u * 255))),
        Math.round(Math.min(255, Math.max(0, v * 255)))
    ];
}





function yvwToRgb(y, v, w) {
    
    const mtx = [
        [1.0, 0.000, 1.280],
        [1.0, -0.214, -0.380],
        [1.0, 2.128, 0.000]
    ];
    let [r, g, b] = matrixMult(y/255, v/255, w/255, mtx);
    return [
        Math.round(Math.min(255, Math.max(0, r * 255))),
        Math.round(Math.min(255, Math.max(0, g * 255))),
        Math.round(Math.min(255, Math.max(0, b * 255)))
    ];
}

function rgbToYvw(r, g, b) {
    const mtx = [
        [0.299, 0.587, 0.114],
        [-0.168, -0.331, 0.500],
        [0.500, -0.419, -0.081]
    ];
    const [y, v, w] = matrixMult(r/255, g/255, b/255, mtx);
    return [
        Math.round(Math.min(255, Math.max(0, y * 255))),
        Math.round(Math.min(255, Math.max(0, v * 255))),
        Math.round(Math.min(255, Math.max(0, w * 255)))
    ];
}










function applergbToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 1.8);
    const R = lin(r), G = lin(g), B = lin(b);
    
    const mtx = [
        [0.576669, 0.185558, 0.188228],
        [0.297345, 0.627355, 0.075285],
        [0.027031, 0.070687, 0.991109]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}

function rgbToApplergb(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    const mtx2 = [
        [2.041369, -0.564946, -0.344694],
        [-0.969266, 1.876010, 0.041556],
        [0.013447, -0.118389, 1.015409]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    R2 = Math.min(1, Math.max(0, R2));
    G2 = Math.min(1, Math.max(0, G2));
    B2 = Math.min(1, Math.max(0, B2));
    const apple = v => Math.pow(v, 1/1.8) * 255;
    return [Math.round(apple(R2)), Math.round(apple(G2)), Math.round(apple(B2))];
}









function colormatchToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 1.8);
    const R = lin(r), G = lin(g), B = lin(b);
    
    const mtx = [
        [0.5094668, 0.32087954, 0.13394933],
        [0.27495034, 0.658075, 0.06697467],
        [0.02426032, 0.10877273, 0.69207155]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    const cat = [
        [0.9556, -0.0234, 0.0632],
        [-0.0281, 1.0095, 0.0186],
        [0.0123, -0.0205, 1.3305]
    ];
    const [X2, Y2, Z2] = matrixMult(X, Y, Z, cat);
    
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X2, Y2, Z2, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}

function rgbToColormatch(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    const catInv = [
        [1.0478, 0.0229, -0.0502],
        [0.0296, 0.9905, -0.0171],
        [-0.0092, 0.0151, 0.7519]
    ];
    const [X2, Y2, Z2] = matrixMult(X, Y, Z, catInv);
    
    const mtx2 = [
        [2.64164976, -1.22313179, -0.39291946],
        [-1.11207173, 2.05919502, 0.01596275],
        [0.08218196, -0.28076676, 1.45620209]
    ];
    let [R2, G2, B2] = matrixMult(X2, Y2, Z2, mtx2);
    R2 = Math.min(1, Math.max(0, R2));
    G2 = Math.min(1, Math.max(0, G2));
    B2 = Math.min(1, Math.max(0, B2));
    const cm = v => Math.pow(v, 1/1.8) * 255;
    return [Math.round(cm(R2)), Math.round(cm(G2)), Math.round(cm(B2))];
}







function rommToRgb(r, g, b) {
    
    return prophotoToRgb(r, g, b);
}

function rgbToRomm(r, g, b) {
    return rgbToProphoto(r, g, b);
}




// ============================================================
// ERIMM RGB (Extended Reference Input Medium Metric)
// Source: ISO 22028-3:2023, I3A 7466
// Primaries: R(0.7347,0.2653), G(0.1596,0.8404), B(0.0366,0.0001)
// White: D50 (0.3457,0.3585)
// Transfer: Scene-referred log encoding
// Note: Native range is 0-4095 for 12-bit, but scaled to 0-255 for UI
// ============================================================
function erimmToRgb(r, g, b) {
    // Input r,g,b are 0-255 (representing 0-4095 native range)
    // Decode ERIMM log encoding
    const erimmToLinear = (v) => {
        const vn = v / 255; // 0-1 scale for UI
        // ERIMM uses 12-bit log encoding (0-4095)
        const n = vn * 4095;
        if (n <= 0) return 0;
        // The linear value is 10^( (n - 0.003) / 0.25 )
        // The actual formula uses the 12-bit code value
        const nNorm = n / 4095;
        if (nNorm <= 0.001953) return nNorm * 4096;
        return Math.pow(10, (nNorm - 0.003) / 0.25) * 0.18;
    };
    const R = erimmToLinear(r);
    const G = erimmToLinear(g);
    const B = erimmToLinear(b);
    
    // ERIMM uses same primaries as ProPhoto/ROMM
    const mtx = [
        [0.797760, 0.135190, 0.031340],
        [0.288071, 0.711843, 0.000085],
        [0.000000, 0.000000, 0.824891]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    // Bradford CAT (D50 to D65)
    const cat = [
        [0.9556, -0.0234, 0.0632],
        [-0.0281, 1.0095, 0.0186],
        [0.0123, -0.0205, 1.3305]
    ];
    const [X2, Y2, Z2] = matrixMult(X, Y, Z, cat);
    
    // XYZ (D65) to sRGB
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X2, Y2, Z2, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}

function rgbToErimm(r, g, b) {
    // sRGB to linear
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    
    // sRGB to XYZ (D65)
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    // Inverse Bradford CAT (D65 to D50)
    const catInv = [
        [1.0478, 0.0229, -0.0502],
        [0.0296, 0.9905, -0.0171],
        [-0.0092, 0.0151, 0.7519]
    ];
    const [X2, Y2, Z2] = matrixMult(X, Y, Z, catInv);
    
    // XYZ (D50) to ERIMM primaries (same as ProPhoto)
    const mtx2 = [
        [1.345943, -0.255607, -0.051112],
        [-0.544599, 1.508167, 0.020535],
        [0.000000, 0.000000, 1.211813]
    ];
    let [R2, G2, B2] = matrixMult(X2, Y2, Z2, mtx2);
    R2 = Math.min(1.8, Math.max(0, R2));
    G2 = Math.min(1.8, Math.max(0, G2));
    B2 = Math.min(1.8, Math.max(0, B2));
    
    // ERIMM log encoding (12-bit)
    const linearToErimm = (v) => {
        if (v <= 0) return 0;
        // Scene-referred: scale to 18% grey
        const vScale = v / 0.18;
        if (vScale <= 0.001953) return vScale * 4096 / 4095;
        const code = (0.25 * Math.log10(vScale) + 0.003) * 4095;
        return Math.min(4095, Math.max(0, code)) / 4095;
    };
    return [
        Math.round(Math.min(255, Math.max(0, linearToErimm(R2) * 255))),
        Math.round(Math.min(255, Math.max(0, linearToErimm(G2) * 255))),
        Math.round(Math.min(255, Math.max(0, linearToErimm(B2) * 255)))
    ];
}
// 

function cam02jchToRgb(J, C, h) {
    
    const hRad = h * Math.PI / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);
    return cam02UcsToRgb(J, a, b);
}

function rgbToCam02jch(r, g, b) {
    const [J, a, b_] = rgbToCam02Ucs(r, g, b);
    const C = Math.sqrt(a * a + b_ * b_);
    let h = Math.atan2(b_, a) * 180 / Math.PI;
    if (h < 0) h += 360;
    return [J, C, h];
}





function cam16jchToRgb(J, C, h) {
    const hRad = h * Math.PI / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);
    return cam16UcsToRgb(J, a, b);
}

function rgbToCam16jch(r, g, b) {
    const [J, a, b_] = rgbToCam16Ucs(r, g, b);
    const C = Math.sqrt(a * a + b_ * b_);
    let h = Math.atan2(b_, a) * 180 / Math.PI;
    if (h < 0) h += 360;
    return [J, C, h];
}





// RYB - Red-Yellow-Blue
function rybToRgb(r, y, b) {
    r /= 255; y /= 255; b /= 255;
    const mtx = [
        [1.0, 1.0, 0.0],
        [0.0, 1.0, 0.0],
        [0.0, 0.0, 1.0]
    ];
    let [R, G, B] = matrixMult(r, y, b, mtx);
    return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
}
function rgbToRyb(r, g, b) {
    const [R, G, B] = [r / 255, g / 255, b / 255];
    const mtx = [
        [1.0, -1.0, 0.0],
        [0.0, 1.0, 0.0],
        [0.0, 0.0, 1.0]
    ];
    let [ry, yel, bl] = matrixMult(R, G, B, mtx);
    return [Math.round(ry * 255), Math.round(yel * 255), Math.round(bl * 255)];
}

// RCB - Red-Cyan-Blue
function rcbToRgb(r, c, b) {
    r /= 255; c /= 255; b /= 255;
    const mtx = [
        [1.0, 0.0, 0.0],
        [0.0, 1.0, 1.0],
        [0.0, 0.0, 1.0]
    ];
    let [R, G, B] = matrixMult(r, c, b, mtx);
    return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
}
function rgbToRcb(r, g, b) {
    const [R, G, B] = [r / 255, g / 255, b / 255];
    const mtx = [
        [1.0, 0.0, 0.0],
        [0.0, 1.0, -1.0],
        [0.0, 0.0, 1.0]
    ];
    let [re, cy, bl] = matrixMult(R, G, B, mtx);
    return [Math.round(re * 255), Math.round(cy * 255), Math.round(bl * 255)];
}

// YGB - Yellow-Green-Blue
function ygbToRgb(y, g, b) {
    y /= 255; g /= 255; b /= 255;
    const mtx = [
        [1.0, 0.0, 0.0],
        [1.0, 1.0, 0.0],
        [0.0, 0.0, 1.0]
    ];
    let [R, G, B] = matrixMult(y, g, b, mtx);
    return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
}
function rgbToYgb(r, g, b) {
    const [R, G, B] = [r / 255, g / 255, b / 255];
    const mtx = [
        [1.0, 0.0, 0.0],
        [-1.0, 1.0, 0.0],
        [0.0, 0.0, 1.0]
    ];
    let [ye, gr, bl] = matrixMult(R, G, B, mtx);
    return [Math.round(ye * 255), Math.round(gr * 255), Math.round(bl * 255)];
}

// MGB - Magenta-Green-Blue
function mgbToRgb(m, g, b) {
    m /= 255; g /= 255; b /= 255;
    const mtx = [
        [1.0, 0.0, 0.0],
        [0.0, 1.0, 0.0],
        [1.0, 0.0, 1.0]
    ];
    let [R, G, B] = matrixMult(m, g, b, mtx);
    return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
}
function rgbToMgb(r, g, b) {
    const [R, G, B] = [r / 255, g / 255, b / 255];
    const mtx = [
        [1.0, 0.0, .0],
        [0.0, 1.0, 0.0],
        [-1.0, 0.0, 1.0]
    ];
    let [ma, gr, bl] = matrixMult(R, G, B, mtx);
    return [Math.round(ma * 255), Math.round(gr * 255), Math.round(bl * 255)];
}

// RGC - Red-Green-Cyan
function rgcToRgb(r, g, c) {
    r /= 255; g /= 255; c /= 255;
    const mtx = [
        [1.0, 0.0, 0.0],
        [0.0, 1.0, 1.0],
        [0.0, 0.0, 1.0]
    ];
    let [R, G, B] = matrixMult(r, g, c, mtx);
    return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
}
function rgbToRgc(r, g, b) {
    const [R, G, B] = [r / 255, g / 255, b / 255];
    const mtx = [
        [1.0, 0.0, 0.0],
        [0.0, 1.0, -1.0],
        [0.0, 0.0, 1.0]
    ];
    let [re, gr, cy] = matrixMult(R, G, B, mtx);
    return [Math.round(re * 255), Math.round(gr * 255), Math.round(cy * 255)];
}

// RGM - Red-Green-Magenta
function rgmToRgb(r, g, m) {
    r /= 255; g /= 255; m /= 255;
    const mtx = [
        [1.0, 0.0, 1.0],
        [0.0, 1.0, 0.0],
        [0.0, 0.0, 1.0]
    ];
    let [R, G, B] = matrixMult(r, g, m, mtx);
    return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
}
function rgbToRgm(r, g, b) {
    const [R, G, B] = [r / 255, g / 255, b / 255];
    const mtx = [
        [1.0, 0.0, -1.0],
        [0.0, 1.0, 0.0],
        [0.0, 0.0, 1.0]
    ];
    let [re, gr, ma] = matrixMult(R, G, B, mtx);
    return [Math.round(re * 255), Math.round(gr * 255), Math.round(ma * 255)];
}
function rcbToRgb(r, y, b) {
    
    
    r = r / 255;
    y = y / 255;
    b = b / 255;
    
    
    const mtx = [
        [1.0, 0.0, 0.0],
        [0.0, 1.0, 0.0],
        [0.0, 1.0, 1.0]
    ];
    let [R, G, B] = matrixMult(r, y, b, mtx);
    return [
        Math.round(Math.min(255, Math.max(0, R * 255))),
        Math.round(Math.min(255, Math.max(0, G * 255))),
        Math.round(Math.min(255, Math.max(0, B * 255)))
    ];
}

function rgbToRcb(r, g, b) {
    
    const R = r / 255;
    const G = g / 255;
    const B = b / 255;
    
    
    const mtx = [
        [1.000, 0.000, 0.000],
    [0.000, 1.000, 0.000],
    [0.000, -1.000, 1.000]
    ];
    let [ry, yel, bl] = matrixMult(R, G, B, mtx);
    return [
        Math.round(Math.min(255, Math.max(0, ry * 255))),
        Math.round(Math.min(255, Math.max(0, yel * 255))),
        Math.round(Math.min(255, Math.max(0, bl * 255)))
    ];
}


function websafeToRgb(r, g, b) {
    // Web-safe colors use steps of 0x33 (51) in each channel
    const step = 51;
    const roundToWebsafe = (v) => {
        const steps = [0, 51, 102, 153, 204, 255];
        let closest = steps[0];
        let minDiff = Infinity;
        for (const s of steps) {
            const diff = Math.abs(v - s);
            if (diff < minDiff) {
                minDiff = diff;
                closest = s;
            }
        }
        return closest;
    };
    return [roundToWebsafe(r), roundToWebsafe(g), roundToWebsafe(b)];
}

function rgbToWebsafe(r, g, b) {
    return websafeToRgb(r, g, b);
}

function i1i2i3ToRgb(i1, i2, i3) {
  
    const I1 = i1 / 100;
    const I2 = (i2 / 100) * 2 - 1; 
    const I3 = (i3 / 100) * 2 - 1; 


    const mtx = [
        [1.0, 1.0, 1.0],
        [1.0, 0.0, -2.0],
        [1.0, -1.0, 1.0]
    ];
    let [R, G, B] = matrixMult(I1, I2, I3, mtx);

    return [
        Math.round(Math.min(255, Math.max(0, R * 255))),
        Math.round(Math.min(255, Math.max(0, G * 255))),
        Math.round(Math.min(255, Math.max(0, B * 255)))
    ];
}

function rgbToI1i2i3(r, g, b) {
    const R = r / 255;
    const G = g / 255;
    const B = b / 255;

  
    const mtx = [
        [1/3, 1/3, 1/3],
        [1/2, 0, -1/2],
        [-1/4, 1/2, -1/4]
    ];
    let [I1, I2, I3] = matrixMult(R, G, B, mtx);


    return [
        Math.round(I1 * 100),
        Math.round((I2 + 0.5) * 100),
        Math.round((I3 + 0.5) * 100)
    ];
}

function prophotoToRgb(r, g, b) {
    
    
    const lin = (v) => {
        const vn = v / 255;
        if (vn <= 16/255) return vn / 16;
        return Math.pow(vn, 1.8);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    
    
    const mtx = [
        [0.797760, 0.135190, 0.031340],
        [0.288071, 0.711843, 0.000085],
        [0.000000, 0.000000, 0.824891]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    
    const cat = [
        [0.9556, -0.0234, 0.0632],
        [-0.0281, 1.0095, 0.0186],
        [0.0123, -0.0205, 1.3305]
    ];
    const [X2, Y2, Z2] = matrixMult(X, Y, Z, cat);
    
    
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X2, Y2, Z2, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}

function rgbToProphoto(r, g, b) {
    
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    
    
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    
    
    const catInv = [
        [1.0478, 0.0229, -0.0502],
        [0.0296, 0.9905, -0.0171],
        [-0.0092, 0.0151, 0.7519]
    ];
    const [X2, Y2, Z2] = matrixMult(X, Y, Z, catInv);
    
    
    const mtx2 = [
        [1.345943, -0.255607, -0.051112],
        [-0.544599, 1.508167, 0.020535],
        [0.000000, 0.000000, 1.211813]
    ];
    let [R2, G2, B2] = matrixMult(X2, Y2, Z2, mtx2);
    const prophotoEnc = v => {
        if (v <= 16/255) return v * 16;
        return Math.pow(v, 1/1.8) * 255;
    };
    return [
        Math.round(Math.min(255, Math.max(0, prophotoEnc(R2)))),
        Math.round(Math.min(255, Math.max(0, prophotoEnc(G2)))),
        Math.round(Math.min(255, Math.max(0, prophotoEnc(B2))))
    ];
}





function xvyccToRgb(y, cb, cr) {
    
    
    const y2 = y / 255;
    const cb2 = (cb - 128) / 128;
    const cr2 = (cr - 128) / 128;
    
    const mtx = [
        [1.000, 0.000, 1.5748],
        [1.000, -0.1873, -0.4681],
        [1.000, 1.8556, 0.000]
    ];
    let [r, g, b] = matrixMult(y2, cb2, cr2, mtx);
    return [
        Math.round(Math.min(255, Math.max(0, r * 255))),
        Math.round(Math.min(255, Math.max(0, g * 255))),
        Math.round(Math.min(255, Math.max(0, b * 255)))
    ];
}

function rgbToXvycc(r, g, b) {
    const R = r / 255, G = g / 255, B = b / 255;
    const mtx = [
        [0.299, 0.587, 0.114],
        [-0.169, -0.331, 0.500],
        [0.500, -0.419, -0.081]
    ];
    let [y, cb, cr] = matrixMult(R, G, B, mtx);
    return [
        Math.round(Math.min(255, Math.max(0, y * 255))),
        Math.round(Math.min(255, Math.max(0, (cb + 0.5) * 255))),
        Math.round(Math.min(255, Math.max(0, (cr + 0.5) * 255)))
    ];

}





function coloroidToRgb(A, S, L) {
    
    
    const h = A / 100 * 360;
    const s = S / 100;
    const l = L / 100;
    
    
    const hueMap = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360];
    const hueIndex = Math.floor(h / 20);
    const hueFrac = (h % 20) / 20;
    
    
    const [R, G, B] = hslToRgb(h, s * 100, l * 100);
    return [R, G, B];
}

function rgbToColoroid(r, g, b) {
    const [h, s, l] = rgbToHsl(r, g, b);
    const A = h / 360 * 100;
    const S = s;
    const L = l;
    return [A, S, L];
}








function palmToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.2);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.6069, 0.1735, 0.2003],
        [0.2989, 0.5866, 0.1145],
        [0.0000, 0.0661, 1.1162]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToPalm(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [1.7472, -0.4302, -0.2682],
        [-0.9535, 1.7851, 0.0811],
        [0.0159, -0.0643, 0.9429]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, Math.pow(R2, 1/2.2) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(G2, 1/2.2) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(B2, 1/2.2) * 255)))
    ];
}









function rimmToRgb(r, g, b) {
    
    const lin = v => {
        if (v <= 16) return v / 16;
        return Math.pow(v / 255, 1.8);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.7977, 0.1352, 0.0313],
        [0.2880, 0.7119, 0.0001],
        [0.0000, 0.0000, 0.8249]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToRimm(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [1.3460, -0.2556, -0.0511],
        [-0.5446, 1.5082, 0.0205],
        [0.0000, 0.0000, 1.2123]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const rimmEnc = v => {
        if (v <= 16/255) return v * 16;
        return Math.pow(v, 1/1.8) * 255;
    };
    return [
        Math.round(Math.min(255, Math.max(0, rimmEnc(R2)))),
        Math.round(Math.min(255, Math.max(0, rimmEnc(G2)))),
        Math.round(Math.min(255, Math.max(0, rimmEnc(B2))))
    ];
}








function secamToRgb(r, g, b) {
    const lin = v => Math.pow(v / 255, 2.8);
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.6069, 0.1735, 0.2003],
        [0.2989, 0.5866, 0.1145],
        [0.0000, 0.0661, 1.1162]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [3.2406, -1.5372, -0.4986],
        [-0.9689, 1.8758, 0.0415],
        [0.0557, -0.2040, 1.0570]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    const srgb = v => {
        const c = Math.min(1, Math.max(0, v));
        if (c <= 0.0031308) return c * 12.92;
        return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    };
    return [Math.round(srgb(R2)*255), Math.round(srgb(G2)*255), Math.round(srgb(B2)*255)];
}
function rgbToSecam(r, g, b) {
    const lin = v => {
        const c = v / 255;
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const mtx = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    const [X, Y, Z] = matrixMult(R, G, B, mtx);
    const mtx2 = [
        [1.7472, -0.4302, -0.2682],
        [-0.9535, 1.7851, 0.0811],
        [0.0159, -0.0643, 0.9429]
    ];
    let [R2, G2, B2] = matrixMult(X, Y, Z, mtx2);
    return [
        Math.round(Math.min(255, Math.max(0, Math.pow(R2, 1/2.8) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(G2, 1/2.8) * 255))),
        Math.round(Math.min(255, Math.max(0, Math.pow(B2, 1/2.8) * 255)))
    ];
}












// ['okhsl', 'h', 's', 'l', 0, 0, 0, 255, 360, 100, 100, 0, 0, 100]

// Helmlab MetricSpace (simplified): l=0-100, a=-100-100, b=-100-100
// For production, use the official helmlab package
function helmlabToRgb(l, a, b) {
    const lNorm = l / 100;
    const aNorm = a / 100;
    const bNorm = b / 100;
    
    // Approximate inverse: use Oklab as proxy with rotation
    const phi = -28.2 * Math.PI / 180;
    const aRot = aNorm * Math.cos(-phi) - bNorm * Math.sin(-phi);
    const bRot = aNorm * Math.sin(-phi) + bNorm * Math.cos(-phi);
    
    const [r2, g2, b2] = oklabToRgb(lNorm * 255, aRot * 255, bRot * 255);
    return [
        Math.round(Math.min(255, Math.max(0, r2))),
        Math.round(Math.min(255, Math.max(0, g2))),
        Math.round(Math.min(255, Math.max(0, b2)))
    ];
}

function rgbToHelmlab(r, g, b) {
    const [L, a, b_] = rgbToOklab(r, g, b);
    const lNorm = L / 255;
    const aNorm = a / 255;
    const bNorm = b_ / 255;
    
    const phi = -28.2 * Math.PI / 180;
    const aRot = aNorm * Math.cos(phi) - bNorm * Math.sin(phi);
    const bRot = aNorm * Math.sin(phi) + bNorm * Math.cos(phi);
    
    return [
        Math.min(100, Math.max(0, lNorm * 100)),
        aRot * 100,
        bRot * 100
    ];
}

// ['helmlab', 'l', 'a', 'b', 0, -100, -100, 100, 100, 100, 0, 0, 100]

// Helmlab GenSpace (Helmgen): l=0-100, a=-100-100, b=-100-100
function helmgenToRgb(l, a, b) {
    const lNorm = l / 100;
    const aNorm = a / 100;
    const bNorm = b / 100;
    
    // L-gated hue enrichment (blue band correction)
    const hue = Math.atan2(bNorm, aNorm);
    const chroma = Math.sqrt(aNorm * aNorm + bNorm * bNorm);
    let hueDeg = hue * 180 / Math.PI;
    if (hueDeg < 0) hueDeg += 360;
    
    let aEnr = aNorm, bEnr = bNorm;
    if (lNorm > 0.37 && Math.abs(hueDeg - 264.5) < 40 && chroma > 0) {
        const amp = 0.058 * Math.exp(-Math.pow((hueDeg - 264.5) / 40, 2));
        const newHue = hue + amp;
        aEnr = chroma * Math.cos(newHue);
        bEnr = chroma * Math.sin(newHue);
    }
    
    const [r2, g2, b2] = oklabToRgb(lNorm * 255, aEnr * 255, bEnr * 255);
    return [
        Math.round(Math.min(255, Math.max(0, r2))),
        Math.round(Math.min(255, Math.max(0, g2))),
        Math.round(Math.min(255, Math.max(0, b2)))
    ];
}

function rgbToHelmgen(r, g, b) {
    const [L, a, b_] = rgbToOklab(r, g, b);
    return [
        Math.min(100, Math.max(0, L / 255 * 100)),
        a / 255 * 100,
        b_ / 255 * 100
    ];
}

// ['helmgen', 'l', 'a', 'b', 0, -100, -100, 100, 100, 100, 0, 0, 100]

// Helmlab LCH variants
function helmgenlchToRgb(l, c, h) {
    const hRad = h * Math.PI / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);
    return helmgenToRgb(l, a, b);
}

function rgbToHelmgenlch(r, g, b) {
    const [l, a, b_] = rgbToHelmgen(r, g, b);
    const c = Math.sqrt(a * a + b_ * b_);
    let h = Math.atan2(b_, a) * 180 / Math.PI;
    if (h < 0) h += 360;
    return [l, c, h];
}

// ['helmgenlch', 'l', 'c', 'h', 0, 0, 0, 100, 150, 360, 0, 0, 100]


function rgbToOkhsl(r, g, b) {
    const [L, a, b_] = rgbToOklab(r, g, b);
    const Lnorm = L / 255;
    const aNorm = a / 255;
    const bNorm = b_ / 255;
    
    const C = Math.sqrt(aNorm * aNorm + bNorm * bNorm);
    let h = Math.atan2(bNorm, aNorm) * 180 / Math.PI;
    if (h < 0) h += 360;
    
    // Lightness: scaled to 0-100
    const l = Math.min(100, Math.max(0, (Lnorm - 0.15) / 0.85 * 100));
    
    // Saturation: chroma relative to max for this lightness
    const maxC = (1 - Math.abs(l / 100 - 0.5) * 2) * 0.45;
    const s = maxC > 0 ? Math.min(100, (C / maxC) * 100) : 0;
    
    return [h, s, l];
}

// Okhsl entry: ['okhsl', 'h', 's', 'l', 0, 0, 0, 255, 360, 100, 100, 0, 0, 100]
function xyzToXyb(X, Y, Z) {
    // Constants from JPEG XL white paper
    const bias = 0.00379307325527544933;
    
    // LMS-like cone responses with bias
    const Lmix = 0.3 * X + 0.622 * Y + 0.078 * Z + bias;
    const Mmix = 0.23 * X + 0.692 * Y + 0.078 * Z + bias;
    const Smix = 0.24342268924547819 * X + 0.20476744424496821 * Y + 0.55180986650955360 * Z + bias;
    
    // Cube root gamma (gamma = 3 for efficient decoding)
    const cbrt = v => Math.sign(v) * Math.pow(Math.abs(v), 1/3);
    const Lgamma = cbrt(Lmix) - cbrt(bias);
    const Mgamma = cbrt(Mmix) - cbrt(bias);
    const Sgamma = cbrt(Smix) - cbrt(bias);
    
    // XYB conversion
    const Xyb = (Lgamma - Mgamma) / 2;
    const Yyb = (Lgamma + Mgamma) / 2;
    const Byb = Sgamma;
    
    return [Xyb, Yyb, Byb];
}

function xybToXyz(Xyb, Yyb, Byb) {
    const bias = 0.00379307325527544933;
    const cbrt = v => Math.sign(v) * Math.pow(Math.abs(v), 1/3);
    
    // Inverse transform
    const Lgamma = Xyb + Yyb;
    const Mgamma = Yyb - Xyb;
    const Sgamma = Byb;
    
    // Cube back
    const cube = v => v * v * v;
    const Lmix = cube(Lgamma) + cube(cbrt(bias));
    const Mmix = cube(Mgamma) + cube(cbrt(bias));
    const Smix = cube(Sgamma) + cube(cbrt(bias));
    
    // Inverse LMS to XYZ (approximate)
    const X = (Lmix - 0.622 * Mmix - 0.078 * Smix) / 0.3;
    const Y = Mmix - 0.078 * Smix;
    const Z = Smix / 0.55180986650955360;
    
    return [X, Y, Z];
}

function rgbToXyb(r, g, b) {
    const [X, Y, Z] = rgbToXyz(r, g, b);
    return xyzToXyb(X, Y, Z);
}

function xybToRgb(x, y, b) {
    const [X, Y, Z] = xybToXyz(x, y, b);
    return xyzToRgb(X, Y, Z);
}


//=====================================================
// CAM02 UCS
//=====================================================

function cam02UcsToRgb(Jp, ap, bp)
{
    Jp = Math.min(100, Math.max(0, Jp));

    const J = Jp / (1.7 - 0.007 * Jp);
    const L = Math.min(1, Math.max(0, J / 100));

    const Mp = Math.sqrt(ap * ap + bp * bp);
    const M = (Math.exp(0.0228 * Mp) - 1) / 0.0228;

    const h = Math.atan2(bp, ap);

    const a = M * Math.cos(h);
    const b = M * Math.sin(h);

    const [r,g,bb] = oklabToRgb(
        L * 255,
        Math.max(-100, Math.min(100,a)),
        Math.max(-100, Math.min(100,b))
    );

    return [
        Math.round(Math.max(0,Math.min(255,r))),
        Math.round(Math.max(0,Math.min(255,g))),
        Math.round(Math.max(0,Math.min(255,bb)))
    ];
}

function rgbToCam02Ucs(r,g,b)
{
    r=Math.max(0,Math.min(255,r));
    g=Math.max(0,Math.min(255,g));
    b=Math.max(0,Math.min(255,b));

    const [L,a,b_] = rgbToOklab(r,g,b);

    const Lnorm=Math.max(0,Math.min(1,L/255));

    const J=Lnorm*100;
    const Jp=(1.7*J)/(1+0.007*J);

    const M=Math.sqrt(a*a+b_*b_);
    const Mp=Math.log(1+0.0228*M)/0.0228;

    const h=Math.atan2(b_,a);

    return [
        Jp,
        Mp*Math.cos(h),
        Mp*Math.sin(h)
    ];
}

//=====================================================
// CAM02 LCD
//=====================================================

function cam02lcdToRgb(J,a,b)
{
    J=Math.max(0,Math.min(100,J));

    a=Math.max(-150,Math.min(150,a));
    b=Math.max(-150,Math.min(150,b));

    const ap=a*100/150;
    const bp=b*100/150;

    return cam02UcsToRgb(J,ap,bp);
}

function rgbToCam02lcd(r,g,b)
{
    const [Jp,ap,bp]=rgbToCam02Ucs(r,g,b);

    return [
        Jp,
        ap*150/100,
        bp*150/100
    ];
}

//=====================================================
// CAM02 LCD LCH
//=====================================================

function cam02lcdlchToRgb(L,C,H)
{
    const hr=H*Math.PI/180;

    return cam02lcdToRgb(
        L,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}

function rgbToCam02lcdlch(r,g,b)
{
    const [L,a,b_]=rgbToCam02lcd(r,g,b);

    const C=Math.sqrt(a*a+b_*b_);

    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;

    return [L,C,H];
}

//=====================================================
// CAM02 LCD HSV
//=====================================================

function cam02lcdhsvToRgb(H,S,V)
{
    H=((H%360)+360)%360;

    S=Math.max(0,Math.min(100,S));
    V=Math.max(0,Math.min(100,V));

    const C=(S/100)*150*(V/100);

    const hr=H*Math.PI/180;

    return cam02lcdToRgb(
        V,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}

function rgbToCam02lcdhsv(r,g,b)
{
    const [J,a,b_]=rgbToCam02lcd(r,g,b);

    const C=Math.sqrt(a*a+b_*b_);

    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;

    return [
        H,
        Math.min(100,C/150*100),
        J
    ];
}
//=====================================================
// CAM02 SCD
//=====================================================

function cam02scdToRgb(J,a,b)
{
    J=Math.max(0,Math.min(100,J));

    a=Math.max(-150,Math.min(150,a));
    b=Math.max(-150,Math.min(150,b));

    const ap=a*100/150;
    const bp=b*100/150;

    return cam02UcsToRgb(J,ap,bp);
}

function rgbToCam02scd(r,g,b)
{
    const [Jp,ap,bp]=rgbToCam02Ucs(r,g,b);

    return [
        Jp,
        ap*150/100,
        bp*150/100
    ];
}

//=====================================================
// CAM02 SCD LCH
//=====================================================

function cam02scdlchToRgb(L,C,H)
{
    const hr=H*Math.PI/180;

    return cam02scdToRgb(
        L,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}

function rgbToCam02scdlch(r,g,b)
{
    const [L,a,b_]=rgbToCam02scd(r,g,b);

    const C=Math.sqrt(a*a+b_*b_);

    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;

    return [L,C,H];
}

//=====================================================
// CAM02 SCD HSV
//=====================================================

function cam02scdhsvToRgb(H,S,V)
{
    H=((H%360)+360)%360;

    S=Math.max(0,Math.min(100,S));
    V=Math.max(0,Math.min(100,V));

    const C=(S/100)*150*(V/100);

    const hr=H*Math.PI/180;

    return cam02scdToRgb(
        V,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}

function rgbToCam02scdhsv(r,g,b)
{
    const [J,a,b_]=rgbToCam02scd(r,g,b);

    const C=Math.sqrt(a*a+b_*b_);

    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;

    return [
        H,
        Math.min(100,C/150*100),
        J
    ];
}

//=====================================================
// CAM02 SCD HSL
//=====================================================

function cam02scdhslToRgb(H,S,L)
{
    H=((H%360)+360)%360;

    S=Math.max(0,Math.min(100,S));
    L=Math.max(0,Math.min(100,L));

    const C=
        (S/100)
        *150
        *(1-Math.abs(L/100-0.5)*2);

    const hr=H*Math.PI/180;

    return cam02scdToRgb(
        L,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}

function rgbToCam02scdhsl(r,g,b)
{
    const [J,a,b_]=rgbToCam02scd(r,g,b);

    const C=Math.sqrt(a*a+b_*b_);

    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;

    return [
        H,
        Math.min(100,C/150*100),
        J
    ];
}

//=====================================================
// CAM16 UCS
//=====================================================

function cam16UcsToRgb(Jp,ap,bp)
{
    Jp=Math.max(0,Math.min(100,Jp));

    const J=Jp/(1.7-0.007*Jp);
    const L=Math.max(0,Math.min(1,J/100));

    const Mp=Math.sqrt(ap*ap+bp*bp);
    const M=(Math.exp(0.0228*Mp)-1)/0.0228;

    const h=Math.atan2(bp,ap);

    const a=M*Math.cos(h);
    const b=M*Math.sin(h);

    const [r,g,bb]=oklabToRgb(
        L*255,
        Math.max(-100,Math.min(100,a)),
        Math.max(-100,Math.min(100,b))
    );

    return [
        Math.round(Math.max(0,Math.min(255,r))),
        Math.round(Math.max(0,Math.min(255,g))),
        Math.round(Math.max(0,Math.min(255,bb)))
    ];
}

function rgbToCam16Ucs(r,g,b)
{
    r=Math.max(0,Math.min(255,r));
    g=Math.max(0,Math.min(255,g));
    b=Math.max(0,Math.min(255,b));

    const [L,a,b_]=rgbToOklab(r,g,b);

    const Lnorm=Math.max(0,Math.min(1,L/255));

    const J=Lnorm*100;
    const Jp=(1.7*J)/(1+0.007*J);

    const M=Math.sqrt(a*a+b_*b_);
    const Mp=Math.log(1+0.0228*M)/0.0228;

    const h=Math.atan2(b_,a);

    return [
        Jp,
        Mp*Math.cos(h),
        Mp*Math.sin(h)
    ];
}

//=====================================================
// CAM16 LCD
//=====================================================

function cam16lcdToRgb(J,a,b)
{
    J=Math.max(0,Math.min(100,J));

    a=Math.max(-150,Math.min(150,a));
    b=Math.max(-150,Math.min(150,b));

    const ap=a*100/150;
    const bp=b*100/150;

    return cam16UcsToRgb(J,ap,bp);
}

function rgbToCam16lcd(r,g,b)
{
    const [Jp,ap,bp]=rgbToCam16Ucs(r,g,b);

    return [
        Jp,
        ap*150/100,
        bp*150/100
    ];
}//=====================================================
// CAM16 LCD LCh
//=====================================================

function cam16lcdlchToRgb(L,C,H)
{
    const hr = H * Math.PI / 180;

    return cam16lcdToRgb(
        L,
        C * Math.cos(hr),
        C * Math.sin(hr)
    );
}


function rgbToCam16lcdlch(r,g,b)
{
    const [L,a,b_] = rgbToCam16lcd(r,g,b);

    const C = Math.sqrt(a*a + b_*b_);

    let H = Math.atan2(b_,a) * 180 / Math.PI;

    if(H < 0) H += 360;

    return [
        L,
        C,
        H
    ];
}


//=====================================================
// CAM16 LCD HSV
//=====================================================

function cam16lcdhsvToRgb(H,S,V)
{
    H=((H%360)+360)%360;

    S=Math.max(0,Math.min(100,S));
    V=Math.max(0,Math.min(100,V));


    const C =
        (S/100)
        *150
        *(V/100);


    const hr=H*Math.PI/180;


    return cam16lcdToRgb(
        V,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}


function rgbToCam16lcdhsv(r,g,b)
{
    const [J,a,b_] = rgbToCam16lcd(r,g,b);

    const C=Math.sqrt(a*a+b_*b_);


    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;


    return [
        H,
        Math.min(100,C/150*100),
        J
    ];
}


//=====================================================
// CAM16 LCD HSL
//=====================================================

function cam16lcdhslToRgb(H,S,L)
{
    H=((H%360)+360)%360;

    S=Math.max(0,Math.min(100,S));
    L=Math.max(0,Math.min(100,L));


    const C =
        (S/100)
        *150
        *(1-Math.abs(L/100-0.5)*2);


    const hr=H*Math.PI/180;


    return cam16lcdToRgb(
        L,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}


function rgbToCam16lcdhsl(r,g,b)
{
    const [L,a,b_] = rgbToCam16lcd(r,g,b);

    const C=Math.sqrt(a*a+b_*b_);


    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;


    return [
        H,
        Math.min(100,C/150*100),
        L
    ];
}


//=====================================================
// CAM16 SCD
//=====================================================

function cam16scdToRgb(L,a,b)
{
    L=Math.max(0,Math.min(100,L));

    a=Math.max(-150,Math.min(150,a));
    b=Math.max(-150,Math.min(150,b));


    const ap=a*100/150;
    const bp=b*100/150;


    return cam16UcsToRgb(
        L,
        ap,
        bp
    );
}


function rgbToCam16scd(r,g,b)
{
    const [Jp,ap,bp]=rgbToCam16Ucs(r,g,b);


    return [
        Jp,
        ap*150/100,
        bp*150/100
    ];
}


//=====================================================
// CAM16 SCD LCh
//=====================================================

function cam16scdlchToRgb(L,C,H)
{
    const hr=H*Math.PI/180;


    return cam16scdToRgb(
        L,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}


function rgbToCam16scdlch(r,g,b)
{
    const [L,a,b_] = rgbToCam16scd(r,g,b);


    const C=Math.sqrt(a*a+b_*b_);


    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;


    return [
        L,
        C,
        H
    ];
}


//=====================================================
// CAM16 SCD HSV
//=====================================================

function cam16scdhsvToRgb(H,S,V)
{
    H=((H%360)+360)%360;


    S=Math.max(0,Math.min(100,S));
    V=Math.max(0,Math.min(100,V));


    const C =
        (S/100)
        *150
        *(V/100);


    const hr=H*Math.PI/180;


    return cam16scdToRgb(
        V,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}


function rgbToCam16scdhsv(r,g,b)
{
    const [L,a,b_] = rgbToCam16scd(r,g,b);


    const C=Math.sqrt(a*a+b_*b_);


    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;


    return [
        H,
        Math.min(100,C/150*100),
        L
    ];
}


//=====================================================
// CAM16 SCD HSL
//=====================================================

function cam16scdhslToRgb(H,S,L)
{
    H=((H%360)+360)%360;


    S=Math.max(0,Math.min(100,S));
    L=Math.max(0,Math.min(100,L));


    const C =
        (S/100)
        *150
        *(1-Math.abs(L/100-0.5)*2);


    const hr=H*Math.PI/180;


    return cam16scdToRgb(
        L,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}


function rgbToCam16scdhsl(r,g,b)
{
    const [L,a,b_] = rgbToCam16scd(r,g,b);


    const C=Math.sqrt(a*a+b_*b_);


    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;


    return [
        H,
        Math.min(100,C/150*100),
        L
    ];
}
//=====================================================
// CAM02 LCD HSL
//=====================================================

function cam02lcdhslToRgb(H,S,L)
{
    H=((H%360)+360)%360;

    S=Math.max(0,Math.min(100,S));
    L=Math.max(0,Math.min(100,L));

    const C=
        (S/100)
        *150
        *(1-Math.abs(L/100-0.5)*2);

    const hr=H*Math.PI/180;

    return cam02lcdToRgb(
        L,
        C*Math.cos(hr),
        C*Math.sin(hr)
    );
}

function rgbToCam02lcdhsl(r,g,b)
{
    const [J,a,b_]=rgbToCam02lcd(r,g,b);

    const C=Math.sqrt(a*a+b_*b_);

    let H=Math.atan2(b_,a)*180/Math.PI;

    if(H<0) H+=360;

    return [
        H,
        Math.min(100,C/150*100),
        J
    ];
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






function rgbToHunterlab(r, g, b) {
    const refX = 95.047;  
const refY = 100.000;
const refZ = 108.883;
const Ka = 175.0; 
const Kb = 70.0; 

const [ X, Y, Z ] = rgbToXyz(r, g, b);

    const sqrtY = Math.sqrt(Y / refY);
    const L = 100 * sqrtY;
    const a = Ka * ((X / refX - Y / refY) / sqrtY);
    const bVal = Kb * ((Y / refY - Z / refZ) / sqrtY);

return [ L, a, bVal ];
}

function hunterlabToRgb(L, a, bVal) {
        const refX = 95.047;  
const refY = 100.000;
const refZ = 108.883;
const Ka = 175.0; 
const Kb = 70.0; 
    const sqrtY = L / 100;
    const Y = Math.pow(sqrtY, 2) * refY;
    const X = ((a / Ka) * sqrtY + (Y / refY)) * refX;
    const Z = ((Y / refY) - (bVal / Kb) * sqrtY) * refZ;

    return xyzToRgb(X, Y, Z);
}




// RGB to RLAB conversion
function rgbToRlab(r, g, b) {
    // First convert RGB to LMS (cone response)
    const l = 0.3811 * r /256 + 0.5783 * g/256 + 0.0402 * b/256;
    const m = 0.1967 * r/256 + 0.7244 * g/256 + 0.0782 * b/256;
    const s = 0.0241 * r/256 + 0.1288 * g/256 + 0.8444 * b/256;
    
    // Apply non-linear transform (log10)
    const l_log = Math.log10(l);
    const m_log = Math.log10(m);
    const s_log = Math.log10(s);
    
    // Transformation matrix to RLAB
    const mtx = [
        [0.399, 0.401, 0.200],
        [4.443, -4.838, 0.395],
        [0.807, 0.357, -1.164]
    ];
    
    return matrixMult(l_log*100, m_log*100, s_log*100, mtx);
}

// RLAB to RGB conversion
function rlabToRgb(L, a, b) {
    // Inverse transformation matrix
    const invMtx = [
        [1.1678, 0.0968, 0.1977],
        [1.0216, -0.0839, 0.2806],
        [0.8635, 0.2567, -0.5384]
    ];
    
    // Get back LMS log values
    const [l_log, m_log, s_log] = matrixMult(L/100, a/100, b/100, invMtx);
    
    // Convert back to linear LMS
    const l = Math.pow(10, l_log);
    const m = Math.pow(10, m_log);
    const s = Math.pow(10, s_log);
    
    // Convert LMS to RGB
    const r = 4.4679 * l * 255 - 3.5873 * m * 255+ 0.1193 * s* 255;
    const g = -1.2186 * l * 255+ 2.3809 * m * 255- 0.1624 * s* 255;
    const bb = 0.0497 * l * 255- 0.2439 * m * 255+ 1.2045 * s* 255;
    
    // Clip values to [0, 1] range (or [0, 255] if needed)
    return [
        Math.max(0, Math.min(256, r)),
        Math.max(0, Math.min(256, g)),
        Math.max(0, Math.min(256, bb))
    ];
}





function rgbToIpt(r, g, b) {
    // Normalize RGB to [0, 1]
    let r_norm = r / 255;
    let g_norm = g / 255;
    let b_norm = b / 255;

    // Linear RGB to LMS (cone response)
    let l = 0.4002 * r_norm + 0.7075 * g_norm - 0.0807 * b_norm;
    let m = -0.2280 * r_norm + 1.1500 * g_norm + 0.0612 * b_norm;
    let s = 0.9184 * r_norm + 0.0 * g_norm + 0.0816 * b_norm;

    // Apply non-linearity (power function)
    let l_nonlin = Math.pow(Math.abs(l), 0.43) * Math.sign(l);
    let m_nonlin = Math.pow(Math.abs(m), 0.43) * Math.sign(m);
    let s_nonlin = Math.pow(Math.abs(s), 0.43) * Math.sign(s);

    // Transform to IPT
    let ipt = matrixMult(
        l_nonlin, m_nonlin, s_nonlin,
        [
            [0.4000, 0.4000, 0.2000],
            [4.4550, -4.8510, 0.3960],
            [0.8056, 0.3572, -1.1628]
        ]
    );

    // Scale to IPT ranges:
    // I: 0-100, P: -100 to 100, T: -100 to 100
    return [
        (ipt[0] + 0.6) * (100 / 1.2),  // I [0-100]
        ipt[1] * 100,                  // P [-100 to 100]
        ipt[2] * 100                    // T [-100 to 100]
    ];
}

// IPT to RGB [0-255] conversion
function iptToRgb(i, p, t) {
    // Normalize IPT values from their ranges
    let i_norm = (i / 100 * 1.2) - 0.6;
    let p_norm = p / 100;
    let t_norm = t / 100;

    // Inverse transform from IPT to LMS
    let lms_nonlin = matrixMult(
    i_norm, p_norm, t_norm,
        [
            [1.0, 0.0976, 0.2052],
            [1.0, -0.1139, 0.1332],
            [1.0, 0.0326, -0.6769]
        ]
    );

    // Remove non-linearity
    let l = Math.pow(Math.abs(lms_nonlin[0]), 1/0.43) * Math.sign(lms_nonlin[0]);
    let m = Math.pow(Math.abs(lms_nonlin[1]), 1/0.43) * Math.sign(lms_nonlin[1]);
    let s = Math.pow(Math.abs(lms_nonlin[2]), 1/0.43) * Math.sign(lms_nonlin[2]);

    // LMS to linear RGB
    let r_linear = 1.8502 * l - 1.1383 * m + 0.2384 * s;
    let g_linear = 0.3668 * l + 0.6439 * m - 0.0107 * s;
    let b_linear = 1.0889 * l - 0.2810 * m - 0.8078 * s;

    // Clip and scale to 0-255
    return [
        Math.round(Math.max(0, Math.min(255, r_linear * 255))),
        Math.round(Math.max(0, Math.min(255, g_linear * 255))),
        Math.round(Math.max(0, Math.min(255, b_linear * 255)))
    ];
}





// RGB to IgPgTg conversion
function rgbToIgpgtg(r, g, b) {
    // Normalize RGB to [0, 1]
    const r_norm = r / 255;
    const g_norm = g / 255;
    const b_norm = b / 255;

    // Linear RGB to LMS (cone response)
    const l = 0.4124 * r_norm + 0.3576 * g_norm + 0.1805 * b_norm;
    const m = 0.2126 * r_norm + 0.7152 * g_norm + 0.0722 * b_norm;
    const s = 0.0193 * r_norm + 0.1192 * g_norm + 0.9505 * b_norm;

    // Apply non-linearity (power function)
    const l_nonlin = Math.pow(Math.abs(l), 0.43) * Math.sign(l);
    const m_nonlin = Math.pow(Math.abs(m), 0.43) * Math.sign(m);
    const s_nonlin = Math.pow(Math.abs(s), 0.43) * Math.sign(s);

    // Transform to IgPgTg using optimized matrix
    const igpgtg = matrixMult( 
    l_nonlin, m_nonlin, s_nonlin,
        [
            [0.3785, 0.4205, 0.2010],  // Ig coefficients
            [4.6530, -4.9010, 0.2480], // Pg coefficients
            [0.8325, 0.3405, -1.1730]  // Tg coefficients
        ]
    );

    // Scale to IgPgTg ranges:
    // Ig: 0-100, Pg: -100 to 100, Tg: -100 to 100
    return [
        (igpgtg[0] + 0.6) * (100 / 1.2),  // Ig [0-100]
        igpgtg[1] * 100,                   // Pg [-100 to 100]
        igpgtg[2] * 100                    // Tg [-100 to 100]
    ];
}

// IgPgTg to RGB conversion
function igpgtgToRgb(ig, pg, tg) {
    // Normalize IgPgTg values from their ranges
    const ig_norm = (ig / 100 * 1.2) - 0.6;
    const pg_norm = pg / 100;
    const tg_norm = tg / 100;

    // Inverse transform from IgPgTg to LMS
    const lms_nonlin = matrixMult(
    ig_norm, pg_norm, tg_norm,
        [
            [1.0000, 0.0945, 0.1985],  // Inverse Ig row
            [1.0000, -0.1105, 0.1305], // Inverse Pg row
            [1.0000, 0.0355, -0.6805]   // Inverse Tg row
        ]
    );

    // Remove non-linearity
    const l = Math.pow(Math.abs(lms_nonlin[0]), 1/0.43) * Math.sign(lms_nonlin[0]);
    const m = Math.pow(Math.abs(lms_nonlin[1]), 1/0.43) * Math.sign(lms_nonlin[1]);
    const s = Math.pow(Math.abs(lms_nonlin[2]), 1/0.43) * Math.sign(lms_nonlin[2]);

    // LMS to linear RGB
    const r_linear = 3.2406 * l - 1.5372 * m - 0.4986 * s;
    const g_linear = -0.9689 * l + 1.8758 * m + 0.0415 * s;
    const b_linear = 0.0557 * l - 0.2040 * m + 1.0570 * s;

    // Clip and scale to 0-255
    return [
        Math.round(Math.max(0, Math.min(255, r_linear * 255))),
        Math.round(Math.max(0, Math.min(255, g_linear * 255))),
        Math.round(Math.max(0, Math.min(255, b_linear * 255)))
    ];
}


// h: 0–360, s: 0–1, v: 0–1
// qhsv: cycle = R → G → B → Gray → R
function qhsvToRgb(h, ss, vv) {
  let r, g, b;
let s=ss/100;
let v=vv/100;

  // Normalize hue
  h = ((h % 360) + 360) % 360;
  let t = (h % 90) / 90; // fractional position in sector

  if (h < 90) {          // R → G
    r = (1 - t) * v;
    g = t * v;
    b = 0;
  } else if (h < 180) {  // G → B
    r = 0;
    g = (1 - t) * v;
    b = t * v;
  } else if (h < 270) {  // B → Gray
    r = t * v * 0.5;     // fade blue into gray (equal RGB)
    g = t * v * 0.5;
    b = v * (1 - 0.5 * t);
  } else {               // Gray → R
    r = v * (0.5 + 0.5 * t);
    g = v * (0.5 - 0.5 * t);
    b = v * (0.5 - 0.5 * t);
  }

  // Apply saturation (mix towards v,v,v = gray)
  let gray = v;
  r = r * s + gray * (1 - s);
  g = g * s + gray * (1 - s);
  b = b * s + gray * (1 - s);

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}
function phsvToRgb(h, ss, vv) {
  let r, g, b;
let s=ss/100;
let v=vv/100;

  // Normalize hue
  h = ((h % 360) + 360) % 360;
  let t = (h % 90) / 90; // fractional position in sector

  if (h < 90) {          // R → G
    r = (1 - t) * v;
    g = t * v;
    b = 0;
  } else if (h < 180) {  // G → B
    r = 0;
    g = (1 - t) * v;
    b = t * v;
  } else if (h < 270) {  // B → purp
    r = t * v * 0.5;     // fade blue into gray (equal RGB)
    g = 0;
    b = v * (1 - 0.5 * t);
  } else {               // prup → R
    r = v * (0.5 + 0.5 * t);
    g =0;
    b = v * (0.5 - 0.5 * t);
  }

  // Apply saturation (mix towards v,v,v = gray)
  let gray = v;
  r = r * s + gray * (1 - s);
  g = g * s + gray * (1 - s);
  b = b * s + gray * (1 - s);

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}


// r,g,b: 0–255
// returns: [h, s, v]
// qhsv cycle = R → G → B → Gray → R
function rgbToQhsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;

  let v = Math.max(r, g, b);
  let minc = Math.min(r, g, b);
  let s = v === 0 ? 0 : 1 - (minc / v);  // like HSV

  // detect gray
  if (Math.abs(r - g) < 1e-6 && Math.abs(g - b) < 1e-6) {
    return [270, 0, v];  // pure gray maps to h=270
  }

  let h;
  if (r >= g && g >= b) {
    // R → G
    let t = g / v;
    h = 0 + 90 * t;
  } else if (g >= b && b >= r) {
    // G → B
    let t = b / v;
    h = 90 + 90 * t;
  } else if (b > r && b > g) {
    // B → Gray
    let avg = (r + g) / 2;
    let t = avg / b; // 0=blue, 1=gray
    h = 180 + 90 * t;
  } else {
    // Gray → R
    let avg = (g + b) / 2;
    let t = (r - avg) / (v - avg);
    h = 270 + 90 * t;
  }

  return [h, s*100, v*100];
}
// h: 0–360, s: 0–1, l: 0–1
// cycle: R → G → B → Gray → R
function qhslToRgb(h, ss, ll) {
    let s=ss/100;
let v=ll/100;let l=ll/100;
  h = ((h % 360) + 360) % 360;
  let t = (h % 90) / 90; // 0..1 within a sector
  let r, g, b;

  if (h < 90) {          // R → G
    r = 1 - t;
    g = t;
    b = 0;
  } else if (h < 180) {  // G → B
    r = 0;
    g = 1 - t;
    b = t;
  } else if (h < 270) {  // B → Gray
    r = 0.5 * t;
    g = 0.5 * t;
    b = 1 - 0.5 * t;
  } else {               // Gray → R
    r = 0.5 + 0.5 * t;
    g = 0.5 - 0.5 * t;
    b = 0.5 - 0.5 * t;
  }

  // Apply saturation (blend towards gray=0.5)
  r = (r - 0.5) * s + 0.5;
  g = (g - 0.5) * s + 0.5;
  b = (b - 0.5) * s + 0.5;

  // Apply lightness (standard HSL adjust)
  if (l < 0.5) {
    r *= 2 * l;
    g *= 2 * l;
    b *= 2 * l;
  } else {
    r = r + (1 - r) * (2 * l - 1);
    g = g + (1 - g) * (2 * l - 1);
    b = b + (1 - b) * (2 * l - 1);
  }

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}

function phslToRgb(h, ss, ll) {
    let s=ss/100;
let v=ll/100;let l=ll/100;
  h = ((h % 360) + 360) % 360;
  let t = (h % 90) / 90; // 0..1 within a sector
  let r, g, b;

  if (h < 90) {          // R → G
    r = 1 - t;
    g = t;
    b = 0;
  } else if (h < 180) {  // G → B
    r = 0;
    g = 1 - t;
    b = t;
  } else if (h < 270) {  // B → PRUP
    r = 0.5 * t;
    g = (t)/2;
    b = 1 - 0.5 * t;
  } else {               // PURP → R
    r = 0.5 + 0.5 * t;
    g = (1-t)/2;
    b = 0.5 - 0.5 * t;
  }

  // Apply saturation (blend towards gray=0.5)
  r = (r - 0.5) * s + 0.5;
  g = (g - 0.5) * s + 0.5;
  b = (b - 0.5) * s + 0.5;

  // Apply lightness (standard HSL adjust)
  if (l < 0.5) {
    r *= 2 * l;
    g *= 2 * l;
    b *= 2 * l;
  } else {
    r = r + (1 - r) * (2 * l - 1);
    g = g + (1 - g) * (2 * l - 1);
    b = b + (1 - b) * (2 * l - 1);
  }

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}

// r,g,b: 0–255
// returns [h, s, l]
function rgbToQhsl(r, g, b) {
    function clampsdf(x, min, max) {
return Math.max(min, Math.min(max, x));
}
  r /= 255; g /= 255; b /= 255;
  let maxc = Math.max(r, g, b);
  let minc = Math.min(r, g, b);
  let l = (maxc + minc) / 2;
  let s, h;

  if (Math.abs(maxc - minc) < 1e-6) {
    // pure gray
    return [270, 0, l];
  }

  // rough sector detection (similar to rgbToQhsv)
  if (r >= g && g >= b) {         // R→G
    let t = g / maxc;
    h = 0 + 90 * t;
  } else if (g >= b && b >= r) {  // G→B
    let t = b / maxc;
    h = 90 + 90 * t;
  } else if (b > r && b > g) {    // B→Gray
    let avg = (r + g) / 2;
    let t = avg / b;
    h = 180 + 90 * t;
  } else {                        // Gray→R
    let avg = (g + b) / 2;
    let t = (r - avg) / (maxc - avg);
    h = 270 + 90 * t;
  }

  // QHSL saturation relative to neutral gray=0.5
  let gray = (r + g + b) / 3;
  let diff = Math.max(Math.abs(r - gray), Math.abs(g - gray), Math.abs(b - gray));
  s = diff / 0.5;

  return [h, Math.min(1, Math.max(0, s)), l];
}



function rgbToHqv(r, g, b) {
    function clampsdf(x, min, max) {
return Math.max(min, Math.min(max, x));
}
r = clampsdf(r, 0, 255);
g = clampsdf(g, 0, 255);
b = clampsdf(b, 0, 255);


const v = (r + g + b) / 3 / 255 * 100; // average brightness → 0..100
const h = r; // hotness = red channel (0..255)


const gv = g / 255;
const bv = b / 255;
const vv = (r + g + b) / 3 / 255;


const angle = Math.atan2(bv - vv, gv - vv); // (-pi, pi]
let q = angle * 180 / Math.PI; // degrees
if (q < 0) q += 360; // wrap to [0,360)
if (!isFinite(q)) q = 0; // gray case


return [ h, q, v ];
}


 function hqvToRgb(h, q, v) {
    function clampsdf(x, min, max) {
return Math.max(min, Math.min(max, x));
}

const R = clampsdf(h, 0, 255);
const V = clampsdf(v, 0, 100) / 100; // 0..1 gray level


const theta = (q % 360) * Math.PI / 180;


const s= Math.min(V, 1 - V) 


let G = V + s * Math.cos(theta);
let B = V + s * Math.sin(theta);


G = clampsdf(Math.round(G * 255), 0, 255);
B = clampsdf(Math.round(B * 255), 0, 255);


return [R,G,B];
}





/*
function rgbToOsaucs(r,g,b){
    let [xx,yy,zz]=rgbToXyz(div(r,255),div(g,255),div(b,255));
    let [x,y,z]=[div(xx,add(xx,yy,zz)),div(yy,add(xx,yy,zz)),div(z,add(xx,yy,zz))]
    let k=add(mul(x,x,4.4934),mul(4.3034,y,y),mul(-4.276,x,y),mul(-1.3744,x),mul(-2.5643,y),1.8103);
    let y0=mul(k,yy);
    let lp=mul(5.9,add(cbrt(y0),div(-2,3),mul(0.042,cbrt(sub(y0,30)))))
    let l=div(sub(lp,14.3993),sqrt(2))
    let c=div(lp,5.9,sub(cbrt(y0),div(2,3)))
    let a=add(mul(-13.7,cbrt(div(r,255))),mul(17.7,cbrt(div(g,255))),mul(-4,cbrt(div(b,255))))
    let bb=add(mul(1.7,cbrt(div(r,255))),mul(8,cbrt(div(g,255))),mul(-9.7,cbrt(div(b,255))))
    return [mul(l,255),mul(c,a,255),mul(c,bb,255)];
}*/
function rgbToOsaucs(r, g, b) {
    //r /= 255; g /= 255; b /= 255;

    const [X,Y,Z] = rgbToXyz(r,g,b);
    const S = X + Y + Z;

    const x = X / S, y = Y / S;

    const k =
        4.4934*x*x +
        4.3034*y*y -
        4.276*x*y -
        1.3744*x -
        2.5643*y +
        1.8103;

    const y0 = k * Y;

    const cbrt = v => v < 0 ? -Math.pow(-v,1/3) : Math.pow(v,1/3);

    const y03 = cbrt(y0);

    const lp = 5.9 * (y03 - 2/3 + 0.042 * cbrt(y0 - 30));
    const l  = (lp - 14.3993) / Math.SQRT2;
    const c  = lp / (5.9 * (y03 - 2/3));

    const r3 = cbrt(r), g3 = cbrt(g), b3 = cbrt(b);

    const a  = -13.7*r3 + 17.7*g3 - 4.0*b3;
    const bb =   1.7*r3 +  8.0*g3 - 9.7*b3;

    return [
        10*l,
        1*c*a,
        1*c*bb
    ];
}

function osaucsToRgb(Lt, Gt, Jt, opt = {}) {
    const maxIter = opt.maxIter ?? 30;
    const eps     = opt.eps     ?? 1e-3;
    const h       = opt.h       ?? 1e-2;

    let r = Lt, g = Lt, b = Lt;

    const clamp = () => {
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));
    };

    const F = (R,G,B) => {
        const t = rgbToOsaucs(R,G,B);
        return [t[0]-Lt, t[1]-Gt, t[2]-Jt];
    };

    for (let i=0; i<maxIter; i++) {
        clamp();

        const f  = F(r,g,b);
        if (Math.abs(f[0])+Math.abs(f[1])+Math.abs(f[2]) < eps) break;

        const fr = F(r+h,g,b);
        const fg = F(r,g+h,b);
        const fb = F(r,g,b+h);

        const J00 = (fr[0]-f[0])/h, J01 = (fg[0]-f[0])/h, J02 = (fb[0]-f[0])/h;
        const J10 = (fr[1]-f[1])/h, J11 = (fg[1]-f[1])/h, J12 = (fb[1]-f[1])/h;
        const J20 = (fr[2]-f[2])/h, J21 = (fg[2]-f[2])/h, J22 = (fb[2]-f[2])/h;

        const det =
            J00*(J11*J22 - J12*J21) -
            J01*(J10*J22 - J12*J20) +
            J02*(J10*J21 - J11*J20);

        if (Math.abs(det) < 1e-6) break;

        const ir00 = (J11*J22 - J12*J21)/det;
        const ir01 = (J02*J21 - J01*J22)/det;
        const ir02 = (J01*J12 - J02*J11)/det;

        const ir10 = (J12*J20 - J10*J22)/det;
        const ir11 = (J00*J22 - J02*J20)/det;
        const ir12 = (J02*J10 - J00*J12)/det;

        const ir20 = (J10*J21 - J11*J20)/det;
        const ir21 = (J01*J20 - J00*J21)/det;
        const ir22 = (J00*J11 - J01*J10)/det;

        r -= ir00*f[0] + ir01*f[1] + ir02*f[2];
        g -= ir10*f[0] + ir11*f[1] + ir12*f[2];
        b -= ir20*f[0] + ir21*f[1] + ir22*f[2];
    }

    clamp();
    return [r,g,b];
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
// Identity transform: passthrough RGB
function normal(r, g, b) {
	return [r, g, b];
}

// Channel rotation: (r,g,b) → (b,r,g)
// Cyclic permutation of axes
function ROT1(r, g, b) {
	return [b, r, g];
}

// Channel rotation: (r,g,b) → (g,b,r)
// Inverse cyclic permutation of axes
function ROT2(r, g, b) {
	return [g, b, r];
}

// rg chromaticity remapping using g as luminance-like divisor
// Projects RGB onto an rg plane and re-expands with b as scale
function rgG(r, g, b) {
    let r1 = r * b / g;
    let b1 = (1.0 - r - g) * b / g;
    r = r1;
    g = b;
    b = b1;
    return [r, g, b];
}

// Spherical coordinates → Cartesian
// r = radius (ρ), g = polar angle (θ), b = azimuth (φ)
function SPH(r, g, b) {
    let rho = r;
    let the = g;
    let phi = b;
    r = rho * Math.sin(the/reg) * Math.cos(phi/reg);
    g = rho * Math.sin(the/reg) * Math.sin(phi/reg);
    b = rho * Math.cos(the/reg);
    return [r, g, b];
}

// Cylindrical coordinates → Cartesian (z unchanged)
// r = radius, g = angle
function CYL(r, g, b) {
    let x = r;
    let y = g;
    r = x * Math.cos(y/reg);
    g = x * Math.sin(y/reg);
    return [r, g, b];
}

// Three-phase sinusoidal mapping (120° phase offsets)
// Common in signal processing / color wheel synthesis
function TRP(r, g, b) {
    let x = r;
    let y = g;
    r = x * Math.sin(y/reg);
    g = x * Math.sin(y/reg + 2 * Math.PI / 3);
    b = x * Math.sin(y/reg + 4 * Math.PI / 3);
    return [r, g, b];
}

// Three-phase sinusoidal mapping with DC offset (b)
// Models biased three-phase oscillation
function TPH(r, g, b){ // three-phase
    let x = r;
    let y = g;
    r = b + x * Math.sin(y/reg);
    g = b + x * Math.sin(y/reg + 2*3.14159265/3);
	b = b + x * Math.sin(y/reg + 4*3.14159265/3);
    return [r, g, b];
}

// HSV color space → RGB
function HSV(r, g, b){ return hsvToRgb(r, g, b); }

// HSL color space → RGB
function HSL(r, g, b){ return hslToRgb(r, g, b); }

// CMY subtractive color model → RGB
function CMY(r, g, b){ return cmyToRgb(r, g, b); }

// Toroidal coordinates → Cartesian
// Models embedding of torus-like geometry
function TOR(r, g, b) {
    let t = r;
    let s = g;
    let p = b;
    r = Math.sinh(t/reg) / (Math.cosh(t/reg) - Math.cos(s/reg)) * Math.cos(p/reg);
    g = Math.sinh(t/reg) / (Math.cosh(t/reg) - Math.cos(s/reg)) * Math.sin(p/reg);
    b = Math.sin(t/reg) / (Math.cosh(t/reg) - Math.cos(s/reg));
    return [r*100, g*100, b*100];
}

// Parabolic cylindrical coordinates (one common normalization)
// Maps (s,t) into quadratic surface coordinates
function PCC(r, g, b) {
    let s = r/100;
    let t = g/100;
    r = s * t;
    g = (t * t - s * s) / 2.0;
    return [r*100, g*100, b];
}

// Oblate spheroidal coordinates → Cartesian
// Used in potential theory and wave equations
function OSC(r, g, b) {
    let m = r;
    let v = g;
    let p = b;
    r = Math.cosh(m/reg) * Math.cos(v/reg) * Math.cos(p/reg);
    g = Math.cosh(m/reg) * Math.cos(v/reg) * Math.sin(p/reg);
    b = Math.sinh(m/reg) * Math.sin(v/reg);
    return [r, g, b];
}

// Oblate spheroidal coordinates (z,x,p parameterization)
function OSCzxp(r, g, b) {
    let z = r/100;
    let x = g/100;
    let p = b;
    r = Math.sqrt((1.0 + z * z) * (1.0 - x * x)) * Math.cos(p/reg);
    g = Math.sqrt((1.0 + z * z) * (1.0 - x * x)) * Math.sin(p/reg);
    b = z * x;
    return [r*100, g*100, b*100];
}

// Oblate spheroidal coordinates (s,t,p parameterization)
function OSCstp(r, g, b) {
    let s = r/100;
    let t = g/100;
    let p = b;
    r = s * t * Math.cos(p/reg);
    g = s * t * Math.sin(p/reg);
    b = (s * s - 1.0) * (1.0 - t * t);
    return [r*100, g*100, b*100];
}

// Prolate spheroidal coordinates → Cartesian
// Dual of oblate case (elongated axis)
function PSC(r, g, b) {
    let m = r;
    let v = g;
    let p = b;
    r = Math.sinh(m/reg) * Math.sin(v/reg) * Math.cos(p/reg);
    g = Math.sinh(m/reg) * Math.sin(v/reg) * Math.sin(p/reg);
    b = Math.cosh(m/reg) * Math.cos(v/reg);
    return [r*100, g*100, b*100];
}

// Parabolic coordinates (3D variant)
// Often used in separable Laplace problems
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

// Elliptic cylindrical coordinates → Cartesian
function ECC(r, g, b) {
    let m = r;
    let v = g;
    r = Math.cosh(m/reg) * Math.cos(v/reg);
    g = Math.sinh(m/reg) * Math.sin(v/reg);
    return [r*100, g*100, b];
}

// Conical coordinates
// Intersections of cones and quadrics
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

// Bipolar coordinates → Cartesian
// Used in 2-center potential problems
function BC(r, g, b) {
    let t = r;
    let s = g;
    let p = b;
    r = Math.sin(s/reg) / (Math.cosh(t/reg) - Math.cos(s/reg)) * Math.cos(p/reg);
    g = Math.sin(s/reg) / (Math.cosh(t/reg) - Math.cos(s/reg)) * Math.sin(p/reg);
    b = Math.sinh(t/reg) / (Math.cosh(t/reg) - Math.cos(s/reg));
    return [r*100, g*100, b*100];
}

// Bipolar cylindrical coordinates (no azimuth)
function BCC(r, g, b) {
    let s = r;
    let t = g;
    r = Math.sinh(t/reg) / (Math.cosh(t/reg) - Math.cos(s/reg));
    g = Math.sin(s/reg) / (Math.cosh(t/reg) - Math.cos(s/reg));
    return [r*100, g*100, b];
}

// RGB → normalized rg chromaticity (simplex projection)
function rgGp(r, g, b) {
    let r1 = r / (r + g + b);
    let g1 = g / (r + g + b);
    r = r1 * 100;
    g = g1 * 100;
    b = g;
    return [r, g, b];
}

// Inverted CMY (simple RGB inversion)
function iCMY(r, g, b) {
    let c = 255 - r;
    let m = 255 - g;
    let y = 255 - b;
    return [c, m, y];
}

// Cartesian → spherical coordinates
// Inverse of SPH (up to scaling and angle conventions)
function iSPH(r, g, b) {
    let x = r/100;
    let y = g/100;
    let z = b/100;
    r = Math.sqrt(x * x + y * y + z * z);
    g = Math.acos(100*z / r) * 100;
    b = Math.sign(y) * Math.acos(x / Math.sqrt(x * x + y * y));
    return [r*100, g, b*100];
}

// Cartesian → cylindrical coordinates
// Inverse of CYL
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


if (colorMode === 'shiny') {

    const x = complexInput.re, y = complexInput.im;
    const u = complexOutput.re, v = complexOutput.im;
    const fr = deriv.re, fi = deriv.im;
//console.log(x,u,fr)
    const r = Math.hypot(u,v);
    if (r < 1e-8) return [0,0,0];

    // gradient of |f|
    let Nx = -(u*fr + v*fi)/r;
    let Ny = -(u*(-fi) + v*fr)/r;
    let Nz = 1;

    let n = 1/Math.hypot(Nx,Ny,Nz);
    Nx*=n; Ny*=n; Nz*=n;

    // light at (0,0,1)
    let Lx = -x, Ly = 0-y, Lz = 2-r;
    n = 1/Math.hypot(Lx,Ly,Lz);
    Lx*=n; Ly*=n; Lz*=n;

    const diff = Math.max(0, Nx*Lx + Ny*Ly + Nz*Lz);

    // specular (viewer at z=2)
    let Vx = -x, Vy = -y, Vz = -r;
    n = 1/Math.hypot(Vx,Vy,Vz);
    Vx*=n; Vy*=n; Vz*=n;

    const dotNL = Nx*Lx + Ny*Ly + Nz*Lz;
    let Rx = 2*dotNL*Nx - Lx;
    let Ry = 2*dotNL*Ny - Ly;
    let Rz = 2*dotNL*Nz - Lz;

    n = 1/Math.hypot(Rx,Ry,Rz);
    Rx*=n; Ry*=n; Rz*=n;

    const spec = Math.pow(( -Rx*Vx + Ry*Vy + -Rz*Vz), 1);

    const I = (1, (0.2 + 1.5*diff + 0.7*0)*55);
//console.log((0.2 + 0.8*diff + 0.7*spec)*255)
    return hsvToRgb(phase * 180 / Math.PI, saturationChroma, I);
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



    
    
 if (colorMode === 'divergenceri') {
     const R=re(deriv)
      const lightnessValue = teth.evaluate(magnitudeToLightnessExpr, { x: exp(R), z: complexOutput , c: complexInput , t: arg(complexOutput) , r: magnitude });
    const chroma = saturationChroma;
    const lightnessAdjusted = lightnessValue * lightness;
     return hsvToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
 }
 if (colorMode === 'gradientri') {
     const R=mag(deriv)
      const lightnessValue = teth.evaluate(magnitudeToLightnessExpr, { x: (R), z: complexOutput , c: complexInput , t: arg(complexOutput) , r: magnitude });
    const chroma = saturationChroma;
    const lightnessAdjusted = lightnessValue * lightness;
     return hsvToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
 }
 
  if (colorMode === 'fixed1') {
     const R=mag(sub(complexOutput,complexInput))
      const lightnessValue = teth.evaluate(magnitudeToLightnessExpr, { x: (R), z: complexOutput , c: complexInput , t: arg(complexOutput) , r: magnitude });
    const chroma = saturationChroma;
    const lightnessAdjusted = lightnessValue * lightness;
     return hsvToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
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

    if (colorMode === 'rgb'){
   //     console.log(phase)
        let q=lightnessValue*4
        if(q<1)return [0,q*255,255];
        if(q<2)return [0,255,(2-q)*255]
        if(q<3)return [(q-2)*255,255,0]
        return [255,(4-q)*255,0]
    }


    if (colorMode === 'hsv' || colorMode === 'hsl') {
        return colorMode === 'hsv'
            ? hsvToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
            : hslToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted);
    }
    if (colorMode === 'hsv4' || colorMode === 'hsl4') {
        let q=div(phase,2,pi(),0.25)
        let hue=(q<1)?q:(q<2)?add(q,q,-1):(q<3)?add(q,1):add(q,q,-2)
        return colorMode === 'hsv4'
            ? hsvToRgb(hue * 180 / 3, chroma, lightnessAdjusted)
            : hslToRgb(hue * 180 / 3, chroma ,lightnessAdjusted);
    }
    if (colorMode === 'qhsv' || colorMode === 'qhsl') {
        return colorMode === 'qhsv'
            ? qhsvToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
            : qhslToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted);
    }
if (colorMode === 'phsv' || colorMode === 'phsl') {
        return colorMode === 'phsv'
            ? phsvToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
            : phslToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted);
    }
    if (colorMode === 'hcl' || colorMode === 'cielch') {
        return colorMode === 'hcl'
            ? hclToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
            : lchToRgb(lightnessAdjusted, chroma ,phase * 180 / Math.PI);
    }
    
    if (colorMode === 'hsi')return hsiToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
     if (colorMode === 'hsm')return hsmToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
     if (colorMode === 'hsg')return hsgToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
     if (colorMode === 'hsh')return hshToRgb(phase * 180 / Math.PI, chroma, lightnessAdjusted)
      if (colorMode === 'jzczhz')return jzczhzToRgb(lightnessAdjusted, chroma, phase * 180 / Math.PI)
       if (colorMode === 'hqv')return hqvToRgb(chroma, phase * 180 / Math.PI,lightnessAdjusted)
 




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
    const normMagnitude = (lightnessAdjusted / 10); // Normalize lightnessValue
    return [
        Math.floor(255 * normMagnitude), // Red channel based on lightnessValue
        Math.floor(25 * (10 - normMagnitude)), // Green channel inverse of lightnessValue
        mag( normMagnitude*10) // Blue channel constant
    ];
}
if (colorMode === 'magnitude') {
    const nore = (mag(lightnessAdjusted) /1000); // Normalize lightnessValue
    return hsvToRgb(nore*520,50+30*sin(58*nore),50+30*cos(72*nore));
}
if (colorMode === 'magnitudecolour') {
   // const normMagnitude = Math.min(lightnessValue / 10, 1); // Normalize lightnessValue
    const lightnessValue =lightnessAdjusted/100 //teth.evaluate(lightnessValueToLightnessExpr, { x: lightnessValue, z: });
    return hsvToRgb(lightnessValue*100,100,Math.max(lightnessValue,100))
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
