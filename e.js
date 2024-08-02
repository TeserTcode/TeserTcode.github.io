const bign = 20
function integral(func, initial, end, input, epsilon = 1e-2, N = 10) {
    // Function to handle complex integration
    function simpsonsRule(a, b, n) {
        const h = math.divide(math.subtract(b, a), n);
        let sum = math.complex(0,0);
        
        for (let i = 1; i < n; i += 2) {
            sum = math.add(sum, math.multiply(math.complex(4,0), func(math.add(a, math.multiply(math.complex(i,0), h)), input)));
        }
        
        for (let i = 2; i < n - 1; i += 2) {
            sum = math.add(sum, math.multiply(math.complex(2,0), func(math.add(a, math.multiply(math.complex(i,0), h)), input)));
        }
        
        return math.multiply(math.divide(h, math.complex(3,0)), sum);
    }

    // Adaptive Simpson's rule to ensure convergence
          return simpsonsRule(initial,end, N);
       }


function eulerc () { return math.complex(2.71828,0);        
}
function sinc(z) {
            if (math.abs(z) === 0) {
                return math.complex(1, 0);
            }
            return math.divide(math.sin(z), z);
        }
// Function for the 'taxicab' operation
function taxicab(b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * ((Math.abs((ata + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1),
        ss * ((Math.abs((ata - Math.PI / 2 + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1)
    );
}

// Function for the 'arctaxicab' operation
function arctaxicab(b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * (Math.cos(ata) * Math.cos(ata) / ((Math.abs((ata + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1)),
        ss * (Math.sin(ata) * Math.sin(ata) / ((Math.abs((ata - Math.PI / 2 + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1))
    );
}

// Function for the 'chebyshev' operation
function chebyshev(b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * Math.max(-1, Math.min(1, Math.tan((Math.abs((ata + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1))),
        ss * Math.max(-1, Math.min(1, Math.tan((Math.abs((ata - Math.PI / 2 + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1)))
    );
}

// Function for the 'arcchebyshev' operation
function arcchebyshev(b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * (Math.cos(ata) * Math.cos(ata) / Math.max(-1, Math.min(1, Math.tan((Math.abs((ata + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1)))),
        ss * (Math.sin(ata) * Math.sin(ata) / Math.max(-1, Math.min(1, Math.tan((Math.abs((ata - Math.PI / 2 + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1))))
    );
}


// Function for 'powcos'
function powcos(a, b) {
    return math.multiply(math.pow(a, b), math.cos(a));
}

// Function for 'powsin'
function powsin(a, b) {
    return math.multiply(math.pow(a, b), math.sin(a));
}



// Function for 'exp+'
function expPlus(a, b) {
    return math.add(a, math.exp(b));
}

// Function for 'exp2'
function exp2(a, b) {
    return math.multiply(a, math.pow(2, b));
}

// Function for 'exp10'
function exp10(a, b) {
    return math.multiply(a, math.pow(10, b));
}


// Function for 'expc'
function expc(a, b) {
    return math.divide(math.exp(b), math.pow(b, a));
}

// Function for 'expi'
function expi(a, b) {
    return math.divide(a, math.exp(b));
}

// Function for 'expic'
function expic(a, b) {
    return math.divide(a, math.multiply(math.exp(b), math.add(b, 0.0001)));
}

// Function for 'expein'
function expein(b) {
    return math.divide(math.subtract(1.0, math.exp(math.unaryMinus(b))), math.add(b, 0.0001));
}

// Function for 'expsqr'
function expsqr(a, b) {
    return math.multiply(a, math.exp(math.multiply(b, b)));
}

// Function for 'expmsqr'
function expmsqr(a, b) {
    return math.add(math.multiply(a, math.exp(math.unaryMinus(math.multiply(b, b)))), 0.0001);
}

// Function for 'log-1'
function logMinus1(b) {
    return math.divide(1.0, math.log(b));
}



// Function for 'log10'
function log10(a, b) {
    return math.multiply(a, math.log(b, 10.0));
}

// Function for '_log'
function _log(b, a) {
    return math.log(b, a);
}

// Function for 'antilog'
function antilog(b) {
    return math.log(b, math.e);
}

// Function for 'antilog2'
function antilog2(b) {
    return math.log(b, 2.0);
}

// Function for 'antilog10'
function antilog10(b) {
    return math.log(b, 10.0);
}

// Function for 'logc'
function logc(b) {
    return math.divide(math.log(b), b);
}

// Function for 'naplog'
function naplog(b) {
    return math.multiply(-10000000.0, math.log(math.divide(b, 10000000.0)));
}

// Function for 'dist'
function dist(a, b) {
    return math.add(math.multiply(a, a), math.multiply(b, b));
}

// Function for 'hypot'
function hypot(a, b) {
    return math.sqrt(math.add(math.multiply(a, a), math.multiply(b, b)));
}

// Function for 'sdist'
function sdist(a, b) {
    return math.subtract(math.multiply(a, a), math.multiply(b, b));
}

// Function for 'zdist'
function zdist(b) {
    return math.divide(math.distz(b));
}

// Utility function for degrees to radians
function degreesToRadians(deg) {
    return math.multiply(deg, math.pi / 180);
}

// Utility function for radians to degrees
function radiansToDegrees(rad) {
    return math.multiply(rad, 180 / math.pi);
}

// Function for 'ramp'
function ramp(a, b) {
    return math.multiply(a, math.mod(b, 2 * math.pi) / math.pi - 1.0);
}

// Function for 'squarewave'
function squarewave(a, b) {
    return math.multiply(a, math.lessThan(math.mod(b, 2 * math.pi), math.pi) ? 1.0 : -1.0);
}

// Function for 'trianglewave'
function trianglewave(a, b) {
    return math.multiply(a, math.multiply(2.0 / math.pi, math.asin(math.sin(b))));
}

// Function for 'sawtoothwave'
function sawtoothwave(a, b) {
    return math.multiply(a, math.multiply(2.0 / math.pi, math.subtract(math.pi, math.mod(b, 2 * math.pi))));
}

// Function for 'pulse'
function pulse(a, b) {
    return math.multiply(a, math.sin(b) > 0 ? 1.0 : -1.0);
}

// Function for 'todeg'
function todeg(b) {
    return radiansToDegrees(b);
}

// Function for 'sind'
function sind(a, b) {
    return math.multiply(a, math.sin(degreesToRadians(b)));
}

// Function for 'sinhdeg'
function sinhdeg(a, b) {
    return math.multiply(a, math.sinh(degreesToRadians(b)));
}

// Function for 'asind'
function asind(a, b) {
    return radiansToDegrees(math.multiply(a, math.asin(b)));
}

// Function for 'cosd'
function cosd(a, b) {
    return math.multiply(a, math.cos(degreesToRadians(b)));
}

// Function for 'coshdeg'
function coshdeg(a, b) {
    return math.multiply(a, math.cosh(degreesToRadians(b)));
}

// Function for 'acosd'
function acosd(a, b) {
    return radiansToDegrees(math.multiply(a, math.acos(b)));
}

// Function for 'tand'
function tand(a, b) {
    return math.multiply(a, math.tan(degreesToRadians(b)));
}

// Function for 'tanhdeg'
function tanhdeg(a, b) {
    return math.multiply(a, math.tanh(degreesToRadians(b)));
}

// Function for 'atand'
function atand(a, b) {
    return radiansToDegrees(math.multiply(a, math.atan(b)));
}

// Function for 'atan2d'
function atan2d(a, b) {
    return radiansToDegrees(math.atan(math.divide(a, b)));
}
function cot(b) {
    return math.divide(math.complex(1), math.tan(b));
}

// Function for 'coth'
function coth(b) {
    return math.divide(math.complex(1), math.tanh(b));
}

// Function for 'sec'
function sec(b) {
    return math.divide(math.complex(1), math.cos(b));
}

// Function for 'sech'
function sech(b) {
    return math.divide(math.complex(1), math.cosh(b));
}

// Function for 'csc'
function csc(b) {
    return math.divide(math.complex(1), math.sin(b));
}

// Function for 'csch'
function csch(b) {
    return math.divide(math.complex(1), math.sinh(b));
}

// Function for 'crd'
function crd(b) {
    return math.multiply(math.sin(math.divide(b, math.complex(2))), math.complex(2));
}

// Function for 'arccrd'
function arccrd(b) {
    return math.multiply(math.asin(math.divide(b, math.complex(2))), math.complex(2));
}

// Function for 'arccrdd'
function arccrdd(b) {
    return radiansToDegrees(math.multiply(math.asin(math.divide(b, math.complex(2))), math.complex(2)));
}

// Function for 'asinh'
function asinh(b) {
    return math.asinh(b);
}

// Function for 'acosh'
function acosh(b) {
    return math.acosh(b);
}

// Function for 'atanh'
function atanh(b) {
    return math.atanh(b);
}

// Function for 'asec'
function asec(b) {
    return math.acos(math.divide(math.complex(1), b));
}

// Function for 'asech'
function asech(b) {
    return math.acosh(math.divide(math.complex(1), b));
}

// Function for 'acsc'
function acsc(b) {
    return math.asin(math.divide(math.complex(1), b));
}

// Function for 'acsch'
function acsch(b) {
    return math.asinh(math.divide(math.complex(1), b));
}

// Function for 'exsec'
function exsec(b) {
    return math.subtract(math.sec(b), math.complex(1));
}

// Function for 'excosec'
function excosec(b) {
    return math.subtract(math.csc(b), math.complex(1));
}

// Function for 'versin'
function versin(b) {
    return math.subtract(math.complex(1), math.cos(b));
}

// Function for 'vercosin'
function vercosin(b) {
    return math.add(math.complex(1), math.cos(b));
}

// Function for 'coversin'
function coversin(b) {
    return math.subtract(math.complex(1), math.sin(b));
}

// Function for 'covercosine'
function covercosine(b) {
    return math.add(math.complex(1), math.sin(b));
}

// Function for 'haversin'
function haversin(b) {
    return math.multiply(math.subtract(math.complex(1), math.cos(b)), math.complex(0.5));
}

// Function for 'hacovercosin'
function hacovercosin(b) {
    return math.multiply(math.add(math.complex(1), math.sin(b)), math.complex(0.5));
}

// Function for 'arcversin'
function arcversin(b) {
    return math.acos(math.subtract(math.complex(1), b));
}

// Function for 'arcvercos'
function arcvercos(b) {
    return math.acos(math.subtract(b, math.complex(1)));
}

// Function for 'arccoversin'
function arccoversin(b) {
    return math.asin(math.subtract(math.complex(1), b));
}

// Function for 'arccovercos'
function arccovercos(b) {
    return math.asin(math.subtract(b, math.complex(1)));
}

// Function for 'archaversin'
function archaversin(b) {
    return math.multiply(math.complex(2), math.asin(math.sqrt(b)));
}

// Function for 'archavercos'
function archavercos(b) {
    return math.multiply(math.complex(2), math.acos(math.sqrt(b)));
}

// Function for 'archacoversin'
function archacoversin(b) {
    return math.asin(math.subtract(math.complex(1), math.multiply(math.complex(2), b)));
}

// Function for 'archacovercos'
function archacovercos(b) {
    return math.asin(math.subtract(math.multiply(math.complex(2), b), math.complex(1)));
}

// Function for 'sinsqr'
function sinsqr(b) {
    return math.multiply(math.sin(math.multiply(b, b)), math.complex(1));
}

// Function for 'cossqr'
function cossqr(b) {
    return math.multiply(math.cos(math.multiply(b, b)), math.complex(1));
}

// Function for 'shid'
function shid(b) {
    return math.divide(math.sinh(b), math.add(b, math.complex(0.0001)));
}

// Function for 'cosh-1'
function coshminus1(b) {
    return math.divide(math.complex(1), math.cosh(b));
}

// Function for 'sinc'
function sinc(b) {
    return math.divide(math.sin(b), math.add(b, math.complex(0.0001)));
}

// Function for 'cosc'
function cosc(b) {
    return math.divide(math.cos(b), math.add(b, math.complex(0.0001)));
}

// Function for 'coshc'
function coshc(b) {
    return math.divide(math.cosh(b), math.add(b, math.complex(0.0001)));
}

// Function for 'sinhc'
function sinhc(b) {
    return math.divide(math.sinh(b), math.add(b, math.complex(0.0001)));
}

// Function for 'tanc'
function tanc(b) {
    return math.divide(math.tan(b), math.add(b, math.complex(0.0001)));
}

// Function for 'tanhc'
function tanhc(b) {
    return math.divide(math.tanh(b), math.add(b, math.complex(0.0001)));
}

// Function for 'asinc'


// Function for 'acoshc'
function acoshc(b) {
    return math.divide(math.cosh(b), math.add(b, math.complex(0.0001)));
}

// Function for 'asinhc'
function asinhc(b) {
    return math.divide(math.sinh(b), math.add(b, math.complex(0.0001)));
}

// Function for 'atanhc'
function atanhc(b) {
    return math.divide(math.tanh(b), math.add(b, math.complex(0.0001)));
}
function complex(value) {
    return math.complex(value, 0);
}

// Function for 'cis'
function cis(b) {
    return math.multiply(complex(1), math.add(math.multiply(math.cos(b), complex(1, 0)), math.multiply(math.sin(b), complex(0, 1))));
}

// Function for 'cas'
function cas(b) {
    return math.add(math.multiply(math.sin(b), complex(1)), math.multiply(math.cos(b), complex(1)));
}

// Function for 'cish'
function cish(b) {
    return math.add(math.multiply(math.cosh(b), complex(1, 0)), math.multiply(math.sinh(b), complex(0, 1)));
}

// Function for 'sich'
function sich(b) {
    return math.add(math.multiply(math.sinh(b), complex(1, 0)), math.multiply(math.cosh(b), complex(0, 1)));
}

// Function for 'cisc'
function cisc(b) {
    return math.divide(math.multiply(math.cos(b), complex(0, 1)), b);
}

// Function for 'casc'
function casc(b) {
    return math.divide(math.add(math.sin(b), math.cos(b)), b);
}

// Function for 'cishc'
function cishc(b) {
    return math.divide(math.multiply(math.cosh(b), complex(0, 1)), b);
}

// Function for 'sichc'
function sichc(b) {
    return math.divide(math.multiply(math.sinh(b), complex(0, 1)), b);
}

// Function for 'sinp'
function sinp(b) {
    return math.multiply(2.0, math.sinh(math.divide(math.asinh(math.divide(math.subtract(math.multiply(3.0, b), 4.0), 2.0)), 3.0)));
}

function cosp(b) {
    const term = math.cosh(math.multiply(math.divide(2.0, 3.0), math.asinh(math.divide(math.subtract(math.multiply(3.0, b), 4.0), 2.0))));
    return math.multiply(math.subtract(3.0, math.multiply(2.0, term)), complex(1));
}

// Function for 'tanp'
function tanp(b) {
    const asinhTerm = math.asinh(math.divide(math.subtract(math.multiply(3.0, b), 4.0), 2.0));
    const sinhTerm = math.sinh(math.multiply(math.divide(1.0, 3.0), asinhTerm));
    const coshTerm = math.cosh(math.multiply(math.divide(2.0, 3.0), asinhTerm));
    return math.divide(sinhTerm, math.subtract(3.0, math.multiply(2.0, coshTerm)));
}

// Function for 'cscp'
function cscp(b) {
    const asinhTerm = math.asinh(math.divide(math.subtract(math.multiply(3.0, b), 4.0), 2.0));
    const sinhTerm = math.sinh(math.multiply(math.divide(1.0, 3.0), asinhTerm));
    return math.divide(complex(1), math.multiply(2.0, sinhTerm));
}

// Function for 'secp'
function secp(b) {
    const asinhTerm = math.asinh(math.divide(math.subtract(math.multiply(3.0, b), 4.0), 2.0));
    const coshTerm = math.cosh(math.multiply(math.divide(2.0, 3.0), asinhTerm));
    return math.divide(complex(1), math.subtract(3.0, math.multiply(2.0, coshTerm)));
}

// Function for 'cotp'
function cotp(b) {
    const asinhTerm = math.asinh(math.divide(math.subtract(math.multiply(3.0, b), 4.0), 2.0));
    const sinhTerm = math.sinh(math.multiply(math.divide(1.0, 3.0), asinhTerm));
    const coshTerm = math.cosh(math.multiply(math.divide(2.0, 3.0), asinhTerm));
    return math.divide(sinhTerm, coshTerm);
}

// Function for 'asinp'
function asinp(b) {
    const asinhTerm = math.asinh(math.divide(b, 2.0));
    return math.multiply(math.divide(math.add(math.multiply(2.0, math.sinh(math.multiply(asinhTerm, 3.0))), 4.0), 3.0), complex(1));
}

// Function for 'acosp'
function acosp(b) {
    const acoshTerm = math.acosh(math.divide(math.subtract(3.0, b), 2.0));
    return math.multiply(math.divide(math.add(math.multiply(2.0, math.sinh(math.multiply(acoshTerm, math.divide(3.0, 2.0)))), 4.0), 3.0), complex(1));
}

// Function for 'acscp'
function acscp(b) {
    const asinhTerm = math.asinh(math.divide(complex(1.0), b));
    return math.multiply(math.divide(math.add(math.multiply(2.0, math.sinh(math.multiply(asinhTerm, 3.0))), 4.0), 3.0), complex(1));
}

// Function for 'asecp'
function asecp(b) {
    const acoshTerm = math.acosh(math.divide(math.subtract(3.0, math.divide(complex(1.0), b)), 2.0));
    return math.multiply(math.divide(math.add(math.multiply(2.0, math.sinh(math.multiply(acoshTerm, math.divide(3.0, 2.0)))), 4.0), 3.0), complex(1));
}


function arithmeticmean(a, b) {
    return math.divide(math.add(a, b), complex(2.0));
}

function geometricmean(a, b) {
    return math.sqrt(math.multiply(a, b));
}

function arithmeticgeometricmean(a, b) {
    // Implement the AG method here
    // Placeholder for AG function
}

function arithmeticharmonicmean(a, b) {
    const harmonicMean1 = math.divide(complex(1.0), math.add(math.divide(complex(1.0), a), math.divide(complex(1.0), ari(a, b))));
    const harmonicMean2 = math.divide(complex(1.0), math.add(math.divide(complex(1.0), a), math.divide(complex(1.0), ari(a, b))));
    return ari(harmonicMean1, harmonicMean2);
}

function geometricharmonicmean(a, b) {
    const harmonicMean1 = math.divide(complex(1.0), math.add(math.divide(complex(1.0), a), math.divide(complex(1.0), geo(a, b))));
    const harmonicMean2 = math.divide(complex(1.0), math.add(math.divide(complex(1.0), a), math.divide(complex(1.0), geo(a, b))));
    return geo(harmonicMean1, harmonicMean2);
}

function harmonicmean(a, b) {
    return math.divide(complex(1.0), math.add(math.divide(complex(1.0), a), math.divide(complex(1.0), b)));
}

function quadraticmean(a, b) {
    return pow(math.add(pow(a, complex(2.0)), pow(b, complex(2.0))), complex(1.0 / 2.0));
}

function cubicmean(a, b) {
    return pow(math.add(pow(a, complex(3.0)), pow(b, complex(3.0))), complex(1.0 / 3.0));
}

function heronianmean(a, b) {
    return math.divide(math.add(math.add(a, b), sqrt(math.multiply(a, b))), complex(3.0));
}

function contraharmonicmean(a, b) {
    const numerator = ari(pow(a, complex(2.0)), pow(b, complex(2.0)));
    const denominator = ari(a, b);
    return math.divide(numerator, denominator);
}

function neumansandormean(a, b) {
    const numerator = math.subtract(a, b);
    const denominator = math.multiply(complex(2.0), asinh(math.divide(math.subtract(a, b), math.add(a, b))));
    return math.divide(numerator, denominator);
}

function neumansandortmean(a, b) {
    const numerator = math.subtract(a, b);
    const denominator = math.multiply(complex(2.0), atan(math.divide(math.subtract(a, b), math.add(a, b))));
    return math.divide(numerator, denominator);
}

function rootmean(a, b) {
    return sqrt(ari(pow(a, complex(2.0)), pow(b, complex(2.0))));
}

function logarithmicmean(a, b) {
    return math.divide(math.subtract(a, b), math.subtract(log(a), log(b)));
}

function identricmean(a, b) {
    return pow(math.divide(pow(a, a), pow(b, b)), math.divide(complex(1.0), math.subtract(a, b))) / eulerc;
}

function tocomp(value) {
    return math.complex(value);
}

function conj(value) {
    return math.complex(value).conjugate();
}

function arg(value) {
    return math.arg(tocomp(value));
}

function proj(value) {
    return math.multiply(tocomp(value), math.divide(tocomp(value), math.abs(tocomp(value))));
}

function signum(value) {
    const absValue = math.abs(value);
    return math.divide(value, absValue);
}

// Complex operations
function dot(a, b) {
    const aComp = tocomp(a);
    const bComp = tocomp(b);
    return math.add(math.multiply(aComp.re, bComp.re), math.multiply(aComp.im, bComp.im));
}

function cross(a, b) {
    const aComp = tocomp(a);
    const bComp = tocomp(b);
    return math.subtract(math.multiply(aComp.re, bComp.im), math.multiply(aComp.im, bComp.re));
}

function mandel(a, b) {
    const c = tocomp(b);
    const z = tocomp(a);
    return math.add(math.multiply(z, z), c);
}

function conjOp(b) {
    return conj(b);
}

function argOp(b) {
    return arg(b);
}

function im(b) {
    return tocomp(b).im;
}

function re(b) {
    return tocomp(b).re;
}

function dex(b) {
    return pow(complex(10.0), b);
}

function doubleexp(b) {
    return math.exp(math.exp(b));
}

function logOp(a, b) {
    return math.multiply(a, log(b));
}

function logPlus(a, b) {
    return math.add(a, log(b));
}

function logp(b) {
    return math.add(log(b), complex(1.0));
}

function logpc(b) {
    return math.divide(math.add(log(b), complex(1.0)), b);
}

function colog(b) {
    return log(math.divide(complex(1.0), b));
}

function cbrt(b) {
    return pow(b, complex(1.0 / 3.0));
}

function rabs(b) {
    return math.complex(math.abs(tocomp(b).re), tocomp(b).im);
}

function iabs(b) {
    return math.complex(tocomp(b).re, math.abs(tocomp(b).im));
}

function cabs(b) {
    return math.complex(math.abs(tocomp(b).re), math.abs(tocomp(b).im));
}

function sabs(b) {
    return sqrt(math.add(math.multiply(b, b), complex(0.0)));
}

function norm(b) {
    return math.multiply(math.abs(b), math.abs(b));
}

function real(b) {
    return tocomp(b).re;
}

function imag(b) {
    return tocomp(b).im;
}

function vdot(a, b) {
    return math.multiply(conj(tocomp(a)), b);
}

function vcross(a, b) {
    return math.multiply(a, conj(b));
}

function mag(b) {
    return math.abs(b);
}

function angle(b) {
    return arg(b);
}

function unit(b) {
    return math.divide(b, math.abs(b));
}

function signumOp(a, b) {
    return math.multiply(a, signum(tocomp(b).re));
}

// Helper functions
function maxc(a, b) {
    return math.max(a, b);
}

function minc(a, b) {
    return math.min(a, b);
}

function toDouble(value) {
    return Number(value);
}

function toComplex(value) {
    return math.complex(value);
}

function rand() {
    return Math.random(); // Generates a random float between 0 and 1
}

// Main operations
function sqr(b) {
    return math.multiply(b, b);
}

function sqrm(b) {
    return math.subtract(math.multiply(b, b), 1.0);
}

function cum(b) {
    return math.multiply(b, math.multiply(b, b));
}

function cumm(b) {
    return math.subtract(math.multiply(b, math.multiply(b, b)), 1.0);
}

function fz(b) {
    return math.pow(b, b);
}

function qnum(a, b) {
    return math.divide(math.subtract(1.0, math.pow(b, a)), math.subtract(1.0, b));
}

function regularInteriorAngle(b) {
    return math.multiply(math.subtract(b, 2.0), 180.0 / b);
}

function regularExteriorAngle(b) {
    return 360.0 / b;
}

function regularApothem(a, b) {
    return math.divide(a, math.multiply(2.0, math.tan(math.pi / b)));
}

function regularArea(a, b) {
    return math.multiply(0.5, math.multiply(a, math.multiply(b, math.tan(math.pi / b))));
}

function average(a, b) {
    return math.divide(math.add(a, b), 2.0);
}

function clamp(a, b) {
    const lower = 0.0;
    const upper = maxc(a, b);
    return maxc(lower, minc(b, upper));
}

function step(a, b) {
    return toDouble(b) < 0 ? 0 : a;
}

function hstep(a, b) {
    return toDouble(b) < toDouble(a) ? 0 : 1;
}

function ustep(a, b) {
    if (toDouble(b) < 0) return 0;
    if (math.equal(tocomplex(b), tocomplex(0))) return math.divide(a, 2.0);
    return a;
}

function hustep(a, b) {
    if (toDouble(b) < toDouble(a)) return 0;
    if (math.equal(b, a)) return 0.5;
    return 1;
}

function sqrt(a, b) {
    return math.multiply(a, math.sqrt(b));
}

function ceiling(b) {
    return math.ceil(b);
}

function round(b) {
    return math.round(b);
}

function absolute(b) {
    return math.abs(b);
}

function floor(b) {
    return math.floor(b);
}

function randomInteger(a, b) {
    return math.add(math.mod(math.multiply(rand(), math.round(b - a + 1)), math.round(b - a + 1)), math.round(a));
}

function randomFloat(a, b) {
    return math.add(a, math.multiply(rand(), math.subtract(b, a)));
}

// Helper functions
function toComplex(value) {
    return math.complex(value);
}

// Main operations
function cullen(b) {
    return math.add(math.multiply(b, math.pow(toComplex(2.0), b)), toComplex(1.0));
}

function mersenne(b) {
    return math.subtract(math.pow(toComplex(2.0), b), toComplex(1.0));
}

function doubleMersenne(b) {
    return math.subtract(math.pow(toComplex(2.0), math.subtract(math.pow(toComplex(2.0), b), toComplex(1.0))), toComplex(1.0));
}

function doublePrimeMersenne(b) {
    return math.subtract(math.pow(toComplex(2.0), math.subtract(math.pow(toComplex(2.0), nthPrime(b)), toComplex(1.0)))), toComplex(1.0);
}

function fermat(b) {
    return math.add(math.pow(toComplex(2.0), math.pow(toComplex(2.0), b)), toComplex(1.0));
}

function fermatPrime(b) {
    return fermatPrimeList[Math.max(parseInt(toDouble(b)), 4)]; // Example, update with actual list
}

function proth(a, b) {
    return math.add(math.multiply(a, math.pow(toComplex(2.0), b)), toComplex(1.0));
}

function isProthPrime(a, b) {
    return isPrime(math.add(math.multiply(a, math.pow(toComplex(2.0), b)), toComplex(1.0)));
}

function thabit(b) {
    return math.subtract(math.multiply(toComplex(3.0), math.pow(toComplex(2.0), b)), toComplex(1.0));
}

function thabit2(b) {
    return math.add(math.multiply(toComplex(3.0), math.pow(toComplex(2.0), b)), toComplex(1.0));
}

function woodall(b) {
    return math.subtract(math.multiply(b, math.pow(toComplex(2.0), b)), toComplex(1.0));
}

function genWoodall(a, b) {
    return math.subtract(math.multiply(b, math.pow(a, b)), toComplex(1.0));
}

function isGenWoodallPrime(a, b) {
    return isPrime(math.subtract(math.multiply(b, math.pow(a, b)), toComplex(1.0)));
}

function hilbert(b) {
    return math.add(math.multiply(toComplex(4.0), b), toComplex(1.0));
}

function idoneal(b) {
    return idonealList[Math.max(parseInt(toDouble(b)), 65)]; // Example, update with actual list
}

function leyland(a, b) {
    return math.add(math.pow(a, b), math.pow(b, a));
}

function loschian(a, b) {
    return math.add(math.add(math.pow(a, toComplex(2.0)), math.multiply(a, b)), math.pow(b, toComplex(2.0)));
}

function jacobsthal(b) {
    return math.divide(math.subtract(math.pow(toComplex(2.0), b), math.cos(math.multiply(math.pi, b))), toComplex(3.0));
}

function jacobsthallucas(b) {
    return math.subtract(math.pow(toComplex(2.0), b), math.cos(math.multiply(math.pi, b)));
}

function jacobsthaloblong(b) {
    return jacobsthalOblong(b); // Example, update with actual function
}



function pell(b) {
    return math.divide(math.subtract(math.pow(math.add(toComplex(1.0), math.sqrt(toComplex(2.0))), b), math.multiply(math.pow(math.add(toComplex(1.0), math.sqrt(toComplex(2.0))), math.negate(b)), math.cos(math.multiply(math.pi, b)))), math.multiply(math.sqrt(toComplex(2.0)), toComplex(2.0)));
}

function pellLucas(b) {
    return math.divide(math.subtract(math.pow(math.add(toComplex(1.0), math.sqrt(toComplex(2.0))), b), math.multiply(math.pow(math.add(toComplex(1.0), math.sqrt(toComplex(2.0))), math.negate(b)), math.cos(math.multiply(math.pi, b)))), math.multiply(math.sqrt(toComplex(2.0)), toComplex(2.0)));
}



function fibonacci(b) {
    return math.divide(math.subtract(math.pow(toComplex(1.61803399), b), math.multiply(math.pow(toComplex(1.61803399), math.negate(b)), math.cos(math.multiply(math.pi, b)))), math.sqrt(toComplex(5.0)));
}

function lucas(b) {
    return math.subtract(math.pow(toComplex(1.61803399), b), math.multiply(math.pow(toComplex(1.61803399), math.negate(b)), math.cos(math.multiply(math.pi, b))));
}


function orientedTree(b) {
    return math.round(math.multiply(toComplex(0.22571615379282714232305), math.divide(math.pow(toComplex(5.64654261623294971289271351621), b), math.pow(b, math.divide(toComplex(5.0), toComplex(2.0))))));
}

function magic(b) {
    return math.multiply(toComplex(2.0), math.add(nCr(b, toComplex(1.0)), math.add(nCr(b, toComplex(2.0)), nCr(b, toComplex(3.0)))));
}

function magicConst(b) {
    return math.divide(math.multiply(b, math.add(math.pow(b, toComplex(2.0)), toComplex(1.0))), toComplex(2.0));
}

function alucin(b) {
    return math.divide(math.divide(math.pow(b, toComplex(3.0))), math.multiply(math.subtract(toComplex(1.0), math.pow(b, toComplex(2.0))), math.multiply(math.subtract(toComplex(1.0), math.pow(b, toComplex(3.0))), math.subtract(toComplex(1.0), math.pow(b, toComplex(4.0))))));
}

function metallicRatio(b) {
    return math.divide(math.add(b, math.sqrt(math.add(math.pow(b, toComplex(2.0)), toComplex(4.0)))), toComplex(2.0));
}

function joukowsky(b) {
    return math.add(b, math.divide(toComplex(1.0), b));
}

function karmantrefftz(a, b) {
    const expPart = math.pow(math.add(b, a), math.subtract(toComplex(2.0), math.divide(globalc, math.pi)));
    const denom = math.subtract(expPart, math.pow(math.subtract(b, a), math.subtract(toComplex(2.0), math.divide(globalc, math.pi))));
    return math.divide(math.multiply(math.subtract(toComplex(2.0), math.divide(globalc, math.pi)), expPart), denom);
}

function symmetricalJoukowsky(b, a) {
    return math.multiply(math.exp(math.complex(0, globalc)), math.add(math.subtract(b, a), math.add(math.divide(toComplex(1.0), math.subtract(b, a)), math.divide(math.multiply(toComplex(2.0), math.pow(a, toComplex(2.0))), math.add(a, globalc)))));
}

function cayley(b) {
    return math.divide(math.subtract(b, math.complex(0.0, 1.0)), math.add(b, math.complex(1.0, 0.0)));
}

function bilinear(b) {
    return math.divide(math.subtract(b, toComplex(1.0)), math.add(b, toComplex(1.0)));
}

function poincareDiscMetric(a, b) {
    return math.multiply(toComplex(2.0), math.atanh(math.divide(math.subtract(a, b), math.subtract(toComplex(1.0), math.multiply(a, math.conj(b))))));
}

function poincareMetric(a, b) {
    return math.multiply(toComplex(2.0), math.atanh(math.divide(math.subtract(a, b), math.subtract(a, math.conj(b)))));
}

// Helper functions
function toComplex(value) {
    return math.complex(value);
}

function pow(base, exponent) {
    return math.pow(base, exponent);
}

function sigm(x) {
    return math.divide(1.0, math.add(1.0, math.exp(math.multiply(-1.0, x))));
}

// Main operations
function collatz(b) {
    return math.add(
        math.multiply(math.divide(b, toComplex(2.0)), pow(math.cos(math.multiply(math.pi, math.divide(b, toComplex(2.0)))), toComplex(2.0))),
        math.multiply(
            math.add(math.multiply(toComplex(3.0), b), toComplex(1.0)),
            pow(math.sin(math.multiply(math.pi, math.divide(b, toComplex(2.0)))), toComplex(2.0))
        )
    );
}

function zeromosaic(b, a) {
    const quotient = math.round(math.divide(b, a));
    return math.multiply(
        pow(math.subtract(b, math.multiply(a, quotient)), a),
        pow(math.divide(a, toComplex(2.0)), math.multiply(-a, quotient))
    );
}

function initialmass(b) {
    return math.multiply(
        math.divide(toComplex(79.0), math.multiply(math.multiply(toComplex(500.0), b), math.log(toComplex(10.0)))),
        pow(math.exp(math.multiply(-1.0, math.divide(
            math.multiply(toComplex(5000.0), pow(math.subtract(math.log(b), math.log(toComplex(2.0, 25.0))), toComplex(2.0))),
            math.multiply(math.multiply(toComplex(4761.0), math.log(toComplex(10.0))), math.log(toComplex(10.0)))
        ))), toComplex(1.0))
    );
}

function initialmass2(b) {
    return math.multiply(
        math.divide(toComplex(43.0), math.multiply(math.multiply(toComplex(500.0), b), math.log(toComplex(10.0)))),
        pow(math.exp(math.multiply(-1.0, math.divide(
            math.multiply(toComplex(5000.0), pow(math.subtract(math.log(b), math.log(toComplex(11.0, 50.0))), toComplex(2.0))),
            math.multiply(math.multiply(toComplex(3249.0), math.log(toComplex(10.0))), math.log(toComplex(10.0)))
        ))), toComplex(1.0))
    );
}

function kroupa(a, b) {
    return math.add(
        math.multiply(pow(a, math.multiply(toComplex(-23.0), math.divide(toComplex(1.0), toComplex(10.0)))), sigm(math.multiply(math.subtract(a, toComplex(0.5)), math.exp(b)))),
        math.multiply(
            toComplex(2.0),
            math.multiply(
                pow(a, math.multiply(toComplex(-13.0), math.divide(toComplex(1.0), toComplex(10.0)))),
                sigm(math.multiply(math.subtract(a, toComplex(0.5)), math.exp(b)))
            )
        )
    );
}

function kroupatoutgilmore(a, b) {
    return math.add(
        math.multiply(
            pow(a, math.multiply(toComplex(-27.0), math.divide(toComplex(1.0), toComplex(10.0)))),
            sigm(math.multiply(math.subtract(a, toComplex(1.0)), math.exp(b)))
        ),
        math.multiply(
            math.multiply(toComplex(19.0), math.divide(toComplex(1.0), toComplex(1000.0))),
            math.multiply(
                pow(a, math.multiply(toComplex(-11.0), math.divide(toComplex(1.0), toComplex(5.0)))),
                sigm(math.multiply(math.subtract(a, toComplex(1.0)), math.exp(b)))
            )
        )
    );
}

function larsona(b) {
    return math.multiply(pow(b, math.multiply(toComplex(-47.0), math.divide(toComplex(1.0), toComplex(20.0)))), math.exp(math.divide(toComplex(1.0), b)));
}

function larsonb(b) {
    return math.multiply(
        math.multiply(
            pow(toComplex(2.0), math.multiply(toComplex(27.0), math.divide(toComplex(1.0), toComplex(20.0)))),
            pow(math.add(b, toComplex(1.0)), math.multiply(toComplex(-27.0), math.divide(toComplex(1.0), toComplex(20.0))))
        ),
        math.divide(toComplex(1.0), b)
    );
}

function salpeter(b) {
    return pow(b, math.multiply(toComplex(-47.0), math.divide(toComplex(1.0), toComplex(20.0))));
}

function sigmoid(b) {
    return sigm(b);
}

function generalizedlogistic(b, a) {
    return pow(math.add(toComplex(1.0), math.exp(math.multiply(toComplex(-1.0), b))), math.multiply(-a, toComplex(1.0)));
}

function logisticphi(b, a) {
    return math.equal(b, toComplex(0.0))
        ? math.exp(math.multiply(-a, toComplex(1.0)))
        : pow(math.subtract(toComplex(1.0), math.multiply(b, a)), math.divide(toComplex(1.0), b));
}

function logisticregression(b) {
    return math.divide(toComplex(1.0), math.add(toComplex(1.0), math.exp(math.multiply(toComplex(-1.0), b))));
}

function softplus(b) {
    return math.log(math.add(toComplex(1.0), math.exp(b)));
}

function sobolevatanh(b) {
    return math.add(math.tanh(b), math.multiply(b, math.multiply(
        math.divide(toComplex(1.0), math.cosh(b)),
        math.divide(toComplex(1.0), math.cosh(b))
    )));
}

function swish(b) {
    return math.divide(b, math.add(toComplex(1.0), math.exp(math.multiply(toComplex(-1.0), b))));
}

function fermidirac(b) {
    return math.divide(toComplex(1.0), math.add(math.exp(b), toComplex(1.0)));
}

function boseeinstein(b, a) {
    return math.divide(pow(b, a), math.subtract(math.exp(math.subtract(b, globalc)), toComplex(1.0)));
}

function einstein1(b) {
    return math.divide(math.multiply(b, b, math.exp(b)), pow(math.subtract(math.exp(b), toComplex(1.0)), toComplex(2.0)));
}

function einstein2(b) {
    return math.divide(b, math.subtract(math.exp(b), toComplex(1.0)));
}

function einstein3(b) {
    return math.log(math.subtract(toComplex(1.0), math.exp(math.multiply(toComplex(-1.0), b))));
}

function einstein4(b) {
    return math.subtract(
        math.divide(b, math.subtract(math.exp(b), toComplex(1.0))),
        math.log(math.subtract(toComplex(1.0), math.exp(math.multiply(toComplex(-1.0), b))))
    );
}

function probit(a, b) {
    return math.multiply(
        math.sqrt(toComplex(2.0)),
        math.multiply(
            a,
            math.add(
                math.multiply(math.sqrt(math.pi), math.divide(b, toComplex(2.0))),
                math.multiply(
                    math.divide(math.multiply(b, b, b, math.pi), toComplex(12.0)),
                    math.add(
                        math.divide(
                            math.multiply(pow(math.subtract(toComplex(2.0), b), toComplex(5.0)), toComplex(7.0)), 
                            math.multiply(math.pi, toComplex(480.0))
                        ),
                        math.divide(
                            math.multiply(pow(math.subtract(toComplex(2.0), b), toComplex(7.0)), toComplex(127.0)),
                            math.multiply(math.pi, math.multiply(toComplex(40320.0), math.pi))
                        )
                    )
                )
            )
        )
    );
}

function logitlogistic(a, b) {
    return math.divide(a, math.add(toComplex(1.0), math.exp(math.multiply(toComplex(-1.0), b))));
}

function cloglog(b) {
    return math.multiply(-1.0, math.log(math.multiply(-1.0, math.log(math.subtract(toComplex(1.0), math.exp(math.multiply(toComplex(-1.0), b)))))));
}

function gompertz(a, b) {
    return math.exp(math.multiply(-1.0, math.exp(math.multiply(-a, math.subtract(b, toComplex(1.0))))));
}

function log_logistic(a, b) {
    return math.divide(toComplex(1.0), math.add(toComplex(1.0), pow(math.divide(b, a), toComplex(-1.0))));
}

function logistic_exponential(a, b) {
    return math.divide(math.multiply(a, math.exp(b)), math.add(toComplex(1.0), math.exp(b)));
}

function log_odds(b) {
    return math.log(math.divide(b, math.subtract(toComplex(1.0), b)));
}

function pi() {
    return toComplex(math.pi);
}

// Main functions
function rastrigin(a, b) {
    const ten = toComplex(10.0);
    const twoPi = math.multiply(toComplex(2.0), pi());
    return math.add(
        math.multiply(ten, toComplex(2.0)),
        math.add(
            math.subtract(math.multiply(a, a), math.multiply(ten, math.cos(math.multiply(twoPi, a)))),
            math.subtract(math.multiply(b, b), math.multiply(ten, math.cos(math.multiply(twoPi, b))))
        )
    );
}

function ackley(a, b) {
    const negTwenty = toComplex(-20.0);
    const e = math.e;
    const half = toComplex(0.5);
    const expTerm = math.exp(math.multiply(negTwenty, math.sqrt(math.multiply(half, math.add(math.multiply(a, a), math.multiply(b, b))))));
    const cosTerm = math.exp(math.multiply(0.5, math.add(math.cos(math.multiply(toComplex(2.0), pi(), a)), math.cos(math.multiply(toComplex(2.0), pi(), b)))));
    return math.add(
        math.subtract(expTerm, cosTerm),
        math.add(e, toComplex(20.0))
    );
}

function sphere(a, b) {
    return math.add(math.multiply(a, a), math.multiply(b, b));
}

function rosenbrock(a, b) {
    const hundred = toComplex(100.0);
    return math.add(
        math.multiply(hundred, math.pow(math.subtract(b, math.multiply(a, a)), 2)),
        math.pow(math.subtract(toComplex(1.0), a), 2)
    );
}

function beale(a, b) {
    return math.add(
        math.pow(math.subtract(math.add(toComplex(1.5), math.multiply(math.subtract(a, math.multiply(a, b)), b)), math.multiply(a, b)), 2),
        math.add(
            math.pow(math.subtract(math.add(toComplex(2.25), math.multiply(math.subtract(a, math.multiply(a, b)), math.multiply(b, b))), math.multiply(a, math.multiply(b, b))), 2),
            math.pow(math.subtract(math.add(toComplex(2.625), math.multiply(math.subtract(a, math.multiply(a, b)), math.multiply(b, b, b))), math.multiply(a, math.multiply(b, b, b))), 2)
        )
    );
}

function goldsteinprice(a, b) {
    const one = toComplex(1.0);
    const thirty = toComplex(30.0);
    const nineteen = toComplex(19.0);
    const fourteen = toComplex(14.0);
    const three = toComplex(3.0);
    const eighteen = toComplex(18.0);
    const thirtyTwo = toComplex(32.0);
    const twelve = toComplex(12.0);
    const fortyEight = toComplex(48.0);
    const thirtySix = toComplex(36.0);
    const twentySeven = toComplex(27.0);

    const term1 = math.add(
        one,
        math.multiply(math.pow(math.add(a, b, one), 2), math.add(
            nineteen,
            math.subtract(math.multiply(fourteen, a), math.multiply(three, math.pow(a, 2))),
            math.subtract(math.multiply(fourteen, b), math.multiply(math.multiply(six, a), b)),
            math.multiply(three, math.pow(b, 2))
        ))
    );
    const term2 = math.add(
        thirty,
        math.multiply(math.pow(math.subtract(math.multiply(two, a), math.multiply(three, b)), 2), math.add(
            eighteen,
            math.subtract(math.multiply(thirtyTwo, a), math.multiply(twelve, math.pow(a, 2))),
            math.add(
                fortyEight,
                math.subtract(math.multiply(thirtySix, a), math.multiply(math.multiply(three, a), b)),
                math.multiply(twentySeven, math.pow(b, 2))
            )
        ))
    );

    return math.multiply(term1, term2);
}

function booth(a, b) {
    return math.add(
        math.pow(math.subtract(math.add(a, math.multiply(two, b)), toComplex(7.0)), 2),
        math.pow(math.subtract(math.add(math.multiply(two, a), b), toComplex(5.0)), 2)
    );
}

function bukin(a, b) {
    const hundred = toComplex(100.0);
    const point01 = toComplex(0.01);
    return math.add(
        math.multiply(hundred, math.sqrt(math.abs(math.subtract(b, math.multiply(point01, math.pow(a, 2)))))),
        math.multiply(point01, math.abs(math.add(a, toComplex(10.0))))
    );
}

function matyas(a, b) {
    return math.subtract(
        math.multiply(toComplex(0.26), math.add(math.multiply(a, a), math.multiply(b, b))),
        math.multiply(toComplex(0.48), math.multiply(a, b))
    );
}

function levi(a, b) {
    const threePi = math.multiply(toComplex(3.0), pi());
    const twoPi = math.multiply(toComplex(2.0), pi());
    return math.add(
        math.pow(math.sin(threePi, a), 3),
        math.multiply(math.pow(math.subtract(a, toComplex(1.0)), 2), math.add(toComplex(1.0), math.pow(math.sin(threePi, b), 3))),
        math.multiply(math.pow(math.subtract(b, toComplex(1.0)), 2), math.add(toComplex(1.0), math.pow(math.sin(twoPi, b), 2)))
    );
}

function himmelblau(a, b) {
    return math.add(
        math.pow(math.subtract(math.multiply(a, a), toComplex(11.0)), 2),
        math.pow(math.subtract(math.multiply(a, math.multiply(b, b)), toComplex(7.0)), 2)
    );
}

function threehump(a, b) {
    return math.add(
        math.multiply(toComplex(2.0), math.pow(a, 2)),
        math.subtract(
            math.multiply(toComplex(1.05), math.pow(a, 4)),
            math.divide(math.multiply(a, math.pow(a, 4)), toComplex(6.0))
        ),
        math.add(
            math.multiply(a, b),
            math.multiply(b, b)
        )
    );
}

function easom(a, b) {
    return math.multiply(
        math.multiply(math.cos(a), math.cos(b)),
        math.exp(math.subtract(
            math.multiply(
                toComplex(-1.0),
                math.add(
                    math.pow(math.subtract(a, pi()), 2),
                    math.pow(math.subtract(b, pi()), 2)
                )
            )
        ))
    );
}

function crossintray(a, b) {
    return math.pow(
        math.subtract(
            toComplex(-0.0001),
            math.multiply(
                math.sin(a),
                math.sin(b),
                math.exp(
                    math.abs(
                        math.subtract(
                            toComplex(100.0),
                            math.divide(math.sqrt(math.add(math.pow(a, 2), math.pow(b, 2))), pi())
                        )
                    )
                )
            )
        ),
        toComplex(0.1)
    );
}
function eggholder(a, b) {
    const fortySeven = toComplex(47.0);
    return math.multiply(
        toComplex(-1.0),
        math.add(
            math.multiply(math.add(b, fortySeven), math.sin(math.sqrt(math.abs(math.add(math.divide(a, toComplex(2.0)), fortySeven))))),
            math.multiply(math.sin(math.sqrt(math.abs(math.subtract(a, math.add(b, fortySeven))))), toComplex(-1.0))
        )
    );
}

function holdertable(a, b) {
    return math.multiply(
        toComplex(-1.0),
        math.abs(
            math.multiply(math.sin(a), math.cos(b)),
            math.exp(math.abs(math.subtract(toComplex(1.0), math.divide(math.sqrt(math.add(math.pow(a, 2), math.pow(b, 2))), pi()))))
        )
    );
}

function mccormick(a, b) {
    return math.add(
        math.sin(math.add(a, b)),
        math.add(
            math.pow(math.subtract(a, b), 2),
            math.add(
                math.multiply(toComplex(-1.5), a),
                math.add(
                    math.multiply(toComplex(2.5), b),
                    toComplex(1.0)
                )
            )
        )
    );
}

function schaffern2(a, b) {
    const denom = math.pow(math.add(toComplex(1.0), math.multiply(toComplex(0.001), math.add(math.pow(a, 2), math.pow(b, 2)))), 2);
    return math.divide(
        math.subtract(math.pow(math.sin(math.subtract(math.pow(a, 2), math.pow(b, 2))), 2), toComplex(0.5)),
        denom
    );
}

function schaffern4(a, b) {
    const denom = math.pow(math.add(toComplex(1.0), math.multiply(toComplex(0.001), math.add(math.pow(a, 2), math.pow(b, 2)))), 2);
    return math.divide(
        math.subtract(math.pow(math.cos(math.sin(math.abs(math.subtract(math.pow(a, 2), math.pow(b, 2))))), 2), toComplex(0.5)),
        denom
    );
}

function styblinskitang(a, b) {
    const sixteen = toComplex(16.0);
    const five = toComplex(5.0);
    return math.divide(
        math.add(
            math.add(
                math.subtract(math.pow(a, 4), math.multiply(sixteen, a)),
                math.add(five, a)
            ),
            math.add(
                math.subtract(math.pow(b, 4), math.multiply(sixteen, b)),
                math.add(five, b)
            )
        ),
        toComplex(2.0)
    );
}

function mihrasbird(a, b) {
    return math.add(
        math.multiply(math.sin(b), math.exp(math.pow(math.subtract(toComplex(1.0), math.cos(a)), 2))),
        math.add(
            math.multiply(math.sin(a), math.exp(math.pow(math.subtract(toComplex(1.0), math.cos(b)), 2))),
            math.pow(math.subtract(a, b), 2)
        )
    );
}

function townsend(a, b) {
    return math.subtract(
        toComplex(-1.0),
        math.add(
            math.pow(math.cos(math.multiply(math.subtract(a, toComplex(0.1)), b)), 2),
            math.multiply(a, math.sin(math.add(math.multiply(toComplex(3.0), a), b)))
        )
    );
}

function gomezlevi(a, b) {
    const four = toComplex(4.0);
    const twoPointOne = toComplex(2.1);
    const six = toComplex(6.0);
    return math.add(
        math.add(
            math.multiply(four, math.pow(a, 2)),
            math.subtract(
                math.multiply(twoPointOne, math.pow(a, 4)),
                math.divide(math.pow(a, 5), six)
            )
        ),
        math.add(
            math.multiply(a, b),
            math.subtract(
                math.multiply(four, math.pow(b, 2)),
                math.multiply(four, math.pow(b, 4))
            )
        )
    );
}

function simionescu(a, b) {
    return math.multiply(toComplex(0.1), math.multiply(a, b));
}

function griewank(a, b) {
    const sum = math.add(math.pow(a, 2), math.pow(b, 2));
    return math.add(
        toComplex(1.0),
        math.subtract(
            math.divide(sum, toComplex(4000.0)),
            math.multiply(math.cos(a), math.cos(math.divide(b, math.sqrt(toComplex(2.0)))))
        )
    );
}

function schwefel221(a, b) {
    return math.multiply(toComplex(0.01), math.add(math.abs(a), math.abs(b)));
}

function schwefel222(a, b) {
    return math.max(math.abs(a), math.abs(b));
}

function bird(a, b) {
    return math.add(
        math.multiply(math.sin(a), math.exp(math.pow(math.subtract(toComplex(1.0), math.cos(b)), 2))),
        math.add(
            math.multiply(math.cos(b), math.exp(math.pow(math.subtract(toComplex(1.0), math.sin(a)), 2))),
            math.pow(math.subtract(a, b), 2)
        )
    );
}

function alpine(a, b) {
    return math.add(
        math.abs(math.add(math.multiply(a, math.sin(a)), math.multiply(toComplex(0.1), a))),
        math.abs(math.add(math.multiply(b, math.sin(b)), math.multiply(toComplex(0.1), b)))
    );
}

function sdp(a, b) {
    return math.add(
        math.pow(math.abs(a), 2),
        math.pow(math.abs(b), 3)
    );
}

function sumsquaresonsphere(a, b) {
    return math.add(
        math.add(
            math.pow(a, 2),
            math.pow(b, 2)
        ),
        math.subtract(
            math.subtract(
                math.cos(math.multiply(toComplex(18.0), a, pi())),
                math.cos(math.multiply(toComplex(18.0), b, pi()))
            )
        )
    );
}

function michalewicz(a, b) {
    const m = math.round(a); // rounding a to nearest integer for use in the loop
    let sum = toComplex(0.0);
    for (let i = 1; i <= m; i++) {
        sum = math.add(sum, math.multiply(
            math.sin(b),
            math.pow(math.sin(math.multiply(i, b, b, math.divide(math.pi, m))), math.multiply(2, m))
        ));
    }
    return math.multiply(toComplex(-1.0), sum);
}

function booths(a, b) {
    return math.add(
        math.pow(math.add(a, math.multiply(toComplex(2.0), b), toComplex(-7.0)), 2),
        math.pow(math.add(math.multiply(toComplex(2.0), a), b, toComplex(-5.0)), 2)
    );
}

function sumsquares(a, b) {
    return math.add(
        math.pow(a, 2),
        math.pow(b, 2)
    );
}

function bohachevsky(a, b) {
    return math.add(
        math.add(
            math.pow(a, 2),
            math.multiply(toComplex(2.0), math.pow(b, 2))
        ),
        math.add(
            math.multiply(toComplex(-0.3), math.cos(math.multiply(toComplex(3.0), pi(), a))),
            math.add(
                math.multiply(toComplex(-0.4), math.cos(math.multiply(toComplex(4.0), pi(), b))),
                toComplex(0.7)
            )
        )
    );
}

function sixhumpcamel(a, b) {
    return math.add(
        math.multiply(
            math.add(
                toComplex(4.0),
                math.subtract(math.multiply(toComplex(-2.1), math.pow(a, 2)), math.divide(math.pow(a, 4), toComplex(3.0)))
            ),
            math.pow(a, 2)
        ),
        math.add(
            math.multiply(a, b),
            math.multiply(
                math.subtract(
                    toComplex(-4.0),
                    math.multiply(toComplex(4.0), math.pow(b, 2))
                ),
                math.pow(b, 2)
            )
        )
    );
}

function shubert(a, b) {
    let sum1 = toComplex(0.0);
    let sum2 = toComplex(0.0);
    for (let i = 1; i <= 5; i++) {
        sum1 = math.add(
            sum1,
            math.multiply(i, math.cos(math.add(math.multiply(math.add(i, toComplex(1.0)), a), i)))
        );
        sum2 = math.add(
            sum2,
            math.multiply(i, math.cos(math.add(math.multiply(math.add(i, toComplex(1.0)), b), i)))
        );
    }
    return math.multiply(sum1, sum2);
}

function acosc(b) {
    const const1 = toComplex(2.798386045783887);
    const const2 = toComplex(0.33650841691839534);
    const const3 = toComplex(-0.33650841691839534);
    const const4 = toComplex(3.0 * 2.798386045783887 * -0.33650841691839534);

    let fi = math.subtract(
        const1,
        math.pow(math.divide(math.multiply(toComplex(2.0), math.add(b, const2)), const2), toComplex(0.5))
    );

    fi = math.subtract(
        fi,
        math.divide(math.multiply(toComplex(2.0), math.add(b, const2)), const4)
    );

    for (let i = 0; i < 5; i++) {
        const fiDenom = math.divide(
            math.subtract(math.cos(fi), fi),
            math.multiply(math.divide(math.subtract(math.sin(fi), math.cos(fi)), fi), fi)
        );

        fi = math.add(fi, math.divide(
            math.subtract(b, math.divide(math.cos(fi), fi)),
            fiDenom
        ));
    }

    return fi;
}

function acosq(b) {
    return acosc(math.multiply(
        toComplex(0, 1),
        math.divide(pi(), toComplex(4.0))
    ) * toComplex(b));
}

function asinc(b) {
    const bs = math.subtract(toComplex(1.0), b);
    let fi = math.divide(
        math.multiply(math.sqrt(math.multiply(toComplex(6.0), bs)), math.sin(bs)),
        bs
    );

    for (let i = 0; i < 5; i++) {
        const fiDenom = math.divide(
            math.subtract(math.cos(fi), math.sin(fi)),
            math.multiply(math.divide(math.subtract(math.sin(fi), math.cos(fi)), fi), fi)
        );

        fi = math.add(fi, math.divide(
            math.subtract(b, math.divide(math.sin(fi), fi)),
            fiDenom
        ));
    }

    return fi;
}

function dedekindeta(z) {
 
    const eulerConstant = eulerc();
    const exponent = math.multiply(toComplex(2.0), z, pi(), math.complex(0,1));
    const q = math.pow(eulerConstant, exponent);
    let p = math.pow(q, math.divide(toComplex(1.0), toComplex(24.0)));
    


    for (let id = 1; id < 20; id++) {
        const qi = math.pow(q, toComplex(id));
        p = math.multiply(p, math.subtract(toComplex(1.0), qi));
    }

    return p;
}

function einsteinseries(a, b) {
    let fi = toComplex(0);
    const limit = toComplex(5);
    
    for (let i = -limit; i < limit; i++) {
        for (let j = -limit; j < limit; j++) {
            if (i !== 0 || j !== 0) {
                const denominator = pow(math.add(i,math.multiply(j ,b)), a);
                if (denominator !== 0) {
                    fi = math.add(fi, math.divide(toComplex(1), denominator));
                }
            }
        }
    }
    
    return fi;
}

// Fourier Einstein function
function fouriereinstein(a, b) {
    return math.multiply(einsteinseries(a, b), toComplex(2.0), ZZZ(a));
}



// Define ZZZ function based on your actual implementation
function ZZZ(x) {
        return math.multiply(math.divide(toComplex(1.0), math.subtract(toComplex(1.0), math.pow(toComplex(2.0), math.subtract(toComplex(1.0), x)))),dirichleteta(x));
}

function laurentexpansion(a,c,z) {
    let fi = toComplex(0);
    for (let i = 1; i < 30; i++) {
        fi =  math.add(pow(math.multiply(math.subtract(z,c),a),toComplex(i)), fi);
    }
return fi;
}

// Dirichlet Character function
function dirichletchar(a, b) {
    return (abs(gcd(a, b)) === 1) ? toComplex(1.0) : toComplex(0.0);
}
function ncr(n, r) 
{ 
    return facti(n) / (facti(r) * facti(n - r)); 
} 

// Returns factorial of n 
function facti(n) 
{ 
      if(n==0 || n==1)
      return 1;
    var res = 1; 
    for (var i = 2; i <= n; i++) 
        res = res * i; 
    return res; 
} 
// Dirichlet Eta function
function dirichleteta(b) {
    let t = toComplex(0);
    let fi = toComplex(0);
    
    for (let i = 0; i < 15; i++) {
        t = toComplex(0);
        for (let j = 0; j <= i; j++) {
            t = math.add(t, math.multiply(ncr(i, j), math.divide(pow(-1.0, j), pow(j + 1.0, b))));
        }
        fi = math.add(fi, math.divide(t, pow(2.0, i + 1.0)));
    }
    
    return fi;
}

function dirichletbeta(b) {
    b = toComplex(b); // Ensure b is complex
    let fi = toComplex(0);
    let mul = toComplex(1);

    if (b.re <= 0.5) {
        // Calculate multiplication factor
        const piHalf = math.divide(pi(), toComplex(2));
        const bMinus1 = math.subtract( toComplex(1),b);
        mul = math.multiply(
            math.pow(piHalf, math.subtract(toComplex(0),bMinus1)),
            math.sin(math.divide(math.multiply(pi(), bMinus1), toComplex(2))),
            gamma(bMinus1),dirichletbeta(bMinus1)
        );


return mul;
    }

    // Summation part
    for (let n = 0; n < bign; n++) {
        fi = math.add(
            fi,
            math.divide(
                math.pow(-1, n),
                math.pow(math.add(2 * n, 1), b)
            )
        );
    }
    
    return fi;
}



function gammad(t, z) {
    return math.multiply(pow(t, math.subtract(z,toComplex(1)) ),math.exp(-t));
}
function gamma(z) {
    // Convert z to a complex number if it's not already
    const complexZ = math.complex(z);

    // Initialize the function with exp(-0.577216 * z) / z
    let fi = math.divide(math.exp(math.multiply(-0.577216, complexZ)), complexZ);

    // Loop to compute the product
    for (let i = 1; i < 20; i++) {
        let term = math.divide(complexZ, i);
        fi = math.multiply(fi, math.divide(math.exp(term), math.add(1, term)));
    }

    return fi;
}

function jacobiTheta1(z, q) {
    let fi = math.complex(0, 0);
    
    for (let n = 0; n < bign; n++) {
        let term = math.multiply(
            math.pow(-1, n),
            math.pow(q, math.pow(n + 0.5, 2)),
            math.sin(math.multiply(2 * n + 1, z))
        );
        fi = math.add(fi, term);
    }
    
    return math.multiply(fi, 2.0);
}

// Define the jacobiTheta2 function
function jacobiTheta2(z, q) {
    let fi = math.complex(0, 0);
    
    for (let n = 0; n < bign; n++) {
        let term = math.multiply(
            math.pow(q, math.pow(n + 0.5, 2)),
            math.cos(math.multiply(2 * n + 1, z))
        );
        fi = math.add(fi, term);
    }
    
    return math.multiply(fi, 2.0);
}

// Define the jacobiTheta3 function
function jacobiTheta3(z, q) {
    let fi = math.complex(1, 0);
    
    for (let n = 1; n < bign; n++) {
        let term = math.multiply(
            math.pow(q, n * n),
            math.cos(math.multiply(2 * n, z))
        );
        fi = math.add(fi, term);
    }
    
    return math.multiply(fi, 2.0);
}

// Define the jacobiTheta4 function
function jacobiTheta4(z, q) {
    let fi = math.complex(1, 0);
    
    for (let n = 1; n < bign; n++) {
        let term = math.multiply(
            math.pow(-1, n),
            math.pow(q, n * n),
            math.cos(math.multiply(2 * n, z))
        );
        fi = math.add(fi, term);
    }
    
    return math.multiply(fi, 2.0);
}

function jinvariant(z) {
    // Calculate a1 and a2
    const a1 = math.pow(dedekindeta(z), 24.0);
    const a2 = math.pow(dedekindeta(math.multiply(2.0, z)), 24.0);
    
    // Compute the final result
    const numerator = math.pow(math.add(a1, math.multiply(256.0, a2)), 3.0);
    const denominator = math.multiply(1728.0, math.pow(a1, 2.0), a2);
    
    return math.divide(numerator, denominator);
}
function lemniscaten(b) {
    return math.divide(
        lemniscatem(math.multiply(math.complex(1.0, 1.0), b)),
        math.multiply(math.complex(1.0, 1.0), lemniscatem( b))
    );
}

function lemniscatem(b) {
    let fi = toComplex(b);
    for (let i = 1; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const l = math.complex(math.multiply(2.62205755 , i), math.multiply(2.62205755 , j));
            const term = math.divide(math.pow(b, 4), math.pow(l, 4));
            fi = math.multiply(fi, math.subtract(toComplex(1.0), term));
        }
    }
    return fi;
}


function lemniscates(b) {
    return math.subtract(
        math.pow(lemniscaten(math.divide(b, math.complex(1.0, 1.0))), toComplex(2)),
        math.multiply(math.complex(0, 1), math.pow(lemniscatem( math.divide(b, math.complex(1.0, 1.0))), toComplex(2)))
    );
}

function lemniscatet(a) {
let b = math.multiply(a,math.complex(0,1));
    return lemniscates(b);
}



function sl(a) {
let b = math.subtract(1.311028775 , a);
    const l1 = lemniscates(b);
    const l2 = lemniscatet(b);
    return math.divide(l1, l2);
}

function cl(x) {
    const l1 = lemniscates(x);
    const l2 = lemniscatet(x);
    return math.divide(l1, l2);
}

function lemniscatetan(b) {
    return math.divide(
        sl(b),
        cl(b)
    );
}

function lemniscatecot(b) {
    return math.divide(
        cl(b),
        sl(b)
    );
}

function lemniscatecsc(b) {
  return math.divide(toComplex(1),sl(s));
}

function lemniscatesec(b) {
 return math.divide(toComplex(1),cl(s));
}

function tlh(b) {
    const fisl = sl(math.divide(b, math.sqrt(2.0)));
    const ficl = cl(math.divide(b, math.sqrt(2.0)));
    return math.multiply(fisl, math.sqrt(math.divide(math.add(math.pow(ficl, 2), toComplex(1.0)), math.add(math.pow(fisl, 2), math.multiply(ficl, ficl)))));
}

function ctlh(b) {
    const fisl = sl(math.divide(b, math.sqrt(2.0)));
    const ficl = cl(math.divide(b, math.sqrt(2.0)));
    return math.multiply(ficl, math.sqrt(math.divide(math.add(math.pow(fisl, 2), toComplex(1.0)), math.add(math.pow(fisl, 2), math.multiply(ficl, ficl)))));

   }

function polygonal(a, b) {
    return math.divide(
        math.subtract(
            math.multiply(math.subtract(a, toComplex(2.0)), math.pow(b, 2)),
            math.multiply(math.subtract(a, toComplex(4.0)), b)
        ),
        toComplex(2.0)
    );
}

function antisidepolygonal(a, b) {
    const term1 = math.multiply(toComplex(8.0), math.subtract(a, toComplex(2.0)));
    const term2 = math.subtract(math.pow(b, 2), math.multiply(toComplex(4.0), b));
    return math.divide(
        math.add(math.sqrt(math.add(term1, term2)), math.subtract(a, toComplex(4.0))),
        math.subtract(math.multiply(toComplex(2.0), a), toComplex(4.0))
    );
}

function antipolygonal(a, b) {
    return antisidepolygonal(a, b);
}

function centeredpolygonal(a, b) {
    return math.add(
        math.multiply(math.divide(a, toComplex(2.0)), math.multiply(b, math.subtract(b, toComplex(1.0)))),
        toComplex(1.0)
    );
}

function pyramidal(a, b) {
    return math.divide(
        math.add(
            math.multiply(toComplex(3.0), math.pow(b, 2)),
            math.add(
                math.multiply(math.pow(b, 2), math.subtract(a, toComplex(2.0))),
                math.subtract(math.multiply(toComplex(-1.0), b), math.subtract(a, toComplex(5.0)))
            )
        ),
        toComplex(6.0)
    );
}

function star(b) {
    return math.add(
        math.multiply(toComplex(6.0), math.multiply(b, math.subtract(b, toComplex(1.0)))),
        toComplex(1.0)
    );
}

function starprime(b) {
    let i = toComplex(0.0);
    while (math.larger(math.abs(i), math.abs(b))) {
        if (isPrime(math.add(math.multiply(toComplex(6.0), math.multiply(i, math.subtract(i, toComplex(1.0)))), toComplex(1.0)))) {
            i = math.add(i, toComplex(1.0));
        }
    }
    return i;
}

function superstarprime(b) {
    let i = toComplex(0.0);
    while (math.larger(math.abs(i), math.abs(b))) {
        if (isPrime(math.add(math.multiply(toComplex(6.0), math.multiply(nthPrime(i), math.subtract(nthPrime(i), toComplex(1.0)))), toComplex(1.0)))) {
            i = math.add(i, toComplex(1.0));
        }
    }
    return i;
}

function reversesuperstar(b) {
    return math.add(
        math.multiply(toComplex(6.0), math.multiply(nthPrime(b), math.subtract(nthPrime(b), toComplex(1.0)))),
        toComplex(1.0)
    );
}

function superballot(b) {
    return math.divide(
        math.multiply(toComplex(60.0), gamma(math.add(math.multiply(toComplex(2.0), b), toComplex(1.0)))),
        math.multiply(gamma(math.add(b, toComplex(1.0))), gamma(math.add(b, toComplex(4.0))))
    );
}

function hauyoctahedral(b) {
    return math.divide(
        math.multiply(
            math.subtract(math.multiply(toComplex(2.0), b), toComplex(1.0)),
            math.subtract(math.multiply(toComplex(2.0), math.pow(b, 2)), math.add(math.multiply(toComplex(-2.0), b), toComplex(3.0)))
        ),
        toComplex(3.0)
    );
}

function hauyrhombicdodecahedronal(b) {
    return math.multiply(
        math.subtract(math.multiply(toComplex(2.0), b), toComplex(1.0)),
        math.subtract(math.multiply(toComplex(8.0), math.pow(b, 2)), math.add(math.multiply(toComplex(-14.0), b), toComplex(7.0)))
    );
}

function hauysquarepyramid(b) {
    return math.divide(
        math.multiply(b, math.subtract(math.multiply(toComplex(4.0), math.pow(b, 2)), toComplex(1.0))),
        toComplex(3.0)
    );
}

function octahedral(b) {
    return math.divide(
        math.multiply(b, math.add(math.multiply(toComplex(2.0), math.pow(b, 2)), toComplex(1.0))),
        toComplex(3.0)
    );
}

function pronic(b) {
    return math.multiply(b, math.add(b, toComplex(1.0)));
}

function biquadratic(b) {
    return math.pow(b, 4);
}

function surfolide(b) {
    return math.pow(b, 5);
}

function secondsurfolide(b) {
    return math.pow(b, 7);
}

function thirdsurfolide(b) {
    return math.pow(b, 11);
}

function fourthsurfolide(b) {
    return math.pow(b, 13);
}

function fifthsurfolide(b) {
    return math.pow(b, 17);
}

function sixthsurfolide(b) {
    return math.pow(b, 19);
}

function seventhsurfolide(b) {
    return math.pow(b, 23);
}

function nthsurfolide(b, a) {
    return math.pow(b, nthPrime(a + 2.0));
}

function zenzicube(b) {
    return math.pow(b, 6);
}

function cubicube(b) {
    return math.pow(b, 9);
}

function zenzizenzizenzic(b) {
    return math.pow(b, 8);
}

function zenzizenzicube(b) {
    return math.pow(b, 12);
}

function zenzizenzizenzizenzic(b) {
    return math.pow(b, 16);
}

function zenzicubicube(b) {
    return math.pow(b, 18);
}

function zenzizenzizenzicube(b) {
    return math.pow(b, 24);
}

function nthzenzic(b, a) {
    return math.pow(b, math.pow(toComplex(2.0), a));
}

function rhombicdodecahedronal(b) {
    return math.multiply(
        math.subtract(math.multiply(toComplex(2.0), b), toComplex(1.0)),
        math.subtract(math.multiply(toComplex(2.0), math.pow(b, 2)), math.add(math.multiply(toComplex(-2.0), b), toComplex(1.0)))
    );
}

function truncoctahedral(b) {
    return math.add(
        math.subtract(math.multiply(toComplex(16.0), math.pow(b, 3)), math.multiply(toComplex(33.0), math.pow(b, 2))),
        math.add(math.multiply(toComplex(24.0), b), toComplex(-6.0))
    );
}

function trunctetrahedral(b) {
    return math.divide(
        math.multiply(b, math.subtract(math.multiply(toComplex(23.0), math.pow(b, 2)), math.add(math.multiply(toComplex(-27.0), b), toComplex(10.0)))),
        toComplex(6.0)
    );
}

function trigonal(b) {
    return math.divide(math.multiply(b, math.subtract(b, toComplex(1.0))), toComplex(2.0));
}

function pentagonal(b) {
    return math.divide(
        math.subtract(
            math.multiply(math.subtract(toComplex(5.0), toComplex(2.0)), math.pow(b, 2)),
            math.multiply(math.subtract(toComplex(5.0), toComplex(4.0)), b)
        ),
        toComplex(2.0)
    );
}

function hexagonal(b) {
    return math.divide(
        math.subtract(
            math.multiply(math.subtract(toComplex(6.0), toComplex(2.0)), math.pow(b, 2)),
            math.multiply(math.subtract(toComplex(6.0), toComplex(4.0)), b)
        ),
        toComplex(2.0)
    );
}

function septagonal(b) {
    return math.divide(
        math.subtract(
            math.multiply(math.subtract(toComplex(7.0), toComplex(2.0)), math.pow(b, 2)),
            math.multiply(math.subtract(toComplex(7.0), toComplex(4.0)), b)
        ),
        toComplex(2.0)
    );
}

function octagonal(b) {
    return math.divide(
        math.subtract(
            math.multiply(math.subtract(toComplex(8.0), toComplex(2.0)), math.pow(b, 2)),
            math.multiply(math.subtract(toComplex(8.0), toComplex(4.0)), b)
        ),
        toComplex(2.0)
    );
}

function nonagonal(b) {
    return math.divide(
        math.subtract(
            math.multiply(math.subtract(toComplex(9.0), toComplex(2.0)), math.pow(b, 2)),
            math.multiply(math.subtract(toComplex(9.0), toComplex(4.0)), b)
        ),
        toComplex(2.0)
    );
}

function decaagonal(b) {
    return math.divide(
        math.subtract(
            math.multiply(math.subtract(toComplex(12.0), toComplex(2.0)), math.pow(b, 2)),
            math.multiply(math.subtract(toComplex(10.0), toComplex(4.0)), b)
        ),
        toComplex(2.0)
    );
}

function dodecagonalgonal(b) {
    return math.divide(
        math.subtract(
            math.multiply(math.subtract(toComplex(12.0), toComplex(2.0)), math.pow(b, 2)),
            math.multiply(math.subtract(toComplex(12.0), toComplex(4.0)), b)
        ),
        toComplex(2.0)
    );
}

function icosagonal(b) {
    return math.divide(
        math.subtract(
            math.multiply(math.subtract(toComplex(20.0), toComplex(2.0)), math.pow(b, 2)),
            math.multiply(math.subtract(toComplex(20.0), toComplex(4.0)), b)
        ),
        toComplex(2.0)
    );
}

function myriagonal(b) {
    return math.divide(
        math.subtract(
            math.multiply(math.subtract(toComplex(10000.0), toComplex(2.0)), math.pow(b, 2)),
            math.multiply(math.subtract(toComplex(10000.0), toComplex(4.0)), b)
        ),
        toComplex(2.0)
    );
}

// Simplex and Higher Dimensional Functions
function tetrahedral(b) {
    return nCr(math.add(b, toComplex(2.0)), toComplex(3.0));
}

function pentachoric(b) {
    return nCr(math.add(b, toComplex(3.0)), toComplex(4.0));
}

function simplex(b, a) {
    return nCr(math.add(b, a, toComplex(-1.0)), a);
}

// Gnomon Function
function gnomon(b) {
    return math.add(math.multiply(toComplex(2.0), b), toComplex(1.0));
}

const PI = math.pi;

// Barnes-G Function
function barnesg(b) {
    const aggs = math.multiply(pow(2.0 * PI, math.divide(b, 2.0)),  math.exp(math.multiply(-1, math.divide(math.add(b, math.multiply(b, math.add(b, 0.5772156649))), 2.0))));
    let aggt = toComplex(1, 0);

    for (let k = 1; k < bign; k++) {
        aggt = math.multiply(aggt, math.multiply(pow(math.add(1.0 , math.divide(b,k)), k), math.exp(math.subtract(math.divide(math.pow(b, 2), math.multiply(2,k)), b))));
    }

    return math.multiply(aggs, aggt);
}

// K-function (Corrected)
function kfunc(b) {
    const aggs = math.multiply(pow(2.0 * PI, math.divide(b, 2.0)), math.exp(math.multiply(-1, math.divide(math.add(b, math.multiply(b, math.add(b, 0.5772156649))), 2.0))));
    let aggt = toComplex(1, 0);

    for (let k = 1; k < bign; k++) {
        aggt = math.multiply(aggt, math.multiply(pow(math.add(1.0 , math.divide(b,k)), k), math.exp(math.subtract(math.divide(math.pow(b, 2),math.multiply(2,k)), b))));
    }

    return math.divide(math.pow(gamma(b), math.subtract(b, 1.0)), math.multiply(aggs, aggt));
}

// Beta Function
function beta(a, b) {
    return math.divide(math.multiply(gamma(a), gamma(b)), gamma(a + b));
}

// Pi number Functiondigamma(x)
function pin(b) {
    return math.divide(math.pow(gamma(math.divide(1, b)), toComplex(2)), gamma(math.add(math.divide(1, b), math.divide(1, b))));
}

// Digamma Function (Approximation)
function digamma(b, epsilon=1e-5) {
    const m1 = math.log(gamma(b));
    const m2 = math.log(gamma(math.add(b , epsilon)));
    return math.multiply(math.divide(math.subtract(m2, m1), epsilon), 1.0);
}

// Trigamma Function (Approximation)
function trigamma(b, epsilon=1e-5) {
    const m1 = math.log(gamma(b));
    const m2 = math.log(gamma(math.add(b , epsilon)));
    const m3 = math.log(gamma(math.add(math.add(b , epsilon) , epsilon)));
    return math.divide(math.subtract(math.subtract(m2, m1), math.subtract(m3, m2)), epsilon*epsilon);
}
function ellipticModulus(a, b) {
    return pow(math.divide(jacobiTheta2(a, b) , jacobiTheta1(a, b)), toComplex(2));
}

function compEllipticModulus(a, b) {
    return pow(math.divide(jacobiTheta4(a, b) , jacobiTheta1(a, b)), toComplex(2));
}

function ellipticLambda(a, b) {
    return pow(math.divide(jacobiTheta2(a, b) , jacobiTheta3(a, b)), toComplex(4));
}

function g2(b) {
    return math.multiply(60.0, einsteinseries(toComplex(4), b));
}

function g3(b) {
    return math.multiply(140.0, einsteinseries(toComplex(6), b));
}

function picardFuchsJ(b) {
    const g2Val = g2(b);
    const g3Val = g3(b);
    return math.divide(pow(g2Val, toComplex(3)), (pow(g2Val, toComplex(3)) - math.multiply(27.0, pow(g3Val, toComplex(2)))));
}

function ellipticDiscriminant(b) {
    const g2Val = g2(b);
    const g3Val = g3(b);
    return math.subtract(pow(g2Val, toComplex(3)), math.multiply(27.0, pow(g3Val, toComplex(2))));
}

function ellipticLambdaStar(a, b) {
    return pow(math.divide(jacobiTheta2(a, b), jacobiTheta3(a, b )), toComplex(2));
}


function cauchypdf(a, b) {
    return divide(toComplex(1.0), math.multiply(math.pi, a, add(toComplex(1.0), pow(divide(b, a), toComplex(2.0)))));
}

function exponentialpdf(a, b) {
    return math.multiply(a, exp(math.unaryMinus(a * b)));
}

function laplacepdf(a, b) {
    return divide(toComplex(1.0), math.multiply(toComplex(2.0), a)) * exp(math.unaryMinus(math.abs(b) / a));
}

function contunipdf(a, b) {
    return divide(toComplex(1.0), math.subtract(b, a));
}

function arcsinpdf(b) {
    return divide(toComplex(1.0), math.multiply(math.pi, sqrt(math.multiply(b, math.subtract(toComplex(1.0), b)))));
}

// CDF Functions
function cauchycdf(a, b) {
    return divide(math.multiply(toComplex(1.0), atan(divide(b, a))), math.pi) + toComplex(0.5);
}

function exponentialcdf(a, b) {
    return math.subtract(toComplex(1.0), exp(math.unaryMinus(a * b)));
}

function laplacecdf(a, b) {
    const bComplex = toComplex(b);
    if (toReal(bComplex) > 0) {
        return math.subtract(toComplex(1.0), divide(exp(math.unaryMinus(bComplex) / a), toComplex(2.0)));
    }
    return divide(exp(bComplex / a), toComplex(2.0));
}

function arcsincdf(b) {
    const bComplex = toComplex(b);
    if (toReal(bComplex) < 0) return toComplex(0.0);
    if (toReal(bComplex) > 1.0) return toComplex(1.0);
    return math.multiply(divide(toComplex(2.0), math.pi), math.asin(sqrt(bComplex)));
}


math.import({
    cauchyPDF: cauchyPDF,
    exponentialPDF: exponentialPDF,
    laplacePDF: laplacePDF,
    contUniPDF: contUniPDF,
    arcsinPDF: arcsinPDF,
    cauchyCDF: cauchyCDF,
    exponentialCDF: exponentialCDF,
    laplaceCDF: laplaceCDF,
    arcsinCDF: arcsinCDF
});
math.import({
    ellipticModulus: ellipticModulus,
    compEllipticModulus: compEllipticModulus,
    ellipticLambda: ellipticLambda,
    g2: g2,
    g3: g3,
    picardFuchsJ: picardFuchsJ,
    ellipticDiscriminant: ellipticDiscriminant,
    ellipticLambdaStar: ellipticLambdaStar,

});
math.import({
    barnesg: barnesg,
    kfunc: kfunc,
    beta: beta,
    pin: pin,
    digamma: digamma,
    trigamma: trigamma
});
math.import({
    trigonal: trigonal,
    pentagonal: pentagonal,
    hexagonal: hexagonal,
    septagonal: septagonal,
    octagonal: octagonal,
    nonagonal: nonagonal,
    decaagonal: decaagonal,
    dodecagonalgonal: dodecagonalgonal,
    icosagonal: icosagonal,
    myriagonal: myriagonal,
    tetrahedral: tetrahedral,
    pentachoric: pentachoric,
    simplex: simplex,
    gnomon: gnomon
});
math.import({
    hauyoctahedral: hauyoctahedral,
    hauyrhombicdodecahedronal: hauyrhombicdodecahedronal,
    hauysquarepyramid: hauysquarepyramid,
    octahedral: octahedral,
    pronic: pronic,
    biquadratic: biquadratic,
    surfolide: surfolide,
    secondsurfolide: secondsurfolide,
    thirdsurfolide: thirdsurfolide,
    fourthsurfolide: fourthsurfolide,
    fifthsurfolide: fifthsurfolide,
    sixthsurfolide: sixthsurfolide,
    seventhsurfolide: seventhsurfolide,
    nthsurfolide: nthsurfolide,
    zenzicube: zenzicube,
    cubicube: cubicube,
    zenzizenzizenzic: zenzizenzizenzic,
    zenzizenzicube: zenzizenzicube,
    zenzizenzizenzizenzic: zenzizenzizenzizenzic,
    zenzicubicube: zenzicubicube,
    zenzizenzizenzicube: zenzizenzizenzicube,
    nthzenzic: nthzenzic,
    rhombicdodecahedronal: rhombicdodecahedronal,
    truncoctahedral: truncoctahedral,
    trunctetrahedral: trunctetrahedral
});
math.import({
    polygonal: polygonal,
    antisidepolygonal: antisidepolygonal,
    antipolygonal: antipolygonal,
    centeredpolygonal: centeredpolygonal,
    pyramidal: pyramidal,
    star: star,
    starprime: starprime,
    superstarprime: superstarprime,
    reversesuperstar: reversesuperstar,
    superballot: superballot
});
math.import({
    sl:sl,
    cl:cl,
ctlh:ctlh,

tlh:tlh,

    lemniscatetan:lemniscatetan,
    lemniscatecot:lemniscatecot,
    lemniscatecsc:lemniscatecsc,
    lemniscatesec:lemniscatesec,
    lemniscaten:lemniscaten,
    lemniscatem:lemniscatem,
    lemniscates:lemniscates,
    lemniscatet:lemniscatet
});

math.import({
    jacobiTheta1:jacobiTheta1,
    jacobiTheta2:jacobiTheta2,
    jacobiTheta3:jacobiTheta3,
    jacobiTheta4:jacobiTheta4,
jinvariant:jinvariant
});
math.import({
    laurentexpansion: laurentexpansion,
    dirichletchar: dirichletchar,
    dirichleteta: dirichleteta,
    dirichletbeta: dirichletbeta,
gammad:gammad,
gammac:gamma
});
math.import({
    einsteinseries: einsteinseries,
    fouriereinstein: fouriereinstein,
   
    ZZZ: ZZZ,
zeta: ZZZ
});


math.import({
    dedekindeta: dedekindeta
});
math.import({
    acosc: acosc,
    acosq: acosq,
    asinc: asinc
});
math.import({
    griewank: griewank,
    schwefel221: schwefel221,
    schwefel222: schwefel222,
    bird: bird,
    alpine: alpine,
    sdp: sdp,
    sumsquaresonsphere: sumsquaresonsphere,
    michalewicz: michalewicz,
    booths: booths,
    sumsquares: sumsquares,
    bohachevsky: bohachevsky,
    sixhumpcamel: sixhumpcamel,
    shubert: shubert
});
math.import({
    eggholder: eggholder,
    holdertable: holdertable,
    mccormick: mccormick,
    schaffern2: schaffern2,
    schaffern4: schaffern4,
    styblinskitang: styblinskitang,
    mihrasbird: mihrasbird,
    townsend: townsend,
    gomezlevi: gomezlevi,
    simionescu: simionescu
});
math.import({
    rastrigin: rastrigin,
    ackley: ackley,
    sphere: sphere,
    rosenbrock: rosenbrock,
    beale: beale,
    goldsteinprice: goldsteinprice,
    booth: booth,
    bukin: bukin,
    matyas: matyas,
    levi: levi,
    himmelblau: himmelblau,
    threehump: threehump,
    easom: easom,
    crossintray: crossintray
});
math.import({
    collatz: collatz,
    zeromosaic: zeromosaic,
    initialmass: initialmass,
    initialmass2: initialmass2,
    kroupa: kroupa,
    kroupatoutgilmore: kroupatoutgilmore,
    larsona: larsona,
    larsonb: larsonb,
    salpeter: salpeter,
    sigmoid: sigmoid,
    generalizedlogistic: generalizedlogistic,
    logisticphi: logisticphi,
    logisticregression: logisticregression,
    softplus: softplus,
    sobolevatanh: sobolevatanh,
    swish: swish,
    fermidirac: fermidirac,
    boseeinstein: boseeinstein,
    einstein1: einstein1,
    einstein2: einstein2,
    einstein3: einstein3,
    einstein4: einstein4,
    probit: probit,
    logitlogistic: logitlogistic,
    cloglog: cloglog,
    gompertz: gompertz,
    log_logistic: log_logistic,
    logistic_exponential: logistic_exponential,
    log_odds: log_odds
});
math.import({
    cullen: cullen,
    mersenne: mersenne,
    double_mersenne: doubleMersenne,
    double_prime_mersenne: doublePrimeMersenne,
    fermat: fermat,
    fermat_prime: fermatPrime,
    proth: proth,
    is_proth_prime: isProthPrime,
    thabit: thabit,
    thabit2: thabit2,
    woodall: woodall,
    gen_woodall: genWoodall,
    is_gen_woodall_prime: isGenWoodallPrime,
    hilbert: hilbert,
    idoneal: idoneal,
    leyland: leyland,
    loschian: loschian,
    jacobsthal: jacobsthal,
    jacobsthal_lucas: jacobsthallucas,
    jacobsthal_oblong: jacobsthaloblong,
    
        pell: pell,
    pell_lucas: pellLucas,
        fibonacci: fibonacci,
    lucas: lucas,
 
    oriented_tree: orientedTree,
    magic: magic,
    magic_const: magicConst,
    alucin: alucin,
    metallic_ratio: metallicRatio,
    joukowsky: joukowsky,
    karmantrefftz: karmantrefftz,
    symmetrical_joukowsky: symmetricalJoukowsky,
    cayley: cayley,
    bilinear: bilinear,
    poincare_disc_metric: poincareDiscMetric,
    poincare_metric: poincareMetric
});
math.import({
    sqr: sqr,
    sqrm: sqrm,
    cum: cum,
    cumm: cumm,
    fz: fz,
    qnum: qnum,
    regular_interior_angle: regularInteriorAngle,
    regular_exterior_angle: regularExteriorAngle,
    regular_apothem: regularApothem,
    regular_area: regularArea,
    average: average,
    clamp: clamp,
    step: step,
    hstep: hstep,
    ustep: ustep,
    hustep: hustep,
        ceiling: ceiling,
    roundc: round,
    absolute: absolute,
    floorc: floor,
    random_integer: randomInteger,
    random_float: randomFloat
});
math.import({
    dotp: dot,
    crossp: cross,
    mandel: mandel,
            dex: dex,
    doubleexp: doubleexp,
      logPlus: logPlus,
    logp: logp,
    logpc: logpc,
    colog: colog,
    cuberoot: cbrt,
    rabs: rabs,
    iabs: iabs,
    cabs: cabs,
    sabs: sabs,

    proj: proj,
    real: real,
    imag: imag,
    vdot: vdot,
    vcross: vcross,
    mag: mag,
    angle: angle,
    unitv: unit,
    signum: signumOp
});
math.import({
    arithmeticmean: arithmeticmean,
    geometricmean: geometricmean,
    arithmeticgeometricmean: arithmeticgeometricmean,
    arithmeticharmonicmean: arithmeticharmonicmean,
    geometricharmonicmean: geometricharmonicmean,
    harmonicmean: harmonicmean,
    quadraticmean: quadraticmean,
    cubicmean: cubicmean,
    heronianmean: heronianmean,
    contraharmonicmean: contraharmonicmean,
    neumansandormean: neumansandormean,
    neumansandortmean: neumansandortmean,
    rootmean: rootmean,
    logarithmicmean: logarithmicmean,
    identricmean: identricmean
});
math.import({
    cis: cis,
    cas: cas,
    cish: cish,
    sich: sich,
    cisc: cisc,
    casc: casc,
    cishc: cishc,
    sichc: sichc,
    sinp: sinp,
    cosp: cosp,
    tanp: tanp,
    cscp: cscp,
    secp: secp,
    cotp: cotp,
    asinp: asinp,
    acosp: acosp,
    acscp: acscp,
    asecp: asecp
});
math.import({
       crd: crd,
    arccrd: arccrd,
       arccrdd: arccrdd,


    exsec: exsec,
    excosec: excosec,
    versin: versin,
    vercosin: vercosin,
    coversin: coversin,
    covercosine: covercosine,
    haversin: haversin,
    hacovercosin: hacovercosin,
    arcversin: arcversin,
    arcvercos: arcvercos,
    arccoversin: arccoversin,
    arccovercos: arccovercos,
    archaversin: archaversin,
    archavercos: archavercos,
    archacoversin: archacoversin,
    archacovercos: archacovercos,
    sinsqr: sinsqr,
    cossqr: cossqr,
    shid: shid,
        cosc: cosc,
    coshc: coshc,
    sinhc: sinhc,
    tanc: tanc,
    tanhc: tanhc,

});
math.import({
    ramp: ramp,
    squarewave: squarewave,
    trianglewave: trianglewave,
    sawtoothwave: sawtoothwave,
    pulse: pulse,
    todeg: todeg,
    sind: sind,
    sinhdeg: sinhdeg,
    asind: asind,
    cosd: cosd,
    coshdeg: coshdeg,
    acosd: acosd,
    tand: tand,
    tanhdeg: tanhdeg,
    atand: atand,
    atan2d: atan2d
});
math.import({
    powcos: powcos,
    powsin: powsin,
    expPlus: expPlus,
    exp2: exp2,
    exp10: exp10,

    expc: expc,
    expi: expi,
    expic: expic,
    expein: expein,
    expsqr: expsqr,
    expmsqr: expmsqr,
    logMinus1: logMinus1,


    _log: _log,
    antilog: antilog,
    antilog2: antilog2,
    antilog10: antilog10,
    logc: logc,
    naplog: naplog,
    dist: dist,

    sdist: sdist,
    zdist: zdist
});


// Import the functions into Math.js
math.import({
    taxicab: taxicab,
    arctaxicab: arctaxicab,
    chebyshev: chebyshev,
    arcchebyshev: arcchebyshev
});

    math.import({
      sinc: sinc
    });