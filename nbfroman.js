function roman(number) {
    let result = '';
    let n = parseInt(number);
    if (n < 0) return '-' + roman(-n);
    
    // In Python, format(int(number), ',d') adds commas as thousands separators.
    // .toLocaleString('en-US') provides the same formatting for numeric strings.
    let lst = n.toLocaleString('en-US').split(',');
    
    if (parseInt(lst[0]) < 4) {
        if (lst.length > 2) {
            lst = [(lst[0] + lst[1]), ...lst.slice(2)];
        } else if (lst.length === 2) {
            lst = [(lst[0] + lst[1])];
        }
    }
    
    result += '('.repeat(lst.length - 1);
    
    for (let i = 0; i < lst.length; i++) {
        let num = parseInt(lst[i]);
        while (num >= 1000) { result += 'M'; num -= 1000; }
        while (num >= 500) { result += 'D'; num -= 500; }
        while (num >= 100) { result += 'C'; num -= 100; }
        while (num >= 50) { result += 'L'; num -= 50; }
        while (num >= 10) { result += 'X'; num -= 10; }
        while (num >= 5) { result += 'V'; num -= 5; }
        while (num >= 1) { result += 'I'; num -= 1; }
        
        // Preserve replacement order and global application from original Python code
        result = result.replace(/DCCCC/g, 'CM');
        result = result.replace(/CCCC/g, 'CD');
        result = result.replace(/LXXXX/g, 'XC');
        result = result.replace(/XXXX/g, 'XL');
        result = result.replace(/VIIII/g, 'IX');
        result = result.replace(/IIII/g, 'IV');
        
        if (i !== lst.length - 1) result += ')';
    }
    return result;
}

function arabic(number) {
    if (number.length === 0) return 0;
    if (number[0] === '-') return -arabic(number.slice(1));
    
    let result = 0;
    let tempNumber = number;
    // Strip leading parentheses used for large numbers
    for (let i = 0; i < tempNumber.length; i++) {
        if (tempNumber[i] !== '(') {
            tempNumber = tempNumber.slice(i);
            break;
        }
    }
    
    let lst = tempNumber.split(')');
    const values = { "I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000 };
    
    for (let i = 0; i < lst.length; i++) {
        let num = lst[i];
        if (num.length === 0) {
            if (i !== lst.length - 1) result *= 1000;
            continue;
        }
        
        for (let j = 0; j < num.length - 1; j++) {
            if (values[num[j]] < values[num[j + 1]]) {
                result -= values[num[j]];
            } else {
                result += values[num[j]];
            }
        }
        
        result += values[num[num.length - 1]];
        if (i !== lst.length - 1) result *= 1000;
    }
    return result;
}

function calculate(exp, roman_flag = false) {
    let expression = '';
    let roman_num = '';
    
    if (!roman_flag) {
        for (let i = 0; i < exp.length; i++) {
            let char = exp[i];
            // Identify Roman numeral components (including large number notation)
            if (['(', ')', 'I', 'V', 'X', 'L', 'C', 'D', 'M'].includes(char)) {
                roman_num += char;
            } else if (char === '/') {
                if (roman_num.length !== 0) {
                    expression += arabic(roman_num).toString();
                    roman_num = '';
                }
                expression += '//';
            } else {
                if (roman_num.length !== 0) {
                    expression += arabic(roman_num).toString();
                    roman_num = '';
                }
                expression += char;
            }
            // Check for trailing Roman numerals at the end of the loop
            if (i === exp.length - 1 && roman_num.length !== 0) {
                expression += arabic(roman_num).toString();
                roman_num = '';
            }
        }
        
        // Python-specific string replacements for alternative grouping and power symbols
        expression = expression.replace(/\[/g, '(').replace(/\]/g, ')');
        expression = expression.replace(/\^/g, '**');
        
        // Handle Python's // (floor division) operator behavior in JavaScript.
        // We replace 'a // b' with 'Math.floor(a / b)'.
        // This loop handles nested expressions by repeatedly applying the regex.
        let prevExpression;
        do {
            prevExpression = expression;
            expression = expression.replace(/((?:\([^()]+\)|-?\d+))\s*\/\/\s*((?:\([^()]+\)|-?\d+))/g, "Math.floor($1 / $2)");
        } while (expression !== prevExpression);

        // Python's int(eval()) truncates floats towards zero.
        return Math.trunc(eval(expression));
    } else {
        // Calculate the result and then format it back into a Roman numeral string
        return roman(calculate(exp));
    }
}

function format_roman(number) {
    let num_overlines = 0;
    let result = "";
    for (let char of number) {
        if (char === "(") {
            num_overlines += 1;
        } else if (char === ")") {
            num_overlines -= 1;
        } else {
            // chr(0x305) is the Unicode Combining Overline character (\u0305)
            result += char + '\u0305'.repeat(num_overlines);
        }
    }
    return result;
}
