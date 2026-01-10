import json
import unicodedata
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from skimage.measure import perimeter as calculate_perimeter
from skimage.measure import label
from skimage.morphology import convex_hull_image
import time

# --- Configuration ---
FONT_FILE = 'DejaVuSans.ttf'  # MUST have this font file in the same directory
                              # Using a single file with broad coverage like DejaVu is
                              # required for this script.
FONT_SIZE = 64
IMG_PADDING = 16 # Add padding to avoid clipping
IMG_SIZE = FONT_SIZE + IMG_PADDING * 2  # Canvas size
MAX_CODE_POINT = 0x10FFFF
# MAX_CODE_POINT = 0xFFFF  # Use for faster testing (Basic Plane only)
OUTPUT_FILE = 'preuni.js' # <-- UPDATED to .js

print(f"Starting pre-calculation...")
print(f"Loading font: {FONT_FILE} at size {FONT_SIZE}")

try:
    font = ImageFont.truetype(FONT_FILE, FONT_SIZE)
except IOError:
    print(f"Error: Font file '{FONT_FILE}' not found.")
    print("Please download a .ttf font (like DejaVuSans.ttf) and place it here.")
    exit()

# --- Helper Functions for Classification ---
def is_cjk(code):
    return any([
        (0x4E00 <= code <= 0x9FFF),   # CJK Unified Ideographs
        (0x3400 <= code <= 0x4DBF),   # CJK Extension A
        (0x20000 <= code <= 0x2A6DF), # CJK Extension B
        (0x2A700 <= code <= 0x2B73F), # CJK Extension C
        (0x2B740 <= code <= 0x2B81F), # CJK Extension D
        (0x2B820 <= code <= 0x2CEAF), # CJK Extension E
        (0x2CEB0 <= code <= 0x2EBEF), # CJK Extension F
        (0x30000 <= code <= 0x3134F)  # CJK Extension G
    ])

def is_control(code):
    return (0x00 <= code <= 0x1F) or (0x7F <= code <= 0x9F)

def is_combining(code):
    return (0x0300 <= code <= 0x036F) # Combining Diacritical Marks

def is_regional(code):
    return (0x1F1E6 <= code <= 0x1F1FF) # Regional Indicator Symbols

def is_emoji(code):
    return any([
        (0x1F600 <= code <= 0x1F64F), # Emoticons
        (0x1F300 <= code <= 0x1F5FF), # Misc Symbols and Pictographs
        (0x1F680 <= code <= 0x1F6FF), # Transport and Map
        (0x1F1E6 <= code <= 0x1F1FF), # Regional Indicators (also emoji)
        (0x2600 <= code <= 0x26FF),   # Misc Symbols
        (0x2700 <= code <= 0x27BF),   # Dingbats
        (0x1F900 <= code <= 0x1F9FF), # Supplemental Symbols
        (0x1FA70 <= code <= 0x1FAFF)  # Misc Symbols
    ])

# --- Main Processing ---
character_data = []
start_time = time.time()

for code_point in range(MAX_CODE_POINT + 1):
    # Progress indicator
    if code_point % 1000 == 0:
        elapsed = time.time() - start_time
        percent = (code_point / MAX_CODE_POINT) * 100
        print(f"Processing... {percent:.1f}% complete (U+{code_point:04X}). Elapsed: {elapsed:.1f}s", end='\r')

    # Skip Surrogates
    if 0xD800 <= code_point <= 0xDFFF:
        continue

    try:
        char = chr(code_point)
        name = unicodedata.name(char, f'U+{code_point:04X}')
        bidirectional = unicodedata.bidirectional(char)
    except ValueError:
        continue # Skip invalid code points

    # --- Render Character ---
    image = Image.new('L', (IMG_SIZE, IMG_SIZE), 0)
    draw = ImageDraw.Draw(image)
    
    try:
        draw.text((IMG_PADDING, IMG_PADDING), char, font=font, fill=255)
    except Exception as e:
        # print(f"Warning: Could not draw U+{code_point:04X}. {e}")
        continue
        
    np_image = np.array(image)
    
    # --- Get Metrics ---
    rows = np.any(np_image, axis=1)
    cols = np.any(np_image, axis=0)
    if not rows.any() or not cols.any():
        width, height, area, density, perimeter, circularity = 0, 0, 0, 0, 0, 0
        # --- NEW METRICS (Empty) ---
        bbox_area = 0
        aspect_ratio = 0
        components = 0
        convex_hull_area = 0
        solidity = 0
        hole_count = 0
    else:
        ymin, ymax = np.where(rows)[0][[0, -1]]
        xmin, xmax = np.where(cols)[0][[0, -1]]
        
        cropped_image = np_image[ymin:ymax+1, xmin:xmax+1]
        
        width = int(cropped_image.shape[1])
        height = int(cropped_image.shape[0])
        area = int(np.sum(cropped_image > 0))
        density = area / (width * height) if (width * height) > 0 else 0
        
        binarized = cropped_image > 0
        perimeter = int(calculate_perimeter(binarized, neighborhood=4))
        
        circularity = (4 * np.pi * area) / (perimeter**2) if perimeter > 0 else 0
        if circularity > 1: circularity = 1.0

        # --- 6 NEW METRICS (Calculated) ---
        
        # 1. Bounding Box Area
        bbox_area = width * height
        
        # 2. Aspect Ratio
        aspect_ratio = width / height if height > 0 else 0
        
        # 3. Components (disconnected parts)
        labeled_features, components = label(binarized, background=0, connectivity=1, return_num=True)
        
        # 4. Convex Hull Area
        convex_hull_img = convex_hull_image(binarized)
        convex_hull_area = int(np.sum(convex_hull_img))
        
        # 5. Solidity
        solidity = area / convex_hull_area if convex_hull_area > 0 else 0
        
        # 6. Hole Count
        # Pad the binarized image to ensure outer boundary is captured
        padded_binarized = np.pad(binarized, 1, 'constant', constant_values=0)
        # Label the background regions (0s)
        labeled_background = label(padded_binarized == 0, background=0, connectivity=1)
        # Count unique background regions (label 0 is ignored by unique)
        num_background_regions = len(np.unique(labeled_background)) - 1 # -1 for the 0-label
        # The first background region is the outer area. All others are holes.
        hole_count = max(0, num_background_regions - 1)


    # --- Store Data ---
    character_data.append({
        "codePoint": code_point,
        "char": char,
        "name": name,
        "codeStr": f'U+{code_point:04X}',
        "width": width,
        "height": height,
        "area": area,
        "density": round(density, 4),
        "perimeter": perimeter,
        "circularity": round(circularity, 4),
        # --- NEW METRICS (Storage) ---
        "bbox_area": bbox_area,
        "aspect_ratio": round(aspect_ratio, 4),
        "components": components,
        "convex_hull_area": convex_hull_area,
        "solidity": round(solidity, 4),
        "hole_count": hole_count,
        # --- END NEW METRICS ---
        "is_control": is_control(code_point),
        "is_combining": is_combining(code_point),
        "is_regional": is_regional(code_point),
        "is_cjk": is_cjk(code_point),
        "is_emoji": is_emoji(code_point),
        "is_rtl": bidirectional in ['R', 'AL']
    })

print("\nProcessing complete. Saving to JavaScript file...")

# --- UPDATED: Write to a .js file ---
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write("const precalculatedData = ") # Start JS variable assignment
    json.dump(character_data, f)         # Dump the JSON data
    f.write(";")                         # End JS statement

elapsed = time.time() - start_time
print(f"Done. Saved {len(character_data)} characters to {OUTPUT_FILE}.")
print(f"Total time: {elapsed:.2f} seconds.")