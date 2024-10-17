

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
function rgbToOklab(r, g, b) {
    // Define the conversion matrix for XYZ
    const mtx = [
        [0.490, 0.310, 0.200],
        [0.176, 0.812, 0.010],
        [0.000, 0.010, 0.990]
    ];
	const mtx1 = [
        [0.818, 0.362,-0.129],
        [0.033, 0.929, 0.036],
        [0.048, 0.264, 0.634]
    ];
	const mtx2 = [
        [0.210, 0.794,-0.004],
        [1.978,-2.429, 0.451],
        [0.026, 0.783, 0.809]
    ];
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);
	
	[r, g, b] = matrixMult(r, g, b, mtx1);
	r=Math.pow(r/255,1/3)*255;g=Math.pow(g/255,1/3)*255;b=Math.pow(b/255,1/3)*255;
	[r, g, b] = matrixMult(r, g, b, mtx2);
    
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
    // Define the conversion matrices for Lms
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

function oklabToRgb(r, g, b) {
    // Define the conversion matrix for XYZ
    const mtx = [
        [2.364, -0.896, -0.468],
        [-0.515, 1.426, 0.088],
        [0.005, -0.014, 1.009]
    ];
	const mtx1 = [
        [ 1.228,-0.558, 0.281],
        [-0.041, 1.112,-0.071],
        [-0.076,-0.421, 1.585]
    ];
	const mtx2 = [
        [ 1.321, 0.367,-0.198],
        [ 0.905,-0.096, 0.058],
        [-0.918, 0.081, 1.185]
    ];
    
    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx2);
	r=Math.pow(r/255,3)*255;g=Math.pow(g/255,3)*255;b=Math.pow(b/255,3)*255;
	[r, g, b] = matrixMult(r, g, b, mtx1);
	
	[r, g, b] = matrixMult(r, g, b, mtx1);
    
    return [r, g, b];
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
    
    let r = g * (9 * up) / (4 * vp);
    b = g * (12 - 3 * up - 20 * vp) / (4 * vp);

    // Apply matrix multiplication
    [r, g, b] = matrixMult(r, g, b, mtx);

    return [r, g, b];// Just returns the input values as an array
}











function rgbToHsm(r, g, b) {
    // Normalize the RGB values to [0, 1]
    r /= 255;
    g /= 255;
    b /= 255;

    // Magnitude calculation (M)
    let M = Math.sqrt(r * r + g * g + b * b);

    // Minimum RGB component (m)
    let m = Math.min(r, g, b);

    // Saturation calculation (S)
    let S = m === 0 ? 0 : 1 - (M / m);

    // Hue calculation (H), similar to HSI
    let H = 0;
    if (M !== 0) {
        let num = 0.5 * ((r - g) + (r - b));
        let den = Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
        H = Math.acos(num / den); // Hue in radians
        if (b > g) {
            H = 2 * Math.PI - H;
        }
        H = H * (180 / Math.PI); // Convert to degrees
    }

    return [Math.round(H), Math.round(S * 100), Math.round(M * 100)];
}
function hsmToRgb(h, s, m) {
    h = h % 360; // Ensure hue is within 0-360
    s /= 100;    // Scale saturation to [0, 1]
    m /= 100;    // Scale magnitude to [0, 1]

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
    const sqrtR = Math.sqrt(r/255);
    const sqrtG = Math.sqrt(g/255);
    const sqrtB = Math.sqrt(b/255);
    
    // Calculate Hue (H)
    const max = Math.max(sqrtR, sqrtG, sqrtB);
    const min = Math.min(sqrtR, sqrtG, sqrtB);
    const delta = max - min;
    let H = 0;

    if (delta !== 0) {
        if (max === sqrtR) {
            H = (sqrtG - sqrtB) / delta + (sqrtG < sqrtB ? 6 : 0);
        } else if (max === sqrtG) {
            H = (sqrtB - sqrtR) / delta + 2;
        } else {
            H = (sqrtR - sqrtG) / delta + 4;
        }
        H /= 6; // Normalize to [0, 1]
    }

    const S = (max === 0) ? 0 : (delta / max); // Saturation calculation
    const G = Math.sqrt(sqrtR * sqrtR + sqrtG * sqrtG + sqrtB * sqrtB); // G calculation

    return [Math.round(H * 360), Math.round(S * 100), Math.round(G * 100)];
}

// HSH: Converts RGB to HSH
function rgbToHsh(r, g, b) {
    const H = (255 / (255 / r + 255 / g + 255 / b)); // Harmonic mean

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let hue = 0, saturation = 0;

    if (delta !== 0) {
        if (max === r) {
            hue = (g - b) / delta + (g < b ? 6 : 0);
        } else if (max === g) {
            hue = (b - r) / delta + 2;
        } else {
            hue = (r - g) / delta + 4;
        }
        hue /= 6; // Normalize to [0, 1]
    }

    saturation = (max === 0) ? 0 : (delta / max); // Saturation calculation

    return [Math.round(hue * 360), Math.round(saturation * 100), Math.round(H)];
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
function rgbToLct(r, g, b) {
    // Step 1: Convert RGB to CIELAB
    const [L, a, b_lab] = rgbToLab(r, g, b);
    
    // Step 2: Convert CIELAB to Lms
    const [L_lms, M_lms, S_lms] = labToLms(L, a, b_lab);

    // Step 3: Calculate wavelength from Lms
    const wavelength = lmsToWavelength(L_lms, M_lms, S_lms);

    // Step 4: Calculate temperature from wavelength
    const temperature = wavelengthToTemperature(wavelength);

    // Step 5: Calculate Chroma (C)
    const C = Math.sqrt(L_lms ** 2 + M_lms ** 2 + S_lms ** 2);

    return { L, C, T: temperature };
}





















//SOLARZONE

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


}
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
	// complexOutput.re=Math.evaluate(magnitudeToLightnessExpr, { x: complexOutput.re });
	// complexOutput.im=Math.evaluate(magnitudeToLightnessExpr, { x: complexOutput.im });
 	const contourThreshold=contourThresholdd * Math.abs(deriv);
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
