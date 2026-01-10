#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <regex>
#include <algorithm>

using namespace std;

// Trim whitespace
string trim(const string& s) {
    size_t start = s.find_first_not_of(" \n\r\t");
    size_t end = s.find_last_not_of(" \n\r\t");
    return (start == string::npos || end == string::npos) ? "" : s.substr(start, end - start + 1);
}

// Convert a vertex block to JS format
string convertVertexBlock(const string& block) {
    smatch match;
    regex rgx(R"(\{\{([^,]+),([^,]+),([^}]+)\},\s*([0-9.]+(?:\*10\^[\-\+]?[0-9]+)?)\})");
    if (regex_search(block, match, rgx)) {
        stringstream ss;
        ss << "[" << trim(match[1]) << ", " << trim(match[2]) << ", " << trim(match[3]) << "]";
        return ss.str() + "|" + trim(match[4]);
    }
    return "";
}

// Replace *10^ with e notation
string fixScientificNotation(const string& input) {
    string result = input;
    regex sci(R"(\*10\^)");
    result = regex_replace(result, sci, "e");
    return result;
}

int main() {
    ifstream infile("ALLJOHNSONSOLIDS.txt");
    if (!infile) {
        cerr << "Could not open ALLJOHNSONSOLIDS.txt\n";
        return 1;
    }

    string raw((istreambuf_iterator<char>(infile)), istreambuf_iterator<char>());
    infile.close();

    // Sanitize input
    raw.erase(remove(raw.begin(), raw.end(), '\n'), raw.end());
    raw.erase(remove(raw.begin(), raw.end(), '\r'), raw.end());

    // Find start positions of {{{{
    vector<size_t> starts;
    size_t pos = 0;
    string opener = "{{{{";
    while ((pos = raw.find(opener, pos)) != string::npos) {
        starts.push_back(pos);
        pos += opener.size();
    }

    vector<string> solids;
    for (size_t i = 0; i < starts.size(); ++i) {
        size_t start = starts[i];
        size_t end = (i + 1 < starts.size()) ? starts[i + 1] : raw.size();
        solids.push_back(raw.substr(start, end - start));
    }

    stringstream output;

    for (int i = 0; i < solids.size(); ++i) {
        string name = "J" + to_string(i + 1);
        string dualName = "d" + name;
        string solid = solids[i];

        size_t mid = solid.find("{{{", 4); // skip the first
        if (mid == string::npos) continue;

        string normal = solid.substr(0, mid);
        string dual = solid.substr(mid);

        auto process = [&](const string& part, const string& label, const string& dualLabel) {
            vector<string> verts;
            vector<string> degs;

            regex rgx(R"(\{\{[^}]+\},\s*\d+\.?\d*(?:\*10\^[\-\+]?[0-9]+)?\})");
            auto begin = sregex_iterator(part.begin(), part.end(), rgx);
            auto end = sregex_iterator();
            for (auto it = begin; it != end; ++it) {
                string converted = convertVertexBlock(it->str());
                size_t sep = converted.find('|');
                verts.push_back(converted.substr(0, sep));
                degs.push_back(converted.substr(sep + 1));
            }

            output << "  [\"" << label << "\", {\n";
            output << "    dual: \"" << dualLabel << "\",\n";
            output << "    vertices: [\n";
            for (const auto& v : verts) output << "      " << v << ",\n";
            output << "    ],\n";
            output << "    vertexDegree: [";
            for (size_t j = 0; j < degs.size(); ++j) {
                output << degs[j];
                if (j + 1 < degs.size()) output << ",";
            }
            output << "]\n";
            output << "  }],\n";
        };

        process(normal, name, dualName);
        process(dual, dualName, name);
    }

    // Final post-processing: fix *10^ into e
    string finalText = fixScientificNotation(output.str());

    // Write to file
    ofstream outfile("johnsonsoliddecarborized.txt");
    if (!outfile) {
        cerr << "Could not write to johnsonsoliddecarborized.txt\n";
        return 1;
    }

    outfile << finalText;
    outfile.close();

    cout << "Output written to johnsonsoliddecarborized.txt\n";
    return 0;
}
