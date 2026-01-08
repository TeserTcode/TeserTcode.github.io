from flask import Flask, request, jsonify

app = Flask(__name__)

def stringfy(inp, maxima=-1):
    chararray = []
    numbuffer = ""
    commacount = 0

    for c in inp:
        if c == ',':
            commacount += 1
        else:
            if maxima != -1:
                commacount = min(commacount, maxima)
            if commacount > 0:
                chararray.append("-N" + str(commacount))
            commacount = 0

            if c.isdigit():
                numbuffer += c
            else:
                if numbuffer:
                    chararray.append("-N" + numbuffer)
                    numbuffer = ""
                if c in "([{":
                    chararray.append(f"0{ord(c) - ord('(') + 1}")
                elif c in ")]}":
                    chararray.append(f"-0{ord(c) - ord(')') + 1}")
                elif c == 'U':
                    chararray.append("-N50")
                elif c == '<':
                    if chararray and chararray[-1][1] != 'N':
                        chararray.append("<")
                elif not c.isspace():
                    chararray.append(c)

    if commacount > 0:
        chararray.append("-N" + str(commacount))
    if numbuffer:
        chararray.append("-N" + numbuffer)

    return chararray

def del_chararray(chararray):
    first_indices = { "03": len(chararray), "02": len(chararray), "01": len(chararray), "<": len(chararray) }

    for i, val in enumerate(chararray):
        if val in first_indices and first_indices[val] == len(chararray):
            first_indices[val] = i

    for key in ["03", "02", "01", ">"]:
        if first_indices[key] < len(chararray):
            chararray = [val for j, val in enumerate(chararray) if val != f"-{key}" or j >= first_indices[key]]

    return chararray

def del_inverse(chararray):
    last_indices = { "-01": len(chararray), "-02": len(chararray), "-03": len(chararray), ">": len(chararray) }

    for i, val in enumerate(chararray):
        if val in last_indices:
            last_indices[val] = i

    for key in ["03", "02", "01", "<"]:
        if last_indices[f"-{key}"] < len(chararray):
            chararray = [val for j, val in enumerate(chararray) if val != key or j <= last_indices[f"-{key}"]]

    return chararray

def expanda(chararray, w):
    expandedarray = chararray[:]
    a = []
    i = 0
    ifv = 0

    while i < len(expandedarray):
        if len(expandedarray[i]) > 1 and expandedarray[i][0] != '-':
            startstr = expandedarray[i]
            a.append(i)
            counter = 1
            found = False
            for j in range(i + 1, len(expandedarray)):
                if expandedarray[j] == startstr:
                    counter += 1
                elif expandedarray[j] == "-" + startstr:
                    counter -= 1
                    if counter == 0:
                        a.append(j)
                        found = True
                        i = j
                        break
            if not found:
                a.pop()
                if a:
                    i = a[-1]
                    a.pop()
        i += 1

    if len(a) < 2:
        foundspecial = False
        for j in range(len(expandedarray)):
            if expandedarray[j] == "<":
                for k in range(j + 1, len(expandedarray)):
                    if expandedarray[k] == ">":
                        foundspecial = True
                        del expandedarray[j]
                        del expandedarray[k - 1]
                        break
                if foundspecial:
                    break
        if not foundspecial:
            foundunpairedstart = False
            for j in range(len(expandedarray)):
                if len(expandedarray[j]) > 1 and expandedarray[j][0] != '-':
                    del expandedarray[j]
                    foundunpairedstart = True
                    break
            if not foundunpairedstart:
                for j in range(len(expandedarray)):
                    if len(expandedarray[j]) > 1 and expandedarray[j][0] == '-' and expandedarray[j][1] != 'N':
                        del expandedarray[j]
                        break
    else:
        ifv = 1
        while len(a) >= 2:
            start = a[-2]
            end = a[-1]
            bigo = 0
            tocopy = expandedarray[start + 1:end]

            if end + 2 < len(expandedarray) and expandedarray[end + 1] == "<" and expandedarray[end + 2] == ">":
                expandedarray[end + 1:end + 1] = tocopy
            elif end + 2 < len(expandedarray) and expandedarray[end + 1] == "<" and expandedarray[end + 3] == ">":
                if expandedarray[end + 2] in ["O", "o"]:
                    bigo = 1
                elif expandedarray[end + 1] not in ["01", "02", "03"]:
                    repeatcount = 1
                    if end + 3 < len(expandedarray) and expandedarray[end + 2].startswith("-N"):
                        numstr = expandedarray[end + 2][2:]
                        repeatcount = int(numstr)
                        del expandedarray[end + 1:end + 4]
                    else:
                        if expandedarray[end + 2][0] != '0':
                            del expandedarray[end + 1:end + 3]
                    for k in range(repeatcount):
                        expandedarray[end + 1 + k * len(tocopy):end + 1 + (k + 1) * len(tocopy)] = tocopy
                else:
                    bigo = 1
            elif end + 1 < len(expandedarray) and expandedarray[end + 1] == "<":
                a.pop()
                a.pop()
                continue
            else:
                if not bigo:
                    ifv = 0
                for k in range(w):
                    expandedarray[end + 1 + k * len(tocopy):end + 1 + (k + 1) * len(tocopy)] = tocopy

            if not bigo:
                del expandedarray[start:end + 1]

            if len(a) >= 2:
                a.pop()
                a.pop()

    if ifv:
        for i in range(2, len(expandedarray) - 2):
            if expandedarray[i] == "<" and expandedarray[i + 2] == ">":
                targetString = expandedarray[i - 1]
                targetSubstring = targetString[1:]
                counter = 1
                for j in range(i - 2, -1, -1):
                    if expandedarray[j] == targetString:
                        counter += 1
                    elif expandedarray[j] == targetSubstring:
                        counter -= 1
                    if counter == 0:
                        tocopy3 = expandedarray[j + 1:i]
                        if expandedarray[i + 1] == "o":
                            if i - j == 2:
                                del expandedarray[j:i + 2]
                            else:
                                expandedarray[j:j] = tocopy3
                            i += 2
                        elif expandedarray[i + 1] == "O":
                            if i - j == 2:
                                del expandedarray[j:i + 2]
                            else:
                                expandedarray[i + 3:i + 3] = tocopy3
                            i += 2
                        elif expandedarray[i + 1].startswith("-N"):
                            numstr = expandedarray[i + 1][2:]
                            del expandedarray[j:i - 1]
                            for k in range(int(numstr)):
                                expandedarray[i + 1 + k * len(tocopy3):i + 1 + (k + 1) * len(tocopy3)] = tocopy3
                            del expandedarray[j:i + 1]
                        break

    return expandedarray

def resintingfy(chararray):
    result = ""
    for str_val in chararray:
        if str_val.startswith("-N"):
            count = int(str_val[2:])
            result += "," * count
        elif str_val == "01":
            result += "("
        elif str_val == "-01":
            result += ")"
        elif str_val == "02":
            result += "["
        elif str_val == "-02":
            result += "]"
        elif str_val == "03":
            result += "{"
        elif str_val == "-03":
            result += "}"
        else:
            result += str_val
    return result

def expand(input_str, w, W=-1):
    chararray = stringfy(input_str, W)
    if len(chararray) == 1 and chararray[0].startswith("-N"):
        return chararray[0][2:]
    expandedarray = expanda(chararray, w)
    expandedarray = del_chararray(expandedarray)
    expandedarray = del_inverse(expandedarray)
    return resintingfy(expandedarray)

@app.route('/expand', methods=['POST'])
def expand_endpoint():
    data = request.get_json()
    input_str = data.get('input_str')
    w = data.get('w')
    W = data.get('W', -1)
    result = expand(input_str, w, W)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
