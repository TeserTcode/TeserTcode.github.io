 function HSVtoRGB(h, s, v) {
            let r, g, b;
            let i = Math.floor(h / 60);
            let f = h / 60 - i;
            let p = v * (1 - s);
            let q = v * (1 - s * f);
            let t = v * (1 - s * (1 - f));
            switch (i % 6) {
                case 0:
                    r = v, g = t, b = p;
                    break;
                case 1:
                    r = q, g = v, b = p;
                    break;
                case 2:
                    r = p, g = v, b = t;
                    break;
                case 3:
                    r = p, g = q, b = v;
                    break;
                case 4:
                    r = t, g = p, b = v;
                    break;
                case 5:
                    r = v, g = p, b = q;
                    break;
            }
            return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
        }

        function HSLtoRGB(h, s, l) {
            let r, g, b;
            let c = (1 - Math.abs(2 * l - 1)) * s;
            let x = c * (1 - Math.abs((h / 60) % 2 - 1));
            let m = l - c / 2;
            if (h < 60) {
                r = c, g = x, b = 0;
            } else if (h < 120) {
                r = x, g = c, b = 0;
            } else if (h < 180) {
                r = 0, g = c, b = x;
            } else if (h < 240) {
                r = 0, g = x, b = c;
            } else if (h < 300) {
                r = x, g = 0, b = c;
            } else {
                r = c, g = 0, b = x;
            }
            return [Math.floor((r + m) * 255), Math.floor((g + m) * 255), Math.floor((b + m) * 255)];
        }

function HCLtoRGB(h, c, l) {
    // Convert HCL to XYZ
    const L = ((l * 100) + 16) / 116;
    const C = c  ;
    const hRad = (h * Math.PI) / 180;

    // Calculate XYZ components
    const Y = L;
    const X = (C * Math.cos(hRad)) + L;
    const Z = L - (C * Math.sin(hRad));

    // Convert XYZ to RGB
    const r = 3.2406 * X - 1.5372 * Y - 0.4986 * Z;
    const g = -0.9689 * X + 1.8758 * Y + 0.0415 * Z;
    const b = 0.0557 * X - 0.2040 * Y + 1.0570 * Z;

    // Convert RGB from linear space to 0-255 range
    return [
        Math.max(0, Math.min(255, Math.round(r * 255))),
        Math.max(0, Math.min(255, Math.round(g * 255))),
        Math.max(0, Math.min(255, Math.round(b * 255)))
    ];
}
function fInv(t) {
    const T0 = 6.0 / 29.0;
    if (t > T0) {
        return t * t * t;
    }
    return 3.0 * T0 * T0 * (t - 4.0 / 29.0);
}

function CIELCHtoRGB(h, c, l) {
    // Reference white point (ad hoc)
    const Xn = 100;
    const Yn = 100;
    const Zn = 100;
 const L = l * 20
    // Convert L, C, h to XYZ
    const X = Xn * fInv((L + 16) / 116 + c / 20 * Math.cos(h * Math.PI / 180));
    const Y = Yn * fInv((L + 16) / 116);
    const Z = Zn * fInv((L + 16) / 116 - c / 8 * Math.sin(h * Math.PI / 180));

    const R = 2.9515373 * X - 1.2894116 * Y - 0.4738445 * Z;
    const G = -1.0851093 * X + 1.9908566 * Y + 0.0372026 * Z;
    const B = 0.0854934 * X - 0.2694964 * Y + 1.0912975 * Z;

    // Convert RGB from linear space to 0-255 range
    return [
        Math.max(0, Math.min(255, Math.round(R * 255))),
        Math.max(0, Math.min(255, Math.round(G * 255))),
        Math.max(0, Math.min(255, Math.round(B * 255)))
    ];
}