#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>

using namespace std;

string process_vertex(string vertex) {
    // Remove all whitespace
    vertex.erase(remove_if(vertex.begin(), vertex.end(), ::isspace), vertex.end());
    
    // Replace Sqrt with sqrt
    size_t pos = 0;
    while ((pos = vertex.find("Sqrt", pos)) != string::npos) {
        vertex.replace(pos, 4, "sqrt");
        pos += 4;
    }
    
    // Add * before sqrt when a number precedes it
    pos = 0;
    while ((pos = vertex.find("sqrt", pos)) != string::npos) {
        if (pos > 0 && isdigit(vertex[pos-1])) {
            vertex.insert(pos, "*");
            pos += 5; // Skip past the inserted * and "sqrt"
        } else {
            pos += 4; // Just skip past "sqrt"
        }
    }
    
    // Replace [ ] with ( )
    replace(vertex.begin(), vertex.end(), '[', '(');
    replace(vertex.begin(), vertex.end(), ']', ')');
    
    return vertex;
}

int main() {
    ifstream file("pentagonalHexecontahedron.txt");
    if (!file.is_open()) {
        cerr << "Error opening file!" << endl;
        return 1;
    }

    // Read entire file into one string, ignoring newlines
    string content;
    string line;
    while (getline(file, line)) {
        content += line;
    }
    file.close();

    // Remove all whitespace (just to be sure)
    content.erase(remove_if(content.begin(), content.end(), ::isspace), content.end());

    // Remove outer curly braces if present
    if (content.front() == '{') content = content.substr(1);
    if (content.back() == '}') content.pop_back();

    cout << "vertices: [" << endl;

    size_t start = 0;
    size_t end = content.find("},{");
    bool first = true;

    while (end != string::npos) {
        string vertex = content.substr(start, end - start);
        vertex = process_vertex(vertex);

        if (!first) cout << "," << endl;
        cout << "            [" << vertex << "]";
        first = false;

        start = end + 2; // Skip past "},"
        end = content.find("},{", start);
    }

    // Process last vertex
    string last_vertex = content.substr(start);
    last_vertex = process_vertex(last_vertex);
    if (!first) cout << "," << endl;
    cout << "            [" << last_vertex << "]";
    
    cout << endl << "        ]" << endl;

    return 0;
}