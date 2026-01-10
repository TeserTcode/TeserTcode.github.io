#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <filesystem>
#include <algorithm>

namespace fs = std::filesystem;

// Function to extract HTML links from index.html
std::vector<std::string> extract_html_links(const std::string& filename) {
    std::vector<std::string> links;
    std::ifstream file(filename);
    std::string line;

    if (!file.is_open()) {
        std::cerr << "Error: Could not open " << filename << std::endl;
        return links;
    }

    while (std::getline(file, line)) {
        size_t href_pos = line.find("href=\"");
        while (href_pos != std::string::npos) {
            size_t start = href_pos + 6; // Skip "href=\""
            size_t end = line.find("\"", start);
            if (end != std::string::npos) {
                std::string link = line.substr(start, end - start);
                if (link.size() > 5 && link.substr(link.size() - 5) == ".html") {
                    links.push_back(link);
                }
            }
            href_pos = line.find("href=\"", end);
        }
    }

    return links;
}

// Function to find existing HTML files in the directory
std::vector<std::string> find_html_files() {
    std::vector<std::string> html_files;
    
    for (const auto& entry : fs::directory_iterator(".")) {
        if (entry.is_regular_file()) {
            std::string filename = entry.path().filename().string();
            if (filename.size() > 5 && filename.substr(filename.size() - 5) == ".html" && filename != "index.html") {
                html_files.push_back(filename);
            }
        }
    }
    
    return html_files;
}

// Function to check if a file is empty
bool is_file_empty(const std::string& filename) {
    std::ifstream file(filename, std::ios::ate);
    return file.tellg() == 0; // Check if file size is 0
}

// Function to get the size of a file in bytes
std::uintmax_t get_file_size(const std::string& filename) {
    return fs::file_size(filename);
}

// Structure to hold file data (name and size)
struct FileData {
    std::string filename;
    std::uintmax_t size;
};

// Function to compare two files by size
bool compare_file_size(const FileData& f1, const FileData& f2) {
    return f1.size < f2.size;
}

int main() {
    std::vector<std::string> listed_files = extract_html_links("index.html");
    std::vector<std::string> existing_files = find_html_files();

    std::ofstream missing_files("missing_files.txt");
    std::ofstream empty_files("empty_files.txt");
    std::ofstream unlisted_files("unlisted_files.txt");
    std::ofstream unlisted_empty_files("unlisted_empty_files.txt");

    std::vector<FileData> missing_files_data;
    std::vector<FileData> empty_files_data;
    std::vector<FileData> unlisted_files_data;
    std::vector<FileData> unlisted_empty_files_data;
    std::vector<FileData> listed_files_data;

    std::cout << "==== Files Listed in index.html but Missing ====\n";
    for (const auto& file : listed_files) {
        if (!fs::exists(file)) {
            std::cout << file << " (Missing)\n";
            missing_files << file << std::endl;
        }
    }

    std::cout << "\n==== Files Listed in index.html but Empty ====\n";
    for (const auto& file : listed_files) {
        if (fs::exists(file) && is_file_empty(file)) {
            std::uintmax_t size = get_file_size(file);
            std::cout << file << " (Empty) - Size: " << size << " bytes\n";
            empty_files << file << std::endl;
            empty_files_data.push_back({file, size});
        }
    }

    std::cout << "\n==== Files Not Listed in index.html but Exist ====\n";
    for (const auto& file : existing_files) {
        if (std::find(listed_files.begin(), listed_files.end(), file) == listed_files.end()) {
            std::uintmax_t size = get_file_size(file);
            std::cout << file << " - Size: " << size << " bytes\n";
            unlisted_files << file << std::endl;
            unlisted_files_data.push_back({file, size});
        }
    }

    std::cout << "\n==== Files Not Listed in index.html but Exist and are Empty ====\n";
    for (const auto& file : existing_files) {
        if (std::find(listed_files.begin(), listed_files.end(), file) == listed_files.end() && is_file_empty(file)) {
            std::uintmax_t size = get_file_size(file);
            std::cout << file << " (Empty) - Size: " << size << " bytes\n";
            unlisted_empty_files << file << std::endl;
            unlisted_empty_files_data.push_back({file, size});
        }
    }

    std::cout << "\n==== Files Listed in index.html and Exist ====\n";
    for (const auto& file : listed_files) {
        if (fs::exists(file)) {
            std::uintmax_t size = get_file_size(file);
            std::cout << file << " - Size: " << size << " bytes\n";
            listed_files_data.push_back({file, size});
        }
    }

    // Sorting the files by size
    std::sort(empty_files_data.begin(), empty_files_data.end(), compare_file_size);
    std::sort(unlisted_files_data.begin(), unlisted_files_data.end(), compare_file_size);
    std::sort(unlisted_empty_files_data.begin(), unlisted_empty_files_data.end(), compare_file_size);
    std::sort(listed_files_data.begin(), listed_files_data.end(), compare_file_size);

    std::cout << "\n==== Sorted Files Listed in index.html but Empty ====\n";
    for (const auto& file_data : empty_files_data) {
        std::cout << file_data.filename << " (Empty) - Size: " << file_data.size << " bytes\n";
    }

    std::cout << "\n==== Sorted Files Not Listed in index.html but Exist ====\n";
    for (const auto& file_data : unlisted_files_data) {
        std::cout << file_data.filename << " - Size: " << file_data.size << " bytes\n";
    }

    std::cout << "\n==== Sorted Files Not Listed in index.html but Exist and are Empty ====\n";
    for (const auto& file_data : unlisted_empty_files_data) {
        std::cout << file_data.filename << " (Empty) - Size: " << file_data.size << " bytes\n";
    }

    std::cout << "\n==== Sorted Files Listed in index.html and Exist ====\n";
    for (const auto& file_data : listed_files_data) {
        std::cout << file_data.filename << " - Size: " << file_data.size << " bytes\n";
    }

    std::cout << "\nAnalysis complete. Check the generated files:\n"
              << " - missing_files.txt\n"
              << " - empty_files.txt\n"
              << " - unlisted_files.txt\n"
              << " - unlisted_empty_files.txt\n";

    return 0;
}
