#include <iostream>
#include <vector>
#include <algorithm>
#include <random>
#include <cstdint>
#include <chrono>
#include <optional>

struct Coord {
    int x, y;
};

struct Level {
    int id;
    int gridSize;
    double numDensity;
    uint32_t seed;
};

// RNG: mulberry32-style
class RNG {
public:
    explicit RNG(uint32_t seed) : state(seed) {}

    double next() {
        uint32_t t = state += 0x6D2B79F5;
        t = (t ^ (t >> 15)) * (t | 1);
        t ^= t + ((t ^ (t >> 7)) * (t | 61));
        return ((t ^ (t >> 14)) >> 0) / double(UINT32_MAX);
    }

    int randInt(int min, int max) {
        return min + static_cast<int>(next() * (max - min + 1));
    }

private:
    uint32_t state;
};

// DFS generator (no horizontal wrapping)
bool dfs(int x, int y, int width, int height, int depth,
         std::vector<std::vector<bool>>& visited, std::vector<Coord>& path,
         RNG& rng, std::optional<Coord> requiredEnd = std::nullopt) {
    static const std::vector<Coord> DIRS = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
    visited[y][x] = true;
    path.push_back({x, y});
    if (depth == width * height) {
        if (!requiredEnd || (path.back().x == requiredEnd->x && path.back().y == requiredEnd->y)) {
            return true;
        }
    }

    std::vector<Coord> shuffledDirs = DIRS;
    std::shuffle(shuffledDirs.begin(), shuffledDirs.end(), std::default_random_engine(static_cast<uint32_t>(rng.next() * 1e9)));

    for (const auto& [dx, dy] : shuffledDirs) {
        int nx = x + dx;
        int ny = (y + dy + height) % height;
        if (nx < 0 || nx >= width) continue;
        if (!visited[ny][nx]) {
            if (dfs(nx, ny, width, height, depth + 1, visited, path, rng, requiredEnd)) return true;
        }
    }

    visited[y][x] = false;
    path.pop_back();
    return false;
}

// Generate Hamiltonian path across 3 vertical zones: A, B, C
std::vector<Coord> createHamiltonianPath3Split(int size, uint32_t seed) {
    RNG rng(seed);
    int sectionW = size / 3;
    int remainder = size % 3;

    int widthA = sectionW;
    int widthB = sectionW;
    int widthC = size - widthA - widthB;

    int height = size;
    int connectY = rng.randInt(0, size - 1);

    // --- Generate A ---
    std::vector<std::vector<bool>> visitedA(height, std::vector<bool>(widthA, false));
    std::vector<Coord> pathA;
    bool okA = dfs(widthA - 1, connectY, widthA, height, 1, visitedA, pathA, rng);
    if (!okA) return {};

    // --- Generate B ---
    std::vector<std::vector<bool>> visitedB(height, std::vector<bool>(widthB, false));
    std::vector<Coord> pathB;
    bool okB = dfs(0, connectY, widthB, height, 1, visitedB, pathB, rng, Coord{widthB - 1, connectY});
    if (!okB) return {};

    // --- Generate C ---
    std::vector<std::vector<bool>> visitedC(height, std::vector<bool>(widthC, false));
    std::vector<Coord> pathC;
    bool okC = dfs(0, connectY, widthC, height, 1, visitedC, pathC, rng);
    if (!okC) return {};

    // Offset X coordinates
    for (auto& c : pathB) c.x += widthA;
    for (auto& c : pathC) c.x += widthA + widthB;

    std::reverse(pathA.begin(), pathA.end());  // reverse A so end connects to B start

    // Join A + B + C
    std::vector<Coord> fullPath = pathA;
    fullPath.insert(fullPath.end(), pathB.begin(), pathB.end());
    fullPath.insert(fullPath.end(), pathC.begin(), pathC.end());

    // Shift on torus
    int shiftX = rng.randInt(0, size - 1);
    int shiftY = rng.randInt(0, size - 1);
    for (auto& [x, y] : fullPath) {
        x = (x + shiftX) % size;
        y = (y + shiftY) % size;
    }

    return fullPath;
}

int main() {
    std::vector<Level> levels;
    for (int i = 0; i < 50; ++i) {
        int gridSize = std::min(15, 5 + i / 5);
        double density = 0.15 + (i / 50.0) * 0.1;
        levels.push_back({i, gridSize, density, static_cast<uint32_t>(i)});
    }

    for (const auto& level : levels) {
        auto path = createHamiltonianPath3Split(level.gridSize, level.seed);
        std::cout << "Level " << level.id << ": Grid " << level.gridSize << "x" << level.gridSize
                  << ", Path Length = " << path.size() << "\n";
        if (path.empty()) {
            std::cout << "  [Failed to generate path]\n";
        }
    }

    return 0;
}
