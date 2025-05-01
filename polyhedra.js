
 dualsMap = new Map([
    // Regular polyhedra
    ["tetrahedron", {
        dual: "dtetrahedron",
        vertices: [
            [Math.sqrt(2)/4, Math.sqrt(2)/4, Math.sqrt(2)/4],
            [-Math.sqrt(2)/4, -Math.sqrt(2)/4, Math.sqrt(2)/4],
            [-Math.sqrt(2)/4, Math.sqrt(2)/4, -Math.sqrt(2)/4],
            [Math.sqrt(2)/4, -Math.sqrt(2)/4, -Math.sqrt(2)/4]
        ]
    }],
        // Regular polyhedra
    ["dtetrahedron", {
        dual: "tetrahedron",
        vertices:[
    [(Math.sqrt(2)/4 + -Math.sqrt(2)/4 + -Math.sqrt(2)/4) / 3, 
     (Math.sqrt(2)/4 + -Math.sqrt(2)/4 + Math.sqrt(2)/4) / 3, 
     (Math.sqrt(2)/4 + Math.sqrt(2)/4 + -Math.sqrt(2)/4) / 3],
    
    [(Math.sqrt(2)/4 + -Math.sqrt(2)/4 + Math.sqrt(2)/4) / 3, 
     (Math.sqrt(2)/4 + -Math.sqrt(2)/4 + -Math.sqrt(2)/4) / 3, 
     (Math.sqrt(2)/4 + Math.sqrt(2)/4 + -Math.sqrt(2)/4) / 3],
    
    [(Math.sqrt(2)/4 + -Math.sqrt(2)/4 + Math.sqrt(2)/4) / 3, 
     (Math.sqrt(2)/4 + Math.sqrt(2)/4 + -Math.sqrt(2)/4) / 3, 
     (Math.sqrt(2)/4 + -Math.sqrt(2)/4 + -Math.sqrt(2)/4) / 3],
    
    [(-Math.sqrt(2)/4 + -Math.sqrt(2)/4 + Math.sqrt(2)/4) / 3, 
     (-Math.sqrt(2)/4 + Math.sqrt(2)/4 + -Math.sqrt(2)/4) / 3, 
     (Math.sqrt(2)/4 + -Math.sqrt(2)/4 + -Math.sqrt(2)/4) / 3]
        ]
    }],
    
    ["octahedron", {
        dual: "cube",
        vertices: [
            [Math.sqrt(2)/2, 0, 0], [-Math.sqrt(2)/2, 0, 0],
            [0, Math.sqrt(2)/2, 0], [0, -Math.sqrt(2)/2, 0],
            [0, 0, Math.sqrt(2)/2], [0, 0, -Math.sqrt(2)/2]
        ]
    }],
    
    ["cube", {
        dual: "octahedron",
        vertices: (() => {
            const s = 0.5;
            const vertices = [];
            for (const x of [-s, s]) {
                for (const y of [-s, s]) {
                    for (const z of [-s, s]) {
                        vertices.push([x, y, z]);
                    }
                }
            }
            return vertices;
        })()
    }],
    
    ["icosahedron", {
        dual: "dodecahedron",
        vertices: (() => {
            const phi = (1 + Math.sqrt(5))/4;
            const vertices = [];
            // All cyclic permutations of (0, ±1/2, ±phi)
       
                const signs = [[1,1], [1,-1], [-1,1], [-1,-1]];
                for (const [s1, s2] of signs) {
                    const coords = [0, 0.5*s1, phi*s2];
                    // Rotate coordinates for all cyclic permutations
                    vertices.push([...coords]);
                    vertices.push([coords[2], coords[0], coords[1]]);
                    vertices.push([coords[1], coords[2], coords[0]]);
                }
            
            return vertices;
        })()
    }],
    
    ["dodecahedron", {
        dual: "icosahedron",
        vertices: (() => {
            const phi = (1 + Math.sqrt(5))/4;
            const vertices = [];
            
            // All sign changes of (±phi, ±phi, ±phi)
            for (const x of [-phi, phi]) {
                for (const y of [-phi, phi]) {
                    for (const z of [-phi, phi]) {
                        vertices.push([x, y, z]);
                    }
                }
            }
            
            // All even permutations of (±(3+√5)/4, ±1/2, 0)
            const t = (3 + Math.sqrt(5))/4;
            const s = 0.5;
            const evenPerms = [
                [t, s, 0],[s, 0, t],[0, t, s],
                [-t, s, 0],[-s, 0, t],[0, t, -s],
                [t, -s, 0],[s, 0, -t],[0, -t, s],
                [-t, -s, 0],[-s, 0, -t],[0, -t, -s],
            ];
            
            return vertices.concat(evenPerms);
        })()
    }],
    
    // Kepler-Poinsot polyhedra
    ["small stellated dodecahedron", {
        dual: "great dodecahedron",
        vertices: (() => {
                       const t = 0.5;
            const s = (Math.sqrt(5)-1)/4;
            const evenPerms = [
                           [t, s, 0],[s, 0, t],[0, t, s],
                [-t, s, 0],[-s, 0, t],[0, t, -s],
                [t, -s, 0],[s, 0, -t],[0, -t, s],
                [-t, -s, 0],[-s, 0, -t],[0, -t, -s],
            ];
            return evenPerms
        })()
    }],
    
    ["great stellated dodecahedron", {
        dual: "great icosahedron",
        vertices: (() => {
            const phi = (Math.sqrt(5)-1)/4;
            const vertices = [];
            for (const x of [-phi, phi]) {
                for (const y of [-phi, phi]) {
                    for (const z of [-phi, phi]) {
                        vertices.push([x, y, z]);
                    }
                }
            }
            const t = (3 - Math.sqrt(5))/4;
            const s = 0.5;
            const evenPerms = [
                [t, s, 0],[s, 0, t],[0, t, s],
                [-t, s, 0],[-s, 0, t],[0, t, -s],
                [t, -s, 0],[s, 0, -t],[0, -t, s],
                [-t, -s, 0],[-s, 0, -t],[0, -t, -s],
            ];
            
            return vertices.concat(evenPerms);
        })()
    }],
    
    
    
    
    
  ["mucube", {
    dual: "muoctahedron",
    vertices: (n) => {
      const vertices = [];
      for (let i = -n; i < n; i++) {
        for (let j = -n; j < n; j++) {
          for (let k = -n; k < n; k++) {
            vertices.push([i+0.50001, j+0.50001, k+0.50001]);
          }
        }
      }
      return vertices;
    }
  }],
  
  ["muoctahedron", {
    dual: "mucube",
    vertices: (n) => {
      const vertices = [];
      const sqrt2 = Math.sqrt(2);
      for (let i = -n; i <= n; i++) {
        for (let j = -n; j <= n; j++) {
          for (let k = -n; k <= n; k++) {
            const x = 2 * sqrt2 * i;
            const yBase = 2 * sqrt2 * j;
            const z = sqrt2 + 2 * sqrt2 * k;
            const yOffsets = [+sqrt2 / 2, -sqrt2 / 2];
            for (const yOffset of yOffsets) {
              vertices.push([x-0.00001, yBase + yOffset-0.00001, z-0.00001]);
            }
          }
        }
      }
      return vertices;
    }
  }]
,
    //stereomucube(x/6,6)^2/stereomuoctahedron(x/6i,6)
  ["mutetrahedron", {
  dual: "dmutetrahedron", 
  vertices: (n) => {
    const vertices = [];
    const base = [
      [0, 0, 0],
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 1],
    ];
    for (let i = -n; i <= n; i++) {
      for (let j = -n; j <= n; j++) {
        for (let k = -n; k <= n; k++) {
          const offset = [2 * i, 2 * j, 2 * k];
          for (const [x, y, z] of base) {
            vertices.push([
              x + offset[0],
              y + offset[1],
              z + offset[2]
            ]);
          }
        }
      }
    }
    return vertices;
  }
}],
  ["dmutetrahedron", {
  dual: "mutetrahedron",
  vertices: (n) => {
    const vertices = [];
    const base = [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
    ];
    for (let i = -n; i <= n; i++) {
      for (let j = -n; j <= n; j++) {
        for (let k = -n; k <= n; k++) {
          const offset = [2 * i, 2 * j, 2 * k];
          for (const [x, y, z] of base) {
            vertices.push([
              x + offset[0],
              y + offset[1],
              z + offset[2]
            ]);
          }
        }
      }
    }
    return vertices;
  }
}],
    
    
    
    
      ["mucubeup", {
    dual: "muoctahedronup",
    vertices: (n) => {
      const vertices = [];
      for (let i = -n; i <= n; i++) {
        for (let j = -n; j <= n; j++) {
          for (let k = -n; k <= n; k++) {
            vertices.push([i-0.00001, j-0.00001, k-0.00001]);
            }
        }
      }
      return vertices;
    }
  }],
    
    
    
    ["icosidodecahedron", {
    dual: "rhombic triacontahedron",
    vertices: (() => {
        const a = (1 + Math.sqrt(5)) / 2;
        const t = (3 + Math.sqrt(5)) / 4;
        const s = (1 + Math.sqrt(5)) / 4;
        const b = 0.5;
        const vertices = [];

        // All permutations of (±a, 0, 0)
        vertices.push([a, 0, 0], [-a, 0, 0], [0, a, 0], [0, -a, 0], [0, 0, a], [0, 0, -a]);

        // Even permutations of (±t, ±s, ±b)
        const signs = [1, -1];
        for (const i of signs) {
            for (const j of signs) {
                for (const k of signs) {
                    const evenPerms = [
                        [i * t, j * s, k * b],
                        [j * s, k * b, i * t],
                        [k * b, i * t, j * s],
                    ];
                    vertices.push(...evenPerms);
                }
            }
        }

        return vertices;
    })()
}],
["rhombic triacontahedron", {
    dual: "icosidodecahedron",
    vertices: (() => {
        const u = Math.sqrt((5 + Math.sqrt(5)) / 10);
        const a = Math.sqrt((5 + 2 * Math.sqrt(5)) / 5);
        const b = Math.sqrt((5 - Math.sqrt(5)) / 10);

        const vertices = [];

        // All permutations of (±u, ±u, ±u)
        const signs = [1, -1];
        for (const i of signs) {
            for (const j of signs) {
                for (const k of signs) {
                    vertices.push([i * u, j * u, k * u]);
                }
            }
        }

        // Even permutations of (±a, 0, ±b)
        for (const i of signs) {
            for (const j of signs) {
                const evenPerms1 = [
                    [i * a, 0, j * b],
                    [0, j * b, i * a],
                    [j * b, i * a, 0]
                ];
                vertices.push(...evenPerms1);
            }
        }

        // Even permutations of (±a, ±u, 0)
        for (const i of signs) {
            for (const j of signs) {
                const evenPerms2 = [
                    [i * a, j * u, 0],
                    [j * u, 0, i * a],
                    [0, i * a, j * u]
                ];
                vertices.push(...evenPerms2);
            }
        }

        return vertices;
    })(),
    vertexDegree: (() => {
        const eps = 0.01;
        const vertices = (() => {
            const u = Math.sqrt((5 + Math.sqrt(5)) / 10);
            const a = Math.sqrt((5 + 2 * Math.sqrt(5)) / 5);
            const b = Math.sqrt((5 - Math.sqrt(5)) / 10);

            const result = [];
            const signs = [1, -1];
            for (const i of signs) {
                for (const j of signs) {
                    for (const k of signs) {
                        result.push([i * u, j * u, k * u]);
                    }
                }
            }
            for (const i of signs) {
                for (const j of signs) {
                    const evenPerms1 = [
                        [i * a, 0, j * b],
                        [0, j * b, i * a],
                        [j * b, i * a, 0]
                    ];
                    result.push(...evenPerms1);
                }
            }
            for (const i of signs) {
                for (const j of signs) {
                    const evenPerms2 = [
                        [i * a, j * u, 0],
                        [j * u, 0, i * a],
                        [0, i * a, j * u]
                    ];
                    result.push(...evenPerms2);
                }
            }
            return result;
        })();

        const n = vertices.length;
        const degrees = new Array(n).fill(0);

        const dist = (a, b) =>
            Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);

        // Find the minimal non-zero distance
        let minDist = Infinity;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const d = dist(vertices[i], vertices[j]);
                if (d > eps && d < minDist) {
                    minDist = d;
                }
            }
        }

        // Count neighbors within ε of that minimal non-zero distance
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i !== j && Math.abs(dist(vertices[i], vertices[j]) - minDist) < eps) {
                    degrees[i]++;
                }
            }
        }

        return degrees;
    })()
}]
,
    
    
    
    
    
    
    

    
    // Archimedean and Catalan solids
    ["truncated octahedron", {
        dual: "tetrakis hexahedron",
        vertices: (() => {
            const a = Math.sqrt(2);
            const b = Math.sqrt(2)/2;
            const vertices = [];
            // All permutations of (±√2, ±√2/2, 0)
            const values = [
                [a, b, 0], [a, -b, 0], [-a, b, 0], [-a, -b, 0],
                [a, 0, b], [a, 0, -b], [-a, 0, b], [-a, 0, -b],
                [b, a, 0], [b, -a, 0], [-b, a, 0], [-b, -a, 0],
                [b, 0, a], [b, 0, -a], [-b, 0, a], [-b, 0, -a],
                [0, a, b], [0, a, -b], [0, -a, b], [0, -a, -b],
                [0, b, a], [0, b, -a], [0, -b, a], [0, -b, -a]
            ];
            return values;
        })()
    }],
    
   ["tetrakis hexahedron", {
    dual: "truncated octahedron",
    vertices: (() => {
        const a = 3 * Math.sqrt(2) / 4;
        const b = 9 * Math.sqrt(2) / 8;
        const vertices = [];
        
        // All sign changes of (±3√2/4, ±3√2/4, ±3√2/4) — degree 6 (cube vertices)
        for (const x of [-a, a]) {
            for (const y of [-a, a]) {
                for (const z of [-a, a]) {
                    vertices.push([x, y, z]);
                }
            }
        }
        
        // All permutations of (±9√2/8, 0, 0) — degree 4 (octahedron vertices)
        const values = [
            [b, 0, 0], [-b, 0, 0],
            [0, b, 0], [0, -b, 0],
            [0, 0, b], [0, 0, -b]
        ];
        
        return vertices.concat(values);
    })(),
    vertexDegree: [
        // First 8 vertices (cube-like): degree 6
        6, 6, 6, 6, 6, 6, 6, 6,
        // Next 6 vertices (octahedron-like): degree 4
        4, 4, 4, 4, 4, 4
    ]
}],
    
    ["cuboctahedron", {
        dual: "rhombic dodecahedron",
        vertices: (() => {
            const s = Math.sqrt(2)/2;
            const vertices = [];
            // All permutations of (±√2/2, ±√2/2, 0)
            const values = [
                [s, s, 0], [s, -s, 0], [-s, s, 0], [-s, -s, 0],
                [s, 0, s], [s, 0, -s], [-s, 0, s], [-s, 0, -s],
                [0, s, s], [0, s, -s], [0, -s, s], [0, -s, -s]
            ];
            return values;
        })()
    }],
    
    ["rhombic dodecahedron", {
        dual: "cuboctahedron",
        vertices: (() => {
            const a = Math.sqrt(3)/3;
            const b = 2*Math.sqrt(3)/3;
            const vertices = [];
            
            // All sign changes of (±√3/3, ±√3/3, ±√3/3)
            for (const x of [-a, a]) {
                for (const y of [-a, a]) {
                    for (const z of [-a, a]) {
                        vertices.push([x, y, z]);
                    }
                }
            }
            
            // All permutations of (±2√3/3, 0, 0)
            const values = [
                [b, 0, 0], [-b, 0, 0],
                [0, b, 0], [0, -b, 0],
                [0, 0, b], [0, 0, -b]
            ];
            
            return vertices.concat(values);
        })(),
    vertexDegree: [
        // First 8 vertices (octahedron-like): degree 4
        3, 3, 3, 3, 3, 3, 3, 3,
        // Next 6 vertices (cube-like): degree 3
        4, 4, 4, 4, 4, 4
    ]
    }],
    
    ["truncated tetrahedron", {
        dual: "triakis tetrahedron",
        vertices: (() => {
            const a = 3*Math.sqrt(2)/4;
            const b = Math.sqrt(2)/4;
            const vertices = [];
            
            // All even sign changes and permutations of (3√2/4, √2/4, √2/4)
            const base = [a, b, b];
        for (let i = 0; i < 3; i++) {
                for (const xSign of [1, -1]) {
                    for (const ySign of [1, -1]) {
                        for (const zSign of [1, -1]) {
                            // Only even number of sign changes
                            if (xSign * ySign * zSign === 1) {
                                const rotated = [
                                    base[i % 3] * xSign,
                                    base[(i + 1) % 3] * ySign,
                                    base[(i + 2) % 3] * zSign
                                ];
                                vertices.push(rotated);
                            }
                        }
                    }
                }
        }
            return vertices;
        })()
    }],
["triakis tetrahedron", {
    dual: "truncated tetrahedron",
    vertices: (() => {
        const a = 3 * Math.sqrt(2) / 4;  // Larger tetrahedron vertices
        const b = 9 * Math.sqrt(2) / 20; // Smaller tetrahedron vertices
        const vertices = [];

        // All even sign changes of (3√2/4, 3√2/4, 3√2/4) - degree 6
        // (even number of minus signs)
        const evenSigns = [
            [1, 1, 1], 
            [-1, -1, 1],
            [-1, 1, -1],
            [1, -1, -1]
        ];
        for (const [xSign, ySign, zSign] of evenSigns) {
            vertices.push([a * xSign, a * ySign, a * zSign]);
        }

        // All odd sign changes of (9√2/20, 9√2/20, 9√2/20) - degree 4
        // (odd number of minus signs)
        const oddSigns = [
            [-1, -1, -1],
            [1, 1, -1],
            [1, -1, 1],
            [-1, 1, 1]
        ];
        for (const [xSign, ySign, zSign] of oddSigns) {
            vertices.push([b * xSign, b * ySign, b * zSign]);
        }

        return vertices;
    })(),
    vertexDegree: [
        // First 4 vertices (original tetrahedron vertices): degree 6
      
        // Next 4 vertices (added pyramid apices): degree 4
        3, 3, 3, 3,
          6, 6, 6, 6,
    ]
}],
    
    
    
    ["truncated cube", {
    dual: "triakis octahedron",
    vertices: (() => {
        const a = (1 + Math.SQRT2) / 2;
        const b = 0.5;
        const perms = [
            [a, a, b],[a, -a, b],[-a, a, b],[-a, -a, b],
            [a, a, -b],[a, -a, -b],[-a, a, -b],[-a, -a, -b],
            [a, b, a],[a, -b, a],[-a, b, a],[-a, -b, a],
            [a, b, -a],[a, -b, -a],[-a, b, -a],[-a, -b, -a],
            [b, a, a],[b, -a, a],[-b, a, a],[-b, -a, a],
            [b, a, -a],[b, -a, -a],[-b, a, -a],[-b, -a, -a]
        ];
        return perms;
    })()
}],

["triakis octahedron", {
    dual: "truncated cube",
    vertices: (() => {
        const a = 1 + Math.SQRT2;  // Approximately 2.4142
        const perms = [
            [a, 0, 0], [-a, 0, 0],  // Degree 8 vertices (x-axis)
            [0, a, 0], [0, -a, 0],   // Degree 8 vertices (y-axis)
            [0, 0, a], [0, 0, -a],   // Degree 8 vertices (z-axis)
            
            // Cube vertices - degree 6
            [1, 1, 1], [-1, 1, 1],
            [1, -1, 1], [1, 1, -1],
            [-1, -1, 1], [-1, 1, -1],
            [1, -1, -1], [-1, -1, -1]
        ];
        return perms;
    })(),
    vertexDegree: [
        // First 6 vertices (octahedral positions): degree 8
        8, 8, 8, 8, 8, 8,
        // Next 8 vertices (cube vertices): degree 3
        3, 3, 3, 3, 3, 3, 3, 3
    ]
}]

    
    ,
   ["rhombicuboctahedron", {
    dual: "deltoidal icositetrahedron",
    vertices: (() => {
        const a = 1 + Math.SQRT2;
        const base = [1, 1, a];
        const signs = [1, -1];
        const vertices = [];

        for (const i of signs) {
            for (const j of signs) {
                for (const k of signs) {
                    // Only distinct permutations of [1, 1, a]
                    vertices.push([i * 1, j * 1, k * a]);
                    vertices.push([i * 1, j * a, k * 1]);
                    vertices.push([i * a, j * 1, k * 1]);
                }
            }
        }

        return vertices;
    })()
}],

    ["deltoidal icositetrahedron", {
    dual: "rhombicuboctahedron",
    vertices: (() => {
        const sqrt2 = Math.sqrt(2);
        const red = [
            [1, 0, 0], [-1, 0, 0],
            [0, 1, 0], [0, -1, 0],
            [0, 0, 1], [0, 0, -1],
        ];

        const halfSqrt2 = sqrt2 / 2;
        const blue = [
            [0, +halfSqrt2, +halfSqrt2],
            [0, +halfSqrt2, -halfSqrt2],
            [0, -halfSqrt2, +halfSqrt2],
            [0, -halfSqrt2, -halfSqrt2],

            [+halfSqrt2, 0, +halfSqrt2],
            [+halfSqrt2, 0, -halfSqrt2],
            [-halfSqrt2, 0, +halfSqrt2],
            [-halfSqrt2, 0, -halfSqrt2],

            [+halfSqrt2, +halfSqrt2, 0],
            [+halfSqrt2, -halfSqrt2, 0],
            [-halfSqrt2, +halfSqrt2, 0],
            [-halfSqrt2, -halfSqrt2, 0],
        ];

        const val = (2 * sqrt2 + 1) / 7;
        const yellow = [];
        for (const i of [1, -1]) {
            for (const j of [1, -1]) {
                for (const k of [1, -1]) {
                    yellow.push([i * val, j * val, k * val]);
                }
            }
        }

        return [...red, ...blue, ...yellow];
    })(),
    
    vertexDegree: [
        4,4,4,4,4,4,
        4,4,4,4,4,4,4,4,4,4,4,4,
        3,3,3,3,3,3,3,3
    ]
}]

    ,
    
    
    ["truncated cuboctahedron", {
    dual: "tetrakis hexahedron",
    vertices: (() => {
        const a = 1;
        const b = 1 + Math.SQRT2;
        const c = 1 + 2 * Math.SQRT2;
        const base = [a, b, c];
        const signs = [1, -1];
        const vertices = [];

        for (const i of signs) {
            for (const j of signs) {
                for (const k of signs) {
                    vertices.push([i * a, j * b, k * c]);
                    vertices.push([i * a, j * c, k * b]);
                    vertices.push([i * b, j * a, k * c]);
                    vertices.push([i * b, j * c, k * a]);
                    vertices.push([i * c, j * a, k * b]);
                    vertices.push([i * c, j * b, k * a]);
                }
            }
        }

        return vertices;
    })()
}],
    ["disdyakis dodecahedron", {
    dual: "truncated cuboctahedron",
    vertices: (() => {
        const a = 1 / (1 + 2 * Math.SQRT2);
        const b = 1 / (2 + 3 * Math.SQRT2);
        const c = 1 / (3 + 3 * Math.SQRT2);
        const signs = [1, -1];
        const vertices = [];

        // Octahedron vertices: (±a, 0, 0) and perms
        vertices.push([a, 0, 0], [-a, 0, 0], [0, a, 0], [0, -a, 0], [0, 0, a], [0, 0, -a]);

        // Cuboctahedron-style: all permutations of (±b, ±b, 0)
        for (const i of signs) {
            for (const j of signs) {
                const pairs = [
                    [i * b, j * b, 0],
                    [i * b, 0, j * b],
                    [0, i * b, j * b],
                ];
                vertices.push(...pairs);
            }
        }

        // Cube: all ± of (c, c, c)
        for (const i of signs) {
            for (const j of signs) {
                for (const k of signs) {
                    vertices.push([i * c, j * c, k * c]);
                }
            }
        }

        return vertices;
    })(),
    
    vertexDegree: [
        8,8,8,8,8,8,
        4,4,4,4,4,4,4,4,4,4,4,4,
        6,6,6,6,6,6,6,6,
    ]
}],

    
    
    ["snub cube", {
    dual: "pentagonal icositetrahedron",
    vertices: (() => {
        const t = 1.8392867552141612; // tribonacci constant
        const base = [1, 1 / t, t];
        const signs = [1, -1];
        const vertices = [];

        const permute = (arr) => {
            const results = [];
            const used = [];
            const recur = (path) => {
                if (path.length === arr.length) {
                    results.push(path);
                    return;
                }
                for (let i = 0; i < arr.length; i++) {
                    if (used[i]) continue;
                    used[i] = true;
                    recur([...path, arr[i]]);
                    used[i] = false;
                }
            };
            recur([]);
            return results;
        };

        const isEvenPermutation = (perm, original) => {
            let count = 0;
            const temp = original.slice();
            for (let i = 0; i < perm.length; i++) {
                const index = temp.indexOf(perm[i]);
                temp.splice(index, 1);
                count += index;
            }
            return count % 2 === 0;
        };

        const original = base.slice();
        const perms = permute(base);

        for (const perm of perms) {
            const even = isEvenPermutation(perm, original);
            for (const i of signs) {
                for (const j of signs) {
                    for (const k of signs) {
                        const signsArr = [i, j, k];
                        const plusCount = signsArr.filter(x => x > 0).length;
                        const signed = [i * perm[0], j * perm[1], k * perm[2]];

                        if ((even && plusCount % 2 === 0) || (!even && plusCount % 2 === 1)) {
                            vertices.push(signed);
                        }
                    }
                }
            }
        }

        return vertices;
    })()
}],

   ["pentagonal icositetrahedron", {
    dual: "snub cube",
    vertices: (() => {
        const t = 1.83928675521;
        const t2 = t * t;
        const t3 = t * t * t;
        const vertices = [];

        // 24 permutations of (±1, ±(2t+1), ±t²)
        const base = [1, 2 * t + 1, t2];

        const permute = (arr) => {
            const results = [];
            const used = [];
            const recur = (path) => {
                if (path.length === arr.length) {
                    results.push(path);
                    return;
                }
                for (let i = 0; i < arr.length; i++) {
                    if (used[i]) continue;
                    used[i] = true;
                    recur([...path, arr[i]]);
                    used[i] = false;
                }
            };
            recur([]);
            return results;
        };

        const isEvenPermutation = (perm, original) => {
            let count = 0;
            const temp = original.slice();
            for (let i = 0; i < perm.length; i++) {
                const index = temp.indexOf(perm[i]);
                temp.splice(index, 1);
                count += index;
            }
            return count % 2 === 0;
        };

        const original = base.slice();
        const perms = permute(base);

        for (const perm of perms) {
            const even = isEvenPermutation(perm, original);
            for (let i of [-1, 1]) {
                for (let j of [-1, 1]) {
                    for (let k of [-1, 1]) {
                        const signed = [i * perm[0], j * perm[1], k * perm[2]];
                        const minusCount = [i, j, k].filter(x => x < 0).length;
                        if ((even && minusCount % 2 === 0) || (!even && minusCount % 2 === 1)) {
                            vertices.push(signed);
                        }
                    }
                }
            }
        }

        // 6 axial points: (±t³, 0, 0), etc.
        vertices.push([t3, 0, 0], [-t3, 0, 0], [0, t3, 0], [0, -t3, 0], [0, 0, t3], [0, 0, -t3]);

        // 8 points: (±t², ±t², ±t²)
        for (let i of [-1, 1]) {
            for (let j of [-1, 1]) {
                for (let k of [-1, 1]) {
                    vertices.push([i * t2, j * t2, k * t2]);
                }
            }
        }

        return vertices;
    })(),
    
    vertexDegree: [
        3,3,3,3,3,3, 3,3,3,3,3,3,
        3,3,3,3,3,3, 3,3,3,3,3,3,
        4,4,4,4,4,4,
        3,3,3,3,3,3,3,3
    ]
    
    
}],
 
   ["truncated dodecahedron", {
  dual: "triakis icosahedron",
  vertices: (() => {
    const phi = (1 + Math.sqrt(5)) / 2;

    // Coordinate components
    const a = 1 / phi;
    const b = 2 + phi;
    const c = 2 * phi;
    const d = phi + 1;

    const sets = [
      [0, a, b],
      [a, phi, c],
      [phi, 2, d],
    ];

    // Get even permutations (0→1→2→0)
    const evenPermute = ([x, y, z]) => [
      [ x,  y,  z],
      [ y,  z,  x],
      [ z,  x,  y],
    ];

    // All sign combinations
    const signFlips = ([x, y, z]) => {
      const s = [];
      for (const sx of [1, -1]) {
        for (const sy of [1, -1]) {
          for (const sz of [1, -1]) {
            const px = sx * x;
            const py = sy * y;
            const pz = sz * z;
            // Avoid -0
            s.push([
              px === 0 ? 0 : px,
              py === 0 ? 0 : py,
              pz === 0 ? 0 : pz,
            ]);
          }
        }
      }
      return s;
    };

    const verts = [];
    for (const base of sets) {
      for (const perm of evenPermute(base)) {
        for (const signs of signFlips(perm)) {
          verts.push(signs);
        }
      }
    }

    return verts;
  })()
}],

    ["triakis icosahedron", {
    dual: "truncated dodecahedron",
    vertices: (() => {
        const phi = (1 + Math.sqrt(5)) / 2;
        const norm1 = Math.sqrt(phi * phi + 1);
        const scale2 = Math.sqrt(25 + 2 * Math.sqrt(5)) / 11;

        const verts = [];

         const p = phi ;
 
            const signs = [[1,1], [1,-1], [-1,1], [-1,-1]];
            for (const [s1, s2] of signs) {
                const coords = [0, 1 * s1 / norm1, p * s2 / norm1];
                verts.push([...coords]);
                verts.push([coords[2], coords[0], coords[1]]);
                verts.push([coords[1], coords[2], coords[0]]);
            }
 

        // Dodecahedron vertices (scaled)
        const d = scale2;
        const a = 1 * d;
        const b = phi * d;
        const c = (1 / phi) * d;

        // (±1, ±1, ±1)
        [-1, 1].forEach(x =>
            [-1, 1].forEach(y =>
                [-1, 1].forEach(z =>
                    verts.push([x * a, y * a, z * a])
                )
            )
        );

        // (0, ±φ, ±1/φ)
        [-1, 1].forEach(y =>
            [-1, 1].forEach(z =>
                verts.push([0, y * b, z * c])
            )
        );

        // (±1/φ, 0, ±φ)
        [-1, 1].forEach(x =>
            [-1, 1].forEach(z =>
                verts.push([x * c, 0, z * b])
            )
        );

        // (±φ, ±1/φ, 0)
        [-1, 1].forEach(x =>
            [-1, 1].forEach(y =>
                verts.push([x * b, y * c, 0])
            )
        );

        return verts;
    })(),
    
    vertexDegree: [
   
       10,10,10,10,10,10, 10,10,10,10,10,10,
        3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
        
    ]
}],

    ["truncated icosahedron", {
  dual: "pentakis dodecahedron",
  vertices: (() => {
    const sqrt5 = Math.sqrt(5);
    const a = 1 / 2;
    const b = (3 + 3 * sqrt5) / 4;
    const c = (5 + sqrt5) / 4;
    const d = (1 + sqrt5) / 2;
    const e = (1 + sqrt5) / 4;
    const f = 1;
    const g = (2 + sqrt5) / 2;

    const bases = [
      [0, a, b],
      [a, c, d],
      [e, f, g],
    ];

    const evenPermute = ([x, y, z]) => [
      [ x,  y,  z],
      [ y,  z,  x],
      [ z,  x,  y],
    ];

    const seen = new Set();
    const verts = [];

    const key = (v) => v.map(n => (Math.abs(n) < 1e-10 ? 0 : +n.toFixed(10))).join(',');

    for (const base of bases) {
      for (const [x, y, z] of evenPermute(base)) {
        for (const sx of [1, -1]) {
          for (const sy of [1, -1]) {
            for (const sz of [1, -1]) {
              const v = [
                sx * x === 0 ? 0 : sx * x,
                sy * y === 0 ? 0 : sy * y,
                sz * z === 0 ? 0 : sz * z,
              ];
              const k = key(v);
              if (!seen.has(k)) {
                seen.add(k);
                verts.push(v);
              }
            }
          }
        }
      }
    }

    return verts;
  })()
}],

    
    
    
    ["rhombicosidodecahedron", {
  dual: "deltoidal hexecontahedron",
  vertices: (() => {
    const phi = (1 + Math.sqrt(5)) / 2;
    const phi2 = phi * phi;
    const phi3 = phi * phi2;

    const data = [
      [1, 1, phi3],
      [phi2, phi, 2 * phi],
      [2 + phi, 0, phi2],
    ];

    const evenPermute = ([x, y, z]) => [
      [ x,  y,  z],
      [ y,  z,  x],
      [ z,  x,  y],
    ];

    const seen = new Set();
    const verts = [];

    const key = (v) => v.map(n => (Math.abs(n) < 1e-10 ? 0 : +n.toFixed(10))).join(',');

    for (const base of data) {
        for (const [x, y, z] of evenPermute(base)) {
        for (const sx of [1, -1]) {
          for (const sy of [1, -1]) {
            for (const sz of [1, -1]) {
              const v = [sx * x, sy * y, sz * z].map(n => Math.abs(n) < 1e-10 ? 0 : n / 2);
              const k = key(v);
              if (!seen.has(k)) {
                seen.add(k);
                verts.push(v);
              }
            }
          }
        }
      }
    }

    return verts;
  })()
}],
    
    
    
    ["deltoidal hexecontahedron", {
     dual: "rhombicosidodecahedron",
  vertices: (() => {
    const sqrt = Math.sqrt;

    const verts =  [
    [0,0,-(11/sqrt(85-31*sqrt(5)))],
    [0,0,11/sqrt(85-31*sqrt(5))],
    [0,-(11/sqrt(85-31*sqrt(5))),0],
    [0,11/sqrt(85-31*sqrt(5)),0],
    [0,-(1/3)*sqrt(53/2+59/sqrt(5)),-(1/6)*sqrt(41+89/sqrt(5))],
    [0,-(1/3)*sqrt(53/2+59/sqrt(5)),1/6*sqrt(41+89/sqrt(5))],
    [0,-sqrt(1/2+1/sqrt(5)),-(1/2)*sqrt(13+29/sqrt(5))],
    [0,-sqrt(1/2+1/sqrt(5)),1/2*sqrt(13+29/sqrt(5))],
    [0,sqrt(1/2+1/sqrt(5)),-(1/2)*sqrt(13+29/sqrt(5))],
    [0,sqrt(1/2+1/sqrt(5)),1/2*sqrt(13+29/sqrt(5))],
    [0,sqrt(53/18+59/(9*sqrt(5))),-(1/6)*sqrt(41+89/sqrt(5))],
    [0,sqrt(53/18+59/(9*sqrt(5))),1/6*sqrt(41+89/sqrt(5))],
    [-(11/sqrt(85-31*sqrt(5))),0,0],
    [-(1/4)*sqrt(17+31/sqrt(5)),-(1/4)*sqrt(41+89/sqrt(5)),1/2*sqrt(5/2+1/sqrt(5))],
    [-(1/4)*sqrt(17+31/sqrt(5)),-(1/4)*sqrt(41+89/sqrt(5)),-(1/2)*sqrt(5/2+1/sqrt(5))],
    [-(1/4)*sqrt(17+31/sqrt(5)),1/4*sqrt(41+89/sqrt(5)),1/2*sqrt(5/2+1/sqrt(5))],
    [-(1/4)*sqrt(17+31/sqrt(5)),1/4*sqrt(41+89/sqrt(5)),-(1/2)*sqrt(5/2+1/sqrt(5))],
    [1/4*sqrt(17+31/sqrt(5)),-(1/4)*sqrt(41+89/sqrt(5)),1/2*sqrt(5/2+1/sqrt(5))],
    [1/4*sqrt(17+31/sqrt(5)),-(1/4)*sqrt(41+89/sqrt(5)),-(1/2)*sqrt(5/2+1/sqrt(5))],
    [1/4*sqrt(17+31/sqrt(5)),1/4*sqrt(41+89/sqrt(5)),1/2*sqrt(5/2+1/sqrt(5))],
    [1/4*sqrt(17+31/sqrt(5)),1/4*sqrt(41+89/sqrt(5)),-(1/2)*sqrt(5/2+1/sqrt(5))],
    [11/sqrt(85-31*sqrt(5)),0,0],
    [-(1/2)*sqrt(13+29/sqrt(5)),0,-sqrt(1/2+1/sqrt(5))],
    [-(1/2)*sqrt(13+29/sqrt(5)),0,sqrt(1/2+1/sqrt(5))],
    [-(1/2)*sqrt(5+11/sqrt(5)),-(1/2)*sqrt(5+11/sqrt(5)),-(1/2)*sqrt(5+11/sqrt(5))],
    [-(1/2)*sqrt(5+11/sqrt(5)),-(1/2)*sqrt(5+11/sqrt(5)),1/2*sqrt(5+11/sqrt(5))],
    [-(1/2)*sqrt(5+11/sqrt(5)),1/2*sqrt(5+11/sqrt(5)),-(1/2)*sqrt(5+11/sqrt(5))],
    [-(1/2)*sqrt(5+11/sqrt(5)),1/2*sqrt(5+11/sqrt(5)),1/2*sqrt(5+11/sqrt(5))],
    [-(1/3)*sqrt(53/2+59/sqrt(5)),-(1/6)*sqrt(41+89/sqrt(5)),0],
    [-(1/3)*sqrt(53/2+59/sqrt(5)),1/6*sqrt(41+89/sqrt(5)),0],
    [-sqrt(1/2+1/sqrt(5)),-(1/2)*sqrt(13+29/sqrt(5)),0],
    [-sqrt(1/2+1/sqrt(5)),1/2*sqrt(13+29/sqrt(5)),0],
    [-(1/6)*sqrt(41+89/sqrt(5)),0,-(1/3)*sqrt(53/2+59/sqrt(5))],
    [-(1/6)*sqrt(41+89/sqrt(5)),0,sqrt(53/18+59/(9*sqrt(5)))],
    [-(1/4)*sqrt(41+89/sqrt(5)),1/2*sqrt(5/2+1/sqrt(5)),-(1/4)*sqrt(17+31/sqrt(5))],
    [-(1/4)*sqrt(41+89/sqrt(5)),1/2*sqrt(5/2+1/sqrt(5)),1/4*sqrt(17+31/sqrt(5))],
    [-(1/4)*sqrt(41+89/sqrt(5)),-(1/2)*sqrt(5/2+1/sqrt(5)),-(1/4)*sqrt(17+31/sqrt(5))],
    [-(1/4)*sqrt(41+89/sqrt(5)),-(1/2)*sqrt(5/2+1/sqrt(5)),1/4*sqrt(17+31/sqrt(5))],
    [1/2*sqrt(5/2+1/sqrt(5)),-(1/4)*sqrt(17+31/sqrt(5)),-(1/4)*sqrt(41+89/sqrt(5))],
    [1/2*sqrt(5/2+1/sqrt(5)),-(1/4)*sqrt(17+31/sqrt(5)),1/4*sqrt(41+89/sqrt(5))],
    [1/2*sqrt(5/2+1/sqrt(5)),1/4*sqrt(17+31/sqrt(5)),-(1/4)*sqrt(41+89/sqrt(5))],
    [1/2*sqrt(5/2+1/sqrt(5)),1/4*sqrt(17+31/sqrt(5)),1/4*sqrt(41+89/sqrt(5))],
    [-(1/2)*sqrt(5/2+1/sqrt(5)),-(1/4)*sqrt(17+31/sqrt(5)),-(1/4)*sqrt(41+89/sqrt(5))],
    [-(1/2)*sqrt(5/2+1/sqrt(5)),-(1/4)*sqrt(17+31/sqrt(5)),1/4*sqrt(41+89/sqrt(5))],
    [-(1/2)*sqrt(5/2+1/sqrt(5)),1/4*sqrt(17+31/sqrt(5)),-(1/4)*sqrt(41+89/sqrt(5))],
    [-(1/2)*sqrt(5/2+1/sqrt(5)),1/4*sqrt(17+31/sqrt(5)),1/4*sqrt(41+89/sqrt(5))],
    [1/6*sqrt(41+89/sqrt(5)),0,-(1/3)*sqrt(53/2+59/sqrt(5))],
    [1/6*sqrt(41+89/sqrt(5)),0,sqrt(53/18+59/(9*sqrt(5)))],
    [1/4*sqrt(41+89/sqrt(5)),1/2*sqrt(5/2+1/sqrt(5)),-(1/4)*sqrt(17+31/sqrt(5))],
    [1/4*sqrt(41+89/sqrt(5)),1/2*sqrt(5/2+1/sqrt(5)),1/4*sqrt(17+31/sqrt(5))],
    [1/4*sqrt(41+89/sqrt(5)),-(1/2)*sqrt(5/2+1/sqrt(5)),-(1/4)*sqrt(17+31/sqrt(5))],
    [1/4*sqrt(41+89/sqrt(5)),-(1/2)*sqrt(5/2+1/sqrt(5)),1/4*sqrt(17+31/sqrt(5))],
    [sqrt(1/2+1/sqrt(5)),-(1/2)*sqrt(13+29/sqrt(5)),0],
    [sqrt(1/2+1/sqrt(5)),1/2*sqrt(13+29/sqrt(5)),0],
    [sqrt(53/18+59/(9*sqrt(5))),-(1/6)*sqrt(41+89/sqrt(5)),0],
    [sqrt(53/18+59/(9*sqrt(5))),1/6*sqrt(41+89/sqrt(5)),0],
    [1/2*sqrt(5+11/sqrt(5)),-(1/2)*sqrt(5+11/sqrt(5)),-(1/2)*sqrt(5+11/sqrt(5))],
    [1/2*sqrt(5+11/sqrt(5)),-(1/2)*sqrt(5+11/sqrt(5)),1/2*sqrt(5+11/sqrt(5))],
    [1/2*sqrt(5+11/sqrt(5)),1/2*sqrt(5+11/sqrt(5)),-(1/2)*sqrt(5+11/sqrt(5))],
    [1/2*sqrt(5+11/sqrt(5)),1/2*sqrt(5+11/sqrt(5)),1/2*sqrt(5+11/sqrt(5))],
    [1/2*sqrt(13+29/sqrt(5)),0,-sqrt(1/2+1/sqrt(5))],
    [1/2*sqrt(13+29/sqrt(5)),0,sqrt(1/2+1/sqrt(5))]
]

    // Round near-zero values and avoid "-0"
 return verts;
  })(),
  
  vertexDegree: [4, 4, 4, 4, 5, 5, 3, 3, 3, 3, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 5, 5, 3, 3, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 3, 3, 5, 5, 3, 3, 3, 3, 3, 3]
}]
    ,
    
    ["truncated icosidodecahedron", {
  dual: "disdyakis triacontahedron",
  vertices: (() => {
    const phi = (1 + Math.sqrt(5)) / 2;

    // Coordinate components
    const a = 1 / phi;
    const b = 3 + phi;
    const c = 2 / phi;
    const d = 1 + 2 * phi;
    const e = phi * phi;
    const f = -1 + 3 * phi;
    const g = 2 * phi - 1;
    const h = 2 + phi;
    const i = phi;
    const j = 3;
    const k = 2 * phi;

    const sets = [
      [ a,  a,  b],
      [ c,  i,  d],
      [ a,  e,  f],
      [ g, 2,  h],
      [ i,  j,  k],
    ];

    // Get even permutations (0→1→2→0)
    const evenPermute = ([x, y, z]) => [
      [ x,  y,  z],
      [ y,  z,  x],
      [ z,  x,  y],
    ];

    // All sign combinations
    const signFlips = ([x, y, z]) => {
      const s = [];
      for (const sx of [1, -1]) {
        for (const sy of [1, -1]) {
          for (const sz of [1, -1]) {
            const px = sx * x;
            const py = sy * y;
            const pz = sz * z;
            // Avoid -0
            s.push([
              px === 0 ? 0 : px,
              py === 0 ? 0 : py,
              pz === 0 ? 0 : pz,
            ]);
          }
        }
      }
      return s;
    };

    const verts = [];
    for (const base of sets) {
      for (const perm of evenPermute(base)) {
        for (const signs of signFlips(perm)) {
          verts.push(signs);
        }
      }
    }

    return verts;
  })()
}],

    
    
    
["disdyakis triacontahedron", {
  dual: "truncated icosidodecahedron",
  vertices: (() => {
    const phi = (1 + Math.sqrt(5)) / 2;
    const sqrt_phi2 = Math.sqrt(phi + 2);
    const R = 5 / (3 * phi * sqrt_phi2);
    const S = ((7 * phi - 6) * sqrt_phi2) / 11;

    // fix0: if result is -0, force to +0
    const fix0 = (x) => (x === 0 ? 0 : x);

    // strict cyclic permutation: [a,b,c] [c,a,b] [b,c,a]
    const cyclicPermute = ([x, y, z]) => [
      [x, y, z],
      [z, x, y],
      [y, z, x],
    ];

    // sign flips only for nonzero
    const signFlips = ([x, y, z]) => {
      const signs = (v) => (v === 0 ? [0] : [v, -v]);
      const flips = [];
      for (const sx of signs(x)) {
        for (const sy of signs(y)) {
          for (const sz of signs(z)) {
            flips.push([
              fix0(sx),
              fix0(sy),
              fix0(sz)
            ]);
          }
        }
      }
      return flips;
    };

    const verts = [];

    // (0, ±1/√(φ+2), ±φ/√(φ+2)) and cyclic
    const a = 1 / sqrt_phi2;
    const b = phi / sqrt_phi2;
    for (const perm of cyclicPermute([0, a, b])) {
      verts.push(...signFlips(perm));
    }

    // (±R, ±R, ±R)
    for (const sx of [R, -R]) {
      for (const sy of [R, -R]) {
        for (const sz of [R, -R]) {
          verts.push([
            fix0(sx),
            fix0(sy),
            fix0(sz)
          ]);
        }
      }
    }

    // (0, ±Rφ, ±R/φ) and cyclic
    const c = R * phi;
    const d = R / phi;
    for (const perm of cyclicPermute([0, c, d])) {
      verts.push(...signFlips(perm));
    }

    // (±S, 0, 0) and cyclic
    for (const perm of cyclicPermute([S, 0, 0])) {
      verts.push(...signFlips(perm));
    }

    // (±(Sφ/2), ±(S/2), ±(S/(2φ))) and cyclic
    const e = (S * phi) / 2;
    const f = S / 2;
    const g = S / (2 * phi);
    for (const perm of cyclicPermute([e, f, g])) {
      verts.push(...signFlips(perm));
    }

    return verts;
  })(),
  
  vertexDegree: [
    10,10,10,10, 10,10,10,10, 10,10,10,10, 
      6,6,6,6, 6,6,6,6, 6,6,6,6, 6,6,6,6, 6,6,6,6,
     4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
      
      ]
}],

    
    
        ["snub dodecahedron", {
     dual: "pentagonal hexecontahedron",
  vertices: (() => {
    const sqrt = Math.sqrt;

    const verts =  [
               [-2.05022,-0.64303,0.175393],
            [2.05022,-0.64303,-0.175393],
            [-1.64507,0.64303,1.23608],
            [1.64507,0.64303,-1.23608],
            [-2.09275,0.330921,0.398127],
            [2.09275,0.330921,-0.398127],
            [-1.33296,1.64692,-0.398127],
            [1.33296,1.64692,0.398127],
            [-1.82527,-0.330921,1.09842],
            [1.82527,-0.330921,-1.09842],
            [-0.626047,1.74619,-1.09842],
            [0.626047,1.74619,1.09842],
            [-1.06222,1.45402,1.18539],
            [1.06222,1.45402,-1.18539],
            [-1.93214,0.84755,-0.442882],
            [1.93214,0.84755,0.442882],
            [-1.14487,-0.84755,1.6182],
            [1.14487,-0.84755,-1.6182],
            [-1.58199,-1.45402,-0.175393],
            [1.58199,-1.45402,0.175393],
            [-1.05741,0.374822,-1.84093],
            [1.05741,0.374822,1.84093],
            [-0.439138,-0.374822,-2.07709],
            [0.439138,-0.374822,2.07709],
            [-1.56241,-1.2495,0.803274],
            [1.56241,-1.2495,-0.803274],
            [-1.86331,-0.728335,-0.803274],
            [1.86331,-0.728335,0.803274],
            [-1.70007,1.2495,0.442882],
            [1.70007,1.2495,-0.442882],
            [-0.728114,-1.64692,1.18539],
            [0.728114,-1.64692,-1.18539],
            [-0.265655,-1.74619,-1.23608],
            [0.265655,-1.74619,1.23608],
            [-0.759791,-1.97784,-0.398127],
            [0.759791,-1.97784,0.398127],
            [-1.19922,-1.41527,-1.09842],
            [1.19922,-1.41527,1.09842],
            [-1.79033,0.192894,-1.18539],
            [1.79033,0.192894,1.18539],
            [-1.30644,-0.567715,-1.6182],
            [1.30644,-0.567715,1.6182],
            [-0.853311,0.728335,1.84093],
            [0.853311,0.728335,-1.84093],
            [-1.37941,1.10316,-1.23608],
            [1.37941,1.10316,1.23608],
            [-0.105036,0.567715,-2.07709],
            [0.105036,0.567715,2.07709],
            [-0.468228,2.09705,-0.175393],
            [0.468228,2.09705,0.175393],
            [-0.300897,1.97784,0.803274],
            [0.300897,1.97784,-0.803274],
            [-0.161563,1.41527,1.6182],
            [0.161563,1.41527,-1.6182],
            [-0.544174,-0.192894,2.07709],
            [0.544174,-0.192894,-2.07709],
            [-0.232068,-2.09705,0.442882],
            [0.232068,-2.09705,-0.442882],
            [-0.204101,-1.10316,1.84093],
            [0.204101,-1.10316,-1.84093]
]

    // Round near-zero values and avoid "-0"
 return verts;
  })()
}]
    
    
    ,
    
            ["pentagonal hexecontahedron", {
     dual: "snub dodecahedron",
  vertices: (() => {
    const sqrt = Math.sqrt;

    const verts =  [
                [0.,0.,-3.6322],
 [0.,0.,3.6322],
 [-2.42147,0.,-2.70728],
 [2.42147,0.,2.70728],
 [-3.74093,0.,-0.714455],
 [3.74093,0.,0.714455],
 [-2.31202,0.,3.02648],
 [2.31202,0.,-3.02648],
 [-2.97388,1.2495,-1.66963],
 [2.97388,1.2495,1.66963],
 [-3.20333,-1.64692,-0.468228],
 [3.20333,-1.64692,0.468228],
 [-2.89122,-0.64303,-2.10244],
 [2.89122,-0.64303,2.10244],
 [-3.33708,1.41527,0.232068],
 [3.33708,1.41527,-0.232068],
 [-3.47888,-0.374822,0.974575],
 [3.47888,-0.374822,-0.974575],
 [-0.175393,3.59762,0.468228],
 [0.175393,3.59762,-0.468228],
 [-2.70728,-2.09705,-1.21073],
 [-2.70728,2.09705,-1.21073],
 [2.70728,-2.09705,1.21073],
 [2.70728,2.09705,1.21073],
 [-2.46401,0.973951,-2.48455],
 [2.46401,0.973951,2.48455],
 [-3.24272,0.374822,1.59285],
 [3.24272,0.374822,-1.59285],
 [-3.02794,-1.95071,0.468228],
 [3.02794,-1.95071,-0.468228],
 [-2.89419,2.18236,-0.232068],
 [2.89419,2.18236,0.232068],
 [-3.16974,-1.29605,1.21073],
 [-3.16974,1.29605,1.21073],
 [3.16974,-1.29605,-1.21073],
 [3.16974,1.29605,-1.21073],
 [-2.54667,-1.58042,-2.05174],
 [2.54667,-1.58042,2.05174],
 [-0.753368,0.64303,3.49455],
 [0.753368,0.64303,-3.49455],
 [-0.442882,-3.59762,-0.232068],
 [0.442882,-3.59762,0.232068],
 [-0.40484,-3.20021,1.66963],
 [0.40484,-3.20021,-1.66963],
 [-1.10352,-1.2495,3.22706],
 [1.10352,-1.2495,-3.22706],
 [-0.462459,-3.3931,-1.21073],
 [-0.462459,3.3931,-1.21073],
 [0.462459,-3.3931,1.21073],
 [0.462459,3.3931,1.21073],
 [-0.530344,1.58042,3.22706],
 [0.530344,1.58042,-3.22706],
 [-0.388538,-2.62087,2.48455],
 [0.388538,-2.62087,-2.48455],
 [-2.64202,-1.41527,2.05174],
 [2.64202,-1.41527,-2.05174],
 [-0.0953548,2.99569,-2.05174],
 [0.0953548,2.99569,2.05174],
 [-2.06405,-2.82539,-0.974575],
 [2.06405,-2.82539,0.974575],
 [-2.07547,1.64692,2.48455],
 [2.07547,1.64692,-2.48455],
 [-0.180196,-0.973951,3.49455],
 [0.180196,-0.973951,-3.49455],
 [-0.888732,2.82539,2.10244],
 [0.888732,2.82539,-2.10244],
 [-2.56904,1.95071,1.66963],
 [2.56904,1.95071,-1.66963],
 [-1.21073,-2.09705,2.70728],
 [-1.21073,2.09705,2.70728],
 [1.21073,-2.09705,-2.70728],
 [1.21073,2.09705,-2.70728],
 [-1.29676,-2.99569,-1.59285],
 [1.29676,-2.99569,1.59285],
 [-1.94597,2.62087,-1.59285],
 [1.94597,2.62087,1.59285],
 [-1.41484,3.20021,-0.974575],
 [1.41484,3.20021,0.974575],
 [-1.63386,-0.330921,-3.22706],
 [1.63386,-0.330921,3.22706],
 [-2.00249,-2.18236,2.10244],
 [2.00249,-2.18236,-2.10244],
 [-0.933564,0.330921,-3.49455],
 [0.933564,0.330921,3.49455],
 [-1.87047,-3.23974,0.714455],
 [-1.87047,3.23974,0.714455],
 [1.87047,-3.23974,-0.714455],
 [1.87047,3.23974,-0.714455],
 [-1.15601,-2.00227,-3.02648],
 [-1.15601,2.00227,-3.02648],
 [1.15601,-2.00227,3.02648],
 [1.15601,2.00227,3.02648]

]

    // Round near-zero values and avoid "-0"
 return verts;
  })(),
  
  vertexDegree: (() => {
    // Vertex coordinates would go here
    const vertices = [
                  [0.,0.,-3.6322],
 [0.,0.,3.6322],
 [-2.42147,0.,-2.70728],
 [2.42147,0.,2.70728],
 [-3.74093,0.,-0.714455],
 [3.74093,0.,0.714455],
 [-2.31202,0.,3.02648],
 [2.31202,0.,-3.02648],
 [-2.97388,1.2495,-1.66963],
 [2.97388,1.2495,1.66963],
 [-3.20333,-1.64692,-0.468228],
 [3.20333,-1.64692,0.468228],
 [-2.89122,-0.64303,-2.10244],
 [2.89122,-0.64303,2.10244],
 [-3.33708,1.41527,0.232068],
 [3.33708,1.41527,-0.232068],
 [-3.47888,-0.374822,0.974575],
 [3.47888,-0.374822,-0.974575],
 [-0.175393,3.59762,0.468228],
 [0.175393,3.59762,-0.468228],
 [-2.70728,-2.09705,-1.21073],
 [-2.70728,2.09705,-1.21073],
 [2.70728,-2.09705,1.21073],
 [2.70728,2.09705,1.21073],
 [-2.46401,0.973951,-2.48455],
 [2.46401,0.973951,2.48455],
 [-3.24272,0.374822,1.59285],
 [3.24272,0.374822,-1.59285],
 [-3.02794,-1.95071,0.468228],
 [3.02794,-1.95071,-0.468228],
 [-2.89419,2.18236,-0.232068],
 [2.89419,2.18236,0.232068],
 [-3.16974,-1.29605,1.21073],
 [-3.16974,1.29605,1.21073],
 [3.16974,-1.29605,-1.21073],
 [3.16974,1.29605,-1.21073],
 [-2.54667,-1.58042,-2.05174],
 [2.54667,-1.58042,2.05174],
 [-0.753368,0.64303,3.49455],
 [0.753368,0.64303,-3.49455],
 [-0.442882,-3.59762,-0.232068],
 [0.442882,-3.59762,0.232068],
 [-0.40484,-3.20021,1.66963],
 [0.40484,-3.20021,-1.66963],
 [-1.10352,-1.2495,3.22706],
 [1.10352,-1.2495,-3.22706],
 [-0.462459,-3.3931,-1.21073],
 [-0.462459,3.3931,-1.21073],
 [0.462459,-3.3931,1.21073],
 [0.462459,3.3931,1.21073],
 [-0.530344,1.58042,3.22706],
 [0.530344,1.58042,-3.22706],
 [-0.388538,-2.62087,2.48455],
 [0.388538,-2.62087,-2.48455],
 [-2.64202,-1.41527,2.05174],
 [2.64202,-1.41527,-2.05174],
 [-0.0953548,2.99569,-2.05174],
 [0.0953548,2.99569,2.05174],
 [-2.06405,-2.82539,-0.974575],
 [2.06405,-2.82539,0.974575],
 [-2.07547,1.64692,2.48455],
 [2.07547,1.64692,-2.48455],
 [-0.180196,-0.973951,3.49455],
 [0.180196,-0.973951,-3.49455],
 [-0.888732,2.82539,2.10244],
 [0.888732,2.82539,-2.10244],
 [-2.56904,1.95071,1.66963],
 [2.56904,1.95071,-1.66963],
 [-1.21073,-2.09705,2.70728],
 [-1.21073,2.09705,2.70728],
 [1.21073,-2.09705,-2.70728],
 [1.21073,2.09705,-2.70728],
 [-1.29676,-2.99569,-1.59285],
 [1.29676,-2.99569,1.59285],
 [-1.94597,2.62087,-1.59285],
 [1.94597,2.62087,1.59285],
 [-1.41484,3.20021,-0.974575],
 [1.41484,3.20021,0.974575],
 [-1.63386,-0.330921,-3.22706],
 [1.63386,-0.330921,3.22706],
 [-2.00249,-2.18236,2.10244],
 [2.00249,-2.18236,-2.10244],
 [-0.933564,0.330921,-3.49455],
 [0.933564,0.330921,3.49455],
 [-1.87047,-3.23974,0.714455],
 [-1.87047,3.23974,0.714455],
 [1.87047,-3.23974,-0.714455],
 [1.87047,3.23974,-0.714455],
 [-1.15601,-2.00227,-3.02648],
 [-1.15601,2.00227,-3.02648],
 [1.15601,-2.00227,3.02648],
 [1.15601,2.00227,3.02648]
    ];
    
      const eps = 1e-2;
    const n = vertices.length;
    const degrees = new Array(n).fill(0);

    // Distance helper function
    const dist = (a, b) => Math.sqrt(
      (a[0] - b[0]) ** 2 + 
      (a[1] - b[1]) ** 2 + 
      (a[2] - b[2]) ** 2
    );

    // Find minimal non-zero distance
    let minDist = Infinity;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const d = dist(vertices[i], vertices[j]);
        if (d > eps && d < minDist) minDist = d;
      }
    }

    // Count neighbors at minDist ± eps
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i !== j && Math.abs(dist(vertices[i], vertices[j]) - minDist) < eps) {
          degrees[i]++;
        }
      }
    }

    // Map degrees according to requirements
    return degrees.map(d => {
      if (d === 0) return 5;    // Map 0 → 5
      if (d <= 3) return 3;     // Map 2 or 3 → 3
      return d;                 // Keep other values as-is
    });
  })()
}]
    
    
    
    
    ,
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Special cases
    ["hosohogon", {
        dual: "dihedron",
        vertices: [
            [0, 0, 1],
            [0, 0, -1]
        ]
    }],
    
    ["dihedron", {
        dual: "hosohogon",
        vertices: (n) => {
            // Generate n vertices in a circle
            const vertices = [];
            for (let i = 0; i < n; i++) {
                const angle = (2 * Math.PI * i) / n;
                vertices.push([Math.cos(angle), Math.sin(angle), 0]);
            }
            return vertices;
        }
    }],
    
    ["great cube", {
        dual: "stellated cube",
        vertices: (() => {
            const s = Math.sqrt(2)/2;
            const vertices = [
                [s, 0, 0], [-s, 0, 0],
                [0, s, 0], [0, -s, 0],
                [0, 0, s], [0, 0, -s]
            ];
            return vertices;
        })()
    }],
    
    ["stellated cube", {
        dual: "great cube",
        vertices: (() => {
            const s = 0.5;
            const vertices = [
                [s, 0, 0], [-s, 0, 0],
                [0, s, 0], [0, -s, 0],
                [0, 0, s], [0, 0, -s]
            ];
            return vertices;
        })()
    }]
    
    ,
    
        
  ["csaszar", {
    dual: "szilassi",
    vertices: [
      [-Math.sqrt(3/2), -Math.sqrt(3/2), 1/Math.sqrt(6)],
      [-Math.sqrt(3/2),  Math.sqrt(3/2), 0],
      [-1/Math.sqrt(6), -Math.sqrt(2/3), Math.sqrt(2/3)],
      [0, 0, 5 * Math.sqrt(3/2)],
      [1/Math.sqrt(6), Math.sqrt(2/3), Math.sqrt(2/3)],
      [Math.sqrt(3/2), -Math.sqrt(3/2), 0],
      [Math.sqrt(3/2),  Math.sqrt(3/2), 1/Math.sqrt(6)]
    ]
  }],
  ["szilassi", {
    dual: "csaszar",
    vertices: [
      [-24/5, 0, 24/5],
      [-14/5, -1, 4/5],
      [-14/5, 0, 4/5],
      [-9/5, 1, 4/5],
      [-3/2, -3/2, -6/5],
      [-4/5, 2, -16/5],
      [0, -126/25, -24/5],
      [0, 126/25, -24/5],
      [4/5, -2, -16/5],
      [3/2, 3/2, -6/5],
      [9/5, -1, 4/5],
      [14/5, 0, 4/5],
      [14/5, 1, 4/5],
      [24/5, 0, 24/5]
    ]
  }]
        
        ,
    
    
    
    ["stella octangula", {
        dual: "stella octangula",
        vertices: (() => {
            const s = Math.sqrt(2)/4;
            const vertices = [];
            for (const x of [-s, s]) {
                for (const y of [-s, s]) {
                    for (const z of [-s, s]) {
                        vertices.push([x, y, z]);
                    }
                }
            }
            return vertices;
        })()
    }],
    
    
    
    
    
//    #   ###   #   #  #   #   ####   ###   #   # 
//    #  #   #  #   #  ##  #  #      #   #  ##  # 
//    #  #   #  #####  # # #   ###   #   #  # # # 
//#   #  #   #  #   #  #  ##      #  #   #  #  ## 
// ###    ###   #   #  #   #  ####    ###   #   # 
    
    
    
    
    
  ["J1", {
    dual: "dJ1",
    vertices: [
      [0., 0., 0.707107],
      [0., -0.707107, 0.],
      [0., 0.707107, 0.],
      [-0.707107, 0., 0.],
      [0.707107, 0., 0.],
    ],
    vertexDegree: [4.,3.,3.,3.,3.]
  }],
  ["dJ1", {
    dual: "J1",
    vertices: [
      [-0.235702, 0.235702, 0.235702],
      [-0.235702, -0.235702, 0.235702],
      [0.235702, -0.235702, 0.235702],
      [0.235702, 0.235702, 0.235702],
      [0., 0., 0.],
    ],
    vertexDegree: [3.,3.,3.,3.,4.]
  }],
  ["J2", {
    dual: "dJ2",
    vertices: [
      [0., 0., 0.525731],
      [0.850651, 0., 0.],
      [0.262866, -0.809017, 0.],
      [0.262866, 0.809017, 0.],
      [-0.688191, -0.5, 0.],
      [-0.688191, 0.5, 0.],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.]
  }],
  ["dJ2", {
    dual: "J2",
    vertices: [
      [-0.141775, 0.436339, 0.175244],
      [-0.458794, 0., 0.175244],
      [-0.141775, -0.436339, 0.175244],
      [0.371172, -0.269672, 0.175244],
      [0.371172, 0.269672, 0.175244],
      [-2.22045e-17, 0., 0.],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,5.]
  }],
  ["J3", {
    dual: "dJ3",
    vertices: [
      [0., -1., 0.],
      [0., 1., 0.],
      [-0.288675, -0.5, 0.816497],
      [-0.288675, 0.5, 0.816497],
      [0.57735, 0., 0.816497],
      [-0.866025, -0.5, 0.],
      [-0.866025, 0.5, 0.],
      [0.866025, -0.5, 0.],
      [0.866025, 0.5, 0.],
    ],
    vertexDegree: [3.,3.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["dJ3", {
    dual: "J3",
    vertices: [
      [0., 0., 0.816497],
      [0., 0., 0.],
      [-0.57735, 0., 0.408248],
      [0.288675, -0.5, 0.408248],
      [0.288675, 0.5, 0.408248],
      [-0.3849, 0.666667, 0.272166],
      [-0.3849, -0.666667, 0.272166],
      [0.7698, 0., 0.272166],
    ],
    vertexDegree: [3.,6.,4.,4.,4.,3.,3.,3.]
  }],
  ["J4", {
    dual: "dJ4",
    vertices: [
      [0., -0.707107, 0.707107],
      [0., 0.707107, 0.707107],
      [-0.707107, 0., 0.707107],
      [0.707107, 0., 0.707107],
      [0.5, 1.20711, 0.],
      [-0.5, 1.20711, 0.],
      [-1.20711, 0.5, 0.],
      [-1.20711, -0.5, 0.],
      [-0.5, -1.20711, 0.],
      [0.5, -1.20711, 0.],
      [1.20711, -0.5, 0.],
      [1.20711, 0.5, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["dJ4", {
    dual: "J4",
    vertices: [
      [0., 0., 0.707107],
      [0., 0., 0.],
      [-0.603553, 0.603553, 0.353553],
      [-0.603553, -0.603553, 0.353553],
      [0.603553, -0.603553, 0.353553],
      [0.603553, 0.603553, 0.353553],
      [0., 1.04044, 0.235702],
      [-1.04044, 0., 0.235702],
      [0., -1.04044, 0.235702],
      [1.04044, 0., 0.235702],
    ],
    vertexDegree: [4.,8.,4.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["J5", {
    dual: "dJ5",
    vertices: [
      [0., -1.61803, 0.],
      [0., 1.61803, 0.],
      [0.850651, 0., 0.525731],
      [0.262866, -0.809017, 0.525731],
      [0.262866, 0.809017, 0.525731],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, 0.],
      [-0.688191, -0.5, 0.525731],
      [-0.688191, 0.5, 0.525731],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, 0.],
    ],
    vertexDegree: [3.,3.,4.,4.,4.,3.,3.,3.,3.,4.,4.,3.,3.,3.,3.]
  }],
  ["dJ5", {
    dual: "J5",
    vertices: [
      [-2.22045e-17, 0., 0.525731],
      [0., 0., 0.],
      [-0.344095, 1.05902, 0.262866],
      [-1.11352, 0., 0.262866],
      [-0.344095, -1.05902, 0.262866],
      [0.900854, -0.654508, 0.262866],
      [0.900854, 0.654508, 0.262866],
      [0.404641, 1.24536, 0.175244],
      [-1.05936, 0.769672, 0.175244],
      [-1.05936, -0.769672, 0.175244],
      [0.404641, -1.24536, 0.175244],
      [1.30944, 0., 0.175244],
    ],
    vertexDegree: [5.,10.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.]
  }],
  ["J6", {
    dual: "dJ6",
    vertices: [
      [0., -1.61803, 0.],
      [0., 1.61803, 0.],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, 0.],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, 0.],
      [1.37638, 0., 0.850651],
      [0.425325, -1.30902, 0.850651],
      [0.425325, 1.30902, 0.850651],
      [-1.11352, -0.809017, 0.850651],
      [-1.11352, 0.809017, 0.850651],
      [-0.850651, 0., 1.37638],
      [-0.262866, -0.809017, 1.37638],
      [-0.262866, 0.809017, 1.37638],
      [0.688191, -0.5, 1.37638],
      [0.688191, 0.5, 1.37638],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ6", {
    dual: "J6",
    vertices: [
      [2.22045e-17, 0., 1.37638],
      [-0.742344, 0.539345, 1.20114],
      [-0.742344, -0.539345, 1.20114],
      [0.28355, -0.872678, 1.20114],
      [0.917588, 0., 1.20114],
      [0.28355, 0.872678, 1.20114],
      [0.458794, 1.41202, 0.28355],
      [-1.20114, 0.872678, 0.28355],
      [-1.20114, -0.872678, 0.28355],
      [0.458794, -1.41202, 0.28355],
      [1.48469, 0., 0.28355],
      [-0.380423, 1.17082, 0.615537],
      [-1.23107, 0., 0.615537],
      [-0.380423, -1.17082, 0.615537],
      [0.995959, -0.723607, 0.615537],
      [0.995959, 0.723607, 0.615537],
      [0., 0., 0.],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,10.]
  }],
  ["J7", {
    dual: "dJ7",
    vertices: [
      [0., 0., 1.8165],
      [-0.288675, -0.5, 0.],
      [-0.288675, -0.5, 1.],
      [-0.288675, 0.5, 0.],
      [-0.288675, 0.5, 1.],
      [0.57735, 0., 0.],
      [0.57735, 0., 1.],
    ],
    vertexDegree: [3.,3.,4.,3.,4.,3.,4.]
  }],
  ["dJ7", {
    dual: "J7",
    vertices: [
      [-0.19245, 0., 1.27217],
      [0.096225, -0.166667, 1.27217],
      [0.096225, 0.166667, 1.27217],
      [-0.288675, 0., 0.5],
      [0.144338, -0.25, 0.5],
      [0.144338, 0.25, 0.5],
      [0., 0., 0.],
    ],
    vertexDegree: [3.,3.,3.,4.,4.,4.,3.]
  }],
  ["J8", {
    dual: "dJ8",
    vertices: [
      [0., 0., 1.70711],
      [0., -0.707107, 0.],
      [0., -0.707107, 1.],
      [0., 0.707107, 0.],
      [0., 0.707107, 1.],
      [-0.707107, 0., 0.],
      [-0.707107, 0., 1.],
      [0.707107, 0., 0.],
      [0.707107, 0., 1.],
    ],
    vertexDegree: [4.,3.,4.,3.,4.,3.,4.,3.,4.]
  }],
  ["dJ8", {
    dual: "J8",
    vertices: [
      [-0.235702, 0.235702, 1.2357],
      [-0.235702, -0.235702, 1.2357],
      [0.235702, -0.235702, 1.2357],
      [0.235702, 0.235702, 1.2357],
      [-0.353553, 0.353553, 0.5],
      [-0.353553, -0.353553, 0.5],
      [0.353553, -0.353553, 0.5],
      [0.353553, 0.353553, 0.5],
      [0., 0., 0.],
    ],
    vertexDegree: [3.,3.,3.,3.,4.,4.,4.,4.,4.]
  }],
  ["J9", {
    dual: "dJ9",
    vertices: [
      [0., 0., 1.52573],
      [0.850651, 0., 0.],
      [0.850651, 0., 1.],
      [0.262866, -0.809017, 0.],
      [0.262866, -0.809017, 1.],
      [0.262866, 0.809017, 0.],
      [0.262866, 0.809017, 1.],
      [-0.688191, -0.5, 0.],
      [-0.688191, -0.5, 1.],
      [-0.688191, 0.5, 0.],
      [-0.688191, 0.5, 1.],
    ],
    vertexDegree: [5.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.]
  }],
  ["dJ9", {
    dual: "J9",
    vertices: [
      [-0.141775, 0.436339, 1.17524],
      [-0.458794, 0., 1.17524],
      [-0.141775, -0.436339, 1.17524],
      [0.371172, -0.269672, 1.17524],
      [0.371172, 0.269672, 1.17524],
      [-0.212663, 0.654508, 0.5],
      [-0.688191, 0., 0.5],
      [-0.212663, -0.654508, 0.5],
      [0.556758, -0.404508, 0.5],
      [0.556758, 0.404508, 0.5],
      [-2.22045e-17, 0., 0.],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,5.]
  }],
  ["J10", {
    dual: "dJ10",
    vertices: [
      [-0.5, -0.5, -0.420448],
      [-0.5, 0.5, -0.420448],
      [0., 0., 1.12755],
      [0., -0.707107, 0.420448],
      [0., 0.707107, 0.420448],
      [0.5, -0.5, -0.420448],
      [0.5, 0.5, -0.420448],
      [-0.707107, 0., 0.420448],
      [0.707107, 0., 0.420448],
    ],
    vertexDegree: [4.,4.,4.,5.,5.,4.,4.,5.,5.]
  }],
  ["dJ10", {
    dual: "J10",
    vertices: [
      [0., 0., -0.420448],
      [0.402369, 0.402369, 0.140149],
      [-0.402369, 0.402369, 0.140149],
      [-0.402369, -0.402369, 0.140149],
      [0.402369, -0.402369, 0.140149],
      [0., 0.569036, -0.140149],
      [-0.569036, 0., -0.140149],
      [0., -0.569036, -0.140149],
      [0.569036, 0., -0.140149],
      [-0.235702, 0.235702, 0.65615],
      [-0.235702, -0.235702, 0.65615],
      [0.235702, -0.235702, 0.65615],
      [0.235702, 0.235702, 0.65615],
    ],
    vertexDegree: [4.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J11", {
    dual: "dJ11",
    vertices: [
      [0., 0., 0.951057],
      [-0.850651, 0., -0.425325],
      [0.850651, 0., 0.425325],
      [-0.262866, -0.809017, -0.425325],
      [-0.262866, 0.809017, -0.425325],
      [0.262866, -0.809017, 0.425325],
      [0.262866, 0.809017, 0.425325],
      [-0.688191, -0.5, 0.425325],
      [-0.688191, 0.5, 0.425325],
      [0.688191, -0.5, -0.425325],
      [0.688191, 0.5, -0.425325],
    ],
    vertexDegree: [5.,4.,5.,4.,4.,5.,5.,5.,5.,4.,4.]
  }],
  ["dJ11", {
    dual: "J11",
    vertices: [
      [2.22045e-17, 0., -0.425325],
      [0.600569, 0.436339, 0.141775],
      [-0.229397, 0.706011, 0.141775],
      [-0.742344, 0., 0.141775],
      [-0.229397, -0.706011, 0.141775],
      [0.600569, -0.436339, 0.141775],
      [0.229397, 0.706011, -0.141775],
      [-0.600569, 0.436339, -0.141775],
      [-0.600569, -0.436339, -0.141775],
      [0.229397, -0.706011, -0.141775],
      [0.742344, 0., -0.141775],
      [-0.141775, 0.436339, 0.600569],
      [-0.458794, 0., 0.600569],
      [-0.141775, -0.436339, 0.600569],
      [0.371172, -0.269672, 0.600569],
      [0.371172, 0.269672, 0.600569],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J12", {
    dual: "dJ12",
    vertices: [
      [0., 0., -0.816497],
      [0., 0., 0.816497],
      [-0.288675, -0.5, 0.],
      [-0.288675, 0.5, 0.],
      [0.57735, 0., 0.],
    ],
    vertexDegree: [3.,3.,4.,4.,4.]
  }],
  ["dJ12", {
    dual: "J12",
    vertices: [
      [-0.19245, 0., 0.272166],
      [0.096225, -0.166667, 0.272166],
      [0.096225, 0.166667, 0.272166],
      [-0.19245, 0., -0.272166],
      [0.096225, -0.166667, -0.272166],
      [0.096225, 0.166667, -0.272166],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.]
  }],
  ["J13", {
    dual: "dJ13",
    vertices: [
      [0., 0., -0.525731],
      [0., 0., 0.525731],
      [0.850651, 0., 0.],
      [0.262866, -0.809017, 0.],
      [0.262866, 0.809017, 0.],
      [-0.688191, -0.5, 0.],
      [-0.688191, 0.5, 0.],
    ],
    vertexDegree: [5.,5.,4.,4.,4.,4.,4.]
  }],
  ["dJ13", {
    dual: "J13",
    vertices: [
      [-0.141775, 0.436339, 0.175244],
      [-0.458794, 0., 0.175244],
      [-0.141775, -0.436339, 0.175244],
      [0.371172, -0.269672, 0.175244],
      [0.371172, 0.269672, 0.175244],
      [-0.141775, 0.436339, -0.175244],
      [-0.458794, 0., -0.175244],
      [-0.141775, -0.436339, -0.175244],
      [0.371172, -0.269672, -0.175244],
      [0.371172, 0.269672, -0.175244],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J14", {
    dual: "dJ14",
    vertices: [
      [0., 0., -1.3165],
      [0., 0., 1.3165],
      [-0.288675, -0.5, -0.5],
      [-0.288675, -0.5, 0.5],
      [-0.288675, 0.5, -0.5],
      [-0.288675, 0.5, 0.5],
      [0.57735, 0., -0.5],
      [0.57735, 0., 0.5],
    ],
    vertexDegree: [3.,3.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ14", {
    dual: "J14",
    vertices: [
      [-0.19245, 0., 0.772166],
      [0.096225, -0.166667, 0.772166],
      [0.096225, 0.166667, 0.772166],
      [-0.19245, 0., -0.772166],
      [0.096225, -0.166667, -0.772166],
      [0.096225, 0.166667, -0.772166],
      [-0.288675, 0., 0.],
      [0.144338, -0.25, 0.],
      [0.144338, 0.25, 0.],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,4.,4.,4.]
  }],
  ["J15", {
    dual: "dJ15",
    vertices: [
      [0., 0., -1.20711],
      [0., 0., 1.20711],
      [0., -0.707107, -0.5],
      [0., -0.707107, 0.5],
      [0., 0.707107, -0.5],
      [0., 0.707107, 0.5],
      [-0.707107, 0., -0.5],
      [-0.707107, 0., 0.5],
      [0.707107, 0., -0.5],
      [0.707107, 0., 0.5],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ15", {
    dual: "J15",
    vertices: [
      [-0.235702, 0.235702, 0.735702],
      [-0.235702, -0.235702, 0.735702],
      [0.235702, -0.235702, 0.735702],
      [0.235702, 0.235702, 0.735702],
      [-0.235702, 0.235702, -0.735702],
      [-0.235702, -0.235702, -0.735702],
      [0.235702, -0.235702, -0.735702],
      [0.235702, 0.235702, -0.735702],
      [-0.353553, 0.353553, 0.],
      [-0.353553, -0.353553, 0.],
      [0.353553, -0.353553, 0.],
      [0.353553, 0.353553, 0.],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.]
  }],
  ["J16", {
    dual: "dJ16",
    vertices: [
      [0., 0., -1.02573],
      [0., 0., 1.02573],
      [0.850651, 0., -0.5],
      [0.850651, 0., 0.5],
      [0.262866, -0.809017, -0.5],
      [0.262866, -0.809017, 0.5],
      [0.262866, 0.809017, -0.5],
      [0.262866, 0.809017, 0.5],
      [-0.688191, -0.5, -0.5],
      [-0.688191, -0.5, 0.5],
      [-0.688191, 0.5, -0.5],
      [-0.688191, 0.5, 0.5],
    ],
    vertexDegree: [5.,5.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ16", {
    dual: "J16",
    vertices: [
      [-0.141775, 0.436339, 0.675244],
      [-0.458794, 0., 0.675244],
      [-0.141775, -0.436339, 0.675244],
      [0.371172, -0.269672, 0.675244],
      [0.371172, 0.269672, 0.675244],
      [-0.141775, 0.436339, -0.675244],
      [-0.458794, 0., -0.675244],
      [-0.141775, -0.436339, -0.675244],
      [0.371172, -0.269672, -0.675244],
      [0.371172, 0.269672, -0.675244],
      [-0.212663, 0.654508, 0.],
      [-0.688191, 0., 0.],
      [-0.212663, -0.654508, 0.],
      [0.556758, -0.404508, 0.],
      [0.556758, 0.404508, 0.],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.]
  }],
  ["J17", {
    dual: "dJ17",
    vertices: [
      [-0.5, -0.5, -0.420448],
      [-0.5, 0.5, -0.420448],
      [0., 0., -1.12755],
      [0., 0., 1.12755],
      [0., -0.707107, 0.420448],
      [0., 0.707107, 0.420448],
      [0.5, -0.5, -0.420448],
      [0.5, 0.5, -0.420448],
      [-0.707107, 0., 0.420448],
      [0.707107, 0., 0.420448],
    ],
    vertexDegree: [5.,5.,4.,4.,5.,5.,5.,5.,5.,5.]
  }],
  ["dJ17", {
    dual: "J17",
    vertices: [
      [0.402369, 0.402369, 0.140149],
      [-0.402369, 0.402369, 0.140149],
      [-0.402369, -0.402369, 0.140149],
      [0.402369, -0.402369, 0.140149],
      [0., 0.569036, -0.140149],
      [-0.569036, 0., -0.140149],
      [0., -0.569036, -0.140149],
      [0.569036, 0., -0.140149],
      [-0.235702, 0.235702, 0.65615],
      [-0.235702, -0.235702, 0.65615],
      [0.235702, -0.235702, 0.65615],
      [0.235702, 0.235702, 0.65615],
      [0., 0.333333, -0.65615],
      [-0.333333, 0., -0.65615],
      [0., -0.333333, -0.65615],
      [0.333333, 0., -0.65615],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J18", {
    dual: "dJ18",
    vertices: [
      [0., -1., -1.],
      [0., -1., 0.],
      [0., 1., -1.],
      [0., 1., 0.],
      [-0.288675, -0.5, 0.816497],
      [-0.288675, 0.5, 0.816497],
      [0.57735, 0., 0.816497],
      [-0.866025, -0.5, -1.],
      [-0.866025, -0.5, 0.],
      [-0.866025, 0.5, -1.],
      [-0.866025, 0.5, 0.],
      [0.866025, -0.5, -1.],
      [0.866025, -0.5, 0.],
      [0.866025, 0.5, -1.],
      [0.866025, 0.5, 0.],
    ],
    vertexDegree: [3.,4.,3.,4.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.]
  }],
  ["dJ18", {
    dual: "J18",
    vertices: [
      [-0.57735, 0., 0.408248],
      [0.288675, -0.5, 0.408248],
      [0.288675, 0.5, 0.408248],
      [-0.3849, 0.666667, 0.272166],
      [-0.3849, -0.666667, 0.272166],
      [0.7698, 0., 0.272166],
      [0., 0., 0.816497],
      [0., 0., -1.],
      [-0.433013, 0.75, -0.5],
      [-0.866025, 0., -0.5],
      [-0.433013, -0.75, -0.5],
      [0.433013, -0.75, -0.5],
      [0.866025, 0., -0.5],
      [0.433013, 0.75, -0.5],
    ],
    vertexDegree: [4.,4.,4.,3.,3.,3.,3.,6.,4.,4.,4.,4.,4.,4.]
  }],
  ["J19", {
    dual: "dJ19",
    vertices: [
      [0., -0.707107, 0.707107],
      [0., 0.707107, 0.707107],
      [-0.707107, 0., 0.707107],
      [0.707107, 0., 0.707107],
      [0.5, 1.20711, -1.],
      [0.5, 1.20711, 0.],
      [-0.5, 1.20711, -1.],
      [-0.5, 1.20711, 0.],
      [-1.20711, 0.5, -1.],
      [-1.20711, 0.5, 0.],
      [-1.20711, -0.5, -1.],
      [-1.20711, -0.5, 0.],
      [-0.5, -1.20711, -1.],
      [-0.5, -1.20711, 0.],
      [0.5, -1.20711, -1.],
      [0.5, -1.20711, 0.],
      [1.20711, -0.5, -1.],
      [1.20711, -0.5, 0.],
      [1.20711, 0.5, -1.],
      [1.20711, 0.5, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.]
  }],
  ["dJ19", {
    dual: "J19",
    vertices: [
      [-0.603553, 0.603553, 0.353553],
      [-0.603553, -0.603553, 0.353553],
      [0.603553, -0.603553, 0.353553],
      [0.603553, 0.603553, 0.353553],
      [0., 1.04044, 0.235702],
      [-1.04044, 0., 0.235702],
      [0., -1.04044, 0.235702],
      [1.04044, 0., 0.235702],
      [0., 0., 0.707107],
      [0., 0., -1.],
      [0., 1.20711, -0.5],
      [-0.853553, 0.853553, -0.5],
      [-1.20711, 0., -0.5],
      [-0.853553, -0.853553, -0.5],
      [0., -1.20711, -0.5],
      [0.853553, -0.853553, -0.5],
      [1.20711, 0., -0.5],
      [0.853553, 0.853553, -0.5],
    ],
    vertexDegree: [4.,4.,4.,4.,3.,3.,3.,3.,4.,8.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["J20", {
    dual: "dJ20",
    vertices: [
      [0., -1.61803, -1.],
      [0., -1.61803, 0.],
      [0., 1.61803, -1.],
      [0., 1.61803, 0.],
      [0.850651, 0., 0.525731],
      [0.262866, -0.809017, 0.525731],
      [0.262866, 0.809017, 0.525731],
      [-0.951057, -1.30902, -1.],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, -1.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, -1.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, -1.],
      [0.951057, 1.30902, 0.],
      [-0.688191, -0.5, 0.525731],
      [-0.688191, 0.5, 0.525731],
      [-1.53884, -0.5, -1.],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, -1.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, -1.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, -1.],
      [1.53884, 0.5, 0.],
    ],
    vertexDegree: [3.,4.,3.,4.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.]
  }],
  ["dJ20", {
    dual: "J20",
    vertices: [
      [-0.344095, 1.05902, 0.262866],
      [-1.11352, 0., 0.262866],
      [-0.344095, -1.05902, 0.262866],
      [0.900854, -0.654508, 0.262866],
      [0.900854, 0.654508, 0.262866],
      [0.404641, 1.24536, 0.175244],
      [-1.05936, 0.769672, 0.175244],
      [-1.05936, -0.769672, 0.175244],
      [0.404641, -1.24536, 0.175244],
      [1.30944, 0., 0.175244],
      [-2.22045e-17, 0., 0.525731],
      [0., 0., -1.],
      [0.475528, 1.46353, -0.5],
      [-0.475528, 1.46353, -0.5],
      [-1.24495, 0.904508, -0.5],
      [-1.53884, 0., -0.5],
      [-1.24495, -0.904508, -0.5],
      [-0.475528, -1.46353, -0.5],
      [0.475528, -1.46353, -0.5],
      [1.24495, -0.904508, -0.5],
      [1.53884, 0., -0.5],
      [1.24495, 0.904508, -0.5],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,5.,10.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["J21", {
    dual: "dJ21",
    vertices: [
      [0., -1.61803, -1.],
      [0., -1.61803, 0.],
      [0., 1.61803, -1.],
      [0., 1.61803, 0.],
      [-0.951057, -1.30902, -1.],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, -1.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, -1.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, -1.],
      [0.951057, 1.30902, 0.],
      [-1.53884, -0.5, -1.],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, -1.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, -1.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, -1.],
      [1.53884, 0.5, 0.],
      [1.37638, 0., 0.850651],
      [0.425325, -1.30902, 0.850651],
      [0.425325, 1.30902, 0.850651],
      [-1.11352, -0.809017, 0.850651],
      [-1.11352, 0.809017, 0.850651],
      [-0.850651, 0., 1.37638],
      [-0.262866, -0.809017, 1.37638],
      [-0.262866, 0.809017, 1.37638],
      [0.688191, -0.5, 1.37638],
      [0.688191, 0.5, 1.37638],
    ],
    vertexDegree: [3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ21", {
    dual: "J21",
    vertices: [
      [2.22045e-17, 0., 1.37638],
      [-0.742344, 0.539345, 1.20114],
      [-0.742344, -0.539345, 1.20114],
      [0.28355, -0.872678, 1.20114],
      [0.917588, 0., 1.20114],
      [0.28355, 0.872678, 1.20114],
      [0.458794, 1.41202, 0.28355],
      [-1.20114, 0.872678, 0.28355],
      [-1.20114, -0.872678, 0.28355],
      [0.458794, -1.41202, 0.28355],
      [1.48469, 0., 0.28355],
      [-0.380423, 1.17082, 0.615537],
      [-1.23107, 0., 0.615537],
      [-0.380423, -1.17082, 0.615537],
      [0.995959, -0.723607, 0.615537],
      [0.995959, 0.723607, 0.615537],
      [0., 0., -1.],
      [0.475528, 1.46353, -0.5],
      [-0.475528, 1.46353, -0.5],
      [-1.24495, 0.904508, -0.5],
      [-1.53884, 0., -0.5],
      [-1.24495, -0.904508, -0.5],
      [-0.475528, -1.46353, -0.5],
      [0.475528, -1.46353, -0.5],
      [1.24495, -0.904508, -0.5],
      [1.53884, 0., -0.5],
      [1.24495, 0.904508, -0.5],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,10.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["J22", {
    dual: "dJ22",
    vertices: [
      [-1., 0., -0.8556],
      [-0.5, -0.866025, -0.8556],
      [-0.5, 0.866025, -0.8556],
      [0., -1., 0.],
      [0., 1., 0.],
      [0.5, -0.866025, -0.8556],
      [0.5, 0.866025, -0.8556],
      [1., 0., -0.8556],
      [-0.288675, -0.5, 0.816497],
      [-0.288675, 0.5, 0.816497],
      [0.57735, 0., 0.816497],
      [-0.866025, -0.5, 0.],
      [-0.866025, 0.5, 0.],
      [0.866025, -0.5, 0.],
      [0.866025, 0.5, 0.],
    ],
    vertexDegree: [4.,4.,4.,5.,5.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.]
  }],
  ["dJ22", {
    dual: "J22",
    vertices: [
      [0., 0., -0.8556],
      [-0.788675, -0.455342, -0.5704],
      [0., -0.910684, -0.5704],
      [0.788675, -0.455342, -0.5704],
      [0.788675, 0.455342, -0.5704],
      [0., 0.910684, -0.5704],
      [-0.788675, 0.455342, -0.5704],
      [-0.455342, -0.788675, -0.2852],
      [0.455342, -0.788675, -0.2852],
      [0.910684, 0., -0.2852],
      [0.455342, 0.788675, -0.2852],
      [-0.455342, 0.788675, -0.2852],
      [-0.910684, 0., -0.2852],
      [0., 0., 0.816497],
      [-0.57735, 0., 0.408248],
      [0.288675, -0.5, 0.408248],
      [0.288675, 0.5, 0.408248],
      [-0.3849, 0.666667, 0.272166],
      [-0.3849, -0.666667, 0.272166],
      [0.7698, 0., 0.272166],
    ],
    vertexDegree: [6.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,3.,3.,3.]
  }],
  ["J23", {
    dual: "dJ23",
    vertices: [
      [0., -0.707107, 0.707107],
      [0., 0.707107, 0.707107],
      [0., -1.30656, -0.860296],
      [0., 1.30656, -0.860296],
      [-0.707107, 0., 0.707107],
      [0.707107, 0., 0.707107],
      [-1.20711, -0.5, 0.],
      [-1.30656, 0., -0.860296],
      [1.30656, 0., -0.860296],
      [-0.92388, -0.92388, -0.860296],
      [-0.92388, 0.92388, -0.860296],
      [0.92388, -0.92388, -0.860296],
      [0.92388, 0.92388, -0.860296],
      [-0.5, -1.20711, 0.],
      [0.5, 1.20711, 0.],
      [0.5, -1.20711, 0.],
      [-0.5, 1.20711, 0.],
      [1.20711, -0.5, 0.],
      [-1.20711, 0.5, 0.],
      [1.20711, 0.5, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,5.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.]
  }],
  ["dJ23", {
    dual: "J23",
    vertices: [
      [2.77556e-17, 2.77556e-17, -0.860296],
      [-1.14585, -0.474627, -0.57353],
      [-0.474627, -1.14585, -0.57353],
      [0.474627, -1.14585, -0.57353],
      [1.14585, -0.474627, -0.57353],
      [1.14585, 0.474627, -0.57353],
      [0.474627, 1.14585, -0.57353],
      [-0.474627, 1.14585, -0.57353],
      [-1.14585, 0.474627, -0.57353],
      [-0.876995, -0.876995, -0.286765],
      [0., -1.24026, -0.286765],
      [0.876995, -0.876995, -0.286765],
      [1.24026, 0., -0.286765],
      [0.876995, 0.876995, -0.286765],
      [0., 1.24026, -0.286765],
      [-0.876995, 0.876995, -0.286765],
      [-1.24026, 0., -0.286765],
      [0., 0., 0.707107],
      [-0.603553, 0.603553, 0.353553],
      [-0.603553, -0.603553, 0.353553],
      [0.603553, -0.603553, 0.353553],
      [0.603553, 0.603553, 0.353553],
      [0., 1.04044, 0.235702],
      [-1.04044, 0., 0.235702],
      [0., -1.04044, 0.235702],
      [1.04044, 0., 0.235702],
    ],
    vertexDegree: [8.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["J24", {
    dual: "dJ24",
    vertices: [
      [0., -1.61803, 0.],
      [0., 1.61803, 0.],
      [-1.61803, 0., -0.862397],
      [0.850651, 0., 0.525731],
      [0.262866, -0.809017, 0.525731],
      [0.262866, 0.809017, 0.525731],
      [1.61803, 0., -0.862397],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, 0.],
      [-0.688191, -0.5, 0.525731],
      [-0.688191, 0.5, 0.525731],
      [-0.5, -1.53884, -0.862397],
      [-0.5, 1.53884, -0.862397],
      [0.5, -1.53884, -0.862397],
      [0.5, 1.53884, -0.862397],
      [-1.30902, -0.951057, -0.862397],
      [-1.30902, 0.951057, -0.862397],
      [1.30902, -0.951057, -0.862397],
      [1.30902, 0.951057, -0.862397],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, 0.],
    ],
    vertexDegree: [5.,5.,4.,4.,4.,4.,4.,5.,5.,5.,5.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.]
  }],
  ["dJ24", {
    dual: "J24",
    vertices: [
      [0., 4.44089e-17, -0.862397],
      [-1.48863, -0.483686, -0.574931],
      [-0.920025, -1.26631, -0.574931],
      [0., -1.56524, -0.574931],
      [0.920025, -1.26631, -0.574931],
      [1.48863, -0.483686, -0.574931],
      [1.48863, 0.483686, -0.574931],
      [0.920025, 1.26631, -0.574931],
      [0., 1.56524, -0.574931],
      [-0.920025, 1.26631, -0.574931],
      [-1.48863, 0.483686, -0.574931],
      [-1.26631, -0.920025, -0.287466],
      [-0.483686, -1.48863, -0.287466],
      [0.483686, -1.48863, -0.287466],
      [1.26631, -0.920025, -0.287466],
      [1.56524, 0., -0.287466],
      [1.26631, 0.920025, -0.287466],
      [0.483686, 1.48863, -0.287466],
      [-0.483686, 1.48863, -0.287466],
      [-1.26631, 0.920025, -0.287466],
      [-1.56524, 0., -0.287466],
      [-2.22045e-17, 0., 0.525731],
      [-0.344095, 1.05902, 0.262866],
      [-1.11352, 0., 0.262866],
      [-0.344095, -1.05902, 0.262866],
      [0.900854, -0.654508, 0.262866],
      [0.900854, 0.654508, 0.262866],
      [0.404641, 1.24536, 0.175244],
      [-1.05936, 0.769672, 0.175244],
      [-1.05936, -0.769672, 0.175244],
      [0.404641, -1.24536, 0.175244],
      [1.30944, 0., 0.175244],
    ],
    vertexDegree: [10.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.]
  }],
  ["J25", {
    dual: "dJ25",
    vertices: [
      [0., -1.61803, 0.],
      [0., 1.61803, 0.],
      [-1.61803, 0., -0.862397],
      [1.61803, 0., -0.862397],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, 0.],
      [-0.5, -1.53884, -0.862397],
      [-0.5, 1.53884, -0.862397],
      [0.5, -1.53884, -0.862397],
      [0.5, 1.53884, -0.862397],
      [-1.30902, -0.951057, -0.862397],
      [-1.30902, 0.951057, -0.862397],
      [1.30902, -0.951057, -0.862397],
      [1.30902, 0.951057, -0.862397],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, 0.],
      [1.37638, 0., 0.850651],
      [0.425325, -1.30902, 0.850651],
      [0.425325, 1.30902, 0.850651],
      [-1.11352, -0.809017, 0.850651],
      [-1.11352, 0.809017, 0.850651],
      [-0.850651, 0., 1.37638],
      [-0.262866, -0.809017, 1.37638],
      [-0.262866, 0.809017, 1.37638],
      [0.688191, -0.5, 1.37638],
      [0.688191, 0.5, 1.37638],
    ],
    vertexDegree: [5.,5.,4.,4.,5.,5.,5.,5.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ25", {
    dual: "J25",
    vertices: [
      [0., 4.44089e-17, -0.862397],
      [-1.48863, -0.483686, -0.574931],
      [-0.920025, -1.26631, -0.574931],
      [0., -1.56524, -0.574931],
      [0.920025, -1.26631, -0.574931],
      [1.48863, -0.483686, -0.574931],
      [1.48863, 0.483686, -0.574931],
      [0.920025, 1.26631, -0.574931],
      [0., 1.56524, -0.574931],
      [-0.920025, 1.26631, -0.574931],
      [-1.48863, 0.483686, -0.574931],
      [-1.26631, -0.920025, -0.287466],
      [-0.483686, -1.48863, -0.287466],
      [0.483686, -1.48863, -0.287466],
      [1.26631, -0.920025, -0.287466],
      [1.56524, 0., -0.287466],
      [1.26631, 0.920025, -0.287466],
      [0.483686, 1.48863, -0.287466],
      [-0.483686, 1.48863, -0.287466],
      [-1.26631, 0.920025, -0.287466],
      [-1.56524, 0., -0.287466],
      [0., 0., 1.37638],
      [-0.742344, 0.539345, 1.20114],
      [-0.742344, -0.539345, 1.20114],
      [0.28355, -0.872678, 1.20114],
      [0.917588, 0., 1.20114],
      [0.28355, 0.872678, 1.20114],
      [0.458794, 1.41202, 0.28355],
      [-1.20114, 0.872678, 0.28355],
      [-1.20114, -0.872678, 0.28355],
      [0.458794, -1.41202, 0.28355],
      [1.48469, 0., 0.28355],
      [-0.380423, 1.17082, 0.615537],
      [-1.23107, 0., 0.615537],
      [-0.380423, -1.17082, 0.615537],
      [0.995959, -0.723607, 0.615537],
      [0.995959, 0.723607, 0.615537],
    ],
    vertexDegree: [10.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.]
  }],
  ["J26", {
    dual: "dJ26",
    vertices: [
      [-0.5, -0.5, 0.],
      [-0.5, 0., 0.866025],
      [-0.5, 0.5, 0.],
      [0., -0.5, -0.866025],
      [0., 0.5, -0.866025],
      [0.5, -0.5, 0.],
      [0.5, 0., 0.866025],
      [0.5, 0.5, 0.],
    ],
    vertexDegree: [4.,3.,4.,3.,3.,4.,3.,4.]
  }],
  ["dJ26", {
    dual: "J26",
    vertices: [
      [0.5, 0., 0.288675],
      [-0.5, 0., 0.288675],
      [0., -0.25, 0.433013],
      [0., 0.25, 0.433013],
      [0., -0.5, -0.288675],
      [0., 0.5, -0.288675],
      [-0.25, 0., -0.433013],
      [0.25, 0., -0.433013],
    ],
    vertexDegree: [3.,3.,4.,4.,3.,3.,4.,4.]
  }],
  ["J27", {
    dual: "dJ27",
    vertices: [
      [0., -1., 0.],
      [0., 1., 0.],
      [-0.288675, -0.5, -0.816497],
      [-0.288675, -0.5, 0.816497],
      [-0.288675, 0.5, -0.816497],
      [-0.288675, 0.5, 0.816497],
      [0.57735, 0., -0.816497],
      [0.57735, 0., 0.816497],
      [-0.866025, -0.5, 0.],
      [-0.866025, 0.5, 0.],
      [0.866025, -0.5, 0.],
      [0.866025, 0.5, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ27", {
    dual: "J27",
    vertices: [
      [0., 0., 0.816497],
      [-0.57735, 0., 0.408248],
      [0.288675, -0.5, 0.408248],
      [0.288675, 0.5, 0.408248],
      [-0.3849, 0.666667, 0.272166],
      [-0.3849, -0.666667, 0.272166],
      [0.7698, 0., 0.272166],
      [0., 0., -0.816497],
      [-0.57735, 0., -0.408248],
      [0.288675, -0.5, -0.408248],
      [0.288675, 0.5, -0.408248],
      [-0.3849, 0.666667, -0.272166],
      [-0.3849, -0.666667, -0.272166],
      [0.7698, 0., -0.272166],
    ],
    vertexDegree: [3.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,3.,3.,3.]
  }],
  ["J28", {
    dual: "dJ28",
    vertices: [
      [0., -0.707107, -0.707107],
      [0., -0.707107, 0.707107],
      [0., 0.707107, -0.707107],
      [0., 0.707107, 0.707107],
      [-0.707107, 0., -0.707107],
      [-0.707107, 0., 0.707107],
      [0.707107, 0., -0.707107],
      [0.707107, 0., 0.707107],
      [0.5, 1.20711, 0.],
      [-0.5, 1.20711, 0.],
      [-1.20711, 0.5, 0.],
      [-1.20711, -0.5, 0.],
      [-0.5, -1.20711, 0.],
      [0.5, -1.20711, 0.],
      [1.20711, -0.5, 0.],
      [1.20711, 0.5, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ28", {
    dual: "J28",
    vertices: [
      [0., 0., 0.707107],
      [-0.603553, 0.603553, 0.353553],
      [-0.603553, -0.603553, 0.353553],
      [0.603553, -0.603553, 0.353553],
      [0.603553, 0.603553, 0.353553],
      [0., 1.04044, 0.235702],
      [-1.04044, 0., 0.235702],
      [0., -1.04044, 0.235702],
      [1.04044, 0., 0.235702],
      [0., 0., -0.707107],
      [-0.603553, 0.603553, -0.353553],
      [-0.603553, -0.603553, -0.353553],
      [0.603553, -0.603553, -0.353553],
      [0.603553, 0.603553, -0.353553],
      [0., 1.04044, -0.235702],
      [-1.04044, 0., -0.235702],
      [0., -1.04044, -0.235702],
      [1.04044, 0., -0.235702],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["J29", {
    dual: "dJ29",
    vertices: [
      [-0.5, -0.5, -0.707107],
      [-0.5, 0.5, -0.707107],
      [0., -0.707107, 0.707107],
      [0., 0.707107, 0.707107],
      [0.5, -0.5, -0.707107],
      [0.5, 0.5, -0.707107],
      [-0.707107, 0., 0.707107],
      [0.707107, 0., 0.707107],
      [0.5, 1.20711, 0.],
      [-0.5, 1.20711, 0.],
      [-1.20711, 0.5, 0.],
      [-1.20711, -0.5, 0.],
      [-0.5, -1.20711, 0.],
      [0.5, -1.20711, 0.],
      [1.20711, -0.5, 0.],
      [1.20711, 0.5, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ29", {
    dual: "J29",
    vertices: [
      [0., 0., 0.707107],
      [-0.603553, 0.603553, 0.353553],
      [-0.603553, -0.603553, 0.353553],
      [0.603553, -0.603553, 0.353553],
      [0.603553, 0.603553, 0.353553],
      [0., 1.04044, 0.235702],
      [-1.04044, 0., 0.235702],
      [0., -1.04044, 0.235702],
      [1.04044, 0., 0.235702],
      [0., 0., -0.707107],
      [0., 0.853553, -0.353553],
      [-0.853553, 0., -0.353553],
      [0., -0.853553, -0.353553],
      [0.853553, 0., -0.353553],
      [0.735702, 0.735702, -0.235702],
      [-0.735702, 0.735702, -0.235702],
      [-0.735702, -0.735702, -0.235702],
      [0.735702, -0.735702, -0.235702],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["J30", {
    dual: "dJ30",
    vertices: [
      [0., -1.61803, 0.],
      [0., 1.61803, 0.],
      [0.850651, 0., -0.525731],
      [0.850651, 0., 0.525731],
      [0.262866, -0.809017, -0.525731],
      [0.262866, -0.809017, 0.525731],
      [0.262866, 0.809017, -0.525731],
      [0.262866, 0.809017, 0.525731],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, 0.],
      [-0.688191, -0.5, -0.525731],
      [-0.688191, -0.5, 0.525731],
      [-0.688191, 0.5, -0.525731],
      [-0.688191, 0.5, 0.525731],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ30", {
    dual: "J30",
    vertices: [
      [-2.22045e-17, 0., 0.525731],
      [-0.344095, 1.05902, 0.262866],
      [-1.11352, 0., 0.262866],
      [-0.344095, -1.05902, 0.262866],
      [0.900854, -0.654508, 0.262866],
      [0.900854, 0.654508, 0.262866],
      [0.404641, 1.24536, 0.175244],
      [-1.05936, 0.769672, 0.175244],
      [-1.05936, -0.769672, 0.175244],
      [0.404641, -1.24536, 0.175244],
      [1.30944, 0., 0.175244],
      [-2.22045e-17, 0., -0.525731],
      [-0.344095, 1.05902, -0.262866],
      [-1.11352, 0., -0.262866],
      [-0.344095, -1.05902, -0.262866],
      [0.900854, -0.654508, -0.262866],
      [0.900854, 0.654508, -0.262866],
      [0.404641, 1.24536, -0.175244],
      [-1.05936, 0.769672, -0.175244],
      [-1.05936, -0.769672, -0.175244],
      [0.404641, -1.24536, -0.175244],
      [1.30944, 0., -0.175244],
    ],
    vertexDegree: [5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.]
  }],
  ["J31", {
    dual: "dJ31",
    vertices: [
      [0., -1.61803, 0.],
      [0., 1.61803, 0.],
      [-0.688191, -0.5, 0.525731],
      [-0.688191, 0.5, 0.525731],
      [0.688191, -0.5, -0.525731],
      [0.688191, 0.5, -0.525731],
      [-0.850651, 0., -0.525731],
      [0.850651, 0., 0.525731],
      [-0.262866, -0.809017, -0.525731],
      [-0.262866, 0.809017, -0.525731],
      [0.262866, -0.809017, 0.525731],
      [0.262866, 0.809017, 0.525731],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, 0.],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ31", {
    dual: "J31",
    vertices: [
      [-2.22045e-17, 0., 0.525731],
      [-0.344095, 1.05902, 0.262866],
      [-1.11352, 0., 0.262866],
      [-0.344095, -1.05902, 0.262866],
      [0.900854, -0.654508, 0.262866],
      [0.900854, 0.654508, 0.262866],
      [0.404641, 1.24536, 0.175244],
      [-1.05936, 0.769672, 0.175244],
      [-1.05936, -0.769672, 0.175244],
      [0.404641, -1.24536, 0.175244],
      [1.30944, 0., 0.175244],
      [2.22045e-17, 0., -0.525731],
      [0.344095, 1.05902, -0.262866],
      [-0.900854, 0.654508, -0.262866],
      [-0.900854, -0.654508, -0.262866],
      [0.344095, -1.05902, -0.262866],
      [1.11352, 0., -0.262866],
      [1.05936, 0.769672, -0.175244],
      [-0.404641, 1.24536, -0.175244],
      [-1.30944, 0., -0.175244],
      [-0.404641, -1.24536, -0.175244],
      [1.05936, -0.769672, -0.175244],
    ],
    vertexDegree: [5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.]
  }],
  ["J32", {
    dual: "dJ32",
    vertices: [
      [0., -1.61803, 0.],
      [0., 1.61803, 0.],
      [0.425325, -1.30902, 0.850651],
      [0.425325, 1.30902, 0.850651],
      [0.688191, -0.5, -0.525731],
      [0.688191, -0.5, 1.37638],
      [0.688191, 0.5, -0.525731],
      [0.688191, 0.5, 1.37638],
      [-0.850651, 0., -0.525731],
      [-0.850651, 0., 1.37638],
      [-1.11352, -0.809017, 0.850651],
      [-1.11352, 0.809017, 0.850651],
      [-0.262866, -0.809017, -0.525731],
      [-0.262866, -0.809017, 1.37638],
      [-0.262866, 0.809017, -0.525731],
      [-0.262866, 0.809017, 1.37638],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, 0.],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, 0.],
      [1.37638, 0., 0.850651],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ32", {
    dual: "J32",
    vertices: [
      [2.22045e-17, 0., 1.37638],
      [-0.742344, 0.539345, 1.20114],
      [-0.742344, -0.539345, 1.20114],
      [0.28355, -0.872678, 1.20114],
      [0.917588, 0., 1.20114],
      [0.28355, 0.872678, 1.20114],
      [0.458794, 1.41202, 0.28355],
      [-1.20114, 0.872678, 0.28355],
      [-1.20114, -0.872678, 0.28355],
      [0.458794, -1.41202, 0.28355],
      [1.48469, 0., 0.28355],
      [-0.380423, 1.17082, 0.615537],
      [-1.23107, 0., 0.615537],
      [-0.380423, -1.17082, 0.615537],
      [0.995959, -0.723607, 0.615537],
      [0.995959, 0.723607, 0.615537],
      [2.22045e-17, 0., -0.525731],
      [0.344095, 1.05902, -0.262866],
      [-0.900854, 0.654508, -0.262866],
      [-0.900854, -0.654508, -0.262866],
      [0.344095, -1.05902, -0.262866],
      [1.11352, 0., -0.262866],
      [1.05936, 0.769672, -0.175244],
      [-0.404641, 1.24536, -0.175244],
      [-1.30944, 0., -0.175244],
      [-0.404641, -1.24536, -0.175244],
      [1.05936, -0.769672, -0.175244],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.]
  }],
  ["J33", {
    dual: "dJ33",
    vertices: [
      [0., -1.61803, 0.],
      [0., 1.61803, 0.],
      [0.850651, 0., -0.525731],
      [0.262866, -0.809017, -0.525731],
      [0.262866, 0.809017, -0.525731],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, 0.],
      [-0.688191, -0.5, -0.525731],
      [-0.688191, 0.5, -0.525731],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, 0.],
      [1.37638, 0., 0.850651],
      [0.425325, -1.30902, 0.850651],
      [0.425325, 1.30902, 0.850651],
      [-1.11352, -0.809017, 0.850651],
      [-1.11352, 0.809017, 0.850651],
      [-0.850651, 0., 1.37638],
      [-0.262866, -0.809017, 1.37638],
      [-0.262866, 0.809017, 1.37638],
      [0.688191, -0.5, 1.37638],
      [0.688191, 0.5, 1.37638],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ33", {
    dual: "J33",
    vertices: [
      [2.22045e-17, 0., 1.37638],
      [-0.742344, 0.539345, 1.20114],
      [-0.742344, -0.539345, 1.20114],
      [0.28355, -0.872678, 1.20114],
      [0.917588, 0., 1.20114],
      [0.28355, 0.872678, 1.20114],
      [0.458794, 1.41202, 0.28355],
      [-1.20114, 0.872678, 0.28355],
      [-1.20114, -0.872678, 0.28355],
      [0.458794, -1.41202, 0.28355],
      [1.48469, 0., 0.28355],
      [-0.380423, 1.17082, 0.615537],
      [-1.23107, 0., 0.615537],
      [-0.380423, -1.17082, 0.615537],
      [0.995959, -0.723607, 0.615537],
      [0.995959, 0.723607, 0.615537],
      [-2.22045e-17, 0., -0.525731],
      [-0.344095, 1.05902, -0.262866],
      [-1.11352, 0., -0.262866],
      [-0.344095, -1.05902, -0.262866],
      [0.900854, -0.654508, -0.262866],
      [0.900854, 0.654508, -0.262866],
      [0.404641, 1.24536, -0.175244],
      [-1.05936, 0.769672, -0.175244],
      [-1.05936, -0.769672, -0.175244],
      [0.404641, -1.24536, -0.175244],
      [1.30944, 0., -0.175244],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.]
  }],
  ["J34", {
    dual: "dJ34",
    vertices: [
      [0., -1.61803, 0.],
      [0., 1.61803, 0.],
      [-0.951057, -1.30902, 0.],
      [-0.951057, 1.30902, 0.],
      [0.951057, -1.30902, 0.],
      [0.951057, 1.30902, 0.],
      [-1.53884, -0.5, 0.],
      [-1.53884, 0.5, 0.],
      [1.53884, -0.5, 0.],
      [1.53884, 0.5, 0.],
      [1.37638, 0., -0.850651],
      [1.37638, 0., 0.850651],
      [0.425325, -1.30902, -0.850651],
      [0.425325, -1.30902, 0.850651],
      [0.425325, 1.30902, -0.850651],
      [0.425325, 1.30902, 0.850651],
      [-1.11352, -0.809017, -0.850651],
      [-1.11352, -0.809017, 0.850651],
      [-1.11352, 0.809017, -0.850651],
      [-1.11352, 0.809017, 0.850651],
      [-0.850651, 0., -1.37638],
      [-0.850651, 0., 1.37638],
      [-0.262866, -0.809017, -1.37638],
      [-0.262866, -0.809017, 1.37638],
      [-0.262866, 0.809017, -1.37638],
      [-0.262866, 0.809017, 1.37638],
      [0.688191, -0.5, -1.37638],
      [0.688191, -0.5, 1.37638],
      [0.688191, 0.5, -1.37638],
      [0.688191, 0.5, 1.37638],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ34", {
    dual: "J34",
    vertices: [
      [2.22045e-17, 0., 1.37638],
      [-0.742344, 0.539345, 1.20114],
      [-0.742344, -0.539345, 1.20114],
      [0.28355, -0.872678, 1.20114],
      [0.917588, 0., 1.20114],
      [0.28355, 0.872678, 1.20114],
      [0.458794, 1.41202, 0.28355],
      [-1.20114, 0.872678, 0.28355],
      [-1.20114, -0.872678, 0.28355],
      [0.458794, -1.41202, 0.28355],
      [1.48469, 0., 0.28355],
      [-0.380423, 1.17082, 0.615537],
      [-1.23107, 0., 0.615537],
      [-0.380423, -1.17082, 0.615537],
      [0.995959, -0.723607, 0.615537],
      [0.995959, 0.723607, 0.615537],
      [2.22045e-17, 0., -1.37638],
      [-0.742344, 0.539345, -1.20114],
      [-0.742344, -0.539345, -1.20114],
      [0.28355, -0.872678, -1.20114],
      [0.917588, 0., -1.20114],
      [0.28355, 0.872678, -1.20114],
      [0.458794, 1.41202, -0.28355],
      [-1.20114, 0.872678, -0.28355],
      [-1.20114, -0.872678, -0.28355],
      [0.458794, -1.41202, -0.28355],
      [1.48469, 0., -0.28355],
      [-0.380423, 1.17082, -0.615537],
      [-1.23107, 0., -0.615537],
      [-0.380423, -1.17082, -0.615537],
      [0.995959, -0.723607, -0.615537],
      [0.995959, 0.723607, -0.615537],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.]
  }],
  ["J35", {
    dual: "dJ35",
    vertices: [
      [0., -1., -0.5],
      [0., -1., 0.5],
      [0., 1., -0.5],
      [0., 1., 0.5],
      [-0.288675, -0.5, -1.3165],
      [-0.288675, -0.5, 1.3165],
      [-0.288675, 0.5, -1.3165],
      [-0.288675, 0.5, 1.3165],
      [0.57735, 0., -1.3165],
      [0.57735, 0., 1.3165],
      [-0.866025, -0.5, -0.5],
      [-0.866025, -0.5, 0.5],
      [-0.866025, 0.5, -0.5],
      [-0.866025, 0.5, 0.5],
      [0.866025, -0.5, -0.5],
      [0.866025, -0.5, 0.5],
      [0.866025, 0.5, -0.5],
      [0.866025, 0.5, 0.5],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ35", {
    dual: "J35",
    vertices: [
      [-0.57735, 0., 0.908248],
      [0.288675, -0.5, 0.908248],
      [0.288675, 0.5, 0.908248],
      [-0.3849, 0.666667, 0.772166],
      [-0.3849, -0.666667, 0.772166],
      [0.7698, 0., 0.772166],
      [0., 0., 1.3165],
      [-0.57735, 0., -0.908248],
      [0.288675, -0.5, -0.908248],
      [0.288675, 0.5, -0.908248],
      [-0.3849, 0.666667, -0.772166],
      [-0.3849, -0.666667, -0.772166],
      [0.7698, 0., -0.772166],
      [0., 0., -1.3165],
      [-0.433013, 0.75, 0.],
      [-0.866025, 0., 0.],
      [-0.433013, -0.75, 0.],
      [0.433013, -0.75, 0.],
      [0.866025, 0., 0.],
      [0.433013, 0.75, 0.],
    ],
    vertexDegree: [4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.]
  }],
  ["J36", {
    dual: "dJ36",
    vertices: [
      [0., -1., -0.5],
      [0., -1., 0.5],
      [0., 1., -0.5],
      [0., 1., 0.5],
      [-0.288675, -0.5, 1.3165],
      [-0.288675, 0.5, 1.3165],
      [0.288675, -0.5, -1.3165],
      [0.57735, 0., 1.3165],
      [-0.866025, -0.5, -0.5],
      [-0.866025, -0.5, 0.5],
      [-0.866025, 0.5, -0.5],
      [-0.866025, 0.5, 0.5],
      [0.866025, -0.5, -0.5],
      [0.866025, -0.5, 0.5],
      [0.866025, 0.5, -0.5],
      [0.866025, 0.5, 0.5],
      [-0.57735, 0., -1.3165],
      [0.288675, 0.5, -1.3165],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ36", {
    dual: "J36",
    vertices: [
      [0., 0., 1.3165],
      [-0.57735, 0., 0.908248],
      [0.288675, -0.5, 0.908248],
      [0.288675, 0.5, 0.908248],
      [-0.3849, 0.666667, 0.772166],
      [-0.3849, -0.666667, 0.772166],
      [0.7698, 0., 0.772166],
      [0., 0., -1.3165],
      [-0.288675, 0.5, -0.908248],
      [-0.288675, -0.5, -0.908248],
      [0.57735, 0., -0.908248],
      [0.3849, 0.666667, -0.772166],
      [-0.7698, 0., -0.772166],
      [0.3849, -0.666667, -0.772166],
      [-0.433013, 0.75, 0.],
      [-0.866025, 0., 0.],
      [-0.433013, -0.75, 0.],
      [0.433013, -0.75, 0.],
      [0.866025, 0., 0.],
      [0.433013, 0.75, 0.],
    ],
    vertexDegree: [3.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,3.,3.,3.,4.,4.,4.,4.,4.,4.]
  }],
  ["J37", {
    dual: "dJ37",
    vertices: [
      [-0.5, -0.5, -1.20711],
      [-0.5, 0.5, -1.20711],
      [0., -0.707107, 1.20711],
      [0., 0.707107, 1.20711],
      [0.5, -0.5, -1.20711],
      [0.5, 0.5, -1.20711],
      [-0.707107, 0., 1.20711],
      [0.707107, 0., 1.20711],
      [0.5, 1.20711, -0.5],
      [0.5, 1.20711, 0.5],
      [-0.5, 1.20711, -0.5],
      [-0.5, 1.20711, 0.5],
      [-1.20711, 0.5, -0.5],
      [-1.20711, 0.5, 0.5],
      [-1.20711, -0.5, -0.5],
      [-1.20711, -0.5, 0.5],
      [-0.5, -1.20711, -0.5],
      [-0.5, -1.20711, 0.5],
      [0.5, -1.20711, -0.5],
      [0.5, -1.20711, 0.5],
      [1.20711, -0.5, -0.5],
      [1.20711, -0.5, 0.5],
      [1.20711, 0.5, -0.5],
      [1.20711, 0.5, 0.5],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ37", {
    dual: "J37",
    vertices: [
      [0., 0., 1.20711],
      [-0.603553, 0.603553, 0.853553],
      [-0.603553, -0.603553, 0.853553],
      [0.603553, -0.603553, 0.853553],
      [0.603553, 0.603553, 0.853553],
      [0., 1.04044, 0.735702],
      [-1.04044, 0., 0.735702],
      [0., -1.04044, 0.735702],
      [1.04044, 0., 0.735702],
      [0., 0., -1.20711],
      [0., 0.853553, -0.853553],
      [-0.853553, 0., -0.853553],
      [0., -0.853553, -0.853553],
      [0.853553, 0., -0.853553],
      [0.735702, 0.735702, -0.735702],
      [-0.735702, 0.735702, -0.735702],
      [-0.735702, -0.735702, -0.735702],
      [0.735702, -0.735702, -0.735702],
      [0., 1.20711, 0.],
      [-0.853553, 0.853553, 0.],
      [-1.20711, 0., 0.],
      [-0.853553, -0.853553, 0.],
      [0., -1.20711, 0.],
      [0.853553, -0.853553, 0.],
      [1.20711, 0., 0.],
      [0.853553, 0.853553, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["J38", {
    dual: "dJ38",
    vertices: [
      [0., -1.61803, -0.5],
      [0., -1.61803, 0.5],
      [0., 1.61803, -0.5],
      [0., 1.61803, 0.5],
      [0.850651, 0., -1.02573],
      [0.850651, 0., 1.02573],
      [0.262866, -0.809017, -1.02573],
      [0.262866, -0.809017, 1.02573],
      [0.262866, 0.809017, -1.02573],
      [0.262866, 0.809017, 1.02573],
      [-0.951057, -1.30902, -0.5],
      [-0.951057, -1.30902, 0.5],
      [-0.951057, 1.30902, -0.5],
      [-0.951057, 1.30902, 0.5],
      [0.951057, -1.30902, -0.5],
      [0.951057, -1.30902, 0.5],
      [0.951057, 1.30902, -0.5],
      [0.951057, 1.30902, 0.5],
      [-0.688191, -0.5, -1.02573],
      [-0.688191, -0.5, 1.02573],
      [-0.688191, 0.5, -1.02573],
      [-0.688191, 0.5, 1.02573],
      [-1.53884, -0.5, -0.5],
      [-1.53884, -0.5, 0.5],
      [-1.53884, 0.5, -0.5],
      [-1.53884, 0.5, 0.5],
      [1.53884, -0.5, -0.5],
      [1.53884, -0.5, 0.5],
      [1.53884, 0.5, -0.5],
      [1.53884, 0.5, 0.5],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ38", {
    dual: "J38",
    vertices: [
      [-0.344095, 1.05902, 0.762866],
      [-1.11352, 0., 0.762866],
      [-0.344095, -1.05902, 0.762866],
      [0.900854, -0.654508, 0.762866],
      [0.900854, 0.654508, 0.762866],
      [0.404641, 1.24536, 0.675244],
      [-1.05936, 0.769672, 0.675244],
      [-1.05936, -0.769672, 0.675244],
      [0.404641, -1.24536, 0.675244],
      [1.30944, 0., 0.675244],
      [-2.22045e-17, 0., 1.02573],
      [-0.344095, 1.05902, -0.762866],
      [-1.11352, 0., -0.762866],
      [-0.344095, -1.05902, -0.762866],
      [0.900854, -0.654508, -0.762866],
      [0.900854, 0.654508, -0.762866],
      [0.404641, 1.24536, -0.675244],
      [-1.05936, 0.769672, -0.675244],
      [-1.05936, -0.769672, -0.675244],
      [0.404641, -1.24536, -0.675244],
      [1.30944, 0., -0.675244],
      [-2.22045e-17, 0., -1.02573],
      [0.475528, 1.46353, 0.],
      [-0.475528, 1.46353, 0.],
      [-1.24495, 0.904508, 0.],
      [-1.53884, 0., 0.],
      [-1.24495, -0.904508, 0.],
      [-0.475528, -1.46353, 0.],
      [0.475528, -1.46353, 0.],
      [1.24495, -0.904508, 0.],
      [1.53884, 0., 0.],
      [1.24495, 0.904508, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,5.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["J39", {
    dual: "dJ39",
    vertices: [
      [0., -1.61803, -0.5],
      [0., -1.61803, 0.5],
      [0., 1.61803, -0.5],
      [0., 1.61803, 0.5],
      [-0.688191, -0.5, 1.02573],
      [-0.688191, 0.5, 1.02573],
      [0.688191, -0.5, -1.02573],
      [0.688191, 0.5, -1.02573],
      [-0.850651, 0., -1.02573],
      [0.850651, 0., 1.02573],
      [-0.262866, -0.809017, -1.02573],
      [-0.262866, 0.809017, -1.02573],
      [0.262866, -0.809017, 1.02573],
      [0.262866, 0.809017, 1.02573],
      [-0.951057, -1.30902, -0.5],
      [-0.951057, -1.30902, 0.5],
      [-0.951057, 1.30902, -0.5],
      [-0.951057, 1.30902, 0.5],
      [0.951057, -1.30902, -0.5],
      [0.951057, -1.30902, 0.5],
      [0.951057, 1.30902, -0.5],
      [0.951057, 1.30902, 0.5],
      [-1.53884, -0.5, -0.5],
      [-1.53884, -0.5, 0.5],
      [-1.53884, 0.5, -0.5],
      [-1.53884, 0.5, 0.5],
      [1.53884, -0.5, -0.5],
      [1.53884, -0.5, 0.5],
      [1.53884, 0.5, -0.5],
      [1.53884, 0.5, 0.5],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ39", {
    dual: "J39",
    vertices: [
      [-2.22045e-17, 0., 1.02573],
      [-0.344095, 1.05902, 0.762866],
      [-1.11352, 0., 0.762866],
      [-0.344095, -1.05902, 0.762866],
      [0.900854, -0.654508, 0.762866],
      [0.900854, 0.654508, 0.762866],
      [0.404641, 1.24536, 0.675244],
      [-1.05936, 0.769672, 0.675244],
      [-1.05936, -0.769672, 0.675244],
      [0.404641, -1.24536, 0.675244],
      [1.30944, 0., 0.675244],
      [2.22045e-17, 0., -1.02573],
      [0.344095, 1.05902, -0.762866],
      [-0.900854, 0.654508, -0.762866],
      [-0.900854, -0.654508, -0.762866],
      [0.344095, -1.05902, -0.762866],
      [1.11352, 0., -0.762866],
      [1.05936, 0.769672, -0.675244],
      [-0.404641, 1.24536, -0.675244],
      [-1.30944, 0., -0.675244],
      [-0.404641, -1.24536, -0.675244],
      [1.05936, -0.769672, -0.675244],
      [0.475528, 1.46353, 0.],
      [-0.475528, 1.46353, 0.],
      [-1.24495, 0.904508, 0.],
      [-1.53884, 0., 0.],
      [-1.24495, -0.904508, 0.],
      [-0.475528, -1.46353, 0.],
      [0.475528, -1.46353, 0.],
      [1.24495, -0.904508, 0.],
      [1.53884, 0., 0.],
      [1.24495, 0.904508, 0.],
    ],
    vertexDegree: [5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["J40", {
    dual: "dJ40",
    vertices: [
      [0., -1.61803, -0.5],
      [0., -1.61803, 0.5],
      [0., 1.61803, -0.5],
      [0., 1.61803, 0.5],
      [0.425325, -1.30902, 1.35065],
      [0.425325, 1.30902, 1.35065],
      [0.688191, -0.5, -1.02573],
      [0.688191, -0.5, 1.87638],
      [0.688191, 0.5, -1.02573],
      [0.688191, 0.5, 1.87638],
      [-0.850651, 0., -1.02573],
      [-0.850651, 0., 1.87638],
      [-1.11352, -0.809017, 1.35065],
      [-1.11352, 0.809017, 1.35065],
      [-0.262866, -0.809017, -1.02573],
      [-0.262866, -0.809017, 1.87638],
      [-0.262866, 0.809017, -1.02573],
      [-0.262866, 0.809017, 1.87638],
      [-0.951057, -1.30902, -0.5],
      [-0.951057, -1.30902, 0.5],
      [-0.951057, 1.30902, -0.5],
      [-0.951057, 1.30902, 0.5],
      [0.951057, -1.30902, -0.5],
      [0.951057, -1.30902, 0.5],
      [0.951057, 1.30902, -0.5],
      [0.951057, 1.30902, 0.5],
      [-1.53884, -0.5, -0.5],
      [-1.53884, -0.5, 0.5],
      [-1.53884, 0.5, -0.5],
      [-1.53884, 0.5, 0.5],
      [1.53884, -0.5, -0.5],
      [1.53884, -0.5, 0.5],
      [1.53884, 0.5, -0.5],
      [1.53884, 0.5, 0.5],
      [1.37638, 0., 1.35065],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ40", {
    dual: "J40",
    vertices: [
      [2.22045e-17, 0., 1.87638],
      [-0.742344, 0.539345, 1.70114],
      [-0.742344, -0.539345, 1.70114],
      [0.28355, -0.872678, 1.70114],
      [0.917588, 0., 1.70114],
      [0.28355, 0.872678, 1.70114],
      [0.458794, 1.41202, 0.78355],
      [-1.20114, 0.872678, 0.78355],
      [-1.20114, -0.872678, 0.78355],
      [0.458794, -1.41202, 0.78355],
      [1.48469, 0., 0.78355],
      [-0.380423, 1.17082, 1.11554],
      [-1.23107, 0., 1.11554],
      [-0.380423, -1.17082, 1.11554],
      [0.995959, -0.723607, 1.11554],
      [0.995959, 0.723607, 1.11554],
      [2.22045e-17, 0., -1.02573],
      [0.344095, 1.05902, -0.762866],
      [-0.900854, 0.654508, -0.762866],
      [-0.900854, -0.654508, -0.762866],
      [0.344095, -1.05902, -0.762866],
      [1.11352, 0., -0.762866],
      [1.05936, 0.769672, -0.675244],
      [-0.404641, 1.24536, -0.675244],
      [-1.30944, 0., -0.675244],
      [-0.404641, -1.24536, -0.675244],
      [1.05936, -0.769672, -0.675244],
      [0.475528, 1.46353, 0.],
      [-0.475528, 1.46353, 0.],
      [-1.24495, 0.904508, 0.],
      [-1.53884, 0., 0.],
      [-1.24495, -0.904508, 0.],
      [-0.475528, -1.46353, 0.],
      [0.475528, -1.46353, 0.],
      [1.24495, -0.904508, 0.],
      [1.53884, 0., 0.],
      [1.24495, 0.904508, 0.],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["J41", {
    dual: "dJ41",
    vertices: [
      [0., -1.61803, -0.5],
      [0., -1.61803, 0.5],
      [0., 1.61803, -0.5],
      [0., 1.61803, 0.5],
      [0.850651, 0., -1.02573],
      [0.262866, -0.809017, -1.02573],
      [0.262866, 0.809017, -1.02573],
      [-0.951057, -1.30902, -0.5],
      [-0.951057, -1.30902, 0.5],
      [-0.951057, 1.30902, -0.5],
      [-0.951057, 1.30902, 0.5],
      [0.951057, -1.30902, -0.5],
      [0.951057, -1.30902, 0.5],
      [0.951057, 1.30902, -0.5],
      [0.951057, 1.30902, 0.5],
      [-0.688191, -0.5, -1.02573],
      [-0.688191, 0.5, -1.02573],
      [-1.53884, -0.5, -0.5],
      [-1.53884, -0.5, 0.5],
      [-1.53884, 0.5, -0.5],
      [-1.53884, 0.5, 0.5],
      [1.53884, -0.5, -0.5],
      [1.53884, -0.5, 0.5],
      [1.53884, 0.5, -0.5],
      [1.53884, 0.5, 0.5],
      [1.37638, 0., 1.35065],
      [0.425325, -1.30902, 1.35065],
      [0.425325, 1.30902, 1.35065],
      [-1.11352, -0.809017, 1.35065],
      [-1.11352, 0.809017, 1.35065],
      [-0.850651, 0., 1.87638],
      [-0.262866, -0.809017, 1.87638],
      [-0.262866, 0.809017, 1.87638],
      [0.688191, -0.5, 1.87638],
      [0.688191, 0.5, 1.87638],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ41", {
    dual: "J41",
    vertices: [
      [2.22045e-17, 0., 1.87638],
      [-0.742344, 0.539345, 1.70114],
      [-0.742344, -0.539345, 1.70114],
      [0.28355, -0.872678, 1.70114],
      [0.917588, 0., 1.70114],
      [0.28355, 0.872678, 1.70114],
      [0.458794, 1.41202, 0.78355],
      [-1.20114, 0.872678, 0.78355],
      [-1.20114, -0.872678, 0.78355],
      [0.458794, -1.41202, 0.78355],
      [1.48469, 0., 0.78355],
      [-0.380423, 1.17082, 1.11554],
      [-1.23107, 0., 1.11554],
      [-0.380423, -1.17082, 1.11554],
      [0.995959, -0.723607, 1.11554],
      [0.995959, 0.723607, 1.11554],
      [-2.22045e-17, 0., -1.02573],
      [-0.344095, 1.05902, -0.762866],
      [-1.11352, 0., -0.762866],
      [-0.344095, -1.05902, -0.762866],
      [0.900854, -0.654508, -0.762866],
      [0.900854, 0.654508, -0.762866],
      [0.404641, 1.24536, -0.675244],
      [-1.05936, 0.769672, -0.675244],
      [-1.05936, -0.769672, -0.675244],
      [0.404641, -1.24536, -0.675244],
      [1.30944, 0., -0.675244],
      [0.475528, 1.46353, 0.],
      [-0.475528, 1.46353, 0.],
      [-1.24495, 0.904508, 0.],
      [-1.53884, 0., 0.],
      [-1.24495, -0.904508, 0.],
      [-0.475528, -1.46353, 0.],
      [0.475528, -1.46353, 0.],
      [1.24495, -0.904508, 0.],
      [1.53884, 0., 0.],
      [1.24495, 0.904508, 0.],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["J42", {
    dual: "dJ42",
    vertices: [
      [0., -1.61803, -0.5],
      [0., -1.61803, 0.5],
      [0., 1.61803, -0.5],
      [0., 1.61803, 0.5],
      [-0.951057, -1.30902, -0.5],
      [-0.951057, -1.30902, 0.5],
      [-0.951057, 1.30902, -0.5],
      [-0.951057, 1.30902, 0.5],
      [0.951057, -1.30902, -0.5],
      [0.951057, -1.30902, 0.5],
      [0.951057, 1.30902, -0.5],
      [0.951057, 1.30902, 0.5],
      [-1.53884, -0.5, -0.5],
      [-1.53884, -0.5, 0.5],
      [-1.53884, 0.5, -0.5],
      [-1.53884, 0.5, 0.5],
      [1.53884, -0.5, -0.5],
      [1.53884, -0.5, 0.5],
      [1.53884, 0.5, -0.5],
      [1.53884, 0.5, 0.5],
      [1.37638, 0., -1.35065],
      [1.37638, 0., 1.35065],
      [0.425325, -1.30902, -1.35065],
      [0.425325, -1.30902, 1.35065],
      [0.425325, 1.30902, -1.35065],
      [0.425325, 1.30902, 1.35065],
      [-1.11352, -0.809017, -1.35065],
      [-1.11352, -0.809017, 1.35065],
      [-1.11352, 0.809017, -1.35065],
      [-1.11352, 0.809017, 1.35065],
      [-0.850651, 0., -1.87638],
      [-0.850651, 0., 1.87638],
      [-0.262866, -0.809017, -1.87638],
      [-0.262866, -0.809017, 1.87638],
      [-0.262866, 0.809017, -1.87638],
      [-0.262866, 0.809017, 1.87638],
      [0.688191, -0.5, -1.87638],
      [0.688191, -0.5, 1.87638],
      [0.688191, 0.5, -1.87638],
      [0.688191, 0.5, 1.87638],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ42", {
    dual: "J42",
    vertices: [
      [2.22045e-17, 0., 1.87638],
      [-0.742344, 0.539345, 1.70114],
      [-0.742344, -0.539345, 1.70114],
      [0.28355, -0.872678, 1.70114],
      [0.917588, 0., 1.70114],
      [0.28355, 0.872678, 1.70114],
      [0.458794, 1.41202, 0.78355],
      [-1.20114, 0.872678, 0.78355],
      [-1.20114, -0.872678, 0.78355],
      [0.458794, -1.41202, 0.78355],
      [1.48469, 0., 0.78355],
      [-0.380423, 1.17082, 1.11554],
      [-1.23107, 0., 1.11554],
      [-0.380423, -1.17082, 1.11554],
      [0.995959, -0.723607, 1.11554],
      [0.995959, 0.723607, 1.11554],
      [2.22045e-17, 0., -1.87638],
      [-0.742344, 0.539345, -1.70114],
      [-0.742344, -0.539345, -1.70114],
      [0.28355, -0.872678, -1.70114],
      [0.917588, 0., -1.70114],
      [0.28355, 0.872678, -1.70114],
      [0.458794, 1.41202, -0.78355],
      [-1.20114, 0.872678, -0.78355],
      [-1.20114, -0.872678, -0.78355],
      [0.458794, -1.41202, -0.78355],
      [1.48469, 0., -0.78355],
      [-0.380423, 1.17082, -1.11554],
      [-1.23107, 0., -1.11554],
      [-0.380423, -1.17082, -1.11554],
      [0.995959, -0.723607, -1.11554],
      [0.995959, 0.723607, -1.11554],
      [0.475528, 1.46353, 0.],
      [-0.475528, 1.46353, 0.],
      [-1.24495, 0.904508, 0.],
      [-1.53884, 0., 0.],
      [-1.24495, -0.904508, 0.],
      [-0.475528, -1.46353, 0.],
      [0.475528, -1.46353, 0.],
      [1.24495, -0.904508, 0.],
      [1.53884, 0., 0.],
      [1.24495, 0.904508, 0.],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["J43", {
    dual: "dJ43",
    vertices: [
      [0., -1.61803, -0.5],
      [0., -1.61803, 0.5],
      [0., 1.61803, -0.5],
      [0., 1.61803, 0.5],
      [-0.425325, -1.30902, -1.35065],
      [-0.425325, 1.30902, -1.35065],
      [0.425325, -1.30902, 1.35065],
      [0.425325, 1.30902, 1.35065],
      [-0.688191, -0.5, -1.87638],
      [-0.688191, 0.5, -1.87638],
      [0.688191, -0.5, 1.87638],
      [0.688191, 0.5, 1.87638],
      [-0.850651, 0., 1.87638],
      [0.850651, 0., -1.87638],
      [-1.11352, -0.809017, 1.35065],
      [-1.11352, 0.809017, 1.35065],
      [1.11352, -0.809017, -1.35065],
      [1.11352, 0.809017, -1.35065],
      [-0.262866, -0.809017, 1.87638],
      [-0.262866, 0.809017, 1.87638],
      [0.262866, -0.809017, -1.87638],
      [0.262866, 0.809017, -1.87638],
      [-0.951057, -1.30902, -0.5],
      [-0.951057, -1.30902, 0.5],
      [-0.951057, 1.30902, -0.5],
      [-0.951057, 1.30902, 0.5],
      [0.951057, -1.30902, -0.5],
      [0.951057, -1.30902, 0.5],
      [0.951057, 1.30902, -0.5],
      [0.951057, 1.30902, 0.5],
      [-1.53884, -0.5, -0.5],
      [-1.53884, -0.5, 0.5],
      [-1.53884, 0.5, -0.5],
      [-1.53884, 0.5, 0.5],
      [1.53884, -0.5, -0.5],
      [1.53884, -0.5, 0.5],
      [1.53884, 0.5, -0.5],
      [1.53884, 0.5, 0.5],
      [-1.37638, 0., -1.35065],
      [1.37638, 0., 1.35065],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ43", {
    dual: "J43",
    vertices: [
      [2.22045e-17, 0., 1.87638],
      [-0.742344, 0.539345, 1.70114],
      [-0.742344, -0.539345, 1.70114],
      [0.28355, -0.872678, 1.70114],
      [0.917588, 0., 1.70114],
      [0.28355, 0.872678, 1.70114],
      [0.458794, 1.41202, 0.78355],
      [-1.20114, 0.872678, 0.78355],
      [-1.20114, -0.872678, 0.78355],
      [0.458794, -1.41202, 0.78355],
      [1.48469, 0., 0.78355],
      [-0.380423, 1.17082, 1.11554],
      [-1.23107, 0., 1.11554],
      [-0.380423, -1.17082, 1.11554],
      [0.995959, -0.723607, 1.11554],
      [0.995959, 0.723607, 1.11554],
      [-2.22045e-17, 0., -1.87638],
      [-0.28355, 0.872678, -1.70114],
      [-0.917588, 0., -1.70114],
      [-0.28355, -0.872678, -1.70114],
      [0.742344, -0.539345, -1.70114],
      [0.742344, 0.539345, -1.70114],
      [1.20114, 0.872678, -0.78355],
      [-0.458794, 1.41202, -0.78355],
      [-1.48469, 0., -0.78355],
      [-0.458794, -1.41202, -0.78355],
      [1.20114, -0.872678, -0.78355],
      [0.380423, 1.17082, -1.11554],
      [-0.995959, 0.723607, -1.11554],
      [-0.995959, -0.723607, -1.11554],
      [0.380423, -1.17082, -1.11554],
      [1.23107, 0., -1.11554],
      [0.475528, 1.46353, 0.],
      [-0.475528, 1.46353, 0.],
      [-1.24495, 0.904508, 0.],
      [-1.53884, 0., 0.],
      [-1.24495, -0.904508, 0.],
      [-0.475528, -1.46353, 0.],
      [0.475528, -1.46353, 0.],
      [1.24495, -0.904508, 0.],
      [1.53884, 0., 0.],
      [1.24495, 0.904508, 0.],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["J44", {
    dual: "dJ44",
    vertices: [
      [-1., 0., 0.4278],
      [-0.5, -0.866025, 0.4278],
      [-0.5, 0.866025, 0.4278],
      [-0.5, -0.288675, 1.2443],
      [0., -1., -0.4278],
      [0., 1., -0.4278],
      [0., 0.57735, 1.2443],
      [0.5, -0.288675, 1.2443],
      [0.5, -0.866025, 0.4278],
      [0.5, 0.866025, 0.4278],
      [1., 0., 0.4278],
      [-0.57735, 0., -1.2443],
      [0.288675, -0.5, -1.2443],
      [0.288675, 0.5, -1.2443],
      [-0.866025, -0.5, -0.4278],
      [-0.866025, 0.5, -0.4278],
      [0.866025, -0.5, -0.4278],
      [0.866025, 0.5, -0.4278],
    ],
    vertexDegree: [5.,5.,5.,4.,5.,5.,4.,4.,5.,5.,5.,4.,4.,4.,5.,5.,5.,5.]
  }],
  ["dJ44", {
    dual: "J44",
    vertices: [
      [0.788675, 0.455342, 0.1426],
      [0., 0.910684, 0.1426],
      [-0.788675, 0.455342, 0.1426],
      [-0.788675, -0.455342, 0.1426],
      [0., -0.910684, 0.1426],
      [0.788675, -0.455342, 0.1426],
      [0.455342, 0.788675, -0.1426],
      [-0.455342, 0.788675, -0.1426],
      [-0.910684, 0., -0.1426],
      [-0.455342, -0.788675, -0.1426],
      [0.455342, -0.788675, -0.1426],
      [0.910684, 0., -0.1426],
      [0., 0., 1.2443],
      [-0.5, 0.288675, 0.836048],
      [0., -0.57735, 0.836048],
      [0.5, 0.288675, 0.836048],
      [0., 0.7698, 0.699965],
      [-0.666667, -0.3849, 0.699965],
      [0.666667, -0.3849, 0.699965],
      [0., 0., -1.2443],
      [0.57735, 0., -0.836048],
      [-0.288675, 0.5, -0.836048],
      [-0.288675, -0.5, -0.836048],
      [0.3849, -0.666667, -0.699965],
      [0.3849, 0.666667, -0.699965],
      [-0.7698, 0., -0.699965],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,3.,3.,3.]
  }],
  ["J45", {
    dual: "dJ45",
    vertices: [
      [0., -0.707107, -1.13725],
      [0., 0.707107, -1.13725],
      [0., -1.30656, 0.430148],
      [0., 1.30656, 0.430148],
      [-0.707107, 0., -1.13725],
      [0.707107, 0., -1.13725],
      [-0.653281, 0.270598, 1.13725],
      [0.653281, -0.270598, 1.13725],
      [1.20711, 0.5, -0.430148],
      [-1.30656, 0., 0.430148],
      [1.30656, 0., 0.430148],
      [-0.92388, -0.92388, 0.430148],
      [-0.92388, 0.92388, 0.430148],
      [0.92388, -0.92388, 0.430148],
      [0.92388, 0.92388, 0.430148],
      [-0.5, -1.20711, -0.430148],
      [0.5, 1.20711, -0.430148],
      [0.5, -1.20711, -0.430148],
      [-0.5, 1.20711, -0.430148],
      [1.20711, -0.5, -0.430148],
      [-1.20711, 0.5, -0.430148],
      [-1.20711, -0.5, -0.430148],
      [-0.270598, -0.653281, 1.13725],
      [0.270598, 0.653281, 1.13725],
    ],
    vertexDegree: [4.,4.,5.,5.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,4.,4.]
  }],
  ["dJ45", {
    dual: "J45",
    vertices: [
      [1.14585, 0.474627, 0.143383],
      [0.474627, 1.14585, 0.143383],
      [-0.474627, 1.14585, 0.143383],
      [-1.14585, 0.474627, 0.143383],
      [-1.14585, -0.474627, 0.143383],
      [-0.474627, -1.14585, 0.143383],
      [0.474627, -1.14585, 0.143383],
      [1.14585, -0.474627, 0.143383],
      [0.876995, 0.876995, -0.143383],
      [0., 1.24026, -0.143383],
      [-0.876995, 0.876995, -0.143383],
      [-1.24026, 0., -0.143383],
      [-0.876995, -0.876995, -0.143383],
      [0., -1.24026, -0.143383],
      [0.876995, -0.876995, -0.143383],
      [1.24026, 0., -0.143383],
      [0., 0., 1.13725],
      [-0.326641, 0.788581, 0.783701],
      [-0.788581, -0.326641, 0.783701],
      [0.326641, -0.788581, 0.783701],
      [0.788581, 0.326641, 0.783701],
      [0.398159, 0.961241, 0.66585],
      [-0.961241, 0.398159, 0.66585],
      [-0.398159, -0.961241, 0.66585],
      [0.961241, -0.398159, 0.66585],
      [0., 0., -1.13725],
      [0.603553, -0.603553, -0.783701],
      [0.603553, 0.603553, -0.783701],
      [-0.603553, 0.603553, -0.783701],
      [-0.603553, -0.603553, -0.783701],
      [0., -1.04044, -0.66585],
      [1.04044, 0., -0.66585],
      [0., 1.04044, -0.66585],
      [-1.04044, 0., -0.66585],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["J46", {
    dual: "dJ46",
    vertices: [
      [-1.61803, 0., 0.431199],
      [-1.53884, -0.5, -0.431199],
      [-1.53884, 0.5, -0.431199],
      [-1.30902, -0.951057, 0.431199],
      [-1.30902, 0.951057, 0.431199],
      [-0.951057, -1.30902, -0.431199],
      [-0.951057, 1.30902, -0.431199],
      [-0.809017, 0.262866, 0.95693],
      [-0.688191, -0.5, -0.95693],
      [-0.688191, 0.5, -0.95693],
      [-0.5, -1.53884, 0.431199],
      [-0.5, -0.688191, 0.95693],
      [-0.5, 1.53884, 0.431199],
      [0., -1.61803, -0.431199],
      [0., 0.850651, 0.95693],
      [0., 1.61803, -0.431199],
      [0.262866, -0.809017, -0.95693],
      [0.262866, 0.809017, -0.95693],
      [0.5, -1.53884, 0.431199],
      [0.5, -0.688191, 0.95693],
      [0.5, 1.53884, 0.431199],
      [0.809017, 0.262866, 0.95693],
      [0.850651, 0., -0.95693],
      [0.951057, -1.30902, -0.431199],
      [0.951057, 1.30902, -0.431199],
      [1.30902, -0.951057, 0.431199],
      [1.30902, 0.951057, 0.431199],
      [1.53884, -0.5, -0.431199],
      [1.53884, 0.5, -0.431199],
      [1.61803, 0., 0.431199],
    ],
    vertexDegree: [5.,5.,5.,5.,5.,5.,5.,4.,4.,4.,5.,4.,5.,5.,4.,5.,4.,4.,5.,4.,5.,4.,4.,5.,5.,5.,5.,5.,5.,5.]
  }],
  ["dJ46", {
    dual: "J46",
    vertices: [
      [-1.48863, -0.483686, 0.143733],
      [-1.56524, 0., -0.143733],
      [-1.48863, 0.483686, 0.143733],
      [-1.24536, 0.404641, 0.606442],
      [-1.26631, -0.920025, -0.143733],
      [-1.05936, -0.769672, -0.606442],
      [-1.26631, 0.920025, -0.143733],
      [-1.05936, 0.769672, -0.606442],
      [-0.920025, -1.26631, 0.143733],
      [-0.769672, -1.05936, 0.606442],
      [-0.920025, 1.26631, 0.143733],
      [-0.483686, -1.48863, -0.143733],
      [-0.483686, 1.48863, -0.143733],
      [0., -1.56524, 0.143733],
      [0., 1.30944, 0.606442],
      [0., 1.56524, 0.143733],
      [0.404641, -1.24536, -0.606442],
      [0.483686, -1.48863, -0.143733],
      [0.483686, 1.48863, -0.143733],
      [0.404641, 1.24536, -0.606442],
      [0.920025, -1.26631, 0.143733],
      [0.769672, -1.05936, 0.606442],
      [0.920025, 1.26631, 0.143733],
      [1.24536, 0.404641, 0.606442],
      [1.30944, 0., -0.606442],
      [1.26631, -0.920025, -0.143733],
      [1.26631, 0.920025, -0.143733],
      [1.48863, -0.483686, 0.143733],
      [1.48863, 0.483686, 0.143733],
      [1.56524, 0., -0.143733],
      [-1.05902, -0.344095, 0.694064],
      [-1.11352, 0., -0.694064],
      [-0.654508, 0.900854, 0.694064],
      [-0.344095, -1.05902, -0.694064],
      [-0.344095, 1.05902, -0.694064],
      [0., -1.11352, 0.694064],
      [0.654508, 0.900854, 0.694064],
      [0.900854, -0.654508, -0.694064],
      [0.900854, 0.654508, -0.694064],
      [1.05902, -0.344095, 0.694064],
      [0., 0., 0.95693],
      [0., 0., -0.95693],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.]
  }],
  ["J47", {
    dual: "dJ47",
    vertices: [
      [0., -1.61803, -0.431199],
      [0., 1.61803, -0.431199],
      [0., -1.37638, 1.28185],
      [0., 0.850651, 1.80758],
      [-1.61803, 0., 0.431199],
      [0.850651, 0., -0.95693],
      [-0.5, -1.53884, 0.431199],
      [0.262866, -0.809017, -0.95693],
      [0.262866, 0.809017, -0.95693],
      [1.61803, 0., 0.431199],
      [-0.951057, -1.30902, -0.431199],
      [-0.951057, 1.30902, -0.431199],
      [0.951057, -1.30902, -0.431199],
      [0.951057, 1.30902, -0.431199],
      [-0.688191, -0.5, -0.95693],
      [-0.688191, 0.5, -0.95693],
      [-0.5, 1.53884, 0.431199],
      [0.5, -1.53884, 0.431199],
      [0.5, 1.53884, 0.431199],
      [-1.30902, -0.951057, 0.431199],
      [-1.30902, 0.951057, 0.431199],
      [1.30902, -0.951057, 0.431199],
      [1.30902, 0.951057, 0.431199],
      [-1.53884, -0.5, -0.431199],
      [-1.53884, 0.5, -0.431199],
      [1.53884, -0.5, -0.431199],
      [1.53884, 0.5, -0.431199],
      [1.30902, -0.425325, 1.28185],
      [0.809017, 1.11352, 1.28185],
      [-0.809017, 0.262866, 1.80758],
      [-0.5, -0.688191, 1.80758],
      [-1.30902, -0.425325, 1.28185],
      [-0.809017, 1.11352, 1.28185],
      [0.5, -0.688191, 1.80758],
      [0.809017, 0.262866, 1.80758],
    ],
    vertexDegree: [5.,5.,4.,4.,5.,4.,5.,4.,4.,5.,5.,5.,5.,5.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ47", {
    dual: "J47",
    vertices: [
      [1.48863, 0.483686, 0.143733],
      [0.920025, 1.26631, 0.143733],
      [0., 1.56524, 0.143733],
      [-0.920025, 1.26631, 0.143733],
      [-1.48863, 0.483686, 0.143733],
      [-1.48863, -0.483686, 0.143733],
      [-0.920025, -1.26631, 0.143733],
      [0., -1.56524, 0.143733],
      [0.920025, -1.26631, 0.143733],
      [1.48863, -0.483686, 0.143733],
      [1.26631, 0.920025, -0.143733],
      [0.483686, 1.48863, -0.143733],
      [-0.483686, 1.48863, -0.143733],
      [-1.26631, 0.920025, -0.143733],
      [-1.56524, 0., -0.143733],
      [-1.26631, -0.920025, -0.143733],
      [-0.483686, -1.48863, -0.143733],
      [0.483686, -1.48863, -0.143733],
      [1.26631, -0.920025, -0.143733],
      [1.56524, 0., -0.143733],
      [0., 0., -0.95693],
      [-0.344095, 1.05902, -0.694064],
      [-1.11352, 0., -0.694064],
      [-0.344095, -1.05902, -0.694064],
      [0.900854, -0.654508, -0.694064],
      [0.900854, 0.654508, -0.694064],
      [0.404641, 1.24536, -0.606442],
      [-1.05936, 0.769672, -0.606442],
      [-1.05936, -0.769672, -0.606442],
      [0.404641, -1.24536, -0.606442],
      [1.30944, 0., -0.606442],
      [0., 0., 1.80758],
      [-0.539345, 0.742344, 1.63234],
      [-0.872678, -0.28355, 1.63234],
      [0., -0.917588, 1.63234],
      [0.872678, -0.28355, 1.63234],
      [0.539345, 0.742344, 1.63234],
      [0.872678, 1.20114, 0.714749],
      [-0.872678, 1.20114, 0.714749],
      [-1.41202, -0.458794, 0.714749],
      [0., -1.48469, 0.714749],
      [1.41202, -0.458794, 0.714749],
      [0., 1.23107, 1.04674],
      [-1.17082, 0.380423, 1.04674],
      [-0.723607, -0.995959, 1.04674],
      [0.723607, -0.995959, 1.04674],
      [1.17082, 0.380423, 1.04674],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.]
  }],
  ["J48", {
    dual: "dJ48",
    vertices: [
      [-1.61803, 0., -0.431199],
      [-1.53884, -0.5, 0.431199],
      [-1.53884, 0.5, 0.431199],
      [-1.30902, -0.951057, -0.431199],
      [-1.30902, 0.425325, -1.28185],
      [-1.30902, 0.951057, -0.431199],
      [-1.11352, -0.809017, 1.28185],
      [-1.11352, 0.809017, 1.28185],
      [-0.951057, -1.30902, 0.431199],
      [-0.951057, 1.30902, 0.431199],
      [-0.850651, 0., 1.80758],
      [-0.809017, -1.11352, -1.28185],
      [-0.809017, -0.262866, -1.80758],
      [-0.5, -1.53884, -0.431199],
      [-0.5, 0.688191, -1.80758],
      [-0.5, 1.53884, -0.431199],
      [-0.262866, -0.809017, 1.80758],
      [-0.262866, 0.809017, 1.80758],
      [0., -1.61803, 0.431199],
      [0., -0.850651, -1.80758],
      [0., 1.37638, -1.28185],
      [0., 1.61803, 0.431199],
      [0.425325, -1.30902, 1.28185],
      [0.425325, 1.30902, 1.28185],
      [0.5, -1.53884, -0.431199],
      [0.5, 0.688191, -1.80758],
      [0.5, 1.53884, -0.431199],
      [0.688191, -0.5, 1.80758],
      [0.688191, 0.5, 1.80758],
      [0.809017, -1.11352, -1.28185],
      [0.809017, -0.262866, -1.80758],
      [0.951057, -1.30902, 0.431199],
      [0.951057, 1.30902, 0.431199],
      [1.30902, -0.951057, -0.431199],
      [1.30902, 0.425325, -1.28185],
      [1.30902, 0.951057, -0.431199],
      [1.37638, 0., 1.28185],
      [1.53884, -0.5, 0.431199],
      [1.53884, 0.5, 0.431199],
      [1.61803, 0., -0.431199],
    ],
    vertexDegree: [5.,5.,5.,5.,4.,5.,4.,4.,5.,5.,4.,4.,4.,5.,4.,5.,4.,4.,5.,4.,4.,5.,4.,4.,5.,4.,5.,4.,4.,4.,4.,5.,5.,5.,4.,5.,4.,5.,5.,5.]
  }],
  ["dJ48", {
    dual: "J48",
    vertices: [
      [0., 0., 1.80758],
      [-0.742344, 0.539345, 1.63234],
      [-0.742344, -0.539345, 1.63234],
      [0.28355, -0.872678, 1.63234],
      [0.917588, 0., 1.63234],
      [0.28355, 0.872678, 1.63234],
      [0.458794, 1.41202, 0.714749],
      [-1.20114, 0.872678, 0.714749],
      [-1.20114, -0.872678, 0.714749],
      [0.458794, -1.41202, 0.714749],
      [1.48469, 0., 0.714749],
      [-0.380423, 1.17082, 1.04674],
      [-1.23107, 0., 1.04674],
      [-0.380423, -1.17082, 1.04674],
      [0.995959, -0.723607, 1.04674],
      [0.995959, 0.723607, 1.04674],
      [0., 0., -1.80758],
      [-0.872678, 0.28355, -1.63234],
      [-0.539345, -0.742344, -1.63234],
      [0.539345, -0.742344, -1.63234],
      [0.872678, 0.28355, -1.63234],
      [0., 0.917588, -1.63234],
      [0., 1.48469, -0.714749],
      [-1.41202, 0.458794, -0.714749],
      [-0.872678, -1.20114, -0.714749],
      [0.872678, -1.20114, -0.714749],
      [1.41202, 0.458794, -0.714749],
      [-0.723607, 0.995959, -1.04674],
      [-1.17082, -0.380423, -1.04674],
      [0., -1.23107, -1.04674],
      [1.17082, -0.380423, -1.04674],
      [0.723607, 0.995959, -1.04674],
      [1.56524, 0., 0.143733],
      [1.26631, -0.920025, 0.143733],
      [0.483686, -1.48863, 0.143733],
      [-0.483686, -1.48863, 0.143733],
      [-1.26631, -0.920025, 0.143733],
      [-1.56524, 0., 0.143733],
      [-1.26631, 0.920025, 0.143733],
      [-0.483686, 1.48863, 0.143733],
      [0.483686, 1.48863, 0.143733],
      [1.26631, 0.920025, 0.143733],
      [1.48863, 0.483686, -0.143733],
      [1.48863, -0.483686, -0.143733],
      [0.920025, -1.26631, -0.143733],
      [0., -1.56524, -0.143733],
      [-0.920025, -1.26631, -0.143733],
      [-1.48863, -0.483686, -0.143733],
      [-1.48863, 0.483686, -0.143733],
      [-0.920025, 1.26631, -0.143733],
      [0., 1.56524, -0.143733],
      [0.920025, 1.26631, -0.143733],
    ],
    vertexDegree: [5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J49", {
    dual: "dJ49",
    vertices: [
      [-0.288675, -0.5, -0.5],
      [-0.288675, -0.5, 0.5],
      [-0.288675, 0.5, -0.5],
      [-0.288675, 0.5, 0.5],
      [0.57735, 0., -0.5],
      [0.57735, 0., 0.5],
      [0.497891, 0.862372, 0.],
    ],
    vertexDegree: [3.,3.,4.,4.,4.,4.,4.]
  }],
  ["dJ49", {
    dual: "J49",
    vertices: [
      [0., 0., -0.5],
      [0., 0., 0.5],
      [-0.288675, 0., 0.],
      [0.144338, -0.25, 0.],
      [0.262189, 0.454124, -0.333333],
      [-0.0264864, 0.620791, 0.],
      [0.262189, 0.454124, 0.333333],
      [0.550864, 0.287457, 0.],
    ],
    vertexDegree: [3.,3.,4.,4.,3.,3.,3.,3.]
  }],
  ["J50", {
    dual: "dJ50",
    vertices: [
      [-0.288675, -0.5, -0.5],
      [-0.288675, -0.5, 0.5],
      [-0.288675, 0.5, -0.5],
      [-0.288675, 0.5, 0.5],
      [0.57735, 0., -0.5],
      [0.57735, 0., 0.5],
      [-0.995782, 0., 0.],
      [0.497891, 0.862372, 0.],
    ],
    vertexDegree: [4.,4.,5.,5.,4.,4.,4.,4.]
  }],
  ["dJ50", {
    dual: "J50",
    vertices: [
      [0., 0., -0.5],
      [0., 0., 0.5],
      [0.144338, -0.25, 0.],
      [0.262189, 0.454124, -0.333333],
      [-0.0264864, 0.620791, 0.],
      [0.262189, 0.454124, 0.333333],
      [0.550864, 0.287457, 0.],
      [-0.524377, 0., -0.333333],
      [-0.524377, -0.333333, 0.],
      [-0.524377, 0., 0.333333],
      [-0.524377, 0.333333, 0.],
    ],
    vertexDegree: [3.,3.,4.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J51", {
    dual: "dJ51",
    vertices: [
      [-0.288675, -0.5, -0.5],
      [-0.288675, -0.5, 0.5],
      [-0.288675, 0.5, -0.5],
      [-0.288675, 0.5, 0.5],
      [0.57735, 0., -0.5],
      [0.57735, 0., 0.5],
      [-0.995782, 0., 0.],
      [0.497891, -0.862372, 0.],
      [0.497891, 0.862372, 0.],
    ],
    vertexDegree: [5.,5.,5.,5.,5.,5.,4.,4.,4.]
  }],
  ["dJ51", {
    dual: "J51",
    vertices: [
      [0., 0., -0.5],
      [0., 0., 0.5],
      [0.262189, 0.454124, -0.333333],
      [-0.0264864, 0.620791, 0.],
      [0.262189, 0.454124, 0.333333],
      [0.550864, 0.287457, 0.],
      [-0.524377, 0., -0.333333],
      [-0.524377, -0.333333, 0.],
      [-0.524377, 0., 0.333333],
      [-0.524377, 0.333333, 0.],
      [0.262189, -0.454124, -0.333333],
      [0.550864, -0.287457, 0.],
      [0.262189, -0.454124, 0.333333],
      [-0.0264864, -0.620791, 0.],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J52", {
    dual: "dJ52",
    vertices: [
      [0.850651, 0., -0.5],
      [0.850651, 0., 0.5],
      [0.262866, -0.809017, -0.5],
      [0.262866, -0.809017, 0.5],
      [0.262866, 0.809017, -0.5],
      [0.262866, 0.809017, 0.5],
      [-0.688191, -0.5, -0.5],
      [-0.688191, -0.5, 0.5],
      [-0.688191, 0.5, -0.5],
      [-0.688191, 0.5, 0.5],
      [1.12882, 0.820135, 0.],
    ],
    vertexDegree: [4.,4.,3.,3.,4.,4.,3.,3.,3.,3.,4.]
  }],
  ["dJ52", {
    dual: "J52",
    vertices: [
      [-2.22045e-17, 0., -0.5],
      [-2.22045e-17, 0., 0.5],
      [-0.212663, 0.654508, 0.],
      [-0.688191, 0., 0.],
      [-0.212663, -0.654508, 0.],
      [0.556758, -0.404508, 0.],
      [0.747445, 0.543051, -0.333333],
      [0.551517, 0.812723, 0.],
      [0.747445, 0.543051, 0.333333],
      [0.943374, 0.273378, 0.],
    ],
    vertexDegree: [5.,5.,4.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["J53", {
    dual: "dJ53",
    vertices: [
      [0.850651, 0., -0.5],
      [0.850651, 0., 0.5],
      [0.262866, -0.809017, -0.5],
      [0.262866, -0.809017, 0.5],
      [0.262866, 0.809017, -0.5],
      [0.262866, 0.809017, 0.5],
      [-0.688191, -0.5, -0.5],
      [-0.688191, -0.5, 0.5],
      [-0.688191, 0.5, -0.5],
      [-0.688191, 0.5, 0.5],
      [-1.3953, 0., 0.],
      [1.12882, 0.820135, 0.],
    ],
    vertexDegree: [4.,4.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ53", {
    dual: "J53",
    vertices: [
      [-2.22045e-17, 0., -0.5],
      [-2.22045e-17, 0., 0.5],
      [-0.212663, 0.654508, 0.],
      [-0.212663, -0.654508, 0.],
      [0.556758, -0.404508, 0.],
      [0.747445, 0.543051, -0.333333],
      [0.551517, 0.812723, 0.],
      [0.747445, 0.543051, 0.333333],
      [0.943374, 0.273378, 0.],
      [-0.923893, 0., -0.333333],
      [-0.923893, -0.333333, 0.],
      [-0.923893, 0., 0.333333],
      [-0.923893, 0.333333, 0.],
    ],
    vertexDegree: [5.,5.,4.,4.,4.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J54", {
    dual: "dJ54",
    vertices: [
      [-1., 0., -0.5],
      [-1., 0., 0.5],
      [-0.5, -0.866025, -0.5],
      [-0.5, -0.866025, 0.5],
      [-0.5, 0.866025, -0.5],
      [-0.5, 0.866025, 0.5],
      [0.5, -0.866025, -0.5],
      [0.5, -0.866025, 0.5],
      [0.5, 0.866025, -0.5],
      [0.5, 0.866025, 0.5],
      [1., 0., -0.5],
      [1., 0., 0.5],
      [1.36237, 0.786566, 0.],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.]
  }],
  ["dJ54", {
    dual: "J54",
    vertices: [
      [0., 0., -0.5],
      [0., 0., 0.5],
      [0., 0.866025, 0.],
      [-0.75, 0.433013, 0.],
      [-0.75, -0.433013, 0.],
      [0., -0.866025, 0.],
      [0.75, -0.433013, 0.],
      [0.954124, 0.550864, -0.333333],
      [0.787457, 0.839539, 0.],
      [0.954124, 0.550864, 0.333333],
      [1.12079, 0.262189, 0.],
    ],
    vertexDegree: [6.,6.,4.,4.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["J55", {
    dual: "dJ55",
    vertices: [
      [-1., 0., -0.5],
      [-1., 0., 0.5],
      [-0.5, -0.866025, -0.5],
      [-0.5, -0.866025, 0.5],
      [-0.5, 0.866025, -0.5],
      [-0.5, 0.866025, 0.5],
      [0.5, -0.866025, -0.5],
      [0.5, -0.866025, 0.5],
      [0.5, 0.866025, -0.5],
      [0.5, 0.866025, 0.5],
      [1., 0., -0.5],
      [1., 0., 0.5],
      [-1.36237, -0.786566, 0.],
      [1.36237, 0.786566, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ55", {
    dual: "J55",
    vertices: [
      [0., 0., -0.5],
      [0., 0., 0.5],
      [0., 0.866025, 0.],
      [-0.75, 0.433013, 0.],
      [0., -0.866025, 0.],
      [0.75, -0.433013, 0.],
      [0.954124, 0.550864, -0.333333],
      [0.787457, 0.839539, 0.],
      [0.954124, 0.550864, 0.333333],
      [1.12079, 0.262189, 0.],
      [-0.954124, -0.550864, -0.333333],
      [-0.787457, -0.839539, 0.],
      [-0.954124, -0.550864, 0.333333],
      [-1.12079, -0.262189, 0.],
    ],
    vertexDegree: [6.,6.,4.,4.,4.,4.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J56", {
    dual: "dJ56",
    vertices: [
      [-1., 0., -0.5],
      [-1., 0., 0.5],
      [-0.5, -0.866025, -0.5],
      [-0.5, -0.866025, 0.5],
      [-0.5, 0.866025, -0.5],
      [-0.5, 0.866025, 0.5],
      [0.5, -0.866025, -0.5],
      [0.5, -0.866025, 0.5],
      [0.5, 0.866025, -0.5],
      [0.5, 0.866025, 0.5],
      [1., 0., -0.5],
      [1., 0., 0.5],
      [-1.36237, 0.786566, 0.],
      [1.36237, 0.786566, 0.],
    ],
    vertexDegree: [4.,4.,3.,3.,4.,4.,3.,3.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ56", {
    dual: "J56",
    vertices: [
      [0., 0., -0.5],
      [0., 0., 0.5],
      [0., 0.866025, 0.],
      [-0.75, -0.433013, 0.],
      [0., -0.866025, 0.],
      [0.75, -0.433013, 0.],
      [0.954124, 0.550864, -0.333333],
      [0.787457, 0.839539, 0.],
      [0.954124, 0.550864, 0.333333],
      [1.12079, 0.262189, 0.],
      [-0.954124, 0.550864, -0.333333],
      [-1.12079, 0.262189, 0.],
      [-0.954124, 0.550864, 0.333333],
      [-0.787457, 0.839539, 0.],
    ],
    vertexDegree: [6.,6.,4.,4.,4.,4.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J57", {
    dual: "dJ57",
    vertices: [
      [-1., 0., -0.5],
      [-1., 0., 0.5],
      [-0.5, -0.866025, -0.5],
      [-0.5, -0.866025, 0.5],
      [-0.5, 0.866025, -0.5],
      [-0.5, 0.866025, 0.5],
      [0., -1.57313, 0.],
      [0.5, -0.866025, -0.5],
      [0.5, -0.866025, 0.5],
      [0.5, 0.866025, -0.5],
      [0.5, 0.866025, 0.5],
      [1., 0., -0.5],
      [1., 0., 0.5],
      [-1.36237, 0.786566, 0.],
      [1.36237, 0.786566, 0.],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ57", {
    dual: "J57",
    vertices: [
      [0., 0., -0.5],
      [0., 0., 0.5],
      [0., 0.866025, 0.],
      [-0.75, -0.433013, 0.],
      [0.75, -0.433013, 0.],
      [0.954124, 0.550864, -0.333333],
      [0.787457, 0.839539, 0.],
      [0.954124, 0.550864, 0.333333],
      [1.12079, 0.262189, 0.],
      [-0.954124, 0.550864, -0.333333],
      [-1.12079, 0.262189, 0.],
      [-0.954124, 0.550864, 0.333333],
      [-0.787457, 0.839539, 0.],
      [0., -1.10173, -0.333333],
      [0.333333, -1.10173, 0.],
      [0., -1.10173, 0.333333],
      [-0.333333, -1.10173, 0.],
    ],
    vertexDegree: [6.,6.,4.,4.,4.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J58", {
    dual: "dJ58",
    vertices: [
      [0., 0., 1.40126],
      [0., 0., -1.40126],
      [0.178411, -1.30902, 0.467086],
      [0.178411, 1.30902, 0.467086],
      [0.467086, -0.809017, -1.04444],
      [0.467086, 0.809017, -1.04444],
      [1.04444, -0.809017, 0.467086],
      [1.04444, 0.809017, 0.467086],
      [-1.22285, -0.5, 0.467086],
      [-1.22285, 0.5, 0.467086],
      [1.22285, -0.5, -0.467086],
      [1.22285, 0.5, -0.467086],
      [-0.934172, 0., -1.04444],
      [-0.467086, -0.809017, 1.04444],
      [-0.467086, 0.809017, 1.04444],
      [0.934172, 0., 1.04444],
      [-1.04444, -0.809017, -0.467086],
      [-1.04444, 0.809017, -0.467086],
      [-0.995125, 0., 1.30264],
      [-0.178411, -1.30902, -0.467086],
      [-0.178411, 1.30902, -0.467086],
    ],
    vertexDegree: [4.,3.,3.,3.,3.,3.,3.,3.,4.,4.,3.,3.,3.,4.,4.,3.,3.,3.,5.,3.,3.]
  }],
  ["dJ58", {
    dual: "J58",
    vertices: [
      [0.675973, 0., -0.884861],
      [0.546874, -0.947214, -0.208887],
      [1.09375, 0., 0.208887],
      [0.546874, 0.947214, -0.208887],
      [-0.337987, 0.58541, -0.884861],
      [-0.337987, -0.58541, -0.884861],
      [-0.546874, 0.947214, 0.208887],
      [-1.09375, 0., -0.208887],
      [-0.546874, -0.947214, 0.208887],
      [0.337987, -0.58541, 0.884861],
      [0.337987, 0.58541, 0.884861],
      [-0.89502, 0.436339, 0.938053],
      [-1.14694, 0., 0.745603],
      [-0.89502, -0.436339, 0.938053],
      [-0.487404, -0.269672, 1.24944],
      [-0.487404, 0.269672, 1.24944],
    ],
    vertexDegree: [5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.]
  }],
  ["J59", {
    dual: "dJ59",
    vertices: [
      [0., 0., 1.40126],
      [0., 0., -1.40126],
      [0.178411, -1.30902, 0.467086],
      [0.178411, 1.30902, 0.467086],
      [0.467086, -0.809017, -1.04444],
      [0.467086, 0.809017, -1.04444],
      [1.04444, -0.809017, 0.467086],
      [1.04444, 0.809017, 0.467086],
      [-1.22285, -0.5, 0.467086],
      [-1.22285, 0.5, 0.467086],
      [1.22285, -0.5, -0.467086],
      [1.22285, 0.5, -0.467086],
      [-0.934172, 0., -1.04444],
      [-0.467086, -0.809017, 1.04444],
      [-0.467086, 0.809017, 1.04444],
      [0.934172, 0., 1.04444],
      [-1.04444, -0.809017, -0.467086],
      [-1.04444, 0.809017, -0.467086],
      [0.995125, 0., -1.30264],
      [-0.995125, 0., 1.30264],
      [-0.178411, -1.30902, -0.467086],
      [-0.178411, 1.30902, -0.467086],
    ],
    vertexDegree: [4.,4.,3.,3.,4.,4.,3.,3.,4.,4.,4.,4.,3.,4.,4.,3.,3.,3.,5.,5.,3.,3.]
  }],
  ["dJ59", {
    dual: "J59",
    vertices: [
      [0.546874, -0.947214, -0.208887],
      [1.09375, 0., 0.208887],
      [0.546874, 0.947214, -0.208887],
      [-0.337987, 0.58541, -0.884861],
      [-0.337987, -0.58541, -0.884861],
      [-0.546874, 0.947214, 0.208887],
      [-1.09375, 0., -0.208887],
      [-0.546874, -0.947214, 0.208887],
      [0.337987, -0.58541, 0.884861],
      [0.337987, 0.58541, 0.884861],
      [-0.89502, 0.436339, 0.938053],
      [-1.14694, 0., 0.745603],
      [-0.89502, -0.436339, 0.938053],
      [-0.487404, -0.269672, 1.24944],
      [-0.487404, 0.269672, 1.24944],
      [0.487404, 0.269672, -1.24944],
      [0.89502, 0.436339, -0.938053],
      [1.14694, 0., -0.745603],
      [0.89502, -0.436339, -0.938053],
      [0.487404, -0.269672, -1.24944],
    ],
    vertexDegree: [5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J60", {
    dual: "dJ60",
    vertices: [
      [0., 0., 1.40126],
      [0., 0., -1.40126],
      [0.178411, -1.30902, 0.467086],
      [0.178411, 1.30902, 0.467086],
      [0.467086, -0.809017, -1.04444],
      [0.467086, 0.809017, -1.04444],
      [1.04444, -0.809017, 0.467086],
      [1.04444, 0.809017, 0.467086],
      [-1.22285, -0.5, 0.467086],
      [-1.22285, 0.5, 0.467086],
      [1.22285, -0.5, -0.467086],
      [1.22285, 0.5, -0.467086],
      [-0.934172, 0., -1.04444],
      [-0.467086, -0.809017, 1.04444],
      [-0.467086, 0.809017, 1.04444],
      [0.934172, 0., 1.04444],
      [-1.04444, -0.809017, -0.467086],
      [-1.04444, 0.809017, -0.467086],
      [-0.995125, 0., 1.30264],
      [-0.178411, -1.30902, -0.467086],
      [-0.178411, 1.30902, -0.467086],
      [0.805073, -1.39443, -0.30751],
    ],
    vertexDegree: [4.,3.,4.,3.,4.,3.,4.,3.,4.,4.,4.,3.,3.,4.,4.,3.,3.,3.,5.,4.,3.,5.]
  }],
  ["dJ60", {
    dual: "J60",
    vertices: [
      [0.675973, 0., -0.884861],
      [1.09375, 0., 0.208887],
      [0.546874, 0.947214, -0.208887],
      [-0.337987, 0.58541, -0.884861],
      [-0.337987, -0.58541, -0.884861],
      [-0.546874, 0.947214, 0.208887],
      [-1.09375, 0., -0.208887],
      [-0.546874, -0.947214, 0.208887],
      [0.337987, -0.58541, 0.884861],
      [0.337987, 0.58541, 0.884861],
      [-0.89502, 0.436339, 0.938053],
      [-1.14694, 0., 0.745603],
      [-0.89502, -0.436339, 0.938053],
      [-0.487404, -0.269672, 1.24944],
      [-0.487404, 0.269672, 1.24944],
      [0.831669, -0.901148, -0.606344],
      [1.02412, -0.901148, -0.102503],
      [0.675973, -1.17082, 0.208887],
      [0.268358, -1.33749, -0.102503],
      [0.364583, -1.17082, -0.606344],
    ],
    vertexDegree: [5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J61", {
    dual: "dJ61",
    vertices: [
      [0., 0., 1.40126],
      [0., 0., -1.40126],
      [0.178411, -1.30902, 0.467086],
      [0.178411, 1.30902, 0.467086],
      [0.467086, -0.809017, -1.04444],
      [0.467086, 0.809017, -1.04444],
      [1.04444, -0.809017, 0.467086],
      [1.04444, 0.809017, 0.467086],
      [-1.22285, -0.5, 0.467086],
      [-1.22285, 0.5, 0.467086],
      [1.22285, -0.5, -0.467086],
      [1.22285, 0.5, -0.467086],
      [-0.934172, 0., -1.04444],
      [-0.467086, -0.809017, 1.04444],
      [-0.467086, 0.809017, 1.04444],
      [0.934172, 0., 1.04444],
      [-1.04444, -0.809017, -0.467086],
      [-1.04444, 0.809017, -0.467086],
      [-0.995125, 0., 1.30264],
      [-0.178411, -1.30902, -0.467086],
      [-0.178411, 1.30902, -0.467086],
      [0.805073, 1.39443, -0.30751],
      [0.805073, -1.39443, -0.30751],
    ],
    vertexDegree: [4.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,3.,4.,4.,3.,3.,3.,5.,4.,4.,5.,5.]
  }],
  ["dJ61", {
    dual: "J61",
    vertices: [
      [0.675973, 0., -0.884861],
      [1.09375, 0., 0.208887],
      [-0.337987, 0.58541, -0.884861],
      [-0.337987, -0.58541, -0.884861],
      [-0.546874, 0.947214, 0.208887],
      [-1.09375, 0., -0.208887],
      [-0.546874, -0.947214, 0.208887],
      [0.337987, -0.58541, 0.884861],
      [0.337987, 0.58541, 0.884861],
      [-0.89502, 0.436339, 0.938053],
      [-1.14694, 0., 0.745603],
      [-0.89502, -0.436339, 0.938053],
      [-0.487404, -0.269672, 1.24944],
      [-0.487404, 0.269672, 1.24944],
      [0.831669, -0.901148, -0.606344],
      [1.02412, -0.901148, -0.102503],
      [0.675973, -1.17082, 0.208887],
      [0.268358, -1.33749, -0.102503],
      [0.364583, -1.17082, -0.606344],
      [0.831669, 0.901148, -0.606344],
      [0.364583, 1.17082, -0.606344],
      [0.268358, 1.33749, -0.102503],
      [0.675973, 1.17082, 0.208887],
      [1.02412, 0.901148, -0.102503],
    ],
    vertexDegree: [5.,5.,5.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J62", {
    dual: "dJ62",
    vertices: [
      [-0.5, 0., -0.809017],
      [-0.5, 0., 0.809017],
      [0., -0.809017, -0.5],
      [0., 0.809017, -0.5],
      [0.5, 0., -0.809017],
      [0.5, 0., 0.809017],
      [-0.809017, -0.5, 0.],
      [-0.809017, 0.5, 0.],
      [0.809017, -0.5, 0.],
      [0.809017, 0.5, 0.],
    ],
    vertexDegree: [5.,3.,4.,4.,5.,3.,4.,4.,4.,4.]
  }],
  ["dJ62", {
    dual: "J62",
    vertices: [
      [-0.706011, 0., -0.269672],
      [-0.436339, -0.436339, -0.436339],
      [-0.706011, 0., 0.269672],
      [-0.436339, 0.436339, -0.436339],
      [0., 0.269672, -0.706011],
      [0., -0.269672, -0.706011],
      [0.436339, -0.436339, -0.436339],
      [0.436339, 0.436339, -0.436339],
      [0.706011, 0., -0.269672],
      [0.706011, 0., 0.269672],
      [0., -0.361803, 0.223607],
      [0., 0.361803, 0.223607],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,5.,5.]
  }],
  ["J63", {
    dual: "dJ63",
    vertices: [
      [-0.57735, 0., -0.755761],
      [-0.288675, -0.5, 0.755761],
      [-0.288675, 0.5, 0.755761],
      [0.288675, -0.5, -0.755761],
      [0.288675, 0.5, -0.755761],
      [0.57735, 0., 0.755761],
      [0.467086, -0.809017, 0.178411],
      [0.467086, 0.809017, 0.178411],
      [-0.934172, 0., 0.178411],
    ],
    vertexDegree: [3.,4.,4.,3.,3.,4.,3.,3.,3.]
  }],
  ["dJ63", {
    dual: "J63",
    vertices: [
      [-0.503841, 0., 0.563311],
      [0., 0., -0.755761],
      [0., 0., 0.755761],
      [0.25192, 0.436339, 0.563311],
      [0.25192, -0.436339, 0.563311],
      [-0.208887, -0.361803, -0.0797878],
      [-0.208887, 0.361803, -0.0797878],
      [0.417775, 0., -0.0797878],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,5.,5.,5.]
  }],
  ["J64", {
    dual: "dJ64",
    vertices: [
      [0., 0., -1.57226],
      [-0.57735, 0., -0.755761],
      [-0.288675, -0.5, 0.755761],
      [-0.288675, 0.5, 0.755761],
      [0.288675, -0.5, -0.755761],
      [0.288675, 0.5, -0.755761],
      [0.57735, 0., 0.755761],
      [-0.934172, 0., 0.178411],
      [0.467086, -0.809017, 0.178411],
      [0.467086, 0.809017, 0.178411],
    ],
    vertexDegree: [3.,4.,4.,4.,4.,4.,4.,3.,3.,3.]
  }],
  ["dJ64", {
    dual: "J64",
    vertices: [
      [-0.503841, 0., 0.563311],
      [0., 0., 0.755761],
      [0.25192, 0.436339, 0.563311],
      [0.25192, -0.436339, 0.563311],
      [-0.208887, -0.361803, -0.0797878],
      [-0.208887, 0.361803, -0.0797878],
      [0.417775, 0., -0.0797878],
      [-0.096225, 0.166667, -1.02793],
      [0.19245, 0., -1.02793],
      [-0.096225, -0.166667, -1.02793],
    ],
    vertexDegree: [3.,3.,3.,3.,5.,5.,5.,3.,3.,3.]
  }],
  ["J65", {
    dual: "dJ65",
    vertices: [
      [0., -1., -0.612372],
      [0., 1., -0.612372],
      [-0.57735, -1., 0.204124],
      [-0.57735, 1., 0.204124],
      [-0.288675, -0.5, 1.02062],
      [-0.288675, 0.5, 1.02062],
      [0.288675, -0.5, -1.42887],
      [0.57735, 0., 1.02062],
      [1.1547, 0., 0.204124],
      [-0.866025, -0.5, -0.612372],
      [-0.866025, 0.5, -0.612372],
      [0.866025, -0.5, -0.612372],
      [0.866025, 0.5, -0.612372],
      [-0.57735, 0., -1.42887],
      [0.288675, 0.5, -1.42887],
    ],
    vertexDegree: [4.,4.,3.,3.,3.,3.,4.,3.,3.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ65", {
    dual: "J65",
    vertices: [
      [0.96225, 0., -0.340207],
      [-0.481125, -0.833333, -0.340207],
      [-0.481125, 0.833333, -0.340207],
      [0., 0., 1.02062],
      [0.288675, -0.5, 0.204124],
      [0.288675, 0.5, 0.204124],
      [-0.57735, 0., 0.204124],
      [0., 0., -1.42887],
      [-0.288675, 0.5, -1.02062],
      [-0.288675, -0.5, -1.02062],
      [0.57735, 0., -1.02062],
      [0.3849, 0.666667, -0.884538],
      [-0.7698, 0., -0.884538],
      [0.3849, -0.666667, -0.884538],
    ],
    vertexDegree: [3.,3.,3.,3.,6.,6.,6.,3.,4.,4.,4.,3.,3.,3.]
  }],
  ["J66", {
    dual: "dJ66",
    vertices: [
      [-0.5, 1.20711, -1.20711],
      [-0.5, 1.20711, 1.20711],
      [-0.5, -1.20711, -1.20711],
      [-0.5, -1.20711, 1.20711],
      [0., -0.707107, 1.91421],
      [0., 0.707107, 1.91421],
      [0.5, 1.20711, -1.20711],
      [0.5, 1.20711, 1.20711],
      [0.5, -1.20711, -1.20711],
      [0.5, -1.20711, 1.20711],
      [-0.707107, 0., 1.91421],
      [0.707107, 0., 1.91421],
      [1.20711, -0.5, -1.20711],
      [1.20711, -0.5, 1.20711],
      [1.20711, 0.5, -1.20711],
      [1.20711, 0.5, 1.20711],
      [1.20711, 1.20711, -0.5],
      [1.20711, 1.20711, 0.5],
      [1.20711, -1.20711, -0.5],
      [1.20711, -1.20711, 0.5],
      [-1.20711, -0.5, -1.20711],
      [-1.20711, -0.5, 1.20711],
      [-1.20711, 0.5, -1.20711],
      [-1.20711, 0.5, 1.20711],
      [-1.20711, 1.20711, -0.5],
      [-1.20711, 1.20711, 0.5],
      [-1.20711, -1.20711, -0.5],
      [-1.20711, -1.20711, 0.5],
    ],
    vertexDegree: [3.,4.,3.,4.,4.,4.,3.,4.,3.,4.,4.,4.,3.,4.,3.,4.,3.,3.,3.,3.,3.,4.,3.,4.,3.,3.,3.,3.]
  }],
  ["dJ66", {
    dual: "J66",
    vertices: [
      [0., 0., -1.20711],
      [0., -1.20711, 0.],
      [0., 1.20711, 0.],
      [1.20711, 0., 0.],
      [-1.20711, 0., 0.],
      [0.971405, -0.971405, -0.971405],
      [0.971405, 0.971405, -0.971405],
      [-0.971405, -0.971405, -0.971405],
      [-0.971405, 0.971405, -0.971405],
      [0.971405, -0.971405, 0.971405],
      [0.971405, 0.971405, 0.971405],
      [-0.971405, -0.971405, 0.971405],
      [-0.971405, 0.971405, 0.971405],
      [0., 0., 1.91421],
      [-0.603553, 0.603553, 1.56066],
      [-0.603553, -0.603553, 1.56066],
      [0.603553, -0.603553, 1.56066],
      [0.603553, 0.603553, 1.56066],
      [0., 1.04044, 1.44281],
      [-1.04044, 0., 1.44281],
      [0., -1.04044, 1.44281],
      [1.04044, 0., 1.44281],
    ],
    vertexDegree: [8.,8.,8.,8.,8.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["J67", {
    dual: "dJ67",
    vertices: [
      [-0.5, 1.20711, 1.20711],
      [-0.5, 1.20711, -1.20711],
      [-0.5, -1.20711, 1.20711],
      [-0.5, -1.20711, -1.20711],
      [0., -0.707107, 1.91421],
      [0., -0.707107, -1.91421],
      [0., 0.707107, 1.91421],
      [0., 0.707107, -1.91421],
      [0.5, 1.20711, 1.20711],
      [0.5, 1.20711, -1.20711],
      [0.5, -1.20711, 1.20711],
      [0.5, -1.20711, -1.20711],
      [-0.707107, 0., 1.91421],
      [-0.707107, 0., -1.91421],
      [0.707107, 0., 1.91421],
      [0.707107, 0., -1.91421],
      [1.20711, -0.5, 1.20711],
      [1.20711, -0.5, -1.20711],
      [1.20711, 0.5, 1.20711],
      [1.20711, 0.5, -1.20711],
      [1.20711, 1.20711, -0.5],
      [1.20711, 1.20711, 0.5],
      [1.20711, -1.20711, -0.5],
      [1.20711, -1.20711, 0.5],
      [-1.20711, -0.5, 1.20711],
      [-1.20711, -0.5, -1.20711],
      [-1.20711, 0.5, 1.20711],
      [-1.20711, 0.5, -1.20711],
      [-1.20711, 1.20711, -0.5],
      [-1.20711, 1.20711, 0.5],
      [-1.20711, -1.20711, -0.5],
      [-1.20711, -1.20711, 0.5],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["dJ67", {
    dual: "J67",
    vertices: [
      [0., -1.20711, 0.],
      [0., 1.20711, 0.],
      [1.20711, 0., 0.],
      [-1.20711, 0., 0.],
      [0.971405, -0.971405, 0.971405],
      [0.971405, 0.971405, 0.971405],
      [-0.971405, -0.971405, 0.971405],
      [-0.971405, 0.971405, 0.971405],
      [0.971405, -0.971405, -0.971405],
      [0.971405, 0.971405, -0.971405],
      [-0.971405, -0.971405, -0.971405],
      [-0.971405, 0.971405, -0.971405],
      [0., 0., -1.91421],
      [-0.603553, 0.603553, -1.56066],
      [-0.603553, -0.603553, -1.56066],
      [0.603553, -0.603553, -1.56066],
      [0.603553, 0.603553, -1.56066],
      [0., 1.04044, -1.44281],
      [-1.04044, 0., -1.44281],
      [0., -1.04044, -1.44281],
      [1.04044, 0., -1.44281],
      [0., 0., 1.91421],
      [-0.603553, 0.603553, 1.56066],
      [-0.603553, -0.603553, 1.56066],
      [0.603553, -0.603553, 1.56066],
      [0.603553, 0.603553, 1.56066],
      [0., 1.04044, 1.44281],
      [-1.04044, 0., 1.44281],
      [0., -1.04044, 1.44281],
      [1.04044, 0., 1.44281],
    ],
    vertexDegree: [8.,8.,8.,8.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.]
  }],
  ["J68", {
    dual: "dJ68",
    vertices: [
      [0., -1.61803, 2.4899],
      [0., -1.61803, -2.4899],
      [0., 1.61803, 2.4899],
      [0., 1.61803, -2.4899],
      [0.425325, -2.92705, 0.262866],
      [0.425325, 2.92705, 0.262866],
      [0.688191, -2.11803, 1.96417],
      [0.688191, 2.11803, 1.96417],
      [-2.75276, 0., -1.11352],
      [-2.06457, -2.11803, 0.262866],
      [-2.06457, 2.11803, 0.262866],
      [-1.37638, -2.61803, -0.262866],
      [-1.37638, 2.61803, -0.262866],
      [-0.688191, -2.11803, -1.96417],
      [-0.688191, 2.11803, -1.96417],
      [1.37638, -2.61803, 0.262866],
      [1.37638, 2.61803, 0.262866],
      [2.75276, 0., 1.11352],
      [1.80171, -1.30902, -1.96417],
      [1.80171, 1.30902, -1.96417],
      [2.06457, -2.11803, -0.262866],
      [2.06457, 2.11803, -0.262866],
      [2.22703, 0., 1.96417],
      [2.22703, -1.61803, -1.11352],
      [2.22703, 1.61803, -1.11352],
      [-2.65236, -1.30902, 0.262866],
      [-2.65236, 1.30902, 0.262866],
      [2.65236, -1.30902, -0.262866],
      [2.65236, 1.30902, -0.262866],
      [2.91522, -0.5, 0.262866],
      [2.91522, 0.5, 0.262866],
      [-2.91522, -0.5, -0.262866],
      [-2.91522, 0.5, -0.262866],
      [0.951057, -1.30902, 2.4899],
      [0.951057, -1.30902, -2.4899],
      [0.951057, 1.30902, 2.4899],
      [0.951057, 1.30902, -2.4899],
      [0.850651, -2.61803, 1.11352],
      [0.850651, 2.61803, 1.11352],
      [-0.951057, -1.30902, 2.4899],
      [-0.951057, -1.30902, -2.4899],
      [-0.951057, 1.30902, 2.4899],
      [-0.951057, 1.30902, -2.4899],
      [-1.53884, -0.5, 2.4899],
      [-1.53884, -0.5, -2.4899],
      [-1.53884, 0.5, 2.4899],
      [-1.53884, 0.5, -2.4899],
      [1.53884, -0.5, 2.4899],
      [1.53884, -0.5, -2.4899],
      [1.53884, 0.5, 2.4899],
      [1.53884, 0.5, -2.4899],
      [-2.22703, 0., -1.96417],
      [-2.22703, -1.61803, 1.11352],
      [-2.22703, 1.61803, 1.11352],
      [-0.850651, -2.61803, -1.11352],
      [-0.850651, 2.61803, -1.11352],
      [-1.80171, -1.30902, 1.96417],
      [-1.80171, 1.30902, 1.96417],
      [-0.425325, -2.92705, -0.262866],
      [-0.425325, 2.92705, -0.262866],
      [-0.262866, 0.809017, 3.01563],
      [-0.850651, 0., 3.01563],
      [-0.262866, -0.809017, 3.01563],
      [0.688191, -0.5, 3.01563],
      [0.688191, 0.5, 3.01563],
    ],
    vertexDegree: [4.,3.,4.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,3.,4.,3.,3.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.]
  }],
  ["dJ68", {
    dual: "J68",
    vertices: [
      [0.546416, -1.68169, 2.31465],
      [-0.404641, -1.24536, 2.66514],
      [-0.546416, -1.68169, -2.31465],
      [0.546416, 1.68169, 2.31465],
      [-0.404641, 1.24536, 2.66514],
      [-0.546416, 1.68169, -2.31465],
      [0.884119, -2.72104, 0.546416],
      [0.884119, 2.72104, 0.546416],
      [-2.86107, 0., -0.546416],
      [-2.31465, -1.68169, 0.546416],
      [-2.31465, 1.68169, 0.546416],
      [-0.884119, -2.72104, -0.546416],
      [-0.884119, 2.72104, -0.546416],
      [2.86107, 0., 0.546416],
      [1.43054, -1.03934, -2.31465],
      [1.43054, 1.03934, -2.31465],
      [2.31465, -1.68169, -0.546416],
      [2.31465, 1.68169, -0.546416],
      [1.76824, 0., 2.31465],
      [1.05936, -0.769672, 2.66514],
      [1.05936, 0.769672, 2.66514],
      [-1.43054, -1.03934, 2.31465],
      [-1.43054, 1.03934, 2.31465],
      [-1.30944, 0., 2.66514],
      [-1.76824, 0., -2.31465],
      [0.344095, -1.05902, 2.75276],
      [0.344095, 1.05902, 2.75276],
      [-0.900854, -0.654508, 2.75276],
      [-0.900854, 0.654508, 2.75276],
      [1.11352, 0., 2.75276],
      [0., 0., 3.01563],
      [-0.688191, -2.11803, 1.11352],
      [0.688191, -2.11803, -1.11352],
      [0., 0., -2.4899],
      [-0.688191, 2.11803, 1.11352],
      [0.688191, 2.11803, -1.11352],
      [1.80171, -1.30902, 1.11352],
      [1.80171, 1.30902, 1.11352],
      [-1.80171, 1.30902, -1.11352],
      [-1.80171, -1.30902, -1.11352],
      [2.22703, 0., -1.11352],
      [-2.22703, 0., 1.11352],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,5.,10.,10.,10.,10.,10.,10.,10.,10.,10.,10.,10.]
  }],
  ["J69", {
    dual: "dJ69",
    vertices: [
      [0., -1.61803, 2.4899],
      [0., -1.61803, -2.4899],
      [0., 1.61803, 2.4899],
      [0., 1.61803, -2.4899],
      [0.425325, -2.92705, 0.262866],
      [0.425325, 2.92705, 0.262866],
      [0.688191, -2.11803, 1.96417],
      [0.688191, 2.11803, 1.96417],
      [-2.75276, 0., -1.11352],
      [-2.06457, -2.11803, 0.262866],
      [-2.06457, 2.11803, 0.262866],
      [-1.37638, -2.61803, -0.262866],
      [-1.37638, 2.61803, -0.262866],
      [-0.688191, -2.11803, -1.96417],
      [-0.688191, 2.11803, -1.96417],
      [1.37638, -2.61803, 0.262866],
      [1.37638, 2.61803, 0.262866],
      [2.75276, 0., 1.11352],
      [1.80171, -1.30902, -1.96417],
      [1.80171, 1.30902, -1.96417],
      [2.06457, -2.11803, -0.262866],
      [2.06457, 2.11803, -0.262866],
      [2.22703, 0., 1.96417],
      [2.22703, -1.61803, -1.11352],
      [2.22703, 1.61803, -1.11352],
      [-2.65236, -1.30902, 0.262866],
      [-2.65236, 1.30902, 0.262866],
      [2.65236, -1.30902, -0.262866],
      [2.65236, 1.30902, -0.262866],
      [2.91522, -0.5, 0.262866],
      [2.91522, 0.5, 0.262866],
      [-2.91522, -0.5, -0.262866],
      [-2.91522, 0.5, -0.262866],
      [0.951057, -1.30902, 2.4899],
      [0.951057, -1.30902, -2.4899],
      [0.951057, 1.30902, 2.4899],
      [0.951057, 1.30902, -2.4899],
      [0.850651, -2.61803, 1.11352],
      [0.850651, 2.61803, 1.11352],
      [-0.951057, -1.30902, 2.4899],
      [-0.951057, -1.30902, -2.4899],
      [-0.951057, 1.30902, 2.4899],
      [-0.951057, 1.30902, -2.4899],
      [-1.53884, -0.5, 2.4899],
      [-1.53884, -0.5, -2.4899],
      [-1.53884, 0.5, 2.4899],
      [-1.53884, 0.5, -2.4899],
      [1.53884, -0.5, 2.4899],
      [1.53884, -0.5, -2.4899],
      [1.53884, 0.5, 2.4899],
      [1.53884, 0.5, -2.4899],
      [-2.22703, 0., -1.96417],
      [-2.22703, -1.61803, 1.11352],
      [-2.22703, 1.61803, 1.11352],
      [-0.850651, -2.61803, -1.11352],
      [-0.850651, 2.61803, -1.11352],
      [-1.80171, -1.30902, 1.96417],
      [-1.80171, 1.30902, 1.96417],
      [-0.425325, -2.92705, -0.262866],
      [-0.425325, 2.92705, -0.262866],
      [-0.262866, 0.809017, 3.01563],
      [-0.850651, 0., 3.01563],
      [-0.262866, -0.809017, 3.01563],
      [0.688191, -0.5, 3.01563],
      [0.688191, 0.5, 3.01563],
      [0.262866, 0.809017, -3.01563],
      [-0.688191, 0.5, -3.01563],
      [-0.688191, -0.5, -3.01563],
      [0.262866, -0.809017, -3.01563],
      [0.850651, 0., -3.01563],
    ],
    vertexDegree: [4.,4.,4.,4.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ69", {
    dual: "J69",
    vertices: [
      [0.546416, -1.68169, 2.31465],
      [-0.404641, -1.24536, 2.66514],
      [-0.546416, -1.68169, -2.31465],
      [0.404641, -1.24536, -2.66514],
      [0.546416, 1.68169, 2.31465],
      [-0.404641, 1.24536, 2.66514],
      [0.404641, 1.24536, -2.66514],
      [-0.546416, 1.68169, -2.31465],
      [0.884119, -2.72104, 0.546416],
      [0.884119, 2.72104, 0.546416],
      [-2.86107, 0., -0.546416],
      [-2.31465, -1.68169, 0.546416],
      [-2.31465, 1.68169, 0.546416],
      [-0.884119, -2.72104, -0.546416],
      [-0.884119, 2.72104, -0.546416],
      [2.86107, 0., 0.546416],
      [1.43054, -1.03934, -2.31465],
      [1.43054, 1.03934, -2.31465],
      [2.31465, -1.68169, -0.546416],
      [2.31465, 1.68169, -0.546416],
      [1.76824, 0., 2.31465],
      [1.05936, -0.769672, 2.66514],
      [1.05936, 0.769672, 2.66514],
      [-1.43054, -1.03934, 2.31465],
      [-1.05936, -0.769672, -2.66514],
      [-1.43054, 1.03934, 2.31465],
      [-1.05936, 0.769672, -2.66514],
      [-1.30944, 0., 2.66514],
      [-1.76824, 0., -2.31465],
      [1.30944, 0., -2.66514],
      [0.344095, -1.05902, 2.75276],
      [-0.344095, -1.05902, -2.75276],
      [0.344095, 1.05902, 2.75276],
      [-0.344095, 1.05902, -2.75276],
      [0.900854, -0.654508, -2.75276],
      [0.900854, 0.654508, -2.75276],
      [-0.900854, -0.654508, 2.75276],
      [-0.900854, 0.654508, 2.75276],
      [-1.11352, 0., -2.75276],
      [1.11352, 0., 2.75276],
      [0., 0., 3.01563],
      [0., 0., -3.01563],
      [-0.688191, -2.11803, 1.11352],
      [0.688191, -2.11803, -1.11352],
      [-0.688191, 2.11803, 1.11352],
      [0.688191, 2.11803, -1.11352],
      [1.80171, -1.30902, 1.11352],
      [1.80171, 1.30902, 1.11352],
      [-1.80171, 1.30902, -1.11352],
      [-1.80171, -1.30902, -1.11352],
      [2.22703, 0., -1.11352],
      [-2.22703, 0., 1.11352],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,10.,10.,10.,10.,10.,10.,10.,10.,10.,10.]
  }],
  ["J70", {
    dual: "dJ70",
    vertices: [
      [1.61803, -1.30902, 2.11803],
      [-2.61803, -1.30902, -0.5],
      [2.61803, 1.30902, 0.5],
      [-1.61803, 1.30902, -2.11803],
      [-0.5, -2.61803, 1.30902],
      [1.30902, 2.11803, -1.61803],
      [1.30902, -2.11803, 1.61803],
      [2.61803, 1.30902, -0.5],
      [-2.11803, 1.61803, 1.30902],
      [-1.30902, -0.5, 2.61803],
      [0., 2.92705, 0.5],
      [-1.61803, -1.30902, 2.11803],
      [0., 2.92705, -0.5],
      [-2.61803, -1.30902, 0.5],
      [-1.30902, 2.11803, -1.61803],
      [0., -2.92705, 0.5],
      [1.61803, 1.30902, -2.11803],
      [2.11803, -1.61803, -1.30902],
      [-1.30902, -2.11803, -1.61803],
      [-0.5, 0., -2.92705],
      [0., -2.92705, -0.5],
      [1.30902, 0.5, -2.61803],
      [2.61803, -1.30902, -0.5],
      [-0.5, -2.61803, -1.30902],
      [0.5, 0., -2.92705],
      [-1.30902, 0.5, 2.61803],
      [-0.5, 2.61803, 1.30902],
      [0.5, -2.61803, -1.30902],
      [1.30902, -0.5, -2.61803],
      [1.30902, -2.11803, -1.61803],
      [1.61803, -1.30902, -2.11803],
      [-1.61803, 1.30902, 2.11803],
      [-1.30902, 2.11803, 1.61803],
      [2.11803, -1.61803, 1.30902],
      [-2.11803, -1.61803, -1.30902],
      [2.92705, 0.5, 0.],
      [-1.30902, 0.5, -2.61803],
      [0.5, -2.61803, 1.30902],
      [2.11803, 1.61803, -1.30902],
      [1.30902, -0.5, 2.61803],
      [-2.92705, -0.5, 0.],
      [2.11803, 1.61803, 1.30902],
      [-2.11803, 1.61803, -1.30902],
      [1.30902, 0.5, 2.61803],
      [-2.92705, 0.5, 0.],
      [1.61803, 1.30902, 2.11803],
      [-2.61803, 1.30902, -0.5],
      [2.61803, -1.30902, 0.5],
      [-1.61803, -1.30902, -2.11803],
      [2.92705, -0.5, 0.],
      [-1.30902, -0.5, -2.61803],
      [-2.61803, 1.30902, 0.5],
      [-0.5, 0., 2.92705],
      [0.5, 2.61803, 1.30902],
      [-2.11803, -1.61803, 1.30902],
      [-0.5, 2.61803, -1.30902],
      [0.5, 0., 2.92705],
      [1.30902, 2.11803, 1.61803],
      [-1.30902, -2.11803, 1.61803],
      [0.5, 2.61803, -1.30902],
      [2.20344, 0.5, 2.17082],
      [2.20344, -0.5, 2.17082],
      [2.70344, -0.809017, 1.3618],
      [3.01246, 0., 0.861803],
      [2.70344, 0.809017, 1.3618],
      [-2.20344, 0.5, 2.17082],
      [-2.20344, -0.5, 2.17082],
      [-2.70344, -0.809017, 1.3618],
      [-3.01246, 0., 0.861803],
      [-2.70344, 0.809017, 1.3618],
    ],
    vertexDegree: [4.,3.,4.,3.,3.,3.,3.,3.,4.,4.,3.,4.,3.,4.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,3.,3.,3.,3.,3.,4.,3.,4.,3.,4.,3.,3.,3.,4.,4.,4.,3.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,3.,4.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ70", {
    dual: "J70",
    vertices: [
      [1.68169, -1.68169, 1.68169],
      [1.71017, -0.769672, 2.3023],
      [-2.72104, -1.03934, 0.],
      [2.72104, 1.03934, 0.],
      [2.47984, 1.24536, 1.05694],
      [-1.68169, 1.68169, -1.68169],
      [0., -2.72104, 1.03934],
      [1.68169, 1.68169, -1.68169],
      [-1.68169, 1.68169, 1.68169],
      [-2.47984, 1.24536, 1.05694],
      [-1.03934, 0., 2.72104],
      [-1.71017, -0.769672, 2.3023],
      [0., 2.72104, 1.03934],
      [-1.68169, -1.68169, 1.68169],
      [0., 2.72104, -1.03934],
      [-2.47984, -1.24536, 1.05694],
      [1.68169, -1.68169, -1.68169],
      [-1.68169, -1.68169, -1.68169],
      [-1.03934, 0., -2.72104],
      [0., -2.72104, -1.03934],
      [1.03934, 0., -2.72104],
      [2.72104, -1.03934, 0.],
      [-1.71017, 0.769672, 2.3023],
      [2.47984, -1.24536, 1.05694],
      [2.95552, 0., 0.287268],
      [1.03934, 0., 2.72104],
      [-2.95552, 0., 0.287268],
      [1.68169, 1.68169, 1.68169],
      [1.71017, 0.769672, 2.3023],
      [-2.72104, 1.03934, 0.],
      [2.16074, -1.05902, 1.73992],
      [2.81525, 0.654508, 0.680902],
      [-2.16074, 1.05902, 1.73992],
      [-1.75623, 0., 2.39443],
      [-2.16074, -1.05902, 1.73992],
      [-2.81525, -0.654508, 0.680902],
      [1.75623, 0., 2.39443],
      [2.16074, 1.05902, 1.73992],
      [-2.81525, 0.654508, 0.680902],
      [2.81525, -0.654508, 0.680902],
      [2.56525, 0., 1.58541],
      [-2.56525, 0., 1.58541],
      [0., -1.30902, 2.11803],
      [-1.30902, -2.11803, 0.],
      [-2.11803, 0., -1.30902],
      [1.30902, 2.11803, 0.],
      [0., 1.30902, -2.11803],
      [1.30902, -2.11803, 0.],
      [2.11803, 0., -1.30902],
      [-1.30902, 2.11803, 0.],
      [0., -1.30902, -2.11803],
      [0., 1.30902, 2.11803],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,10.,10.,10.,10.,10.,10.,10.,10.,10.,10.]
  }],
  ["J71", {
    dual: "dJ71",
    vertices: [
      [2.44569, -1.61803, 0.467086],
      [-2.44569, -1.61803, -0.467086],
      [2.44569, 1.61803, 0.467086],
      [-2.44569, 1.61803, -0.467086],
      [0.178411, -2.92705, 0.467086],
      [0.178411, 2.92705, 0.467086],
      [1.8002, -2.11803, 1.04444],
      [1.8002, 2.11803, 1.04444],
      [-0.57735, 0., -2.91278],
      [0.645497, -2.11803, -1.97861],
      [0.645497, 2.11803, -1.97861],
      [0., -2.61803, -1.40126],
      [0., 2.61803, -1.40126],
      [-1.8002, -2.11803, -1.04444],
      [-1.8002, 2.11803, -1.04444],
      [0., -2.61803, 1.40126],
      [0., 2.61803, 1.40126],
      [0.57735, 0., 2.91278],
      [-2.26728, -1.30902, 1.40126],
      [-2.26728, 1.30902, 1.40126],
      [-0.645497, -2.11803, 1.97861],
      [-0.645497, 2.11803, 1.97861],
      [1.51152, 0., 2.55596],
      [-1.51152, -1.61803, 1.97861],
      [-1.51152, 1.61803, 1.97861],
      [0.755761, -1.30902, -2.55596],
      [0.755761, 1.30902, -2.55596],
      [-0.755761, -1.30902, 2.55596],
      [-0.755761, 1.30902, 2.55596],
      [-0.288675, -0.5, 2.91278],
      [-0.288675, 0.5, 2.91278],
      [0.288675, -0.5, -2.91278],
      [0.288675, 0.5, -2.91278],
      [2.26728, -1.30902, 1.40126],
      [-2.62411, -1.30902, 0.467086],
      [2.26728, 1.30902, 1.40126],
      [-2.62411, 1.30902, 0.467086],
      [0.934172, -2.61803, 1.04444],
      [0.934172, 2.61803, 1.04444],
      [2.62411, -1.30902, -0.467086],
      [-2.26728, -1.30902, -1.40126],
      [2.62411, 1.30902, -0.467086],
      [-2.26728, 1.30902, -1.40126],
      [2.73437, -0.5, -1.04444],
      [-2.15702, -0.5, -1.97861],
      [2.73437, 0.5, -1.04444],
      [-2.15702, 0.5, -1.97861],
      [2.15702, -0.5, 1.97861],
      [-2.73437, -0.5, 1.04444],
      [2.15702, 0.5, 1.97861],
      [-2.73437, 0.5, 1.04444],
      [-1.51152, 0., -2.55596],
      [1.51152, -1.61803, -1.97861],
      [1.51152, 1.61803, -1.97861],
      [-0.934172, -2.61803, -1.04444],
      [-0.934172, 2.61803, -1.04444],
      [2.26728, -1.30902, -1.40126],
      [2.26728, 1.30902, -1.40126],
      [-0.178411, -2.92705, -0.467086],
      [-0.178411, 2.92705, -0.467086],
      [-3.12167, 0., 0.26984],
      [-3.0114, 0.809017, -0.30751],
      [-2.83299, 0.5, -1.24168],
      [-2.83299, -0.5, -1.24168],
      [-3.0114, -0.809017, -0.30751],
      [1.56083, -2.70344, 0.26984],
      [0.805073, -3.01246, -0.30751],
      [0.983484, -2.70344, -1.24168],
      [1.84951, -2.20344, -1.24168],
      [2.20633, -2.20344, -0.30751],
      [1.56083, 2.70344, 0.26984],
      [2.20633, 2.20344, -0.30751],
      [1.84951, 2.20344, -1.24168],
      [0.983484, 2.70344, -1.24168],
      [0.805073, 3.01246, -0.30751],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,3.,4.,4.,4.,4.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,3.,4.,4.,4.,4.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,4.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ71", {
    dual: "J71",
    vertices: [
      [2.17106, -1.68169, 0.970927],
      [2.42538, -1.71017, -0.102503],
      [-2.69374, -1.24536, -0.102503],
      [-2.17106, -1.68169, -0.970927],
      [2.17106, 1.68169, 0.970927],
      [2.42538, 1.71017, -0.102503],
      [-2.17106, 1.68169, -0.970927],
      [-2.69374, 1.24536, -0.102503],
      [0.370861, -2.72104, 0.970927],
      [0.268358, -2.95552, -0.102503],
      [0.370861, 2.72104, 0.970927],
      [0.268358, 2.95552, -0.102503],
      [1.43173, -2.47984, 0.786238],
      [1.43173, 2.47984, 0.786238],
      [0., 0., -2.91278],
      [0.970927, -1.68169, -2.17106],
      [0.542994, -2.47984, -1.54052],
      [0.542994, 2.47984, -1.54052],
      [0.970927, 1.68169, -2.17106],
      [-0.370861, -2.72104, -0.970927],
      [-0.370861, 2.72104, -0.970927],
      [0., 0., 2.91278],
      [-2.54192, -1.03934, 0.970927],
      [-2.54192, 1.03934, 0.970927],
      [-0.970927, -1.68169, 2.17106],
      [-0.970927, 1.68169, 2.17106],
      [1.94185, 0., 2.17106],
      [2.54192, -1.03934, -0.970927],
      [-2.4191, -0.769672, -1.54052],
      [2.54192, 1.03934, -0.970927],
      [-2.4191, 0.769672, -1.54052],
      [-1.94185, 0., -2.17106],
      [-2.86347, 0., 0.786238],
      [1.87611, -1.71017, -1.54052],
      [1.87611, 1.71017, -1.54052],
      [2.00326, -2.16074, 0.368463],
      [-2.63934, -1.05902, -0.854385],
      [2.00326, 2.16074, 0.368463],
      [-2.63934, 1.05902, -0.854385],
      [0.869623, -2.81525, 0.368463],
      [0.869623, 2.81525, 0.368463],
      [1.2475, -2.16074, -1.61015],
      [1.2475, 2.16074, -1.61015],
      [0.402536, -2.81525, -0.854385],
      [0.402536, 2.81525, -0.854385],
      [-2.87289, -0.654508, 0.368463],
      [-2.87289, 0.654508, 0.368463],
      [2.23681, -1.75623, -0.854385],
      [2.23681, 1.75623, -0.854385],
      [-2.49501, 0., -1.61015],
      [-2.96209, 0., -0.565709],
      [1.48105, -2.56525, -0.565709],
      [1.48105, 2.56525, -0.565709],
      [2.44569, 0., 0.467086],
      [-1.22285, -2.11803, 0.467086],
      [-1.22285, 2.11803, 0.467086],
      [0.755761, -1.30902, 1.97861],
      [0.755761, 1.30902, 1.97861],
      [-0.755761, -1.30902, -1.97861],
      [-0.755761, 1.30902, -1.97861],
      [-1.51152, 0., 1.97861],
      [1.51152, 0., -1.97861],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,10.,10.,10.,10.,10.,10.,10.,10.,10.]
  }],
  ["J72", {
    dual: "dJ72",
    vertices: [
      [0., -0.850651, 2.06457],
      [1.61803, 0., -1.53884],
      [-0.809017, -0.262866, 2.06457],
      [1.30902, 0.951057, -1.53884],
      [0.809017, -1.96417, 0.688191],
      [1.30902, -1.80171, -0.16246],
      [-0.5, 2.06457, 0.688191],
      [0., 2.22703, -0.16246],
      [-0.5, -1.53884, 1.53884],
      [1.30902, -0.951057, -1.53884],
      [-1.30902, 0.951057, 1.53884],
      [0.5, 1.53884, -1.53884],
      [-1.30902, -0.951057, 1.53884],
      [0.809017, -0.262866, -2.06457],
      [-1.61803, 0., 1.53884],
      [0.5, 0.688191, -2.06457],
      [0., -2.22703, 0.16246],
      [0.5, -2.06457, -0.688191],
      [-1.30902, 1.80171, 0.16246],
      [-0.809017, 1.96417, -0.688191],
      [0.5, 0.688191, 2.06457],
      [2.11803, 0.688191, -0.16246],
      [0.5, -1.53884, 1.53884],
      [1.80902, -1.11352, -0.688191],
      [-0.5, 1.53884, 1.53884],
      [0.809017, 1.96417, -0.688191],
      [1.30902, -0.951057, 1.53884],
      [2.11803, -0.688191, 0.16246],
      [0.5, 1.53884, 1.53884],
      [1.30902, 1.80171, 0.16246],
      [1.61803, 0., 1.53884],
      [2.11803, 0.16246, 0.688191],
      [1.30902, 0.951057, 1.53884],
      [1.80902, 1.11352, 0.688191],
      [1.61803, -1.37638, 0.688191],
      [0.809017, -0.262866, 2.06457],
      [2.11803, -0.16246, -0.688191],
      [-0.5, 0.688191, 2.06457],
      [1.61803, 1.37638, -0.688191],
      [0.5, 2.06457, 0.688191],
      [-0.809017, -1.96417, 0.688191],
      [0.5, -1.53884, -1.53884],
      [-1.80902, 1.11352, 0.688191],
      [-0.5, 1.53884, -1.53884],
      [-1.30902, -1.80171, -0.16246],
      [-0.5, -1.53884, -1.53884],
      [-2.11803, 0.688191, -0.16246],
      [-1.30902, 0.951057, -1.53884],
      [-1.80902, -1.11352, -0.688191],
      [-1.30902, -0.951057, -1.53884],
      [-2.11803, -0.16246, -0.688191],
      [-1.61803, 0., -1.53884],
      [-0.5, -2.06457, -0.688191],
      [-1.61803, -1.37638, 0.688191],
      [0., -0.850651, -2.06457],
      [-2.11803, 0.16246, 0.688191],
      [-0.5, 0.688191, -2.06457],
      [-1.61803, 1.37638, -0.688191],
      [-2.11803, -0.688191, 0.16246],
      [-0.809017, -0.262866, -2.06457],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ72", {
    dual: "J72",
    vertices: [
      [2.01503, -0.654722, -0.404641],
      [0., 2.11873, 0.404641],
      [1.24536, -1.71409, 0.404641],
      [1.24536, 1.71409, -0.404641],
      [1.24536, -0.404641, -1.71409],
      [0.769672, 1.05936, -1.71409],
      [-1.24536, -1.71409, 0.404641],
      [0., -1.30944, -1.71409],
      [-1.24536, 1.71409, -0.404641],
      [0., -2.11873, -0.404641],
      [-2.01503, 0.654722, 0.404641],
      [-0.769672, 1.05936, -1.71409],
      [2.01503, 0.654722, 0.404641],
      [-2.01503, -0.654722, -0.404641],
      [-1.24536, -0.404641, -1.71409],
      [1.71353, -0.556758, -1.11352],
      [2.11803, 0., 0.],
      [0.654508, 2.01437, 0.],
      [0., 1.80171, 1.11352],
      [1.05902, -1.45761, 1.11352],
      [1.71353, -1.24495, 0.],
      [1.71353, 1.24495, 0.],
      [1.05902, 1.45761, -1.11352],
      [0.654508, -0.900854, -1.80171],
      [-1.05902, -1.45761, 1.11352],
      [0., 1.11352, -1.80171],
      [-1.71353, 0.556758, 1.11352],
      [-1.71353, -1.24495, 0.],
      [-0.654508, -0.900854, -1.80171],
      [-1.05902, 1.45761, -1.11352],
      [-1.71353, 1.24495, 0.],
      [-0.654508, -2.01437, 0.],
      [0., -1.80171, -1.11352],
      [-2.11803, 0., 0.],
      [-1.05902, 0.344095, -1.80171],
      [1.71353, 0.556758, 1.11352],
      [0.654508, -2.01437, 0.],
      [1.05902, 0.344095, -1.80171],
      [-0.654508, 2.01437, 0.],
      [-1.71353, -0.556758, -1.11352],
      [0., 0., 2.06457],
      [1.75623, 0.570634, -0.923305],
      [1.08541, 1.49394, 0.923305],
      [1.75623, -0.570634, 0.923305],
      [1.08541, -1.49394, -0.923305],
      [0., -1.84661, 0.923305],
      [0., 1.84661, -0.923305],
      [-1.08541, 1.49394, 0.923305],
      [-1.75623, -0.570634, 0.923305],
      [0., 0., -2.06457],
      [-1.75623, 0.570634, -0.923305],
      [-1.08541, -1.49394, -0.923305],
      [1.24536, -0.404641, 1.71409],
      [-0.769672, 1.05936, 1.71409],
      [0., -1.30944, 1.71409],
      [-1.24536, -0.404641, 1.71409],
      [0.769672, 1.05936, 1.71409],
      [1.05902, 0.344095, 1.80171],
      [0.654508, -0.900854, 1.80171],
      [-1.05902, 0.344095, 1.80171],
      [0., 1.11352, 1.80171],
      [-0.654508, -0.900854, 1.80171],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.]
  }],
  ["J73", {
    dual: "dJ73",
    vertices: [
      [0., -0.850651, 2.06457],
      [1.61803, 0., -1.53884],
      [-0.809017, -0.262866, 2.06457],
      [1.30902, 0.951057, -1.53884],
      [0.809017, -1.96417, 0.688191],
      [1.30902, -1.80171, -0.16246],
      [-0.5, 2.06457, 0.688191],
      [0., 2.22703, -0.16246],
      [-0.5, -1.53884, 1.53884],
      [1.30902, -0.951057, -1.53884],
      [-1.30902, 0.951057, 1.53884],
      [0.5, 1.53884, -1.53884],
      [-1.30902, -0.951057, 1.53884],
      [0.5, -0.688191, -2.06457],
      [-1.61803, 0., 1.53884],
      [0.809017, 0.262866, -2.06457],
      [0., -2.22703, 0.16246],
      [0.5, -2.06457, -0.688191],
      [-1.30902, 1.80171, 0.16246],
      [-0.809017, 1.96417, -0.688191],
      [0.5, 0.688191, 2.06457],
      [2.11803, 0.688191, -0.16246],
      [0.5, -1.53884, 1.53884],
      [1.80902, -1.11352, -0.688191],
      [-0.5, 1.53884, 1.53884],
      [0.809017, 1.96417, -0.688191],
      [1.30902, -0.951057, 1.53884],
      [2.11803, -0.688191, 0.16246],
      [0.5, 1.53884, 1.53884],
      [1.30902, 1.80171, 0.16246],
      [1.61803, 0., 1.53884],
      [2.11803, 0.16246, 0.688191],
      [1.30902, 0.951057, 1.53884],
      [1.80902, 1.11352, 0.688191],
      [1.61803, -1.37638, 0.688191],
      [0.809017, -0.262866, 2.06457],
      [2.11803, -0.16246, -0.688191],
      [-0.5, 0.688191, 2.06457],
      [1.61803, 1.37638, -0.688191],
      [0.5, 2.06457, 0.688191],
      [-0.809017, -1.96417, 0.688191],
      [0.5, -1.53884, -1.53884],
      [-1.80902, 1.11352, 0.688191],
      [-0.5, 1.53884, -1.53884],
      [-1.30902, -1.80171, -0.16246],
      [-0.5, -1.53884, -1.53884],
      [-2.11803, 0.688191, -0.16246],
      [-1.30902, 0.951057, -1.53884],
      [-1.80902, -1.11352, -0.688191],
      [-1.30902, -0.951057, -1.53884],
      [-2.11803, -0.16246, -0.688191],
      [-1.61803, 0., -1.53884],
      [-0.5, -2.06457, -0.688191],
      [-1.61803, -1.37638, 0.688191],
      [-0.5, -0.688191, -2.06457],
      [-2.11803, 0.16246, 0.688191],
      [0., 0.850651, -2.06457],
      [-1.61803, 1.37638, -0.688191],
      [-2.11803, -0.688191, 0.16246],
      [-0.809017, 0.262866, -2.06457],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ73", {
    dual: "J73",
    vertices: [
      [2.01503, -0.654722, -0.404641],
      [0., 2.11873, 0.404641],
      [1.24536, -1.71409, 0.404641],
      [1.24536, 1.71409, -0.404641],
      [-1.24536, -1.71409, 0.404641],
      [-1.24536, 1.71409, -0.404641],
      [0., -2.11873, -0.404641],
      [-2.01503, 0.654722, 0.404641],
      [2.01503, 0.654722, 0.404641],
      [-2.01503, -0.654722, -0.404641],
      [1.71353, -0.556758, -1.11352],
      [2.11803, 0., 0.],
      [0.654508, 2.01437, 0.],
      [0., 1.80171, 1.11352],
      [1.05902, -1.45761, 1.11352],
      [1.71353, -1.24495, 0.],
      [1.71353, 1.24495, 0.],
      [1.05902, 1.45761, -1.11352],
      [-1.05902, -1.45761, 1.11352],
      [-1.71353, 0.556758, 1.11352],
      [-1.71353, -1.24495, 0.],
      [-1.05902, 1.45761, -1.11352],
      [-1.71353, 1.24495, 0.],
      [-0.654508, -2.01437, 0.],
      [0., -1.80171, -1.11352],
      [-2.11803, 0., 0.],
      [1.71353, 0.556758, 1.11352],
      [0.654508, -2.01437, 0.],
      [-0.654508, 2.01437, 0.],
      [-1.71353, -0.556758, -1.11352],
      [0., 0., 2.06457],
      [1.75623, 0.570634, -0.923305],
      [1.08541, 1.49394, 0.923305],
      [1.75623, -0.570634, 0.923305],
      [1.08541, -1.49394, -0.923305],
      [0., -1.84661, 0.923305],
      [0., 1.84661, -0.923305],
      [-1.08541, 1.49394, 0.923305],
      [-1.75623, -0.570634, 0.923305],
      [0., 0., -2.06457],
      [-1.75623, 0.570634, -0.923305],
      [-1.08541, -1.49394, -0.923305],
      [1.24536, -0.404641, 1.71409],
      [-0.769672, 1.05936, 1.71409],
      [0., -1.30944, 1.71409],
      [-1.24536, -0.404641, 1.71409],
      [0.769672, 1.05936, 1.71409],
      [1.05902, 0.344095, 1.80171],
      [0.654508, -0.900854, 1.80171],
      [-1.05902, 0.344095, 1.80171],
      [0., 1.11352, 1.80171],
      [-0.654508, -0.900854, 1.80171],
      [0.769672, -1.05936, -1.71409],
      [1.24536, 0.404641, -1.71409],
      [-0.769672, -1.05936, -1.71409],
      [0., 1.30944, -1.71409],
      [-1.24536, 0.404641, -1.71409],
      [0., -1.11352, -1.80171],
      [0.654508, 0.900854, -1.80171],
      [-1.05902, -0.344095, -1.80171],
      [-0.654508, 0.900854, -1.80171],
      [1.05902, -0.344095, -1.80171],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.]
  }],
  ["J74", {
    dual: "dJ74",
    vertices: [
      [-0.5, -0.5, -2.11803],
      [-0.5, -0.5, 2.11803],
      [-0.5, 0.5, -2.11803],
      [-0.5, 0.5, 2.11803],
      [-0.5, -2.11803, -0.5],
      [0., -2.20344, 0.361803],
      [-0.5, 2.11803, -0.5],
      [-0.809017, 1.89443, 0.861803],
      [0., -1.30902, -1.80902],
      [-0.5, -1.39443, 1.67082],
      [0., 1.30902, -1.80902],
      [0.5, 1.39443, 1.67082],
      [0.5, -0.5, -2.11803],
      [0.5, -0.5, 2.11803],
      [0.5, 0.5, -2.11803],
      [0.5, 0.5, 2.11803],
      [0.5, -2.11803, -0.5],
      [0.809017, -1.89443, 0.861803],
      [0.5, 2.11803, -0.5],
      [0., 2.20344, 0.361803],
      [-1.80902, 0., -1.30902],
      [-1.80902, 0., 1.30902],
      [-0.809017, -1.61803, -1.30902],
      [-0.809017, -1.89443, 0.861803],
      [-0.809017, 1.61803, -1.30902],
      [-0.5, 1.39443, 1.67082],
      [-1.61803, -1.30902, -0.809017],
      [-1.61803, -1.30902, 0.809017],
      [-1.61803, 1.30902, -0.809017],
      [-1.61803, 1.30902, 0.809017],
      [-2.11803, -0.5, -0.5],
      [-2.11803, -0.5, 0.5],
      [-2.11803, 0.5, -0.5],
      [-2.11803, 0.5, 0.5],
      [-1.30902, -1.80902, 0.],
      [-1.30902, -0.809017, -1.61803],
      [-1.30902, -0.809017, 1.61803],
      [-1.30902, 0.809017, -1.61803],
      [-1.30902, 0.809017, 1.61803],
      [-1.30902, 1.80902, 0.],
      [0.809017, -1.61803, -1.30902],
      [0.5, -1.39443, 1.67082],
      [0.809017, 1.61803, -1.30902],
      [0.809017, 1.89443, 0.861803],
      [1.61803, -1.30902, -0.809017],
      [1.61803, -1.30902, 0.809017],
      [1.61803, 1.30902, -0.809017],
      [1.61803, 1.30902, 0.809017],
      [2.11803, -0.5, -0.5],
      [2.11803, -0.5, 0.5],
      [2.11803, 0.5, -0.5],
      [2.11803, 0.5, 0.5],
      [1.30902, -1.80902, 0.],
      [1.30902, -0.809017, -1.61803],
      [1.30902, -0.809017, 1.61803],
      [1.30902, 0.809017, -1.61803],
      [1.30902, 0.809017, 1.61803],
      [1.30902, 1.80902, 0.],
      [1.80902, 0., -1.30902],
      [1.80902, 0., 1.30902],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ74", {
    dual: "J74",
    vertices: [
      [-1.24536, -1.24536, -1.24536],
      [-1.24536, 1.24536, -1.24536],
      [0., -0.769672, -2.01503],
      [0., 0.769672, -2.01503],
      [1.24536, -1.24536, -1.24536],
      [1.24536, 1.24536, -1.24536],
      [-2.01503, 0., 0.769672],
      [-2.01503, 0., -0.769672],
      [2.01503, 0., -0.769672],
      [2.01503, 0., 0.769672],
      [-1.71353, -0.654508, -1.05902],
      [-0.654508, -1.05902, -1.71353],
      [-1.71353, -0.654508, 1.05902],
      [-1.05902, 1.71353, -0.654508],
      [-1.05902, -1.71353, -0.654508],
      [-0.654508, 1.05902, -1.71353],
      [-1.71353, 0.654508, -1.05902],
      [-1.71353, 0.654508, 1.05902],
      [0.654508, -1.05902, -1.71353],
      [0.654508, 1.05902, -1.71353],
      [1.71353, -0.654508, -1.05902],
      [1.71353, -0.654508, 1.05902],
      [1.05902, 1.71353, -0.654508],
      [1.05902, -1.71353, -0.654508],
      [1.71353, 0.654508, -1.05902],
      [1.71353, 0.654508, 1.05902],
      [-2.11803, 0., 0.],
      [0., 0., -2.11803],
      [0., 0., 2.11803],
      [2.11803, 0., 0.],
      [-1.08541, 0., -1.75623],
      [-1.08541, 0., 1.75623],
      [-1.75623, 1.08541, 0.],
      [-1.75623, -1.08541, 0.],
      [0., -1.75623, 1.08541],
      [0., -1.75623, -1.08541],
      [0., 1.75623, 1.08541],
      [0., 1.75623, -1.08541],
      [1.08541, 0., -1.75623],
      [1.08541, 0., 1.75623],
      [1.75623, 1.08541, 0.],
      [1.75623, -1.08541, 0.],
      [-1.24536, -1.67082, 0.55694],
      [0., -2.1465, -0.212732],
      [-0.769672, -0.901148, 1.8023],
      [0.769672, -0.901148, 1.8023],
      [1.24536, -1.67082, 0.55694],
      [-1.05902, -1.35172, 1.23992],
      [-0.654508, -2.00623, 0.180902],
      [0., -0.947214, 1.89443],
      [1.05902, -1.35172, 1.23992],
      [0.654508, -2.00623, 0.180902],
      [-1.24536, 1.67082, 0.55694],
      [-0.769672, 0.901148, 1.8023],
      [0.769672, 0.901148, 1.8023],
      [0., 2.1465, -0.212732],
      [1.24536, 1.67082, 0.55694],
      [-1.05902, 1.35172, 1.23992],
      [0., 0.947214, 1.89443],
      [1.05902, 1.35172, 1.23992],
      [0.654508, 2.00623, 0.180902],
      [-0.654508, 2.00623, 0.180902],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.]
  }],
  ["J75", {
    dual: "dJ75",
    vertices: [
      [-0.5, 0.288675, -2.15702],
      [-0.5, -1.22285, 1.8002],
      [-0.5, 1.22285, -1.8002],
      [-0.5, -0.288675, 2.15702],
      [-0.5, -1.8002, -1.22285],
      [0., -2.1875, -0.448251],
      [-0.5, 2.15702, 0.288675],
      [-0.5, 1.8002, 1.22285],
      [0., -0.57735, -2.15702],
      [-0.5, -1.89882, 1.06327],
      [0., 1.86834, -1.22285],
      [0., 0.57735, 2.15702],
      [0.5, 0.288675, -2.15702],
      [0.5, -1.22285, 1.8002],
      [0.5, 1.22285, -1.8002],
      [0.5, -0.288675, 2.15702],
      [0.5, -1.8002, -1.22285],
      [0.809017, -2.07723, 0.129099],
      [0.5, 2.15702, 0.288675],
      [0.5, 1.8002, 1.22285],
      [-1.80902, 0.467086, -1.22285],
      [-1.80902, -0.467086, 1.22285],
      [-0.809017, -1.04444, -1.8002],
      [-0.809017, -2.07723, 0.129099],
      [-0.809017, 1.97861, -0.645497],
      [-0.809017, 1.04444, 1.8002],
      [-1.61803, -0.934172, -1.22285],
      [-1.61803, -1.51152, 0.288675],
      [-1.89443, 1.09375, -0.448251],
      [-1.39443, 1.38242, 1.06327],
      [-2.11803, -0.288675, -0.645497],
      [-2.11803, -0.645497, 0.288675],
      [-2.20344, 0.337987, 0.129099],
      [-1.89443, 0.516398, 1.06327],
      [-1.30902, -1.68993, -0.645497],
      [-1.30902, -0.178411, -1.8002],
      [-1.30902, -1.33311, 1.22285],
      [-1.30902, 1.33311, -1.22285],
      [-1.30902, 0.178411, 1.8002],
      [-1.39443, 1.73925, 0.129099],
      [0.809017, -1.04444, -1.8002],
      [0.5, -1.89882, 1.06327],
      [0.809017, 1.97861, -0.645497],
      [0.809017, 1.04444, 1.8002],
      [1.61803, -0.934172, -1.22285],
      [1.61803, -1.51152, 0.288675],
      [1.39443, 1.73925, 0.129099],
      [1.89443, 0.516398, 1.06327],
      [2.11803, -0.288675, -0.645497],
      [2.11803, -0.645497, 0.288675],
      [1.89443, 1.09375, -0.448251],
      [2.20344, 0.337987, 0.129099],
      [1.30902, -1.68993, -0.645497],
      [1.30902, -0.178411, -1.8002],
      [1.30902, -1.33311, 1.22285],
      [1.30902, 1.33311, -1.22285],
      [1.30902, 0.178411, 1.8002],
      [1.39443, 1.38242, 1.06327],
      [1.80902, 0.467086, -1.22285],
      [1.80902, -0.467086, 1.22285],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ75", {
    dual: "J75",
    vertices: [
      [0., 0., -2.15702],
      [-0.769672, -1.48493, 1.36211],
      [0., 1.43801, -1.60775],
      [0., 0., 2.15702],
      [0., -1.9293, -0.964649],
      [-0.901148, 1.95829, -0.0759075],
      [-0.901148, 1.40902, 1.36211],
      [0.769672, -1.48493, 1.36211],
      [1.24536, -1.75956, -0.0759075],
      [0.901148, 1.95829, -0.0759075],
      [0.901148, 1.40902, 1.36211],
      [-1.67082, 0.964649, -0.964649],
      [-1.67082, 0.0759075, 1.36211],
      [-1.24536, -0.719007, -1.60775],
      [-1.24536, -1.75956, -0.0759075],
      [-2.1465, -0.198729, -0.0759075],
      [1.24536, -0.719007, -1.60775],
      [1.67082, 0.0759075, 1.36211],
      [2.1465, -0.198729, -0.0759075],
      [1.67082, 0.964649, -0.964649],
      [0., 0.755761, -1.97861],
      [-0.654508, -0.377881, -1.97861],
      [0., -1.56083, 1.43173],
      [0., -0.755761, 1.97861],
      [-0.654508, 1.60073, -1.22285],
      [-0.654508, 0.377881, 1.97861],
      [-0.654508, -1.93871, -0.546874],
      [-1.05902, -1.36719, -1.22285],
      [0.654508, -1.93871, -0.546874],
      [0., 1.97861, 0.755761],
      [-0.947214, 1.76972, 0.675973],
      [0.654508, -0.377881, -1.97861],
      [-1.05902, -1.70517, 0.675973],
      [0.654508, 1.60073, -1.22285],
      [0.654508, 0.377881, 1.97861],
      [1.05902, -1.36719, -1.22285],
      [1.05902, -1.70517, 0.675973],
      [0.947214, 1.76972, 0.675973],
      [-2.00623, 0.402536, -0.546874],
      [-1.71353, -0.233543, -1.22285],
      [-1.71353, -0.989304, 0.755761],
      [-2.00623, -0.0645497, 0.675973],
      [-1.35172, 1.53618, -0.546874],
      [-1.35172, 0.780417, 1.43173],
      [1.35172, 1.53618, -0.546874],
      [1.35172, 0.780417, 1.43173],
      [1.71353, -0.233543, -1.22285],
      [1.71353, -0.989304, 0.755761],
      [2.00623, -0.0645497, 0.675973],
      [2.00623, 0.402536, -0.546874],
      [-1.08541, 0.626662, -1.64062],
      [-1.08541, -0.626662, 1.64062],
      [0., -1.25332, -1.64062],
      [0., -2.02792, 0.387298],
      [0., 2.02792, -0.387298],
      [0., 1.25332, 1.64062],
      [1.08541, 0.626662, -1.64062],
      [1.08541, -0.626662, 1.64062],
      [-1.75623, -1.01396, -0.387298],
      [-1.75623, 1.01396, 0.387298],
      [1.75623, -1.01396, -0.387298],
      [1.75623, 1.01396, 0.387298],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.]
  }],
  ["J76", {
    dual: "dJ76",
    vertices: [
      [-0.5, -0.688191, 2.06457],
      [1.61803, 0., -1.53884],
      [-0.809017, 0.262866, 2.06457],
      [1.30902, 0.951057, -1.53884],
      [0.809017, -1.96417, 0.688191],
      [1.30902, -1.80171, -0.16246],
      [-0.5, 2.06457, 0.688191],
      [0., 2.22703, -0.16246],
      [-0.5, -1.53884, 1.53884],
      [1.30902, -0.951057, -1.53884],
      [-1.30902, 0.951057, 1.53884],
      [0.5, 1.53884, -1.53884],
      [-1.30902, -0.951057, 1.53884],
      [-1.61803, 0., 1.53884],
      [0., -2.22703, 0.16246],
      [0.5, -2.06457, -0.688191],
      [-1.30902, 1.80171, 0.16246],
      [-0.809017, 1.96417, -0.688191],
      [0.809017, 0.262866, 2.06457],
      [2.11803, 0.688191, -0.16246],
      [0.5, -1.53884, 1.53884],
      [1.80902, -1.11352, -0.688191],
      [-0.5, 1.53884, 1.53884],
      [0.809017, 1.96417, -0.688191],
      [1.30902, -0.951057, 1.53884],
      [2.11803, -0.688191, 0.16246],
      [0.5, 1.53884, 1.53884],
      [1.30902, 1.80171, 0.16246],
      [1.61803, 0., 1.53884],
      [2.11803, 0.16246, 0.688191],
      [1.30902, 0.951057, 1.53884],
      [1.80902, 1.11352, 0.688191],
      [1.61803, -1.37638, 0.688191],
      [0.5, -0.688191, 2.06457],
      [2.11803, -0.16246, -0.688191],
      [0., 0.850651, 2.06457],
      [1.61803, 1.37638, -0.688191],
      [0.5, 2.06457, 0.688191],
      [-0.809017, -1.96417, 0.688191],
      [0.5, -1.53884, -1.53884],
      [-1.80902, 1.11352, 0.688191],
      [-0.5, 1.53884, -1.53884],
      [-1.30902, -1.80171, -0.16246],
      [-0.5, -1.53884, -1.53884],
      [-2.11803, 0.688191, -0.16246],
      [-1.30902, 0.951057, -1.53884],
      [-1.80902, -1.11352, -0.688191],
      [-1.30902, -0.951057, -1.53884],
      [-2.11803, -0.16246, -0.688191],
      [-1.61803, 0., -1.53884],
      [-0.5, -2.06457, -0.688191],
      [-1.61803, -1.37638, 0.688191],
      [-2.11803, 0.16246, 0.688191],
      [-1.61803, 1.37638, -0.688191],
      [-2.11803, -0.688191, 0.16246],
    ],
    vertexDegree: [4.,3.,4.,3.,4.,4.,4.,4.,4.,3.,4.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,4.,4.,4.,4.]
  }],
  ["dJ76", {
    dual: "J76",
    vertices: [
      [-0.769672, -1.05936, 1.71409],
      [-1.24536, 0.404641, 1.71409],
      [1.24536, -1.71409, 0.404641],
      [0., 2.11873, 0.404641],
      [0., -2.11873, -0.404641],
      [-1.24536, 1.71409, -0.404641],
      [1.24536, 0.404641, 1.71409],
      [2.01503, 0.654722, 0.404641],
      [0.769672, -1.05936, 1.71409],
      [2.01503, -0.654722, -0.404641],
      [0., 1.30944, 1.71409],
      [1.24536, 1.71409, -0.404641],
      [-1.24536, -1.71409, 0.404641],
      [-2.01503, 0.654722, 0.404641],
      [-2.01503, -0.654722, -0.404641],
      [-1.05902, -0.344095, 1.80171],
      [0., -1.11352, 1.80171],
      [1.71353, -0.556758, -1.11352],
      [-0.654508, 0.900854, 1.80171],
      [1.05902, 1.45761, -1.11352],
      [0.654508, -2.01437, 0.],
      [1.05902, -1.45761, 1.11352],
      [1.71353, -1.24495, 0.],
      [-0.654508, 2.01437, 0.],
      [0., 1.80171, 1.11352],
      [0.654508, 2.01437, 0.],
      [-1.05902, -1.45761, 1.11352],
      [-1.71353, 0.556758, 1.11352],
      [-0.654508, -2.01437, 0.],
      [0., -1.80171, -1.11352],
      [-1.71353, 1.24495, 0.],
      [-1.05902, 1.45761, -1.11352],
      [0.654508, 0.900854, 1.80171],
      [1.05902, -0.344095, 1.80171],
      [2.11803, 0., 0.],
      [1.71353, 1.24495, 0.],
      [1.71353, 0.556758, 1.11352],
      [-1.71353, -1.24495, 0.],
      [-2.11803, 0., 0.],
      [-1.71353, -0.556758, -1.11352],
      [0., 0., 2.06457],
      [1.75623, 0.570634, -0.923305],
      [0., -1.84661, 0.923305],
      [1.08541, -1.49394, -0.923305],
      [-1.08541, 1.49394, 0.923305],
      [0., 1.84661, -0.923305],
      [-1.75623, -0.570634, 0.923305],
      [1.75623, -0.570634, 0.923305],
      [1.08541, 1.49394, 0.923305],
      [-1.08541, -1.49394, -0.923305],
      [-1.75623, 0.570634, -0.923305],
      [0., 0., -1.53884],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,10.]
  }],
  ["J77", {
    dual: "dJ77",
    vertices: [
      [0., -0.850651, 2.06457],
      [1.61803, 0., -1.53884],
      [-0.809017, -0.262866, 2.06457],
      [1.30902, 0.951057, -1.53884],
      [0.809017, -1.96417, 0.688191],
      [1.30902, -1.80171, -0.16246],
      [-0.5, 2.06457, 0.688191],
      [0., 2.22703, -0.16246],
      [-0.5, -1.53884, 1.53884],
      [1.30902, -0.951057, -1.53884],
      [-1.30902, 0.951057, 1.53884],
      [0.5, 1.53884, -1.53884],
      [-1.30902, -0.951057, 1.53884],
      [-1.61803, 0., 1.53884],
      [0., -2.22703, 0.16246],
      [0.5, -2.06457, -0.688191],
      [-1.30902, 1.80171, 0.16246],
      [-0.809017, 1.96417, -0.688191],
      [0.5, 0.688191, 2.06457],
      [2.11803, 0.688191, -0.16246],
      [0.5, -1.53884, 1.53884],
      [1.80902, -1.11352, -0.688191],
      [-0.5, 1.53884, 1.53884],
      [0.809017, 1.96417, -0.688191],
      [1.30902, -0.951057, 1.53884],
      [2.11803, -0.688191, 0.16246],
      [0.5, 1.53884, 1.53884],
      [1.30902, 1.80171, 0.16246],
      [1.61803, 0., 1.53884],
      [2.11803, 0.16246, 0.688191],
      [1.30902, 0.951057, 1.53884],
      [1.80902, 1.11352, 0.688191],
      [1.61803, -1.37638, 0.688191],
      [0.809017, -0.262866, 2.06457],
      [2.11803, -0.16246, -0.688191],
      [-0.5, 0.688191, 2.06457],
      [1.61803, 1.37638, -0.688191],
      [0.5, 2.06457, 0.688191],
      [-0.809017, -1.96417, 0.688191],
      [0.5, -1.53884, -1.53884],
      [-1.80902, 1.11352, 0.688191],
      [-0.5, 1.53884, -1.53884],
      [-1.30902, -1.80171, -0.16246],
      [-0.5, -1.53884, -1.53884],
      [-2.11803, 0.688191, -0.16246],
      [-1.30902, 0.951057, -1.53884],
      [-1.80902, -1.11352, -0.688191],
      [-1.30902, -0.951057, -1.53884],
      [-2.11803, -0.16246, -0.688191],
      [-1.61803, 0., -1.53884],
      [-0.5, -2.06457, -0.688191],
      [-1.61803, -1.37638, 0.688191],
      [-2.11803, 0.16246, 0.688191],
      [-1.61803, 1.37638, -0.688191],
      [-2.11803, -0.688191, 0.16246],
    ],
    vertexDegree: [4.,3.,4.,3.,4.,4.,4.,4.,4.,3.,4.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,4.,4.,4.,4.]
  }],
  ["dJ77", {
    dual: "J77",
    vertices: [
      [0., -1.30944, 1.71409],
      [-1.24536, -0.404641, 1.71409],
      [1.24536, -1.71409, 0.404641],
      [0., 2.11873, 0.404641],
      [-0.769672, 1.05936, 1.71409],
      [0., -2.11873, -0.404641],
      [-1.24536, 1.71409, -0.404641],
      [0.769672, 1.05936, 1.71409],
      [2.01503, 0.654722, 0.404641],
      [2.01503, -0.654722, -0.404641],
      [1.24536, 1.71409, -0.404641],
      [1.24536, -0.404641, 1.71409],
      [-1.24536, -1.71409, 0.404641],
      [-2.01503, 0.654722, 0.404641],
      [-2.01503, -0.654722, -0.404641],
      [-0.654508, -0.900854, 1.80171],
      [0.654508, -0.900854, 1.80171],
      [1.71353, -0.556758, -1.11352],
      [-1.05902, 0.344095, 1.80171],
      [1.05902, 1.45761, -1.11352],
      [0.654508, -2.01437, 0.],
      [1.05902, -1.45761, 1.11352],
      [1.71353, -1.24495, 0.],
      [-0.654508, 2.01437, 0.],
      [0., 1.80171, 1.11352],
      [0.654508, 2.01437, 0.],
      [-1.05902, -1.45761, 1.11352],
      [-1.71353, 0.556758, 1.11352],
      [-0.654508, -2.01437, 0.],
      [0., -1.80171, -1.11352],
      [-1.71353, 1.24495, 0.],
      [-1.05902, 1.45761, -1.11352],
      [0., 1.11352, 1.80171],
      [1.05902, 0.344095, 1.80171],
      [2.11803, 0., 0.],
      [1.71353, 1.24495, 0.],
      [1.71353, 0.556758, 1.11352],
      [-1.71353, -1.24495, 0.],
      [-2.11803, 0., 0.],
      [-1.71353, -0.556758, -1.11352],
      [0., 0., 2.06457],
      [1.75623, 0.570634, -0.923305],
      [0., -1.84661, 0.923305],
      [1.08541, -1.49394, -0.923305],
      [-1.08541, 1.49394, 0.923305],
      [0., 1.84661, -0.923305],
      [-1.75623, -0.570634, 0.923305],
      [1.75623, -0.570634, 0.923305],
      [1.08541, 1.49394, 0.923305],
      [-1.08541, -1.49394, -0.923305],
      [-1.75623, 0.570634, -0.923305],
      [0., 0., -1.53884],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,10.]
  }],
  ["J78", {
    dual: "dJ78",
    vertices: [
      [0.688191, -0.5, 2.06457],
      [0., 1.61803, -1.53884],
      [-0.262866, -0.809017, 2.06457],
      [-0.951057, 1.30902, -1.53884],
      [1.72905, 0.809017, 1.15842],
      [1.80171, 1.30902, -0.16246],
      [-2.06457, -0.5, 0.688191],
      [-2.22703, 0., -0.16246],
      [1.72905, -0.809017, 1.15842],
      [0.951057, 1.30902, -1.53884],
      [-0.951057, -1.30902, 1.53884],
      [-1.53884, 0.5, -1.53884],
      [0.951057, -1.30902, 1.53884],
      [0., -1.61803, 1.53884],
      [2.15438, 0.5, 0.307768],
      [2.06457, 0.5, -0.688191],
      [-1.80171, -1.30902, 0.16246],
      [-1.96417, -0.809017, -0.688191],
      [-0.262866, 0.809017, 2.06457],
      [-0.688191, 2.11803, -0.16246],
      [1.46619, 0., 1.68415],
      [1.11352, 1.80902, -0.688191],
      [-1.53884, -0.5, 1.53884],
      [-1.96417, 0.809017, -0.688191],
      [0.951057, 1.30902, 1.53884],
      [0.688191, 2.11803, 0.16246],
      [-1.53884, 0.5, 1.53884],
      [-1.80171, 1.30902, 0.16246],
      [0., 1.61803, 1.53884],
      [-0.16246, 2.11803, 0.688191],
      [-0.951057, 1.30902, 1.53884],
      [-1.11352, 1.80902, 0.688191],
      [1.37638, 1.61803, 0.688191],
      [0.688191, 0.5, 2.06457],
      [0.16246, 2.11803, -0.688191],
      [-0.850651, 0., 2.06457],
      [-1.37638, 1.61803, -0.688191],
      [-2.06457, 0.5, 0.688191],
      [2.15438, -0.5, 0.307768],
      [1.53884, 0.5, -1.53884],
      [-1.11352, -1.80902, 0.688191],
      [-1.53884, -0.5, -1.53884],
      [1.80171, -1.30902, -0.16246],
      [1.53884, -0.5, -1.53884],
      [-0.688191, -2.11803, -0.16246],
      [-0.951057, -1.30902, -1.53884],
      [1.11352, -1.80902, -0.688191],
      [0.951057, -1.30902, -1.53884],
      [0.16246, -2.11803, -0.688191],
      [0., -1.61803, -1.53884],
      [2.06457, -0.5, -0.688191],
      [1.37638, -1.61803, 0.688191],
      [-0.16246, -2.11803, 0.688191],
      [-1.37638, -1.61803, -0.688191],
      [0.688191, -2.11803, 0.16246],
    ],
    vertexDegree: [4.,3.,4.,3.,4.,4.,4.,4.,4.,3.,4.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,4.,4.,4.,4.]
  }],
  ["dJ78", {
    dual: "J78",
    vertices: [
      [0.947523, 0., 1.93777],
      [-0.404641, -1.24536, 1.71409],
      [1.35216, 1.24536, 1.12848],
      [2.00689, 0.769672, -0.180961],
      [-2.11873, 0., 0.404641],
      [1.35216, -1.24536, 1.12848],
      [-1.71409, -1.24536, -0.404641],
      [-0.404641, 1.24536, 1.71409],
      [-0.654722, 2.01503, 0.404641],
      [0.654722, 2.01503, -0.404641],
      [-1.30944, 0., 1.71409],
      [-1.71409, 1.24536, -0.404641],
      [2.00689, -0.769672, -0.180961],
      [-0.654722, -2.01503, 0.404641],
      [0.654722, -2.01503, -0.404641],
      [0.344095, -1.05902, 1.80171],
      [1.20862, -0.654508, 1.6115],
      [0.556758, 1.71353, -1.11352],
      [-0.900854, -0.654508, 1.80171],
      [-1.45761, 1.05902, -1.11352],
      [1.76538, 1.05902, 0.49798],
      [1.20862, 0.654508, 1.6115],
      [1.24495, 1.71353, 0.],
      [-2.01437, -0.654508, 0.],
      [-1.80171, 0., 1.11352],
      [-2.01437, 0.654508, 0.],
      [1.76538, -1.05902, 0.49798],
      [-0.556758, -1.71353, 1.11352],
      [2.10948, 0., -0.190211],
      [1.80171, 0., -1.11352],
      [-1.24495, -1.71353, 0.],
      [-1.45761, -1.05902, -1.11352],
      [-0.900854, 0.654508, 1.80171],
      [0.344095, 1.05902, 1.80171],
      [0., 2.11803, 0.],
      [-1.24495, 1.71353, 0.],
      [-0.556758, 1.71353, 1.11352],
      [1.24495, -1.71353, 0.],
      [0., -2.11803, 0.],
      [0.556758, -1.71353, -1.11352],
      [0., 0., 2.06457],
      [-0.570634, 1.75623, -0.923305],
      [1.84661, 0., 0.923305],
      [1.49394, 1.08541, -0.923305],
      [-1.49394, -1.08541, 0.923305],
      [-1.84661, 0., -0.923305],
      [0.570634, -1.75623, 0.923305],
      [0.570634, 1.75623, 0.923305],
      [-1.49394, 1.08541, 0.923305],
      [1.49394, -1.08541, -0.923305],
      [-0.570634, -1.75623, -0.923305],
      [0., 0., -1.53884],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,10.]
  }],
  ["J79", {
    dual: "dJ79",
    vertices: [
      [-0.5, -0.688191, 2.06457],
      [1.61803, 0., -1.53884],
      [-0.809017, 0.262866, 2.06457],
      [1.30902, 0.951057, -1.53884],
      [0.809017, -1.96417, 0.688191],
      [1.30902, -1.80171, -0.16246],
      [-0.5, 2.06457, 0.688191],
      [0., 2.22703, -0.16246],
      [-0.5, -1.53884, 1.53884],
      [1.30902, -0.951057, -1.53884],
      [-1.30902, 0.951057, 1.53884],
      [0.5, 1.53884, -1.53884],
      [-1.39443, -0.453077, 1.68415],
      [-1.89443, 0.235114, 1.15842],
      [0., -2.22703, 0.16246],
      [0.5, -2.06457, -0.688191],
      [-1.30902, 1.80171, 0.16246],
      [-0.809017, 1.96417, -0.688191],
      [0.809017, 0.262866, 2.06457],
      [2.11803, 0.688191, -0.16246],
      [0.5, -1.53884, 1.53884],
      [1.80902, -1.11352, -0.688191],
      [-0.5, 1.53884, 1.53884],
      [0.809017, 1.96417, -0.688191],
      [1.39443, -1.30373, 1.15842],
      [2.20344, -0.190211, 0.307768],
      [0.5, 1.53884, 1.53884],
      [1.30902, 1.80171, 0.16246],
      [1.39443, -0.453077, 1.68415],
      [1.89443, 0.235114, 1.15842],
      [1.30902, 0.951057, 1.53884],
      [1.80902, 1.11352, 0.688191],
      [1.89443, -1.14127, 0.307768],
      [0.5, -0.688191, 2.06457],
      [2.11803, -0.16246, -0.688191],
      [0., 0.850651, 2.06457],
      [1.61803, 1.37638, -0.688191],
      [0.5, 2.06457, 0.688191],
      [-0.809017, -1.96417, 0.688191],
      [0.5, -1.53884, -1.53884],
      [-1.80902, 1.11352, 0.688191],
      [-0.5, 1.53884, -1.53884],
      [-1.30902, -1.80171, -0.16246],
      [-0.5, -1.53884, -1.53884],
      [-2.11803, 0.688191, -0.16246],
      [-1.30902, 0.951057, -1.53884],
      [-1.80902, -1.11352, -0.688191],
      [-1.30902, -0.951057, -1.53884],
      [-2.11803, -0.16246, -0.688191],
      [-1.61803, 0., -1.53884],
      [-0.5, -2.06457, -0.688191],
      [-1.39443, -1.30373, 1.15842],
      [-2.20344, -0.190211, 0.307768],
      [-1.61803, 1.37638, -0.688191],
      [-1.89443, -1.14127, 0.307768],
    ],
    vertexDegree: [4.,3.,4.,3.,4.,4.,4.,4.,4.,3.,4.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,4.,4.,4.,4.]
  }],
  ["dJ79", {
    dual: "J79",
    vertices: [
      [-0.901148, -0.292801, 1.93777],
      [0.901148, -1.60225, 1.12848],
      [1.67082, -1.35216, -0.180961],
      [0., 2.11873, 0.404641],
      [-0.901148, -1.60225, 1.12848],
      [-1.67082, 0.766562, 1.12848],
      [0., -2.11873, -0.404641],
      [-1.24536, 1.71409, -0.404641],
      [0.901148, -0.292801, 1.93777],
      [2.1465, 0.11184, -0.180961],
      [0., 1.30944, 1.71409],
      [1.24536, 1.71409, -0.404641],
      [1.67082, 0.766562, 1.12848],
      [-1.67082, -1.35216, -0.180961],
      [-2.1465, 0.11184, -0.180961],
      [0., -1.11352, 1.80171],
      [-0.947214, -0.995959, 1.6115],
      [1.71353, -0.556758, -1.11352],
      [-1.35172, 0.24899, 1.6115],
      [-0.654508, 0.900854, 1.80171],
      [1.05902, 1.45761, -1.11352],
      [1.35172, -1.55272, 0.49798],
      [0.654508, -2.01437, 0.],
      [-0.654508, 2.01437, 0.],
      [0., 1.80171, 1.11352],
      [0.654508, 2.01437, 0.],
      [-2.00623, 0.461653, 0.49798],
      [-0.654508, -2.01437, 0.],
      [0., -1.80171, -1.11352],
      [-1.71353, 1.24495, 0.],
      [-1.05902, 1.45761, -1.11352],
      [1.35172, 0.24899, 1.6115],
      [0.654508, 0.900854, 1.80171],
      [2.00623, 0.461653, 0.49798],
      [1.71353, 1.24495, 0.],
      [0.947214, -0.995959, 1.6115],
      [2.00623, -0.651864, -0.190211],
      [-1.35172, -1.55272, 0.49798],
      [-1.71353, -0.556758, -1.11352],
      [-2.00623, -0.651864, -0.190211],
      [0., 0., 2.06457],
      [1.75623, 0.570634, -0.923305],
      [0., -1.84661, 0.923305],
      [1.08541, -1.49394, -0.923305],
      [-1.08541, 1.49394, 0.923305],
      [0., 1.84661, -0.923305],
      [-1.75623, -0.570634, 0.923305],
      [1.75623, -0.570634, 0.923305],
      [1.08541, 1.49394, 0.923305],
      [-1.08541, -1.49394, -0.923305],
      [-1.75623, 0.570634, -0.923305],
      [0., 0., -1.53884],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,10.]
  }],
  ["J80", {
    dual: "dJ80",
    vertices: [
      [1.61803, 0., -1.53884],
      [1.30902, 0.951057, -1.53884],
      [0.809017, -1.96417, 0.688191],
      [1.30902, -1.80171, -0.16246],
      [-0.5, 2.06457, 0.688191],
      [0., 2.22703, -0.16246],
      [-0.5, -1.53884, 1.53884],
      [1.30902, -0.951057, -1.53884],
      [-1.30902, 0.951057, 1.53884],
      [0.5, 1.53884, -1.53884],
      [-1.30902, -0.951057, 1.53884],
      [-1.61803, 0., 1.53884],
      [0., -2.22703, 0.16246],
      [0.5, -2.06457, -0.688191],
      [-1.30902, 1.80171, 0.16246],
      [-0.809017, 1.96417, -0.688191],
      [2.11803, 0.688191, -0.16246],
      [0.5, -1.53884, 1.53884],
      [1.80902, -1.11352, -0.688191],
      [-0.5, 1.53884, 1.53884],
      [0.809017, 1.96417, -0.688191],
      [1.30902, -0.951057, 1.53884],
      [2.11803, -0.688191, 0.16246],
      [0.5, 1.53884, 1.53884],
      [1.30902, 1.80171, 0.16246],
      [1.61803, 0., 1.53884],
      [2.11803, 0.16246, 0.688191],
      [1.30902, 0.951057, 1.53884],
      [1.80902, 1.11352, 0.688191],
      [1.61803, -1.37638, 0.688191],
      [2.11803, -0.16246, -0.688191],
      [1.61803, 1.37638, -0.688191],
      [0.5, 2.06457, 0.688191],
      [-0.809017, -1.96417, 0.688191],
      [0.5, -1.53884, -1.53884],
      [-1.80902, 1.11352, 0.688191],
      [-0.5, 1.53884, -1.53884],
      [-1.30902, -1.80171, -0.16246],
      [-0.5, -1.53884, -1.53884],
      [-2.11803, 0.688191, -0.16246],
      [-1.30902, 0.951057, -1.53884],
      [-1.80902, -1.11352, -0.688191],
      [-1.30902, -0.951057, -1.53884],
      [-2.11803, -0.16246, -0.688191],
      [-1.61803, 0., -1.53884],
      [-0.5, -2.06457, -0.688191],
      [-1.61803, -1.37638, 0.688191],
      [-2.11803, 0.16246, 0.688191],
      [-1.61803, 1.37638, -0.688191],
      [-2.11803, -0.688191, 0.16246],
    ],
    vertexDegree: [3.,3.,4.,4.,4.,4.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,4.,4.,4.,4.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,3.,4.,4.,4.,4.,4.]
  }],
  ["dJ80", {
    dual: "J80",
    vertices: [
      [1.24536, -1.71409, 0.404641],
      [0., 2.11873, 0.404641],
      [0., -2.11873, -0.404641],
      [-1.24536, 1.71409, -0.404641],
      [2.01503, 0.654722, 0.404641],
      [2.01503, -0.654722, -0.404641],
      [1.24536, 1.71409, -0.404641],
      [-1.24536, -1.71409, 0.404641],
      [-2.01503, 0.654722, 0.404641],
      [-2.01503, -0.654722, -0.404641],
      [1.71353, -0.556758, -1.11352],
      [1.05902, 1.45761, -1.11352],
      [0.654508, -2.01437, 0.],
      [1.05902, -1.45761, 1.11352],
      [1.71353, -1.24495, 0.],
      [-0.654508, 2.01437, 0.],
      [0., 1.80171, 1.11352],
      [0.654508, 2.01437, 0.],
      [-1.05902, -1.45761, 1.11352],
      [-1.71353, 0.556758, 1.11352],
      [-0.654508, -2.01437, 0.],
      [0., -1.80171, -1.11352],
      [-1.71353, 1.24495, 0.],
      [-1.05902, 1.45761, -1.11352],
      [2.11803, 0., 0.],
      [1.71353, 1.24495, 0.],
      [1.71353, 0.556758, 1.11352],
      [-1.71353, -1.24495, 0.],
      [-2.11803, 0., 0.],
      [-1.71353, -0.556758, -1.11352],
      [1.75623, 0.570634, -0.923305],
      [0., -1.84661, 0.923305],
      [1.08541, -1.49394, -0.923305],
      [-1.08541, 1.49394, 0.923305],
      [0., 1.84661, -0.923305],
      [-1.75623, -0.570634, 0.923305],
      [1.75623, -0.570634, 0.923305],
      [1.08541, 1.49394, 0.923305],
      [-1.08541, -1.49394, -0.923305],
      [-1.75623, 0.570634, -0.923305],
      [0., 0., -1.53884],
      [0., 0., 1.53884],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,10.,10.]
  }],
  ["J81", {
    dual: "dJ81",
    vertices: [
      [-0.5, -0.5, -2.11803],
      [-0.5, -0.5, 2.11803],
      [-0.5, 0.5, -2.11803],
      [-0.5, 0.5, 2.11803],
      [-0.5, -2.11803, -0.5],
      [-0.5, 2.11803, -0.5],
      [0., -1.30902, -1.80902],
      [0., 1.30902, -1.80902],
      [0.5, -0.5, -2.11803],
      [0.5, -0.5, 2.11803],
      [0.5, 0.5, -2.11803],
      [0.5, 0.5, 2.11803],
      [0.5, -2.11803, -0.5],
      [0.5, 2.11803, -0.5],
      [-1.80902, 0., -1.30902],
      [-1.80902, 0., 1.30902],
      [-0.809017, -1.61803, -1.30902],
      [-0.809017, 1.61803, -1.30902],
      [-1.61803, -1.30902, -0.809017],
      [-1.61803, -1.30902, 0.809017],
      [-1.61803, 1.30902, -0.809017],
      [-1.61803, 1.30902, 0.809017],
      [-2.11803, -0.5, -0.5],
      [-2.11803, -0.5, 0.5],
      [-2.11803, 0.5, -0.5],
      [-2.11803, 0.5, 0.5],
      [-1.30902, -1.80902, 0.],
      [-1.30902, -0.809017, -1.61803],
      [-1.30902, -0.809017, 1.61803],
      [-1.30902, 0.809017, -1.61803],
      [-1.30902, 0.809017, 1.61803],
      [-1.30902, 1.80902, 0.],
      [0.809017, -1.61803, -1.30902],
      [0.809017, 1.61803, -1.30902],
      [1.61803, -1.30902, -0.809017],
      [1.61803, -1.30902, 0.809017],
      [1.61803, 1.30902, -0.809017],
      [1.61803, 1.30902, 0.809017],
      [2.11803, -0.5, -0.5],
      [2.11803, -0.5, 0.5],
      [2.11803, 0.5, -0.5],
      [2.11803, 0.5, 0.5],
      [1.30902, -1.80902, 0.],
      [1.30902, -0.809017, -1.61803],
      [1.30902, -0.809017, 1.61803],
      [1.30902, 0.809017, -1.61803],
      [1.30902, 0.809017, 1.61803],
      [1.30902, 1.80902, 0.],
      [1.80902, 0., -1.30902],
      [1.80902, 0., 1.30902],
    ],
    vertexDegree: [4.,3.,4.,3.,3.,3.,4.,4.,4.,3.,4.,3.,3.,3.,4.,4.,4.,4.,4.,3.,4.,3.,4.,4.,4.,4.,3.,4.,3.,4.,3.,3.,4.,4.,4.,3.,4.,3.,4.,4.,4.,4.,3.,4.,3.,4.,3.,3.,4.,4.]
  }],
  ["dJ81", {
    dual: "J81",
    vertices: [
      [0., -0.769672, -2.01503],
      [0., 0.769672, -2.01503],
      [-2.01503, 0., -0.769672],
      [-2.01503, 0., 0.769672],
      [-1.24536, -1.24536, -1.24536],
      [-1.24536, 1.24536, -1.24536],
      [1.24536, -1.24536, -1.24536],
      [1.24536, 1.24536, -1.24536],
      [2.01503, 0., -0.769672],
      [2.01503, 0., 0.769672],
      [0., 0., -2.11803],
      [-0.654508, -1.05902, -1.71353],
      [0., 0., 2.11803],
      [-0.654508, 1.05902, -1.71353],
      [-1.05902, -1.71353, -0.654508],
      [-1.05902, 1.71353, -0.654508],
      [0.654508, -1.05902, -1.71353],
      [0.654508, 1.05902, -1.71353],
      [1.05902, -1.71353, -0.654508],
      [1.05902, 1.71353, -0.654508],
      [-1.71353, 0.654508, -1.05902],
      [-1.71353, -0.654508, -1.05902],
      [-1.71353, -0.654508, 1.05902],
      [-1.71353, 0.654508, 1.05902],
      [-2.11803, 0., 0.],
      [1.71353, -0.654508, -1.05902],
      [1.71353, -0.654508, 1.05902],
      [1.71353, 0.654508, -1.05902],
      [1.71353, 0.654508, 1.05902],
      [2.11803, 0., 0.],
      [-1.08541, 0., -1.75623],
      [-1.08541, 0., 1.75623],
      [0., -1.75623, -1.08541],
      [0., 1.75623, -1.08541],
      [1.08541, 0., -1.75623],
      [1.08541, 0., 1.75623],
      [-1.75623, -1.08541, 0.],
      [-1.75623, 1.08541, 0.],
      [1.75623, -1.08541, 0.],
      [1.75623, 1.08541, 0.],
      [0., -1.30902, 0.809017],
      [0., 1.30902, 0.809017],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,10.,10.]
  }],
  ["J82", {
    dual: "dJ82",
    vertices: [
      [-0.5, -0.5, -2.11803],
      [-0.5, -0.5, 2.11803],
      [-0.5, 0.5, -2.11803],
      [-0.5, 0.5, 2.11803],
      [-0.5, -2.11803, -0.5],
      [-0.5, 2.11803, -0.5],
      [0., -1.30902, -1.80902],
      [0., 1.30902, -1.80902],
      [0.361803, 0., -2.20344],
      [0.5, -0.5, 2.11803],
      [0.861803, 0.809017, -1.89443],
      [0.5, 0.5, 2.11803],
      [0.5, -2.11803, -0.5],
      [0.5, 2.11803, -0.5],
      [-1.80902, 0., -1.30902],
      [-1.80902, 0., 1.30902],
      [-0.809017, -1.61803, -1.30902],
      [-0.809017, 1.61803, -1.30902],
      [-1.61803, -1.30902, -0.809017],
      [-1.61803, -1.30902, 0.809017],
      [-1.61803, 1.30902, -0.809017],
      [-1.61803, 1.30902, 0.809017],
      [-2.11803, -0.5, -0.5],
      [-2.11803, -0.5, 0.5],
      [-2.11803, 0.5, -0.5],
      [-2.11803, 0.5, 0.5],
      [-1.30902, -1.80902, 0.],
      [-1.30902, -0.809017, -1.61803],
      [-1.30902, -0.809017, 1.61803],
      [-1.30902, 0.809017, -1.61803],
      [-1.30902, 0.809017, 1.61803],
      [-1.30902, 1.80902, 0.],
      [0.809017, -1.61803, -1.30902],
      [0.809017, 1.61803, -1.30902],
      [1.61803, -1.30902, -0.809017],
      [1.61803, -1.30902, 0.809017],
      [1.61803, 1.30902, -0.809017],
      [1.61803, 1.30902, 0.809017],
      [2.11803, -0.5, -0.5],
      [2.11803, -0.5, 0.5],
      [2.11803, 0.5, -0.5],
      [2.11803, 0.5, 0.5],
      [1.30902, -1.80902, 0.],
      [0.861803, -0.809017, -1.89443],
      [1.30902, -0.809017, 1.61803],
      [1.67082, 0.5, -1.39443],
      [1.30902, 0.809017, 1.61803],
      [1.30902, 1.80902, 0.],
      [1.67082, -0.5, -1.39443],
      [1.80902, 0., 1.30902],
    ],
    vertexDegree: [4.,3.,4.,3.,3.,3.,4.,4.,4.,3.,4.,3.,3.,3.,4.,4.,4.,4.,4.,3.,4.,3.,4.,4.,4.,4.,3.,4.,3.,4.,3.,3.,4.,4.,4.,3.,4.,3.,4.,4.,4.,4.,3.,4.,3.,4.,3.,3.,4.,4.]
  }],
  ["dJ82", {
    dual: "J82",
    vertices: [
      [-0.212732, 0., -2.1465],
      [0.55694, -1.24536, -1.67082],
      [0.55694, 1.24536, -1.67082],
      [-2.01503, 0., -0.769672],
      [-2.01503, 0., 0.769672],
      [-1.24536, -1.24536, -1.24536],
      [-1.24536, 1.24536, -1.24536],
      [1.8023, -0.769672, -0.901148],
      [1.8023, 0.769672, -0.901148],
      [2.01503, 0., 0.769672],
      [-0.654508, -1.05902, -1.71353],
      [0.180902, -0.654508, -2.00623],
      [0., 0., 2.11803],
      [0.180902, 0.654508, -2.00623],
      [-0.654508, 1.05902, -1.71353],
      [-1.05902, -1.71353, -0.654508],
      [-1.05902, 1.71353, -0.654508],
      [1.23992, 1.05902, -1.35172],
      [1.05902, -1.71353, -0.654508],
      [1.05902, 1.71353, -0.654508],
      [-1.71353, 0.654508, -1.05902],
      [-1.71353, -0.654508, -1.05902],
      [-1.71353, -0.654508, 1.05902],
      [-1.71353, 0.654508, 1.05902],
      [-2.11803, 0., 0.],
      [1.23992, -1.05902, -1.35172],
      [1.71353, -0.654508, 1.05902],
      [1.71353, 0.654508, 1.05902],
      [2.11803, 0., 0.],
      [1.89443, 0., -0.947214],
      [-1.08541, 0., -1.75623],
      [-1.08541, 0., 1.75623],
      [0., -1.75623, -1.08541],
      [0., 1.75623, -1.08541],
      [1.08541, 0., -1.75623],
      [1.08541, 0., 1.75623],
      [-1.75623, -1.08541, 0.],
      [-1.75623, 1.08541, 0.],
      [1.75623, -1.08541, 0.],
      [1.75623, 1.08541, 0.],
      [0., -1.30902, 0.809017],
      [0., 1.30902, 0.809017],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,10.,10.]
  }],
  ["J83", {
    dual: "dJ83",
    vertices: [
      [-0.5, 0.288675, -2.15702],
      [-0.5, -1.22285, 1.8002],
      [-0.5, 1.22285, -1.8002],
      [-0.5, -0.288675, 2.15702],
      [-0.5, -1.8002, -1.22285],
      [-0.5, 2.15702, 0.288675],
      [-0.5, 1.8002, 1.22285],
      [0., -0.57735, -2.15702],
      [0., 1.86834, -1.22285],
      [0., 0.57735, 2.15702],
      [0.5, 0.288675, -2.15702],
      [0.5, -1.22285, 1.8002],
      [0.5, 1.22285, -1.8002],
      [0.5, -0.288675, 2.15702],
      [0.5, -1.8002, -1.22285],
      [0.5, 2.15702, 0.288675],
      [0.5, 1.8002, 1.22285],
      [-1.80902, 0.467086, -1.22285],
      [-1.80902, -0.467086, 1.22285],
      [-0.809017, -1.04444, -1.8002],
      [-0.809017, 1.97861, -0.645497],
      [-0.809017, 1.04444, 1.8002],
      [-1.61803, -0.934172, -1.22285],
      [-1.61803, -1.51152, 0.288675],
      [-2.11803, -0.288675, -0.645497],
      [-2.11803, -0.645497, 0.288675],
      [-1.30902, -1.68993, -0.645497],
      [-1.30902, -0.178411, -1.8002],
      [-1.30902, -1.33311, 1.22285],
      [-1.30902, 1.33311, -1.22285],
      [-1.30902, 0.178411, 1.8002],
      [0.809017, -1.04444, -1.8002],
      [0.809017, 1.97861, -0.645497],
      [0.809017, 1.04444, 1.8002],
      [1.61803, -0.934172, -1.22285],
      [1.61803, -1.51152, 0.288675],
      [2.11803, -0.288675, -0.645497],
      [2.11803, -0.645497, 0.288675],
      [1.30902, -1.68993, -0.645497],
      [1.30902, -0.178411, -1.8002],
      [1.30902, -1.33311, 1.22285],
      [1.30902, 1.33311, -1.22285],
      [1.30902, 0.178411, 1.8002],
      [1.80902, 0.467086, -1.22285],
      [1.80902, -0.467086, 1.22285],
    ],
    vertexDegree: [4.,3.,4.,4.,3.,3.,3.,4.,4.,4.,4.,3.,4.,4.,3.,3.,3.,3.,3.,4.,3.,3.,4.,3.,3.,3.,3.,4.,3.,3.,3.,4.,3.,3.,4.,3.,3.,3.,3.,4.,3.,3.,3.,3.,3.]
  }],
  ["dJ83", {
    dual: "J83",
    vertices: [
      [0., 0., -2.15702],
      [0., 1.43801, -1.60775],
      [0., 0., 2.15702],
      [-1.24536, -0.719007, -1.60775],
      [1.24536, -0.719007, -1.60775],
      [0., 0.755761, -1.97861],
      [-0.654508, -0.377881, -1.97861],
      [0., -0.755761, 1.97861],
      [-0.654508, 1.60073, -1.22285],
      [-0.654508, 0.377881, 1.97861],
      [-1.05902, -1.36719, -1.22285],
      [0., 1.97861, 0.755761],
      [0.654508, -0.377881, -1.97861],
      [0.654508, 1.60073, -1.22285],
      [0.654508, 0.377881, 1.97861],
      [1.05902, -1.36719, -1.22285],
      [-1.71353, -0.233543, -1.22285],
      [-1.71353, -0.989304, 0.755761],
      [1.71353, -0.233543, -1.22285],
      [1.71353, -0.989304, 0.755761],
      [-1.08541, 0.626662, -1.64062],
      [-1.08541, -0.626662, 1.64062],
      [0., -1.25332, -1.64062],
      [0., 2.02792, -0.387298],
      [0., 1.25332, 1.64062],
      [1.08541, 0.626662, -1.64062],
      [1.08541, -0.626662, 1.64062],
      [-1.75623, -1.01396, -0.387298],
      [1.75623, -1.01396, -0.387298],
      [0., -1.51152, 0.288675],
      [-1.30902, 0.755761, 0.288675],
      [1.30902, 0.755761, 0.288675],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.,5.,5.,10.,10.,10.]
  }],

  ["J84", {
    dual: "dJ84",
    vertices: [
      [-0.5, 0., 0.],
      [0., -0.5, 1.56786],
      [0., 0.5, 1.56786],
      [0., -0.644584, 0.578369],
      [0., 0.644584, 0.578369],
      [0.5, 0., 0.],
      [-0.644584, 0., 0.989492],
      [0.644584, 0., 0.989492],
    ],
    vertexDegree: [4.,4.,4.,5.,5.,4.,5.,5.]
  }],
  ["dJ84", {
    dual: "J84",
    vertices: [
      [-0.214861, 0., 1.37507],
      [0.214861, 0., 1.37507],
      [-0.214861, -0.381528, 1.04524],
      [0.214861, -0.381528, 1.04524],
      [0.381528, -0.214861, 0.522621],
      [0., -0.214861, 0.19279],
      [-0.381528, -0.214861, 0.522621],
      [-0.214861, 0.381528, 1.04524],
      [0.214861, 0.381528, 1.04524],
      [0.381528, 0.214861, 0.522621],
      [0., 0.214861, 0.19279],
      [-0.381528, 0.214861, 0.522621],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],

 
  /*
  ["J84", {
    dual: "dJ84",
    vertices: [
      [-0.5, 0., 0.-0.78393],
      [0., -0.5, 1.56786-0.78393],
      [0., 0.5, 1.56786-0.78393],
      [0., -0.644584, 0.578369-0.78393],
      [0., 0.644584, 0.578369-0.78393],
      [0.5, 0., 0.-0.78393],
      [-0.644584, 0., 0.989492-0.78393],
      [0.644584, 0., 0.989492-0.78393],
    ],
    vertexDegree: [4.,4.,4.,5.,5.,4.,5.,5.]
  }],
  ["dJ84", {
    dual: "J84",
    vertices: [
      [-0.214861, 0., 1.37507-0.78393],
      [0.214861, 0., 1.37507-0.78393],
      [-0.214861, -0.381528, 1.04524-0.78393],
      [0.214861, -0.381528, 1.04524-0.78393],
      [0.381528, -0.214861, 0.522621-0.78393],
      [0., -0.214861, 0.19279-0.78393],
      [-0.381528, -0.214861, 0.522621-0.78393],
      [-0.214861, 0.381528, 1.04524-0.78393],
      [0.214861, 0.381528, 1.04524-0.78393],
      [0.381528, 0.214861, 0.522621-0.78393],
      [0., 0.214861, 0.19279-0.78393],
      [-0.381528, 0.214861, 0.522621-0.78393],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
 */
 
  ["J85", {
    dual: "dJ85",
    vertices: [
      [-1.21321, 0., 0.185607],
      [-0.857866, -0.857866, -0.185607],
      [-0.857866, 0.857866, -0.185607],
      [-0.707107, 0., -0.676869],
      [-0.5, -0.5, 0.676869],
      [-0.5, 0.5, 0.676869],
      [0., -1.21321, 0.185607],
      [0., -0.707107, -0.676869],
      [0., 0.707107, -0.676869],
      [0., 1.21321, 0.185607],
      [0.5, -0.5, 0.676869],
      [0.5, 0.5, 0.676869],
      [0.707107, 0., -0.676869],
      [0.857866, -0.857866, -0.185607],
      [0.857866, 0.857866, -0.185607],
      [1.21321, 0., 0.185607],
    ],
    vertexDegree: [5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.,5.]
  }],
  ["dJ85", {
    dual: "J85",
    vertices: [
      [0., 0., 0.676869],
      [0., 0., -0.676869],
      [0.452622, -0.857024, 0.225623],
      [0.521658, -0.521658, -0.513115],
      [0.285955, -0.926059, -0.225623],
      [0., -0.737735, 0.513115],
      [0.857024, -0.452622, 0.225623],
      [0.926059, -0.285955, -0.225623],
      [0.857024, 0.452622, 0.225623],
      [0.521658, 0.521658, -0.513115],
      [0.926059, 0.285955, -0.225623],
      [0.737735, 0., 0.513115],
      [0.452622, 0.857024, 0.225623],
      [0.285955, 0.926059, -0.225623],
      [-0.452622, 0.857024, 0.225623],
      [-0.521658, 0.521658, -0.513115],
      [-0.285955, 0.926059, -0.225623],
      [0., 0.737735, 0.513115],
      [-0.857024, 0.452622, 0.225623],
      [-0.926059, 0.285955, -0.225623],
      [-0.857024, -0.452622, 0.225623],
      [-0.521658, -0.521658, -0.513115],
      [-0.926059, -0.285955, -0.225623],
      [-0.737735, 0., 0.513115],
      [-0.452622, -0.857024, 0.225623],
      [-0.285955, -0.926059, -0.225623],
    ],
    vertexDegree: [4.,4.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J86", {
    dual: "dJ86",
    vertices: [
      [0., -0.5, 0.],
      [0., 0.5, 0.],
      [-0.852727, 0.5, 0.522357],
      [-0.5, 0., 1.3133],
      [-0.852727, -0.5, 0.522357],
      [0.852727, 0.5, 0.522357],
      [0.5, 0., 1.3133],
      [0.852727, -0.5, 0.522357],
      [0., 0.789428, 0.9572],
      [0., -0.789428, 0.9572],
    ],
    vertexDegree: [4.,4.,4.,5.,4.,4.,5.,4.,5.,5.]
  }],
  ["dJ86", {
    dual: "J86",
    vertices: [
      [-0.426363, 0., 0.261178],
      [0.426363, 0., 0.261178],
      [-0.284242, 0.596476, 0.493186],
      [0.284242, 0.596476, 0.493186],
      [-0.450909, 0.429809, 0.930951],
      [0.450909, 0.429809, 0.930951],
      [-0.735151, 0., 0.786003],
      [0.735151, 0., 0.786003],
      [0., 0.263143, 1.1946],
      [0., -0.263143, 1.1946],
      [0.450909, -0.429809, 0.930951],
      [-0.450909, -0.429809, 0.930951],
      [0.284242, -0.596476, 0.493186],
      [-0.284242, -0.596476, 0.493186],
    ],
    vertexDegree: [4.,4.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.]
  }],
  ["J87", {
    dual: "dJ87",
    vertices: [
      [0., -0.5, 0.],
      [0., 0.5, 0.],
      [-0.852727, 0.5, 0.522357],
      [-0.5, 0., 1.3133],
      [-0.852727, -0.5, 0.522357],
      [0.852727, 0.5, 0.522357],
      [0.5, 0., 1.3133],
      [0.852727, -0.5, 0.522357],
      [0., 0.789428, 0.9572],
      [0., -0.789428, 0.9572],
      [0.795726, 0., -0.341791],
    ],
    vertexDegree: [5.,5.,4.,5.,4.,5.,5.,5.,5.,5.,4.]
  }],
  ["dJ87", {
    dual: "J87",
    vertices: [
      [0.265242, 0., -0.11393],
      [0.284242, -0.596476, 0.493186],
      [-0.284242, -0.596476, 0.493186],
      [0.549484, -0.333333, 0.0601888],
      [-0.284242, 0.596476, 0.493186],
      [0.549484, 0.333333, 0.0601888],
      [0.284242, 0.596476, 0.493186],
      [-0.450909, 0.429809, 0.930951],
      [-0.735151, 0., 0.786003],
      [-0.450909, -0.429809, 0.930951],
      [0., 0.263143, 1.1946],
      [0., -0.263143, 1.1946],
      [0.735151, 0., 0.786003],
      [0.833726, 0., 0.234308],
      [0.450909, 0.429809, 0.930951],
      [0.450909, -0.429809, 0.930951],
      [-0.426363, 0., 0.261178],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.]
  }],
  ["J88", {
    dual: "dJ88",
    vertices: [
      [-0.5, 0., -0.860839],
      [0., -0.5, 0.803997],
      [0., 0.5, 0.803997],
      [0., -1.2831, 0.182104],
      [0., 1.2831, 0.182104],
      [0., -0.854743, -0.721504],
      [0., 0.854743, -0.721504],
      [0.5, 0., -0.860839],
      [-0.594633, -0.5, 0.],
      [-0.594633, 0.5, 0.],
      [0.594633, -0.5, 0.],
      [0.594633, 0.5, 0.],
    ],
    vertexDegree: [5.,4.,4.,4.,4.,5.,5.,5.,5.,5.,5.,5.]
  }],
  ["dJ88", {
    dual: "J88",
    vertices: [
      [-0.364878, -0.451581, -0.527448],
      [0., 0.284914, -0.814394],
      [0., -0.284914, -0.814394],
      [-0.563089, 0., -0.286946],
      [-0.364878, 0.451581, -0.527448],
      [0.198211, -0.761034, 0.3287],
      [-0.198211, -0.761034, 0.3287],
      [-0.198211, 0.761034, 0.3287],
      [0.198211, 0.761034, 0.3287],
      [0.198211, -0.879282, -0.1798],
      [-0.198211, -0.879282, -0.1798],
      [-0.198211, 0.879282, -0.1798],
      [0.198211, 0.879282, -0.1798],
      [0.364878, -0.451581, -0.527448],
      [0.364878, 0.451581, -0.527448],
      [0.563089, 0., -0.286946],
      [-0.297317, 0., 0.401999],
      [0.297317, 0., 0.401999],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.]
  }],
  ["J89", {
    dual: "dJ89",
    vertices: [
      [-0.5, -0.5, 0.976206],
      [-0.5, 0., -0.838438],
      [-0.5, 0.5, 0.976206],
      [0., -1.1013, 0.352954],
      [0., 1.1013, 0.352954],
      [0., -0.835659, -0.611119],
      [0., 0.835659, -0.611119],
      [0.5, -0.5, 0.976206],
      [0.5, 0., -0.838438],
      [0.5, 0.5, 0.976206],
      [-0.716845, -0.5, 0.],
      [-0.716845, 0.5, 0.],
      [0.716845, -0.5, 0.],
      [0.716845, 0.5, 0.],
    ],
    vertexDegree: [4.,5.,4.,5.,5.,5.,5.,4.,5.,4.,5.,5.,5.,5.]
  }],
  ["dJ89", {
    dual: "J89",
    vertices: [
      [0., -0.700432, 0.768455],
      [-0.405615, -0.700432, 0.443053],
      [-0.405615, -0.44522, -0.483186],
      [0., 0.278553, -0.762665],
      [0., -0.278553, -0.762665],
      [-0.644563, 0., -0.279479],
      [-0.405615, 0.44522, -0.483186],
      [-0.405615, 0.700432, 0.443053],
      [0., 0.700432, 0.768455],
      [0.238948, -0.812318, -0.086055],
      [-0.238948, -0.812318, -0.086055],
      [0.405615, -0.700432, 0.443053],
      [-0.238948, 0.812318, -0.086055],
      [0.405615, 0.700432, 0.443053],
      [0.238948, 0.812318, -0.086055],
      [0.405615, -0.44522, -0.483186],
      [0.405615, 0.44522, -0.483186],
      [0.644563, 0., -0.279479],
      [-0.608422, 0., 0.488103],
      [0., 0., 0.976206],
      [0.608422, 0., 0.488103],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.]
  }],
  ["J90", {
    dual: "dJ90",
    vertices: [
      [-0.5, 0., 1.10444],
      [-0.5, -0.767131, 0.462948],
      [-0.5, 0.767131, 0.462948],
      [0., -0.5, -1.10444],
      [0., 0.5, -1.10444],
      [0., -1.12648, -0.325003],
      [0., 1.12648, -0.325003],
      [0.5, 0., 1.10444],
      [0.5, -0.767131, 0.462948],
      [0.5, 0.767131, 0.462948],
      [-0.767131, -0.5, -0.462948],
      [-0.767131, 0.5, -0.462948],
      [0.767131, -0.5, -0.462948],
      [0.767131, 0.5, -0.462948],
      [-1.12648, 0., 0.325003],
      [1.12648, 0., 0.325003],
    ],
    vertexDegree: [4.,5.,5.,4.,4.,5.,5.,4.,5.,5.,5.,5.,5.,5.,5.,5.]
  }],
  ["dJ90", {
    dual: "J90",
    vertices: [
      [-0.708828, 0.25571, 0.630796],
      [-0.708828, -0.25571, 0.630796],
      [0., -0.886915, 0.200297],
      [-0.422377, -0.797871, -0.108334],
      [-0.797871, -0.422377, 0.108334],
      [-0.422377, 0.797871, -0.108334],
      [0., 0.886915, 0.200297],
      [-0.797871, 0.422377, 0.108334],
      [-0.25571, -0.708828, -0.630796],
      [0.25571, -0.708828, -0.630796],
      [0.25571, 0.708828, -0.630796],
      [-0.25571, 0.708828, -0.630796],
      [0.422377, -0.797871, -0.108334],
      [0.422377, 0.797871, -0.108334],
      [0.708828, -0.25571, 0.630796],
      [0.708828, 0.25571, 0.630796],
      [0.797871, -0.422377, 0.108334],
      [0.797871, 0.422377, 0.108334],
      [-0.886915, 0., -0.200297],
      [0.886915, 0., -0.200297],
      [0., -0.383566, 0.783693],
      [0., 0.383566, 0.783693],
      [0.383566, 0., -0.783693],
      [-0.383566, 0., -0.783693],
    ],
    vertexDegree: [3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,3.,4.,4.,4.,4.]
  }],
  ["J91", {
    dual: "dJ91",
    vertices: [
      [-1.30902, 0., -0.5],
      [-1.30902, 0., 0.5],
      [-0.5, -0.5, -0.809017],
      [-0.5, -0.5, 0.809017],
      [-0.5, 0.5, -0.809017],
      [-0.5, 0.5, 0.809017],
      [0., -0.809017, 0.],
      [0., 0.809017, 0.],
      [0.5, -0.5, -0.809017],
      [0.5, -0.5, 0.809017],
      [0.5, 0.5, -0.809017],
      [0.5, 0.5, 0.809017],
      [1.30902, 0., -0.5],
      [1.30902, 0., 0.5],
    ],
    vertexDegree: [3.,3.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,3.,3.]
  }],
  ["dJ91", {
    dual: "J91",
    vertices: [
      [0., 0., 0.809017],
      [-0.769672, 0., 0.706011],
      [0., -0.603006, 0.539345],
      [0.769672, 0., 0.706011],
      [0., 0.603006, 0.539345],
      [-0.723607, 0.361803, 0.],
      [-0.723607, -0.361803, 0.],
      [0.723607, -0.361803, 0.],
      [0.723607, 0.361803, 0.],
      [-0.769672, 0., -0.706011],
      [0., -0.603006, -0.539345],
      [0.769672, 0., -0.706011],
      [0., 0.603006, -0.539345],
      [0., 0., -0.809017],
    ],
    vertexDegree: [4.,3.,3.,3.,3.,5.,5.,5.,5.,3.,3.,3.,3.,4.]
  }],
  ["J92", {
    dual: "dJ92",
    vertices: [
      [-1.30902, -0.178411, -0.274892],
      [-1.30902, 0.755761, 0.08193],
      [-1., 0., 0.65928],
      [-0.809017, -1.04444, -0.274892],
      [-0.5, -0.866025, 0.65928],
      [-0.5, -0.288675, -0.852242],
      [-0.5, 0.866025, 0.65928],
      [-0.5, 1.22285, -0.274892],
      [0., -1.51152, 0.08193],
      [0., 0.57735, -0.852242],
      [0.5, -0.866025, 0.65928],
      [0.5, -0.288675, -0.852242],
      [0.5, 0.866025, 0.65928],
      [0.5, 1.22285, -0.274892],
      [0.809017, -1.04444, -0.274892],
      [1., 0., 0.65928],
      [1.30902, -0.178411, -0.274892],
      [1.30902, 0.755761, 0.08193],
    ],
    vertexDegree: [4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.,4.]
  }],
  ["dJ92", {
    dual: "J92",
    vertices: [
      [-0.723607, 0.417775, -0.434468],
      [-0.769672, 0.948211, 0.155439],
      [-0.936339, 0.540596, 0.46683],
      [-1.20601, 0.19245, 0.155439],
      [-0.904508, -0.522218, 0.192194],
      [-0.872678, -0.503841, -0.467342],
      [0., -0.835549, -0.434468],
      [-0.436339, -1.14066, 0.155439],
      [0., -1.08119, 0.46683],
      [0.436339, -1.14066, 0.155439],
      [0.872678, -0.503841, -0.467342],
      [0.904508, -0.522218, 0.192194],
      [0., 0., -0.852242],
      [0.723607, 0.417775, -0.434468],
      [1.20601, 0.19245, 0.155439],
      [0.936339, 0.540596, 0.46683],
      [0.769672, 0.948211, 0.155439],
      [0., 1.04444, 0.192194],
      [0., 1.00768, -0.467342],
      [0., 0., 0.65928],
    ],
    vertexDegree: [5.,3.,3.,3.,4.,3.,5.,3.,3.,3.,3.,4.,3.,5.,3.,3.,3.,4.,3.,6.]
  }],

    
    
    
  

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
]);
