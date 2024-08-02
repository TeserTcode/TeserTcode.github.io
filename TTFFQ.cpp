#include iostream
#include string
#include algorithm  for stdcount

 Function to find the closing parenthesis ')'
size_t findClosingParenthesis(const stdstring& str, size_t openingIndex) {
    int count = 1;  Start count from 1 for the opening parenthesis '('
    size_t i;
    for (i = openingIndex + 1; i  str.length(); ++i) {
        if (str[i] == '(') {
            count++;
        } else if (str[i] == ')') {
            count--;
            if (count == 0) {
                break;
            }
        }
    }
    return i;
}

 Function to generate the sequence at the specified index
stdstring generateSequenceAtIndex(stdstring input, int index) {
     Create a modifiable copy of the input
    stdstring input_copy = input;

     Extract initial 'f's
    stdstring initial_f;
    size_t first_non_f = input_copy.find_first_not_of('f');
    if (first_non_f != stdstringnpos) {
        initial_f = input_copy.substr(0, first_non_f);
        input_copy = input_copy.substr(first_non_f);
    }

    size_t posF = input_copy.find('F');  Find the first occurrence of 'F'

    if (posF == stdstringnpos) {
        return input_copy;  No 'F' found, return the input as is
    }

     Check if 'F' is immediately followed by '('
    if (posF + 1  input_copy.length() && input_copy[posF + 1] == '(') {
         Find the closing parenthesis ')'
        size_t posCloseParen = findClosingParenthesis(input_copy, posF + 1);
        
         Extract content inside parentheses
        stdstring content_inside_parentheses = input_copy.substr(posF + 2, posCloseParen - posF - 2);
        
         Generate the sequence inside parentheses
        stdstring sequence_inside_parentheses;
        for (int j = 0; j  index; ++j) {
            sequence_inside_parentheses += content_inside_parentheses;  Repeat content_inside_parentheses index times
        }

         Construct the result sequence
        stdstring result_sequence = initial_f + sequence_inside_parentheses + input_copy.substr(posCloseParen + 1);

        return result_sequence;
    }

     Normal handling for 'F' followed by other characters
    size_t posQ = input_copy.find('q');  Find the first occurrence of 'q'
    size_t posf = input_copy.find('f');  Find the first occurrence of 'f'

    stdstring part_to_repeat;
    stdstring part_after_stop;

     Determine the closest stopper ('q', 'f') after the first 'F'
    if (posQ != stdstringnpos && posQ  posF && (posf == stdstringnpos  posQ  posf)) {
         'q' is the closest stopper after 'F'
        part_to_repeat = input_copy.substr(posF + 1, posQ - posF - 1);  Part between 'F' and 'q'
        part_after_stop = input_copy.substr(posQ + 1);  Part after the first 'q'
    } else if (posf != stdstringnpos && posf  posF) {
         'f' is the closest stopper after 'F'
        part_to_repeat = input_copy.substr(posF + 1, posf - posF);  Part between 'F' and 'f' (including 'f')
        part_after_stop = input_copy.substr(posf + 1);  Part after the first 'f'
    } else {
         No 'q' or 'f' after 'F'
        part_to_repeat = input_copy.substr(posF + 1);  Extract substring after the first 'F'
    }

     Generate the sequence at the specified index
    stdstring current_sequence;
    for (int j = 0; j  index; ++j) {
        current_sequence += part_to_repeat;  Repeat part_to_repeat index times
    }
    if (!part_after_stop.empty()) {
        current_sequence += part_after_stop;  Append part_after_stop once if it exists
    }

    return initial_f + current_sequence;  Return the sequence with initial 'f's
}

int main() {
    stdstring input;
    stdgetline(stdcin, input);  Read input string from standard input

    int index;
    stdcin  index;  Read index from standard input

    if (index  0) {
         If index is negative, take its absolute value and print the initial sequence
        index = stdabs(index);
        for (int i = 1; i = index; ++i) {
            stdstring result = generateSequenceAtIndex(input, i);
            stdcout  result  stdendl;
        }
    } else {
         If index is positive, execute the sequence generation loop
        int iteration_count = 0;

        while (true) {
            stdstring result = generateSequenceAtIndex(input, index);
            stdcout  result  stdendl;  Print the result

             Increment the iteration count
            iteration_count++;

             Check if the result contains 'F'
            if (result.find('F') == stdstringnpos) {
                 Count the number of 'f' characters in the final result
                int f_count = stdcount(result.begin(), result.end(), 'f');
                stdcout  Final number of 'f'   f_count  stdendl;
                stdcout  Number of iterations   iteration_count  stdendl;
                break;  No 'F' found, terminate the loop
            }

             Update the input with the new result
            input = result;
        }
    }

    return 0;
}
