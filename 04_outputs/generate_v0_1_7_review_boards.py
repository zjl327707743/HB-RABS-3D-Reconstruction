#!/usr/bin/env python3
"""Generate v0.1.7 visual review boards from preselection candidates."""

from __future__ import annotations

import json
import math
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


PROJECT_ROOT = Path(__file__).resolve().parents[1]
OVERVIEW_DIR = PROJECT_ROOT / "01_reference_frames" / "overview"
PRESELECTION = PROJECT_ROOT / "03_docs" / "reference_preselection.md"
OUTPUT_DIR = PROJECT_ROOT / "04_outputs" / "review_boards" / "v0_1_7"
AIRFLOW_4_2_DIR = OVERVIEW_DIR / "分装间-RABS602B气流流型4-2（RABS602B动态气流流型1）"

BOARD_DEFS = {
    "A": ("A_overall", "A_overall_review_board.jpg"),
    "B": ("B_center_equipment", "B_center_equipment_review_board.jpg"),
    "C": ("C_right_equipment", "C_right_equipment_review_board.jpg"),
    "D": ("D_rear_wall_top", "D_rear_wall_top_review_board.jpg"),
    "E": ("E_tools_small_parts", "E_tools_small_parts_review_board.jpg"),
}

THUMB = (420, 300)
COLS = 3
PAD = 18
HEADER_H = 72
LABEL_H = 72


def font(size: int) -> ImageFont.ImageFont:
    for path in [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Menlo.ttc",
    ]:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            pass
    return ImageFont.load_default()


def natural_key(text: str) -> list[object]:
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", text)]


def parse_preselection() -> dict[str, list[dict[str, str]]]:
    text = PRESELECTION.read_text(encoding="utf-8")
    sections: dict[str, list[dict[str, str]]] = {key: [] for key in BOARD_DEFS}
    current: str | None = None
    for line in text.splitlines():
        header = re.match(r"##\s+([A-E])_", line)
        if header:
            current = header.group(1)
            continue
        if current and line.startswith("|") and "`" in line:
            cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
            if len(cells) < 5:
                continue
            code = re.search(r"`([^`]+)`", cells[1])
            if not code:
                continue
            source = cells[2]
            purpose = cells[4]
            sections[current].append({
                "id": f"{current}{len(sections[current]) + 1}",
                "rel": code.group(1),
                "source": source,
                "purpose": purpose,
            })
    return sections


def collect_airflow_4_2() -> list[dict[str, str]]:
    frames = sorted(AIRFLOW_4_2_DIR.glob("frame_*.jpg"), key=lambda p: natural_key(p.name))
    return [
        {
            "id": f"F{i}",
            "rel": f"{AIRFLOW_4_2_DIR.name}/{path.name}",
            "source": "气流 4-2",
            "purpose": "4-2 补充候选，待人工视觉确认",
        }
        for i, path in enumerate(frames, start=1)
    ]


def resolve(rel: str) -> Path:
    return OVERVIEW_DIR / rel


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont, width: int) -> list[str]:
    if draw.textlength(text, font=fnt) <= width:
        return [text]
    out: list[str] = []
    rest = text
    while rest and len(out) < 2:
        cut = len(rest)
        while cut > 6 and draw.textlength(rest[:cut] + ("..." if cut < len(rest) else ""), font=fnt) > width:
            cut -= 1
        suffix = "..." if cut < len(rest) else ""
        out.append(rest[:cut] + suffix)
        rest = rest[cut:]
        if suffix:
            break
    return out


def make_board(title: str, filename: str, items: list[dict[str, str]]) -> Path:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    title_font = font(24)
    label_font = font(16)
    small_font = font(13)
    rows = math.ceil(len(items) / COLS)
    width = PAD + COLS * (THUMB[0] + PAD)
    height = HEADER_H + PAD + rows * (THUMB[1] + LABEL_H + PAD)
    board = Image.new("RGB", (width, height), (244, 246, 250))
    draw = ImageDraw.Draw(board)
    draw.text((PAD, 18), title, fill=(20, 28, 42), font=title_font)
    draw.text((PAD, 48), f"{len(items)} candidates | v0.1.7 review only, not final selection", fill=(92, 103, 121), font=small_font)

    for idx, item in enumerate(items):
        col = idx % COLS
        row = idx // COLS
        x = PAD + col * (THUMB[0] + PAD)
        y = HEADER_H + row * (THUMB[1] + LABEL_H + PAD)
        draw.rectangle((x - 1, y - 1, x + THUMB[0] + 1, y + THUMB[1] + 1), outline=(181, 190, 204))
        path = resolve(item["rel"])
        try:
            with Image.open(path) as img:
                img = img.convert("RGB")
                img.thumbnail(THUMB, Image.Resampling.LANCZOS)
                board.paste(img, (x + (THUMB[0] - img.width) // 2, y + (THUMB[1] - img.height) // 2))
        except Exception as exc:
            draw.rectangle((x, y, x + THUMB[0], y + THUMB[1]), fill=(92, 30, 30))
            draw.text((x + 8, y + 8), f"Missing: {exc}", fill=(255, 235, 235), font=small_font)

        label_y = y + THUMB[1] + 8
        draw.text((x, label_y), item["id"], fill=(10, 89, 190), font=label_font)
        name = Path(item["rel"]).name
        for line in wrap(draw, name, small_font, THUMB[0] - 48):
            draw.text((x + 48, label_y + 1), line, fill=(20, 28, 42), font=small_font)
            label_y += 17
        draw.text((x, y + THUMB[1] + 48), item["source"], fill=(92, 103, 121), font=small_font)

    output = OUTPUT_DIR / filename
    board.save(output, quality=92)
    return output


def main() -> None:
    sections = parse_preselection()
    sections["F"] = collect_airflow_4_2()
    outputs: dict[str, str] = {}
    counts: dict[str, int] = {}

    for key, items in sections.items():
        if key == "F":
            title = "F_airflow_4_2_supplement review board"
            filename = "F_airflow_4_2_supplement_review_board.jpg"
        else:
            title, filename = BOARD_DEFS[key]
        output = make_board(title, filename, items)
        outputs[key] = str(output.relative_to(PROJECT_ROOT))
        counts[key] = len(items)

    summary = {
        "version": "v0.1.7",
        "counts": counts,
        "outputs": outputs,
        "airflow_4_2_frame_count": len(sections["F"]),
        "airflow_4_2_note": "Only frame_*.jpg files are included; legacy contact_sheet.jpg is excluded.",
    }
    (OUTPUT_DIR / "review_board_manifest.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
