# This script reads JS files, analyzes function dependencies,
# ignores specified helper functions, and PLOTS the dependency graph as an image.

import re
from collections import defaultdict
import networkx as nx
import matplotlib.pyplot as plt

# ---------------- CONFIG ----------------
js_files = [
  
    "/mnt/data/mthfnc.js"
]

ignore_funcs = {
    "add", "sub", "mul", "div", "pow",
    "g", "eulerc", "pi", "sqr", "cum",
    "re", "im", "if", "complex"
}

output_image = "a.png"

# ---------------- REGEX ----------------
func_def_re = re.compile(r"\bfunction\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(")
func_call_re = re.compile(r"\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(")

# ---------------- READ FILES ----------------
code = ""
for f in js_files:
    try:
        with open(f, "r", encoding="utf-8") as fh:
            code += fh.read() + "\n"
    except FileNotFoundError:
        pass

# ---------------- FIND DEFINITIONS ----------------
func_defs = set(func_def_re.findall(code)) - ignore_funcs

# ---------------- BUILD DEPENDENCIES ----------------
deps = defaultdict(set)

for fname in func_defs:
    pattern = re.compile(
        rf"function\s+{fname}\s*\([^)]*\)\s*\{{(.*?)\}}",
        re.DOTALL
    )
    match = pattern.search(code)
    if not match:
        continue

    body = match.group(1)
    calls = set(func_call_re.findall(body))
    calls = calls & func_defs
    calls = calls - ignore_funcs

    if calls:
        deps[fname] |= calls

# ---------------- REMOVE ISOLATED FUNCTIONS ----------------
called_by = defaultdict(set)
for f, cs in deps.items():
    for c in cs:
        called_by[c].add(f)

active_funcs = {f for f in func_defs if deps[f] or called_by[f]}

# ---------------- BUILD GRAPH ----------------
G = nx.DiGraph()

for f in active_funcs:
    G.add_node(f)

for f, cs in deps.items():
    for c in cs:
        if f in active_funcs and c in active_funcs:
            G.add_edge(f, c)

# ---------------- PLOT ----------------
plt.figure(figsize=(max(12, len(G.nodes) * 0.6), max(8, len(G.nodes) * 0.5)))

pos = nx.spring_layout(G, k=1.5, seed=42)

nx.draw_networkx_nodes(G, pos, node_size=1800)
nx.draw_networkx_edges(G, pos, arrows=True, arrowstyle="->", width=2)
nx.draw_networkx_labels(G, pos, font_size=9)

plt.title("JavaScript Function Dependency Graph\n[A] → [B] means A is used inside B")
plt.axis("off")
plt.tight_layout()
plt.savefig(output_image, dpi=200)
plt.close()

output_image
