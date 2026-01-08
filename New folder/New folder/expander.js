function stringfy(inp, maxima = -1) {
    let chararray = [];
    let numbuffer = '';
    let commacount = 0;

    for (let c of inp) {
        if (c === ',') commacount++;
        else {
            if(maxima !== -1) commacount = Math.min(commacount, maxima);
            if (commacount > 0) chararray.push("-N" + commacount);
            commacount = 0;

            if (/\d/.test(c)) numbuffer += c;
            else {
                if (numbuffer.length > 0) chararray.push("-N" + numbuffer);
                numbuffer = '';
                switch (c) {
                    case '(': chararray.push("01"); break;
                    case ')': chararray.push("-01"); break;
                    case '[': chararray.push("02"); break;
                    case ']': chararray.push("-02"); break;
                    case '{': chararray.push("03"); break;
                    case '}': chararray.push("-03"); break;
                    case 'U': chararray.push("-N50"); break;
                    case 'w': chararray.push("09"); chararray.push("-N1"); chararray.push("-09"); break;
                    case '<': if(chararray[chararray.length - 1][1] !== 'N') chararray.push("<"); break;
                    default: if (!/\s/.test(c)) chararray.push(c); break;
                }
            }
        }
    }
    if (commacount > 0) chararray.push("-N" + commacount);
    if (numbuffer.length > 0) chararray.push("-N" + numbuffer);

    return chararray;
}

function del(chararray) {
    let first03Index = chararray.length;
    let first02Index = chararray.length;
    let first01Index = chararray.length;
    let firstLessThanIndex = chararray.length;

    for (let i = 0; i < chararray.length; ++i) {
        if (chararray[i] === "03" && first03Index === chararray.length) {
            first03Index = i;
        } else if (chararray[i] === "02" && first02Index === chararray.length) {
            first02Index = i;
        } else if (chararray[i] === "01" && first01Index === chararray.length) {
            first01Index = i;
        } else if (chararray[i] === "<" && firstLessThanIndex === chararray.length) {
            firstLessThanIndex = i;
        }
    }

    if (first03Index < chararray.length) {
        chararray = chararray.filter((str, index) => !(index < first03Index && str === "-03"));
    } else {
        chararray = chararray.filter(str => str !== "-03");
    }

    if (first02Index < chararray.length) {
        chararray = chararray.filter((str, index) => !(index < first02Index && str === "-02"));
    } else {
        chararray = chararray.filter(str => str !== "-02");
    }

    if (first01Index < chararray.length) {
        chararray = chararray.filter((str, index) => !(index < first01Index && str === "-01"));
    } else {
        chararray = chararray.filter(str => str !== "-01");
    }

    if (firstLessThanIndex < chararray.length) {
        chararray = chararray.filter((str, index) => !(index < firstLessThanIndex && str === ">"));
    } else {
        chararray = chararray.filter(str => str !== ">");
    }
    return chararray;
}

function delInverse(chararray) {
    let lastNegative01Index = chararray.length;
    let lastNegative02Index = chararray.length;
    let lastNegative03Index = chararray.length;
    let lastNegative0vIndex = chararray.length;

    for (let i = 0; i < chararray.length; ++i) {
        if (chararray[i] === "-01") {
            lastNegative01Index = i;
        } else if (chararray[i] === "-02") {
            lastNegative02Index = i;
        } else if (chararray[i] === "-03") {
            lastNegative03Index = i;
        } else if (chararray[i] === ">") {
            lastNegative0vIndex = i;
        }
    }

    if (lastNegative03Index < chararray.length) {
        chararray = chararray.filter((str, index) => !(index > lastNegative03Index && str === "03"));
    } else {
        chararray = chararray.filter(str => str !== "03");
    }

    if (lastNegative0vIndex < chararray.length) {
        chararray = chararray.filter((str, index) => !(index > lastNegative0vIndex && str === "<"));
    } else {
        chararray = chararray.filter(str => str !== "<");
    }

    if (lastNegative02Index < chararray.length) {
        chararray = chararray.filter((str, index) => !(index > lastNegative02Index && str === "02"));
    } else {
        chararray = chararray.filter(str => str !== "02");
    }

    if (lastNegative01Index < chararray.length) {
        chararray = chararray.filter((str, index) => !(index > lastNegative01Index && str === "01"));
    } else {
        chararray = chararray.filter(str => str !== "01");
    }
    return chararray;
}

function expanda(chararray, w) {
    let expandedarray = chararray.slice();
    let a = [];
    let i = 0;
    let ifv = 0;

    while (i < expandedarray.length) {
        if (expandedarray[i].length > 1 && expandedarray[i][0] !== '-') {
            let startstr = expandedarray[i];
            a.push(i);
            let counter = 1;
            let found = false;

            for (let j = i + 1; j < expandedarray.length; ++j) {
                if (expandedarray[j] === startstr) counter++;
                else if (expandedarray[j] === "-" + startstr) {
                    counter--;
                    if (counter === 0) {
                        a.push(j);
                        found = true;
                        i = j;
                        break;
                    }
                }
            }
            if (!found) {
                a.pop();
                if (a.length > 0) {
                    i = a.pop();
                }
            }
        }
        ++i;
    }

    if (a.length < 2) {
        let foundspecial = false;
        for (let j = 0; j < expandedarray.length; ++j) {
            if (expandedarray[j] === "<") {
                for (let k = j + 1; k < expandedarray.length; ++k) {
                    if (expandedarray[k] === ">") {
                        foundspecial = true;
                        expandedarray.splice(j, 1);
                        expandedarray.splice(k - 1, 1);
                        break;
                    }
                }
                if (foundspecial) break;
            }
        }
        if (!foundspecial) {
            let foundunpairedstart = false;
            for (let j = 0; j < expandedarray.length; ++j) {
                if (expandedarray[j].length > 1 && expandedarray[j][0] !== '-') {
                    expandedarray.splice(j, 1);
                    foundunpairedstart = true;
                    break;
                }
            }

            if (!foundunpairedstart) {
                for (let j = 0; j < expandedarray.length; ++j) {
                    if (expandedarray[j].length > 1 && expandedarray[j][0] === '-' && expandedarray[j][1] !== 'N') {
                        expandedarray.splice(j, 1);
                        break;
                    }
                }
            }
        }
    } else {
        ifv = 1;
        while (a.length >= 2) {
            let start = a[a.length - 2];
            let end = a[a.length - 1];
            let bigo = 0;
            let tocopy = expandedarray.slice(start + 1, end);

            if (end + 2 < expandedarray.length && expandedarray[end + 1] === "<" && expandedarray[end + 2] === ">") {
                expandedarray.splice(end + 1, 2);
                bigo = 1;
            }

            for (let j = 0; j < w - 1 + bigo; ++j) {
                expandedarray.splice(start + 1, 0, ...tocopy);
            }

            for (let j = 0; j < 2; ++j) a.pop();
        }
    }
    return { chararray: expandedarray, ifv: ifv };
}

function shrink(chararray, w) {
    let i = 0;
    let chararrayo = [];
    let numberbuffer = '';
    let inversesequence = chararray.length;

    while (i < chararray.length) {
        if (chararray[i].length > 1 && chararray[i][0] === '-') {
            let negativesign = chararray[i].substr(1);
            if (/\d/.test(negativesign)) {
                numberbuffer += negativesign;
            } else {
                if (numberbuffer.length > 0) {
                    chararrayo.push("-N" + numberbuffer);
                    numberbuffer = '';
                }
                switch (negativesign) {
                    case 'N50': chararrayo.push('U'); break;
                    case 'N1': chararrayo.push('w'); break;
                    case '01': chararrayo.push(')'); break;
                    case '02': chararrayo.push(']'); break;
                    case '03': chararrayo.push('}'); break;
                    default: chararrayo.push('-' + negativesign); break;
                }
            }
        } else {
            if (numberbuffer.length > 0) {
                chararrayo.push("-N" + numberbuffer);
                numberbuffer = '';
            }

            switch (chararray[i]) {
                case 'N50': chararrayo.push('U'); break;
                case 'N1': chararrayo.push('w'); break;
                case '01': chararrayo.push('('); break;
                case '02': chararrayo.push('['); break;
                case '03': chararrayo.push('{'); break;
                default: chararrayo.push(chararray[i]); break;
            }
        }
        ++i;
    }

    if (numberbuffer.length > 0) {
        chararrayo.push("-N" + numberbuffer);
        numberbuffer = '';
    }

    return chararrayo.join('').replace(/-N/g, '');
}

function expandText() {
    let inputText = document.getElementById('inputText').value;
    let w = parseInt(document.getElementById('w').value);
    let W = parseInt(document.getElementById('W').value);

    let chararray = stringfy(inputText, W);
    let result = chararray;
    let ifv = 0;

    if (w > 1) {
        let expandResult = expanda(result, w);
        result = expandResult.chararray;
        ifv = expandResult.ifv;
    }

    result = shrink(result, w);

    document.getElementById('result').innerText = result;
}
