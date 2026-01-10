#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <regex>

std::vector<int> readVertexDegrees(const std::string& filename) {
    std::vector<int> degrees;
    std::ifstream file(filename);
    
    if (!file.is_open()) {
        std::cerr << "Error opening file: " << filename << std::endl;
        return degrees;
    }

    // Read entire file into a string (handles bad newlines)
    std::stringstream buffer;
    buffer << file.rdbuf();
    std::string content = buffer.str();
    
    // Regex to match all degree entries (}, N} pattern)
    std::regex degree_pattern(R"(\},\s*(\d+)\})");
    std::smatch matches;
    
    auto begin = content.cbegin();
    auto end = content.cend();
    
    while (std::regex_search(begin, end, matches, degree_pattern)) {
        degrees.push_back(std::stoi(matches[1].str()));
        begin = matches[0].second; // Move past the current match
    }
    
    return degrees;
}

int main() {
    std::string filename = "deltoidalhexecontahedron.txt";
    std::vector<int> vertexDegrees = readVertexDegrees(filename);
    
    // Output in desired format
    std::cout << "vertexDegree: [";
    for (size_t i = 0; i < vertexDegrees.size(); ++i) {
        if (i != 0) std::cout << ", ";
        std::cout << vertexDegrees[i];
    }
    std::cout << "]" << std::endl;
    
    return 0;
}