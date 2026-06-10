# 人工筛选清单 — v0.1.6

## 说明

本清单用于人工从 `01_reference_frames/overview/` 中精选关键帧，
复制到对应 A~E 分类目录。原始帧保留不动，只做复制。

## 筛选流程

1. 打开 `04_outputs/reference_gallery/index.html` 浏览全部 211 张 overview 图片
2. 先参考 `03_docs/reference_preselection.md` 的候选建议，再逐区域筛选
3. 将选中帧复制到对应 `01_reference_frames/{A,B,C,D,E}_*/` 目录
4. 新文件名格式：`{区域}_{序号}_{简短描述}.jpg`
5. 在本文件对应表格中勾选"已复制"列
6. 所有复制完成后更新 `reference_manifest.md`

## 区域筛选建议量

| 区域 | 建议数量 | 说明 |
|------|----------|------|
| A_overall | 5~8 张 | 舱体整体结构，用于确认比例和空间关系 |
| B_center_equipment | 8~12 张 | 中央漏斗/罐体，多角度细节 |
| C_right_equipment | 5~10 张 | 右侧设备，不同视角 |
| D_rear_wall_top | 5~10 张 | 后壁、顶部、管路布置 |
| E_tools_small_parts | 5~10 张 | 垫片、工具、卡箍、培养皿等小零件 |

---

## A_overall — 舱体整体图（5~8 张）

| # | 原始文件名 | 推荐新文件名 | 内容说明 | 用途 | 已复制 | 备注 |
|---|-----------|-------------|---------|------|--------|------|
| 1 | | | | 整体比例参考 | □ | |
| 2 | | | | 视角锚定 | □ | |
| 3 | | | | 空间关系 | □ | |
| 4 | | | | 备用 | □ | |
| 5 | | | | 备用 | □ | |
| 6 | | | | 备用 | □ | |
| 7 | | | | 备用 | □ | |
| 8 | | | | 备用 | □ | |

---

## B_center_equipment — 中央漏斗/罐体（8~12 张）

| # | 原始文件名 | 推荐新文件名 | 内容说明 | 用途 | 已复制 | 备注 |
|---|-----------|-------------|---------|------|--------|------|
| 1 | | | | | □ | |
| 2 | | | | | □ | |
| 3 | | | | | □ | |
| 4 | | | | | □ | |
| 5 | | | | | □ | |
| 6 | | | | | □ | |
| 7 | | | | | □ | |
| 8 | | | | | □ | |
| 9 | | | | | □ | |
| 10 | | | | | □ | |
| 11 | | | | | □ | |
| 12 | | | | | □ | |

---

## C_right_equipment — 右侧设备（5~10 张）

| # | 原始文件名 | 推荐新文件名 | 内容说明 | 用途 | 已复制 | 备注 |
|---|-----------|-------------|---------|------|--------|------|
| 1 | | | | | □ | |
| 2 | | | | | □ | |
| 3 | | | | | □ | |
| 4 | | | | | □ | |
| 5 | | | | | □ | |
| 6 | | | | | □ | |
| 7 | | | | | □ | |
| 8 | | | | | □ | |
| 9 | | | | | □ | |
| 10 | | | | | □ | |

---

## D_rear_wall_top — 后壁/顶部/管路（5~10 张）

| # | 原始文件名 | 推荐新文件名 | 内容说明 | 用途 | 已复制 | 备注 |
|---|-----------|-------------|---------|------|--------|------|
| 1 | | | | | □ | |
| 2 | | | | | □ | |
| 3 | | | | | □ | |
| 4 | | | | | □ | |
| 5 | | | | | □ | |
| 6 | | | | | □ | |
| 7 | | | | | □ | |
| 8 | | | | | □ | |
| 9 | | | | | □ | |
| 10 | | | | | □ | |

---

## E_tools_small_parts — 垫片、工具、小零件（5~10 张）

| # | 原始文件名 | 推荐新文件名 | 内容说明 | 用途 | 已复制 | 备注 |
|---|-----------|-------------|---------|------|--------|------|
| 1 | | | | | □ | |
| 2 | | | | | □ | |
| 3 | | | | | □ | |
| 4 | | | | | □ | |
| 5 | | | | | □ | |
| 6 | | | | | □ | |
| 7 | | | | | □ | |
| 8 | | | | | □ | |
| 9 | | | | | □ | |
| 10 | | | | | □ | |

---

## 筛选进度

| 区域 | 已选 | 目标 | 完成率 |
|------|------|------|--------|
| A_overall | 4 | 5~8 | 人工确认完成 |
| B_center_equipment | 7 | 8~12 | 人工确认完成 |
| C_right_equipment | 7 | 5~10 | 人工确认完成 |
| D_rear_wall_top | 6 | 5~10 | 人工确认完成 |
| E_tools_small_parts | 6 | 5~10 | 人工确认完成 |

## v0.1.6 状态备注

- `overview/` 当前共 211 张图片。
- 新增 4-3/4-4 抽帧已进入 `overview/` 根目录，文件名前缀为 `airflow_4_3_*`、`airflow_4_4_*`。
- A/B/C/D/E 目录仍为空；本轮未复制任何精选图。
- 人工筛选时建议优先排除标题卡、旧 `contact_sheet.jpg`、严重遮挡和连续近重复帧。

## v0.1.7 评审板状态备注

- 已生成 A/B/C/D/E 五类候选评审板：`04_outputs/review_boards/v0_1_7/`。
- 已补充生成 `F_airflow_4_2_supplement_review_board.jpg`，专门处理气流 4-2 未进入 v0.1.6 预筛候选的问题。
- 气流 4-2 实际找到 13 张 `frame_*.jpg` 帧图；旧 `contact_sheet.jpg` 未作为候选图纳入。
- F 区候选只是补充评审材料，不是最终入选图，也暂不自动归入 A/B/C/D/E。
- `03_docs/final_reference_selection_draft.md` 已创建，等待人工视觉筛选后填写。
- 下一步：将 review board 图片上传给 ChatGPT 进行视觉筛选，再由人工确认最终复制清单。

## v0.1.8 最终筛选完成记录

- 已根据人工视觉确认结果复制最终精选图 30 张。
- A/B/C/D/E 最终数量：4 / 7 / 7 / 6 / 6。
- 复制方式：只复制，不移动；`overview/` 原始图片保留。
- F 区入选处理：
  - F4、F11、F13 已转入 `C_right_equipment`。
  - F8 已转入 `E_tools_small_parts`。
  - 未创建 F 目录。
- 未入选候选及原因已记录在 `03_docs/final_reference_selection_draft.md`。
- `02_threejs/` 未修改，未建模，未创建 Three.js 场景。

### v0.1.8 已确认复制清单

| 区域 | 数量 | 复制后路径 |
|---|---:|---|
| A_overall | 4 | `01_reference_frames/A_overall/A_overall_01_airflow_4_1_frame_000001.jpg` |
| A_overall |  | `01_reference_frames/A_overall/A_overall_02_airflow_4_1_frame_000003.jpg` |
| A_overall |  | `01_reference_frames/A_overall/A_overall_03_original_frame_000004.jpg` |
| A_overall |  | `01_reference_frames/A_overall/A_overall_04_original_frame_000057.jpg` |
| B_center_equipment | 7 | `01_reference_frames/B_center_equipment/B_center_01_airflow_4_3_interval_0013.jpg` |
| B_center_equipment |  | `01_reference_frames/B_center_equipment/B_center_02_airflow_4_3_interval_0016.jpg` |
| B_center_equipment |  | `01_reference_frames/B_center_equipment/B_center_03_airflow_4_3_interval_0022.jpg` |
| B_center_equipment |  | `01_reference_frames/B_center_equipment/B_center_04_airflow_4_4_interval_0008.jpg` |
| B_center_equipment |  | `01_reference_frames/B_center_equipment/B_center_05_airflow_4_4_interval_0050.jpg` |
| B_center_equipment |  | `01_reference_frames/B_center_equipment/B_center_06_airflow_4_1_frame_000004.jpg` |
| B_center_equipment |  | `01_reference_frames/B_center_equipment/B_center_07_original_frame_000005.jpg` |
| C_right_equipment | 7 | `01_reference_frames/C_right_equipment/C_right_01_airflow_4_3_interval_0001.jpg` |
| C_right_equipment |  | `01_reference_frames/C_right_equipment/C_right_02_airflow_4_3_interval_0005.jpg` |
| C_right_equipment |  | `01_reference_frames/C_right_equipment/C_right_03_airflow_4_3_interval_0024.jpg` |
| C_right_equipment |  | `01_reference_frames/C_right_equipment/C_right_04_airflow_4_4_interval_0013.jpg` |
| C_right_equipment |  | `01_reference_frames/C_right_equipment/C_right_05_airflow_4_2_frame_000004.jpg` |
| C_right_equipment |  | `01_reference_frames/C_right_equipment/C_right_06_airflow_4_2_frame_000011.jpg` |
| C_right_equipment |  | `01_reference_frames/C_right_equipment/C_right_07_airflow_4_2_frame_000013.jpg` |
| D_rear_wall_top | 6 | `01_reference_frames/D_rear_wall_top/D_rear_top_01_airflow_4_3_interval_0012.jpg` |
| D_rear_wall_top |  | `01_reference_frames/D_rear_wall_top/D_rear_top_02_airflow_4_3_interval_0019.jpg` |
| D_rear_wall_top |  | `01_reference_frames/D_rear_wall_top/D_rear_top_03_airflow_4_4_interval_0001.jpg` |
| D_rear_wall_top |  | `01_reference_frames/D_rear_wall_top/D_rear_top_04_airflow_4_4_interval_0049.jpg` |
| D_rear_wall_top |  | `01_reference_frames/D_rear_wall_top/D_rear_top_05_original_frame_000015.jpg` |
| D_rear_wall_top |  | `01_reference_frames/D_rear_wall_top/D_rear_top_06_original_frame_000066.jpg` |
| E_tools_small_parts | 6 | `01_reference_frames/E_tools_small_parts/E_tools_01_supplement_clamp.png` |
| E_tools_small_parts |  | `01_reference_frames/E_tools_small_parts/E_tools_02_supplement_dish.png` |
| E_tools_small_parts |  | `01_reference_frames/E_tools_small_parts/E_tools_03_airflow_4_3_interval_0015.jpg` |
| E_tools_small_parts |  | `01_reference_frames/E_tools_small_parts/E_tools_04_airflow_4_3_interval_0017.jpg` |
| E_tools_small_parts |  | `01_reference_frames/E_tools_small_parts/E_tools_05_original_frame_000009.jpg` |
| E_tools_small_parts |  | `01_reference_frames/E_tools_small_parts/E_tools_06_airflow_4_2_frame_000008.jpg` |

## 最后更新

2026-06-10
