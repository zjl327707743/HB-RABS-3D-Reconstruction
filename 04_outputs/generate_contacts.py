#!/usr/bin/env python3
"""
v0.1.5 Contact Sheet & HTML Gallery Generator
Generates contact sheets and an HTML image browser from overview/ frames.
"""

import os
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

PROJECT_ROOT = Path(os.path.expanduser("~/VS Projects/HB-RABS-3D-Reconstruction"))
OVERVIEW_DIR = PROJECT_ROOT / "01_reference_frames" / "overview"
CONTACT_SHEETS_DIR = PROJECT_ROOT / "04_outputs" / "contact_sheets"
GALLERY_DIR = PROJECT_ROOT / "04_outputs" / "reference_gallery"

# Config
THUMB_SIZE = (280, 210)       # per thumbnail
GRID_COLS = 5
GRID_ROWS = 5                 # 25 per sheet
FONT_SIZE = 11
HEADER_HEIGHT = 36
LABEL_HEIGHT = 30
PADDING = 8

def collect_images():
    """Walk overview/ and return sorted list of (relative_path, absolute_path)."""
    images = []
    for ext in ("*.jpg", "*.jpeg", "*.png"):
        for f in OVERVIEW_DIR.rglob(ext):
            rel = f.relative_to(OVERVIEW_DIR)
            images.append((str(rel), str(f)))
    images.sort(key=lambda x: x[0])
    return images

def load_font(size):
    """Try to load a monospace font, fall back to default."""
    try:
        # macOS monospace
        return ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", size)
    except Exception:
        try:
            return ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", size)
        except Exception:
            return ImageFont.load_default()

def create_contact_sheets(images):
    """Generate contact sheet JPGs, 25 images per sheet."""
    font = load_font(FONT_SIZE)
    header_font = load_font(14)
    total = len(images)
    per_sheet = GRID_COLS * GRID_ROWS
    sheet_count = (total + per_sheet - 1) // per_sheet
    paths = []

    for sheet_idx in range(sheet_count):
        start = sheet_idx * per_sheet
        end = min(start + per_sheet, total)
        batch = images[start:end]
        batch_size = len(batch)

        # Calculate sheet dimensions
        sheet_w = GRID_COLS * (THUMB_SIZE[0] + PADDING) + PADDING
        sheet_h = HEADER_HEIGHT + GRID_ROWS * (THUMB_SIZE[1] + LABEL_HEIGHT + PADDING) + PADDING

        sheet = Image.new("RGB", (sheet_w, sheet_h), color=(30, 30, 30))
        draw = ImageDraw.Draw(sheet)

        # Header
        title = f"HB-RABS-3D  Contact Sheet {sheet_idx + 1}/{sheet_count}  (images {start+1}–{end})"
        draw.text((PADDING, 8), title, fill=(220, 220, 220), font=header_font)

        for i, (rel_path, abs_path) in enumerate(batch):
            row = i // GRID_COLS
            col = i % GRID_COLS
            x = PADDING + col * (THUMB_SIZE[0] + PADDING)
            y = HEADER_HEIGHT + row * (THUMB_SIZE[1] + LABEL_HEIGHT + PADDING)

            # Load & resize thumbnail
            try:
                img = Image.open(abs_path)
                img.thumbnail(THUMB_SIZE, Image.LANCZOS)
                # Center in cell
                paste_x = x + (THUMB_SIZE[0] - img.width) // 2
                paste_y = y + (THUMB_SIZE[1] - img.height) // 2
                sheet.paste(img, (paste_x, paste_y))
            except Exception as e:
                draw.rectangle([x, y, x + THUMB_SIZE[0], y + THUMB_SIZE[1]], fill=(60, 0, 0))
                draw.text((x + 4, y + 4), f"ERR: {e}", fill=(255, 100, 100), font=font)

            # Label: short filename
            label = os.path.basename(rel_path)
            # Truncate if too long
            max_chars = 45
            if len(label) > max_chars:
                label = label[:max_chars - 3] + "..."
            label_y = y + THUMB_SIZE[1] + 2
            draw.text((x, label_y), label, fill=(180, 180, 200), font=font)

        output_path = CONTACT_SHEETS_DIR / f"contact_sheet_{sheet_idx + 1:02d}.jpg"
        sheet.save(str(output_path), quality=85)
        paths.append(str(output_path))
        print(f"  Saved: {output_path}  ({batch_size} images)")

    return paths

def create_html_gallery(images):
    """Generate a self-contained HTML gallery for quick browsing."""
    html_path = GALLERY_DIR / "index.html"

    items_html = []
    for i, (rel_path, abs_path) in enumerate(images):
        # Copy image to gallery dir for local serving
        dest_name = rel_path.replace("/", "_").replace(" ", "_")
        dest_path = GALLERY_DIR / dest_name
        try:
            img = Image.open(abs_path)
            img.thumbnail((600, 450), Image.LANCZOS)
            img.save(str(dest_path), quality=80)
        except Exception:
            dest_name = None

        parent_dir = os.path.dirname(rel_path) or "overview_root"
        base = os.path.basename(rel_path)

        if dest_name:
            items_html.append(f"""
            <div class="card" id="img-{i}">
              <a href="{dest_name}" target="_blank">
                <img src="{dest_name}" loading="lazy" alt="{base}">
              </a>
              <div class="info">
                <div class="filename" title="{rel_path}">{base}</div>
                <div class="path">overview/{rel_path}</div>
                <div class="meta">#{i+1} · {parent_dir}</div>
              </div>
            </div>""")

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HB-RABS-3D Reference Frame Browser — v0.1.5</title>
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ background: #1a1a2e; color: #e0e0e0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }}
  header {{
    padding: 20px 24px;
    background: #16213e;
    border-bottom: 2px solid #0f3460;
    position: sticky; top: 0; z-index: 10;
  }}
  header h1 {{ font-size: 1.3rem; color: #e94560; }}
  header .stats {{ font-size: 0.85rem; color: #aaa; margin-top: 4px; }}
  header .filters {{ margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap; }}
  header .filters button {{
    padding: 4px 12px; border: 1px solid #0f3460; background: #1a1a2e; color: #ccc;
    border-radius: 4px; cursor: pointer; font-size: 0.8rem;
  }}
  header .filters button:hover, header .filters button.active {{ background: #e94560; border-color: #e94560; color: #fff; }}
  .grid {{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 12px; padding: 16px;
  }}
  .card {{
    background: #16213e; border-radius: 6px; overflow: hidden;
    border: 1px solid #0f3460; transition: transform 0.15s;
  }}
  .card:hover {{ transform: translateY(-2px); border-color: #e94560; }}
  .card img {{ width: 100%; height: 200px; object-fit: cover; display: block; cursor: pointer; }}
  .card .info {{ padding: 8px 10px; }}
  .card .filename {{
    font-size: 0.75rem; color: #fff; word-break: break-all;
    font-family: 'Menlo', 'Consolas', monospace;
  }}
  .card .path {{ font-size: 0.7rem; color: #888; margin-top: 2px; }}
  .card .meta {{ font-size: 0.7rem; color: #e94560; margin-top: 2px; }}
  .empty {{ grid-column: 1 / -1; text-align: center; padding: 40px; color: #666; }}
</style>
</head>
<body>
<header>
  <h1>📷 HB-RABS-3D Reference Frame Browser</h1>
  <div class="stats">
    {len(images)} total frames · {len(set(os.path.dirname(r[0]) for r in images))} source folders · v0.1.5
  </div>
  <div class="filters">
    <button class="active" onclick="filterAll()">All ({len(images)})</button>
    <button onclick="filter('原视频')">原视频</button>
    <button onclick="filter('静态气流流型1')">静态气流流型1</button>
    <button onclick="filter('动态气流流型1')">动态气流流型1</button>
    <button onclick="filter('卡箍')">卡箍</button>
    <button onclick="filter('培养皿')">培养皿</button>
  </div>
</header>
<div class="grid" id="grid">
  {''.join(items_html)}
</div>
<script>
  function filter(kw) {{
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.card').forEach(c => {{
      c.style.display = kw === 'All' ? '' : c.querySelector('.path').textContent.includes(kw) ? '' : 'none';
    }});
  }}
  function filterAll() {{ filter('All'); }}
</script>
</body>
</html>"""

    html_path.write_text(html, encoding="utf-8")
    print(f"  Saved: {html_path}  ({len(items_html)} images)")
    return str(html_path)

def main():
    print("=== v0.1.5 Contact Sheet & Gallery Generator ===\n")

    # Collect images
    images = collect_images()
    print(f"  Total images found: {len(images)}\n")

    # Contact sheets
    print("Generating contact sheets...")
    sheet_paths = create_contact_sheets(images)
    print(f"  → {len(sheet_paths)} contact sheet(s) generated\n")

    # HTML gallery
    print("Generating HTML gallery...")
    gallery_path = create_html_gallery(images)
    print(f"  → Gallery generated\n")

    print("=== Done ===")
    print(f"Contact sheets: {len(sheet_paths)}")
    print(f"Gallery: {gallery_path}")

if __name__ == "__main__":
    main()
