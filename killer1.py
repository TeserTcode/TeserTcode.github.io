from PIL import Image
import os

INPUT_FOLDER = "."
OUTPUT_FOLDER = "compressed"

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

for i in range(1, 10001):
    filename = f"{i}.png"
    path = os.path.join(INPUT_FOLDER, filename)

    if not os.path.exists(path):
        continue

    try:
        img = Image.open(path)

        # Reduce to 1/4 width and 1/4 height
        new_w = max(1, img.width // 4)
        new_h = max(1, img.height // 4)

        img = img.resize(
            (new_w, new_h),
            Image.Resampling.NEAREST
        )

        # Reduce palette
        img = img.convert(
            "P",
            palette=Image.Palette.ADAPTIVE,
            colors=32
        )

        out = os.path.join(OUTPUT_FOLDER, filename)

        img.save(
            out,
            optimize=True,
            compress_level=9
        )

        print("Done:", filename)

    except Exception as e:
        print("Failed:", filename, e)