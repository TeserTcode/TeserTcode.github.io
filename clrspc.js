

function cielabf(t) {
    const threshold = Math.pow(6.0 / 29.0, 3);
    return t > threshold ? Math.pow(t, 1.0 / 3.0) : (t * Math.pow(6.0 / 29.0, -2) / 3.0) + (4.0 / 29.0);
}

function cielabfm(t) {
    const threshold = 6.0 / 29.0;
    return t > threshold ? Math.pow(t, 3) : 3 * Math.pow(6.0 / 29.0, 2) * (t - 4.0 / 29.0);
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
        [2.088, -1.1552878, 0.06693],
        [-0.9906, 2.236, -0.2454],
        [-0.3212, 0.0495, 1.2717]
    ];
    const mtxx = [
        [2.364, -0.896, -0.468],
        [-0.515, 1.426, 0.088],
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
        [0.6196, 0.1916, 0.14209],
        [0.3022, 0.5998, 0.09103],
        [-0.0186, 0.5998, 0.76199]
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

function rgbToLch(r, g, b) {
    const mtx = [
       [ 0.490, 0.310, 0.200],
       [ 0.176, 0.812, 0.010],
       [ 0.000, 0.010, 0.990]
    ];

    [r, g, b] = matrixMult(r, g, b, mtx);

    const r1 = r;
    const g1 = g;
    const b1 = b;

    r = 116 * cielabf(g1 / 100) - 16;
    g = 500 * (cielabf(r1 / 95.048) - cielabf(g1 / 100));
    b = 200 * (cielabf(g1 / 100) - cielabf(b1 / 108.884));

    const chroma = Math.sqrt(g * g + b * b);
    const hue = Math.atan2(b, g)/3.14159265*180; // atan2(y, x) is used for correct quadrant determination

    return [r, chroma, hue];
}

function rgbToYcbcr(r, g, b) {
    // Define the conversion matrix for YCbCr
    const mtx = [
        [0.299, 0.587, 0.114],
        [-0.147, -0.289, 0.436],
        [0.615, -0.515, -0.100]
    ];
    
    // Normalize the RGB values
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
    
    // Adjust the values according to YCbCr scale
    r = r * 219 + 16;
    g = g * 224 + 128;
    b = b * 224 + 128;
    
    return [r, g, b];
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


function rgbToLab(r, g, b) {
    const mtx = [
        [0.490, 0.310, 0.200],
        [0.176, 0.812, 0.010],
        [0.000, 0.010, 0.990]
    ];

    [r, g, b] = matrixMult(r, g, b, mtx);

    const r1 = r;
    const g1 = g;
    const b1 = b;

    r = 116 * cielabf(g1 / 100) - 16;
    g = 500 * (cielabf(r1 / 95.048) - cielabf(g1 / 100));
    b = 200 * (cielabf(g1 / 100) - cielabf(b1 / 108.884));

    return [r, g, b];
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

function rgbToLms(r, g, b) {
    // Define the conversion matrices for LMS
    const mtx1 = [
        [0.490, 0.310, 0.200],
        [0.176, 0.812, 0.010],
        [0.000, 0.010, 0.990]
    ];
    const mtx2 = [
        [0.210, 0.855, -0.039],
        [-0.417, 1.177, 0.070],
        [0.000, 0.000, 0.516]
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
        [0.299, 0.587, 0.114],
        [-0.450, -0.883, 1.333],
        [-1.333, 1.116, 0.217]
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


function rgbToYcocgR(r, g, b) {
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


function rgbToYpbpr(r, g, b) {
    // Calculate YPbPr from RGB
    const y = 0.212 * r + 0.7152 * g + 0.0722 * b;
    const pb = (b - y) / 1.855;
    const pr = (r - y) / 1.5748;
    
    return [y, pb, pr];
}


function rgbToBt(r, g, b) {
    // Calculate BT from RGB
    const y = 0.226 * r + 0.678 * g + 0.0659 * b;
    const pb = (b - y) / 1.881;
    const pr = (r - y) / 1.476;
    
    return [y, pb, pr];
}


function rgbToTsl(r, g, b) {
    // Normalize the RGB values
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    
    // Calculate TSL values
    const rs = r / (r + g + b);
    const gs = g / (r + g + b);
    const rsp = rs - 1 / 3.0;
    const gsp = gs - 1 / 3.0;
    const l = 0.299 * r + 0.587 * g + 0.114 * b;
    
    r = 0.5 - (Math.atan2(gsp, rsp) / (2 * Math.PI));
    g = Math.sqrt((9 / 5.0) * (rsp * rsp + gsp * gsp));
    b = l;
    
    r *= 100;
    b *= 100;
    g *= 255;
    
    return [r, g, b];
}


function rgbToLuv(r, g, b) {
  const mtx = [
        [0.490, 0.310, 0.200],
        [0.176, 0.812, 0.010],
        [0.000, 0.010, 0.990]
    ];

    // Normalize RGB values to [0, 1]
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;

    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);

    // Convert RGB to XYZ (assuming RGB is now in linear form)
    let x = r;
    let y = g;
    let z = b;

    // Convert XYZ to LUV
    const Y = y;
    const Yw = 1.0;  // Reference white (D65)
    const Uw = 0.1978; // Reference white (D65)
    const Vw = 0.4683; // Reference white (D65)

    const u = (4 * x) / (x + 15 * y + 3 * z);
    const v = (9 * y) / (x + 15 * y + 3 * z);
    
    const up = (4 * x) / (x + 15 * y + 3 * z);
    const vp = (9 * y) / (x + 15 * y + 3 * z);

    let L = (Y / Yw <= Math.pow(6.0 / 29.0, 3)) ? (Y / Yw) * (29.0 / 6.0) ** 3 : (116 * Math.pow(Y / Yw, 1.0 / 3.0)) - 16;
    let uPrime = 13 * L * (up - Uw);
    let vPrime = 13 * L * (vp - Vw);

    return [L, uPrime, vPrime];
}







function lchToRgb(L, C, H) {
    let r1 = L;
    let g1 = C * Math.cos(H/180*3.14159265);
    let b1 = C * Math.sin(H/180*3.14159265);

    let r = 95.048 * cielabfm((r1 + 16) / 116 + g1 / 500);
    let g = 100 * cielabfm((r1 + 16) / 116);
    let b = 108.884 * cielabfm((r1 + 16) / 116 - b1 / 500);

    const mtx = [
[2.364, -0.896, -0.468],
        [-0.515, 1.426, 0.088],
        [0.005, -0.014, 1.009]
    ];

    [r1, g1, b1] = matrixMult(r, g, b, mtx);

    return [r1, g1, b1];
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

function yjkToRgb(r, g, b) {
    // Convert YJK to RGB
    const r1 = r;
    const g1 = g;
    const b1 = b;

    r = r1 + g1;
    g = r1 + b1;
    b = (5.0 / 4.0) * r - g / 2 - b / 4;

    return [r, g, b];
}
function labToRgb(L, a, bb) {
    let r1 = L, g1 = a, b1 = bb;

    let r = 95.048 * cielabfm((r1 + 16) / 116 + g1 / 500);
    let g = 100 * cielabfm((r1 + 16) / 116);
    let b = 108.884 * cielabfm((r1 + 16) / 116 - b1 / 500);

    const mtx = [
       [ 2.364, -0.896, -0.468],
      [  -0.515, 1.426, 0.088],
      [  0.005, -0.014, 1.009]
    ];

    [r1, g1, b1] = matrixMult(r, g, b, mtx);

    return [r1, g1, b1];
}

function uvwToRgb(u, v, w) {
    // Define the conversion matrix for UVW to RGB
    const mtx = [
        [2.364, -0.896, -0.468],
        [-0.515, 1.426, 0.088],
        [0.005, -0.014, 1.009]
    ];
    
    // Apply inverse transformation for UVW to RGB
    const r1 = u * (2.0 / 3.0);
    const g1 = v;
    const b1 = (3.0 / 2.0) * r1 - (3.0 * g1) + (2.0 * w);
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r1, g1, b1, mtx);
    
    // Return RGB values in the range [0, 255]
    return [r , g , b];
}

function lmsToRgb(l, m, s) {
    // Define the conversion matrices for LMS to RGB
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

function ypbprToRgb(y, pb, pr) {
    // Calculate the RGB values from YPbPr
    const r = y + pb * 1.5748;
    const g = y - (0.21260 * 1.5748 / 0.7152) * pb - (0.072 * 1.8556 / 0.7152) * pr;
    const b = y + pr * 1.8556;
    
    // Return RGB values in the range [0, 255]
    return [r, g, b];
}
function btToRgb(y, pb, pr) {
    // Calculate the RGB values from BT
    const r = y + pb * 1.4746;
    const g = y - (0.2627 * 1.47468 / 0.6780) * pb - (0.0593 * 1.8814 / 0.6780) * pr;
    const b = y + pr * 1.8814;
    
    // Return RGB values in the range [0, 255]
    return [r, g, b];
}

function tslToRgb(r, g, b) {
    // Normalize the input values
    r /= 100.0;
    g /= 100.0;
    b /= 255.0;

    // Calculate intermediate values
    const x = Math.pow(Math.tan(2 * Math.PI * (r - 0.25)), 2);
    const rsp = Math.sqrt((5 * g * g) / (9 * ((1.0 / x) + 1)));
    const gsp = Math.sqrt((5 * g * g) / (9 * (x + 1)));
    const rs = rsp + 1 / 3.0;
    const gs = gsp + 1 / 3.0;
    const k = b / (0.185 * rs + 0.473 * gs + 0.114);

    // Convert to RGB and scale
    r = k * rs * 255;
    g = k * gs * 255;
    b = k * (1 - rs - gs) * 255;

    return [r, g, b];
}

function luvToRgb(l, u, v) {
     const mtx = [
        [2.364, -0.896, -0.468],
        [-0.515, 1.426, 0.088],
        [0.005, -0.014, 1.009]
    ];
    
    // Calculate intermediate values
    const r1 = l;
    let g = l;
    const up = u / (13 * l) + 0.2009;
    const vp = v / (13 * l) + 0.461;

    if (l <= 8) {
        g = 100 * l * Math.pow(3.0 / 29.0, 3);
    } else {
        g = 100 * Math.pow((l + 16) / 116, 3);
    }
    
    const r = g * (9 * up) / (4 * vp);
    b = g * (12 - 3 * up - 20 * vp) / (4 * vp);

    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);

    return [r, g, b];// Just returns the input values as an array
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
	// complexOutput.re=math.evaluate(magnitudeToLightnessExpr, { x: complexOutput.re });
	// complexOutput.im=math.evaluate(magnitudeToLightnessExpr, { x: complexOutput.im });
 	const contourThreshold=contourThresholdd * math.abs(deriv);
    const reDiff = Math.abs(complexOutput.re % 1);
    const imDiff = Math.abs(complexOutput.im % 1);
    const minDiff = Math.min(reDiff, imDiff);
    const doubleThreshold = contourThreshold * 1;
    const halfThreshold = Math.min(Math.abs(complexInput.re % 1), Math.abs(complexInput.im % 1));

    if (minDiff < contourThreshold) {
        // Check if the closest integer is 0 for either the real or imaginary part
        const isCloseToZero = (Math.abs(complexOutput.re % 1) < doubleThreshold  && Math.abs(complexOutput.re) < doubleThreshold ) ||
                              (Math.abs(complexOutput.im % 1) < doubleThreshold  && Math.abs(complexOutput.im) < doubleThreshold );
        
        if (isCloseToZero) return [00, 00, 00]; // Black if the closest integer is 0


return [
    ((complexOutput.im < 0 && imDiff === minDiff) || (complexOutput.re > 0 && reDiff === minDiff)) ? 255 : 0,   // Red
    complexOutput.im > 0 && imDiff === minDiff ? 255 : 0     // Blue
       ,  // Green
    complexOutput.re < 0 && reDiff === minDiff ? 255 :  (complexOutput.im < 0 && imDiff === minDiff ? 255 : 0)    // Purple (Red + Blue)
];
    }
	if (halfThreshold < contourThresholdd/2) return [128, 128, 128];
    return [255, 255, 255]; // White otherwise
}
 const lightnessValue = math.evaluate(magnitudeToLightnessExpr, { x: magnitude });
    const chroma = saturationChroma;
    const lightnessAdjusted = lightnessValue * lightness;

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
            math.sign(complexOutput.re) * 50 + math.sign(complexOutput.im) * 100,
            math.abs(complexOutput.re) * 255,
            math.abs(complexOutput.im) * 255
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
    // Create a dynamic effect based on phase and magnitude
    const timeEffect = 0; // Sinusoidal effect over time
    const dynamicPhase = (phase + timeEffect * Math.PI) % (2 * Math.PI);

    return [
        Math.floor(127.5 * (Math.sin(dynamicPhase) + 1)), // Red channel with dynamic effect
        Math.floor(127.5 * (Math.sin(dynamicPhase + Math.PI / 2) + 1)), // Green channel with offset
        Math.floor(127.5 * (Math.sin(dynamicPhase + Math.PI) + 1)) // Blue channel with opposite phase
    ];
}

// Color mode: 'magnitude'
if (colorMode === 'magnitude') {
    const normMagnitude = Math.min(magnitude / 10, 1); // Normalize magnitude
    return [
        Math.floor(255 * normMagnitude), // Red channel based on magnitude
        Math.floor(255 * (1 - normMagnitude)), // Green channel inverse of magnitude
        0 // Blue channel constant
    ];
}

if (colorMode === 'neon') {
    // Calculate the neon intensity based on complexOutput magnitude
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
    const green = Math.min(Math.floor(absZ * 255), 255); // Limit to [0, 255]

    // Calculate Red channel
    const red = Math.min(Math.floor(Math.abs(complexOutput.re + complexOutput.im) * 255), 255); // Limit to [0, 255]

    // Calculate Blue channel
    const blue = Math.min(Math.floor(Math.pow(Math.sqrt(absRe) + Math.sqrt(absIm), 2) * 255), 255); // Limit to [0, 255]

    return [red, green, blue];
}

if (colorMode === 'purify') {
    // Calculate absolute values
    const absRe = Math.abs(complexOutput.re);
    const absIm = Math.abs(complexOutput.im);
    const magnitude = Math.sqrt(absRe * absRe + absIm * absIm); // abs(z)
    const phase = Math.atan2(complexOutput.im, complexOutput.re); // Angle in radians

    // Calculate Red channel based on the absolute value of the real part
    const red = Math.min(Math.floor(absRe * 255), 255);

    // Calculate Green channel based on the absolute value of the imaginary part
    const green = Math.min(Math.floor(absIm * 255), 255);

    // Calculate Blue channel with a dynamic blend based on magnitude and phase
    const dynamicBlue = Math.sin(phase * 2) * 0.5 + 0.5; // Create a smooth blend effect
    const blue = Math.min(Math.floor(dynamicBlue * magnitude * 255), 255);

    return [red, green, blue];
}


    return [0, 0, 0]; // Default return if no color mode matches
}
