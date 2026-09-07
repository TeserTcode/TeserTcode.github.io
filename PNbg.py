import os
from PIL import Image, ImageDraw
import re
from typing import List, Tuple

def parse_gradient(gradient_str: str) -> List[Tuple[int, int, int]]:
    """
    Parse a CSS gradient string and extract RGB colors.
    Handles both 'linear-gradient(to direction, color1, color2, ...)' format.
    """
    # Remove 'linear-gradient(' and trailing ')'
    gradient_str = gradient_str.strip()
    if gradient_str.startswith('linear-gradient('):
        gradient_str = gradient_str[17:-1]  # Remove 'linear-gradient(' and ')'
    
    # Split by commas, but be careful with nested parentheses
    parts = []
    current = []
    depth = 0
    for char in gradient_str:
        if char == '(':
            depth += 1
        elif char == ')':
            depth -= 1
        elif char == ',' and depth == 0:
            parts.append(''.join(current).strip())
            current = []
            continue
        current.append(char)
    if current:
        parts.append(''.join(current).strip())
    
    # First part is the direction (e.g., 'to bottom')
    if parts and 'to' in parts[0]:
        parts = parts[1:]
    
    colors = []
    for part in parts:
        part = part.strip()
        # Try to parse hex color
        hex_match = re.search(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})', part)
        if hex_match:
            hex_val = hex_match.group(1)
            if len(hex_val) == 3:
                hex_val = ''.join([c*2 for c in hex_val])
            rgb = tuple(int(hex_val[i:i+2], 16) for i in (0, 2, 4))
            colors.append(rgb)
        # Try to parse rgb/rgba
        elif 'rgb' in part:
            rgb_match = re.search(r'rgba?\((\d+),\s*(\d+),\s*(\d+)', part)
            if rgb_match:
                rgb = tuple(int(x) for x in rgb_match.groups())
                colors.append(rgb)
        # Try to parse named colors
        elif part in ['black', 'cyan', 'blue', 'grey', 'yellow', 'red', 'darkgray', 'white', 'darkgreen', 'yellowgreen', 'pink', 'purple', 'darkgreen']:
            color_map = {
                'black': (0, 0, 0),
                'cyan': (0, 255, 255),
                'blue': (0, 0, 255),
                'grey': (128, 128, 128),
                'yellow': (255, 255, 0),
                'red': (255, 0, 0),
                'darkgray': (169, 169, 169),
                'white': (255, 255, 255),
                'darkgreen': (0, 100, 0),
                'yellowgreen': (154, 205, 50),
                'pink': (255, 192, 203),
                'purple': (128, 0, 128),
                'green': (0, 128, 0),
            }
            if part in color_map:
                colors.append(color_map[part])
        else:
            # Try to parse hex without # (e.g., "0F3F60")
            if re.match(r'^[0-9a-fA-F]{6}$', part):
                hex_val = part
                rgb = tuple(int(hex_val[i:i+2], 16) for i in (0, 2, 4))
                colors.append(rgb)
    
    return colors

def get_level_gradients_from_html(html_file: str) -> dict:
    """Extract level names and their gradients from HTML content."""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find levelnames array
    levelnames_match = re.search(r'const levelnames=\[([^\]]+?)\];', content, re.DOTALL)
    if not levelnames_match:
        print("Could not find levelnames array")
        return {}
    
    levelnames_str = levelnames_match.group(1)
    # Parse level names from array
    level_names = re.findall(r'["\']([^"\']+)["\']', levelnames_str)
    
    # Find getGradient function
    gradient_match = re.search(r'function getGradient\(level\)\s*{[^}]*?switch\s*\(level\)\s*{([^}]*?)}', content, re.DOTALL)
    if not gradient_match:
        print("Could not find getGradient function")
        return {}
    
    gradient_cases = gradient_match.group(1)
    
    # Parse each case
    level_gradients = {}
    for level_name in level_names:
        # Find the case for this level
        escaped_name = re.escape(level_name)
        case_pattern = rf'case\s+["\']{escaped_name}["\']\s*:\s*return\s+["\']([^"\']+)["\']'
        case_match = re.search(case_pattern, gradient_cases)
        if case_match:
            gradient_str = case_match.group(1)
            colors = parse_gradient(gradient_str)
            if colors:
                level_gradients[level_name] = colors
                print(f"Found gradient for '{level_name}': {gradient_str}")
                print(f"  Colors: {colors}")
            else:
                print(f"Could not parse gradient for '{level_name}': {gradient_str}")
        else:
            print(f"Could not find gradient for '{level_name}'")
    
    return level_gradients

def generate_gradient_png(colors: List[Tuple[int, int, int]], output_path: str, size: Tuple[int, int] = (200, 200)):
    """Generate a PNG image with a vertical gradient."""
    width, height = size
    
    if not colors:
        # Default to black if no colors
        colors = [(0, 0, 0)]
    
    # Create image
    img = Image.new('RGB', (width, height), colors[0])
    draw = ImageDraw.Draw(img)
    
    if len(colors) == 1:
        # Single color
        draw.rectangle([(0, 0), (width, height)], fill=colors[0])
    else:
        # Vertical gradient
        for y in range(height):
            # Calculate position in gradient (0 to 1)
            t = y / (height - 1)
            # Find which color segment this falls in
            segment = t * (len(colors) - 1)
            seg_idx = int(segment)
            seg_t = segment - seg_idx
            
            if seg_idx >= len(colors) - 1:
                r, g, b = colors[-1]
            else:
                # Interpolate between colors
                c1 = colors[seg_idx]
                c2 = colors[seg_idx + 1]
                r = int(c1[0] + (c2[0] - c1[0]) * seg_t)
                g = int(c1[1] + (c2[1] - c1[1]) * seg_t)
                b = int(c1[2] + (c2[2] - c1[2]) * seg_t)
            
            draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    img.save(output_path, 'PNG')
    print(f"  ✅ Saved PNG: {output_path}")

def main():
    # Create output directory
    output_dir = "./rhythm_songs"
    os.makedirs(output_dir, exist_ok=True)
    
    # Parse the HTML file
    html_file = "PN.html"  # The file you provided
    level_gradients = get_level_gradients_from_html(html_file)
    
    if not level_gradients:
        print("No gradients found. Check the HTML file path.")
        return
    
    print(f"\n🎨 Generating {len(level_gradients)} gradient PNG images...")
    print("-" * 50)
    
    # Generate images
    for level_name, colors in level_gradients.items():
        # Sanitize filename (remove spaces and special characters)
        filename = f"{level_name}.png"
        output_path = os.path.join(output_dir, filename)
        generate_gradient_png(colors, output_path, size=(200, 200))
    
    print("-" * 50)
    print(f"\n✅ Done! All PNG images saved to: {output_dir}/")
    
    # List all generated PNGs
    print("\n📁 Generated PNG files:")
    for f in sorted(os.listdir(output_dir)):
        if f.endswith('.png'):
            print(f"  - {f}")
    
    # Also create a simple HTML gallery to view all gradients
    gallery_path = os.path.join(output_dir, "index.html")
    with open(gallery_path, 'w', encoding='utf-8') as f:
        f.write("""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Rhythm Song Gradients</title>
    <style>
        body { font-family: Arial, sans-serif; background: #0a0a1a; color: white; text-align: center; padding: 20px; margin: 0; }
        h1 { margin-bottom: 30px; color: cyan; text-shadow: 0 0 20px rgba(0,255,255,0.3); }
        .gallery { display: flex; flex-wrap: wrap; gap: 25px; justify-content: center; max-width: 1200px; margin: 0 auto; }
        .card { 
            background: #1a1a2e; 
            border-radius: 12px; 
            padding: 20px; 
            border: 2px solid #333366;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }
        .card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 30px rgba(0,255,255,0.2);
            border-color: cyan;
        }
        .card img { 
            border-radius: 8px; 
            display: block; 
            width: 200px;
            height: 200px;
            object-fit: cover;
        }
        .card p { 
            margin: 10px 0 0 0; 
            font-weight: bold; 
            color: #aaa;
            font-size: 14px;
        }
        .badge {
            display: inline-block;
            background: rgba(0,255,255,0.1);
            color: cyan;
            padding: 2px 10px;
            border-radius: 10px;
            font-size: 11px;
            margin-top: 5px;
        }
        .footer {
            margin-top: 40px;
            color: #555;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <h1>🎵 Rhythm Song Gradients</h1>
    <div class="gallery">
""")
        for level_name in level_gradients.keys():
            safe_name = level_name.replace(' ', '%20')
            f.write(f"""
        <div class="card">
            <img src="{safe_name}.png" alt="{level_name}" width="200" height="200">
            <p>{level_name}</p>
            <span class="badge">PNG 200×200</span>
        </div>
""")
        f.write("""
    </div>
    <p class="footer">Generated from Rhythm Game HTML • All gradients are 200×200 PNG</p>
</body>
</html>
""")
        print(f"\n🌐 Gallery HTML created: {gallery_path}")
        print(f"   Open this in your browser to preview all gradients!")

if __name__ == "__main__":
    main()
