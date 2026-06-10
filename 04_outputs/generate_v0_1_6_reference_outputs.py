#!/usr/bin/env python3
"""Generate v0.1.6 contact sheets and local HTML gallery for reference frames."""

from __future__ import annotations

import html
import json
import math
import re
from pathlib import Path
from urllib.parse import quote

from PIL import Image, ImageDraw, ImageFont


PROJECT_ROOT = Path(__file__).resolve().parents[1]
OVERVIEW_DIR = PROJECT_ROOT / "01_reference_frames" / "overview"
CONTACT_DIR = PROJECT_ROOT / "04_outputs" / "contact_sheets" / "v0_1_6"
GALLERY_DIR = PROJECT_ROOT / "04_outputs" / "reference_gallery"

IMAGE_EXTS = {".jpg", ".jpeg", ".png"}
THUMB_SIZE = (300, 220)
GRID_COLS = 5
GRID_ROWS = 5
PADDING = 10
HEADER_HEIGHT = 42
LABEL_HEIGHT = 44


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Menlo.ttc",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


def natural_key(path: Path) -> list[object]:
    text = str(path.relative_to(OVERVIEW_DIR))
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", text)]


def classify(rel_path: Path) -> dict[str, str | int]:
    rel = rel_path.as_posix()
    name = rel_path.name
    stem = rel_path.stem

    source = "补充图"
    frame_type = "supplement"
    seq = 0
    group = "补充图"

    if rel.startswith("原视频/"):
        source = "原视频"
        frame_type = "legacy_interval"
        group = "原视频"
        seq = extract_number(stem)
    elif "气流流型4-1" in rel:
        source = "气流 4-1"
        frame_type = "legacy_interval"
        group = "气流 4-1"
        seq = extract_number(stem)
    elif "气流流型4-2" in rel:
        source = "气流 4-2"
        frame_type = "legacy_interval"
        group = "气流 4-2"
        seq = extract_number(stem)
    elif name.startswith("airflow_4_3_interval_"):
        source = "气流 4-3"
        frame_type = "interval"
        group = "气流 4-3 interval"
        seq = extract_number(stem)
    elif name.startswith("airflow_4_3_scene_"):
        source = "气流 4-3"
        frame_type = "scene"
        group = "气流 4-3 scene"
        seq = extract_number(stem)
    elif name.startswith("airflow_4_4_interval_"):
        source = "气流 4-4"
        frame_type = "interval"
        group = "气流 4-4 interval"
        seq = extract_number(stem)
    elif name.startswith("airflow_4_4_scene_"):
        source = "气流 4-4"
        frame_type = "scene"
        group = "气流 4-4 scene"
        seq = extract_number(stem)

    return {
        "filename": name,
        "rel_path": f"01_reference_frames/overview/{rel}",
        "source": source,
        "type": frame_type,
        "sequence": seq,
        "group": group,
    }


def extract_number(text: str) -> int:
    matches = re.findall(r"(\d+)", text)
    return int(matches[-1]) if matches else 0


def collect_images() -> list[dict[str, object]]:
    images: list[dict[str, object]] = []
    for path in sorted(OVERVIEW_DIR.rglob("*"), key=natural_key):
        if path.is_file() and path.suffix.lower() in IMAGE_EXTS:
            rel_path = path.relative_to(OVERVIEW_DIR)
            meta = classify(rel_path)
            meta["abs_path"] = str(path)
            meta["overview_rel"] = rel_path.as_posix()
            images.append(meta)
    return images


def wrap_label(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont, max_width: int) -> list[str]:
    chunks = [text]
    lines: list[str] = []
    while chunks:
        chunk = chunks.pop(0)
        if draw.textlength(chunk, font=font) <= max_width:
            lines.append(chunk)
            continue
        cut = len(chunk)
        while cut > 8 and draw.textlength(chunk[:cut] + "...", font=font) > max_width:
            cut -= 1
        lines.append(chunk[:cut] + "...")
        break
    return lines[:2]


def make_contact_sheets(images: list[dict[str, object]]) -> list[Path]:
    CONTACT_DIR.mkdir(parents=True, exist_ok=True)
    font = load_font(12)
    small_font = load_font(10)
    header_font = load_font(16)
    per_sheet = GRID_COLS * GRID_ROWS
    sheet_count = math.ceil(len(images) / per_sheet)
    outputs: list[Path] = []

    for sheet_index in range(sheet_count):
        start = sheet_index * per_sheet
        batch = images[start : start + per_sheet]
        width = PADDING + GRID_COLS * (THUMB_SIZE[0] + PADDING)
        height = HEADER_HEIGHT + PADDING + GRID_ROWS * (THUMB_SIZE[1] + LABEL_HEIGHT + PADDING)
        sheet = Image.new("RGB", (width, height), (245, 246, 248))
        draw = ImageDraw.Draw(sheet)
        title = f"HB-RABS v0.1.6 overview contact sheet {sheet_index + 1}/{sheet_count} | images {start + 1}-{start + len(batch)} of {len(images)}"
        draw.text((PADDING, 12), title, fill=(24, 31, 42), font=header_font)

        for i, meta in enumerate(batch):
            col = i % GRID_COLS
            row = i // GRID_COLS
            x = PADDING + col * (THUMB_SIZE[0] + PADDING)
            y = HEADER_HEIGHT + row * (THUMB_SIZE[1] + LABEL_HEIGHT + PADDING)
            draw.rectangle((x - 1, y - 1, x + THUMB_SIZE[0] + 1, y + THUMB_SIZE[1] + 1), outline=(190, 196, 206))

            try:
                with Image.open(str(meta["abs_path"])) as img:
                    img = img.convert("RGB")
                    img.thumbnail(THUMB_SIZE, Image.Resampling.LANCZOS)
                    px = x + (THUMB_SIZE[0] - img.width) // 2
                    py = y + (THUMB_SIZE[1] - img.height) // 2
                    sheet.paste(img, (px, py))
            except Exception as exc:
                draw.rectangle((x, y, x + THUMB_SIZE[0], y + THUMB_SIZE[1]), fill=(80, 30, 30))
                draw.text((x + 6, y + 6), f"ERR {exc}", fill=(255, 235, 235), font=small_font)

            label_y = y + THUMB_SIZE[1] + 5
            label = f"{start + i + 1:03d}  {meta['filename']}"
            for line in wrap_label(draw, label, font, THUMB_SIZE[0]):
                draw.text((x, label_y), line, fill=(17, 24, 39), font=font)
                label_y += 15
            draw.text((x, label_y), str(meta["group"]), fill=(74, 85, 104), font=small_font)

        output = CONTACT_DIR / f"contact_sheet_v0_1_6_{sheet_index + 1:02d}.jpg"
        sheet.save(output, quality=90)
        outputs.append(output)
    return outputs


def image_url(meta: dict[str, object]) -> str:
    rel_from_gallery = Path("..") / ".." / "01_reference_frames" / "overview" / str(meta["overview_rel"])
    return quote(rel_from_gallery.as_posix(), safe="/._-()")


def make_gallery(images: list[dict[str, object]]) -> Path:
    GALLERY_DIR.mkdir(parents=True, exist_ok=True)
    groups = [
        "原视频",
        "气流 4-1",
        "气流 4-2",
        "气流 4-3 interval",
        "气流 4-3 scene",
        "气流 4-4 interval",
        "气流 4-4 scene",
        "补充图",
    ]
    counts = {group: 0 for group in groups}
    for meta in images:
        counts[str(meta["group"])] = counts.get(str(meta["group"]), 0) + 1

    cards = []
    for index, meta in enumerate(images, start=1):
        url = image_url(meta)
        cards.append(
            f"""
      <article class="card" data-group="{html.escape(str(meta['group']))}">
        <button class="imageButton" type="button" data-full="{url}" data-title="{html.escape(str(meta['filename']))}">
          <img src="{url}" loading="lazy" alt="{html.escape(str(meta['filename']))}">
        </button>
        <div class="meta">
          <strong>{index:03d}. {html.escape(str(meta['filename']))}</strong>
          <span>{html.escape(str(meta['rel_path']))}</span>
          <dl>
            <dt>来源视频</dt><dd>{html.escape(str(meta['source']))}</dd>
            <dt>抽帧类型</dt><dd>{html.escape(str(meta['type']))}</dd>
            <dt>序号</dt><dd>{meta['sequence']}</dd>
          </dl>
        </div>
      </article>"""
        )

    filter_buttons = [
        f'<button type="button" class="active" data-filter="all">全部 {len(images)}</button>'
    ]
    for group in groups:
        filter_buttons.append(
            f'<button type="button" data-filter="{html.escape(group)}">{html.escape(group)} {counts.get(group, 0)}</button>'
        )

    page = f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HB-RABS v0.1.6 Reference Gallery</title>
  <style>
    * {{ box-sizing: border-box; }}
    body {{ margin: 0; background: #f5f6f8; color: #172033; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }}
    header {{ position: sticky; top: 0; z-index: 2; background: rgba(255,255,255,.96); border-bottom: 1px solid #d9dde5; padding: 14px 18px; }}
    h1 {{ margin: 0 0 8px; font-size: 20px; letter-spacing: 0; }}
    .summary {{ color: #5c6678; font-size: 13px; margin-bottom: 10px; }}
    .filters {{ display: flex; flex-wrap: wrap; gap: 8px; }}
    .filters button {{ border: 1px solid #c4cad6; background: #fff; color: #172033; min-height: 32px; padding: 5px 10px; border-radius: 6px; cursor: pointer; }}
    .filters button.active {{ background: #1f6feb; border-color: #1f6feb; color: #fff; }}
    main {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; padding: 16px; }}
    .card {{ background: #fff; border: 1px solid #d9dde5; border-radius: 8px; overflow: hidden; min-width: 0; }}
    .imageButton {{ border: 0; padding: 0; width: 100%; height: 210px; background: #e7eaf0; cursor: zoom-in; display: block; }}
    .imageButton img {{ width: 100%; height: 100%; object-fit: contain; display: block; }}
    .meta {{ padding: 10px 12px 12px; display: grid; gap: 6px; }}
    .meta strong {{ font-size: 13px; overflow-wrap: anywhere; }}
    .meta span {{ color: #697386; font-size: 12px; overflow-wrap: anywhere; }}
    dl {{ display: grid; grid-template-columns: 64px 1fr; gap: 4px 8px; margin: 0; font-size: 12px; }}
    dt {{ color: #697386; }}
    dd {{ margin: 0; overflow-wrap: anywhere; }}
    .lightbox {{ position: fixed; inset: 0; display: none; place-items: center; z-index: 5; background: rgba(10, 15, 25, .86); padding: 24px; }}
    .lightbox.open {{ display: grid; }}
    .lightbox img {{ max-width: 94vw; max-height: 86vh; object-fit: contain; background: #111827; }}
    .lightbox div {{ color: #fff; margin-top: 10px; text-align: center; overflow-wrap: anywhere; }}
  </style>
</head>
<body>
  <header>
    <h1>HB-RABS v0.1.6 Reference Gallery</h1>
    <div class="summary">覆盖 overview 全部 {len(images)} 张图片。点击缩略图放大查看。</div>
    <nav class="filters">{''.join(filter_buttons)}</nav>
  </header>
  <main>{''.join(cards)}</main>
  <section class="lightbox" id="lightbox" aria-modal="true" role="dialog">
    <div>
      <img id="lightboxImage" alt="">
      <div id="lightboxTitle"></div>
    </div>
  </section>
  <script>
    const buttons = document.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll(".card");
    buttons.forEach(button => button.addEventListener("click", () => {{
      buttons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      cards.forEach(card => {{
        card.style.display = filter === "all" || card.dataset.group === filter ? "" : "none";
      }});
    }}));
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    document.querySelectorAll(".imageButton").forEach(button => button.addEventListener("click", () => {{
      lightboxImage.src = button.dataset.full;
      lightboxImage.alt = button.dataset.title;
      lightboxTitle.textContent = button.dataset.title;
      lightbox.classList.add("open");
    }}));
    lightbox.addEventListener("click", () => lightbox.classList.remove("open"));
    document.addEventListener("keydown", event => {{
      if (event.key === "Escape") lightbox.classList.remove("open");
    }});
  </script>
</body>
</html>
"""
    output = GALLERY_DIR / "index.html"
    output.write_text(page, encoding="utf-8")
    return output


def main() -> None:
    images = collect_images()
    sheets = make_contact_sheets(images)
    gallery = make_gallery(images)
    manifest = {
        "version": "v0.1.6",
        "image_count": len(images),
        "contact_sheets": [str(path.relative_to(PROJECT_ROOT)) for path in sheets],
        "gallery": str(gallery.relative_to(PROJECT_ROOT)),
        "groups": {},
    }
    for meta in images:
        group = str(meta["group"])
        manifest["groups"][group] = manifest["groups"].get(group, 0) + 1
    (CONTACT_DIR / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
